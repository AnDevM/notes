const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const envArg =
  process.argv.find((arg) => arg.startsWith("-e="))?.slice(3) || "development";
require("dotenv").config({
  path: `.env${envArg === "development" ? ".development" : ""}`,
});
const app = express();
const PORT = 3000;
const pool = new Pool({
  user: "devuser",
  host: "localhost",
  database: "devnotes",
  password: "devpass",
  port: 5432,
});
const ROOT = process.env.SERVER_ROOT;
const SECRET_KEY = process.env.SECRET_KEY;

if (envArg === "development")
  app.use(
    cors({
      origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
      credentials: true,
    })
  );

app.use(express.json());
app.use(cookieParser());

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      console.log(`No user found for email: ${email}`);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_digest);

    if (!passwordMatch) {
      console.log(`Password mismatch for user: ${email}`);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "14d",
    });

    await pool.query(
      "UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1",
      [user.id]
    );

    res.cookie("token_notes", token, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    console.log(`User logged in: ${email}`);

    return res.json({ success: true });
  } catch (err) {
    console.error("DB error:", err);
    if (!res.headersSent) {
      res.sendStatus(500);
    }
  }
});

app.get("/api/check-token", (req, res) => {
  const token = req.cookies.token_notes;
  if (!token) {
    return res.json({ valid: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.json({ valid: true, userId: decoded.userId });
  } catch (err) {
    return res.json({ valid: false, message: "Invalid token" });
  }
});

app.get("/api/notes", async (req, res) => {
  try {
    console.log("notes action");

    const result = await pool.query(
      `SELECT
      notes.*,
      COALESCE(ARRAY_AGG(tags.name), '{}') AS tags
    FROM notes
    LEFT JOIN note_tags ON note_tags.note_id = notes.id
    LEFT JOIN tags ON tags.id = note_tags.tag_id
    WHERE notes.user_id = $1
    GROUP BY notes.id
    ORDER BY notes.id;`,
      [1]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notes with tags:", err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on ${ROOT}:${PORT}`);
});
