const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Added for JWT
const mysql = require("mysql");
require("dotenv").config();
const crypto = require("crypto");
const port = 5000;

const app = express();
app.use(express.json());
app.use(cors());

// console.log(crypto.randomBytes(32).toString("hex"));
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Connection Error: ", err);
    return;
  }

  console.log("Connection successful");
});

const getUserIdFromRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error("Error decoding refresh token:", error.message);
    return null;
  }
};

const generateRefreshToken = (userId) => {
  // Implement your logic to generate a new refresh token
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1h", // Set the expiration time for the refresh token
  });

  // Save the refresh token to your database or wherever you store it

  return refreshToken;
};

// Derive a key from the passphrase
const key = crypto.scryptSync(process.env.SECRET_PASS, "salt", 32);

function encrypt(text) {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(encryptedText) {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the current date and time
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const query =
      "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [name, email, hashedPassword, currentDate],
      (err, results) => {
        if (err) {
          console.error("Database Error: ", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ... (other imports and setup)

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("Received login request for email:", email);

    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Database Error: ", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // console.log("Results from database:", results);

      if (results.length === 0) {
        console.log("User not found for email:", email);
        return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.log("Invalid password for email:", email);
        return res.status(401).json({ error: "Invalid password" });
      }

      // Create and send JWT
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // console.log("Generated token:", token);

      // Update the session_token in the database
      const updateSessionQuery =
        "UPDATE users SET session_token = ? WHERE user_id = ?";
      connection.query(
        updateSessionQuery,
        [token, user.user_id],
        (updateError, updateResults) => {
          if (updateError) {
            console.error("Database Update Error: ", updateError);
            return res.status(500).json({ error: "Internal server error" });
          }

          console.log("Login successful for email:", email);
          const refreshToken = generateRefreshToken(user.user_id);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // ... (other options like secure, sameSite, etc.)
          });
          res.cookie("token", token, { httpOnly: true }).json({
            message: "Login successful",
            token,
            refreshToken,
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/logout", async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.header("Authorization");

    if (!token) {
      console.error("Token not provided");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      console.error("Invalid user ID");
      return res.status(401).json({ error: "Invalid user ID" });
    }

    // Clear the session_token in the database for the logged-in user
    const clearSessionQuery =
      "UPDATE users SET session_token = NULL WHERE user_id = ?";
    connection.query(
      clearSessionQuery,
      [userId],
      (updateError, updateResults) => {
        if (updateError) {
          console.error("Database Update Error: ", updateError);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log("Logout successful");
        res.clearCookie("token").json({ message: "Logout successful" });
      }
    );
  } catch (error) {
    console.error("Logout Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/refresh-token", (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Verify the refresh token
    const userId = getUserIdFromRefreshToken(refreshToken);

    if (!userId) {
      return res.status(401).json({ error: "Invalid user ID" });
    }

    // Assuming the refresh token is valid, issue a new access token and refresh token
    const newAccessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Update the session_token in the database
    const updateSessionQuery =
      "UPDATE users SET session_token = ? WHERE user_id = ?";
    connection.query(
      updateSessionQuery,
      [newAccessToken, userId],
      (updateError, updateResults) => {
        if (updateError) {
          console.error("Database Update Error: ", updateError);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log("Session token updated for user:", userId);

        // const newRefreshToken = generateRefreshToken(userId);
        console.log("New Access:" + newAccessToken);
        // console.log("New Refresh: " + newRefreshToken);

        res.status(200).json({
          accessToken: newAccessToken,
          // refreshToken: newRefreshToken,
        });
      }
    );
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/create-note", (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return res.status(401).json({ error: "Invalid user ID" });
    }

    const title = encrypt(req.body.title);
    const content = encrypt(req.body.content);
    const date = req.body.date_created;

    const query =
      "INSERT INTO notes (user_id, title, content, date_created, date_edited) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      query,
      [userId, title, content, date, date],
      (err, results) => {
        if (err) {
          console.error("Database Error: ", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        res.status(201).json({ message: "Note added succesfully" });
      }
    );
  } catch (error) {
    console.error("Create Note Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Inside your fetchNotesFromDatabase function or wherever you handle database queries
const fetchNotesFromDatabase = (userId) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT notes_id, title, content, date_created FROM notes WHERE user_id = ?";

    connection.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        // Decrypt the titles and content before resolving
        const decryptedResults = results.map((note) => ({
          id: note.notes_id,
          title: decrypt(note.title), // Assuming title is encrypted
          content: decrypt(note.content), // Assuming content is encrypted
          date: note.date_created,
        }));

        resolve(decryptedResults);
      }
    });
  });
};

app.get("/get-notes", async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return res.status(401).json({ error: "Invalid user ID" });
    }

    // Fetch notes from the database based on the user ID
    const notes = await fetchNotesFromDatabase(userId);

    res.status(200).json({ notes });
  } catch (error) {
    console.error("Get Notes Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
