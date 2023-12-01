const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Added for JWT
const mysql = require("mysql");
const port = 5000;

const app = express();
app.use(express.json());
app.use(cors());

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
      const token = jwt.sign({ userId: user.user_id }, "yourSecretKey", {
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
          res.cookie("token", token, { httpOnly: true }).json({
            message: "Login successful",
            token,
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
    const decoded = jwt.verify(token, "yourSecretKey");
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

app.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    // Validate refresh token
    if (!refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // TODO: Validate the refresh token (you may want to store and check against a database)

    // Assuming the refresh token is valid, issue a new access token
    const userId = getUserIdFromRefreshToken(refreshToken);

    if (!userId) {
      return res.status(401).json({ error: "Invalid user ID" });
    }

    const newAccessToken = jwt.sign({ userId }, "yourSecretKey", {
      expiresIn: "1h", // Set the expiration time for the new access token
    });

    // You can also issue a new refresh token if needed
    // const newRefreshToken = generateRefreshToken(userId);

    // Return the new access token (and optionally new refresh token)
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
