const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
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

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    connection.query(query, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error("Database Error: ", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received login request for email:", email);

    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Database Error: ", err);
        return res.status(500).json({ error: "Internal server error" });
      }

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

      console.log("Login successful for email:", email);
      res.status(200).json({ message: "Login successful" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
