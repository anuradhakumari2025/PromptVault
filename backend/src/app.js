const express = require('express');
const connectionToDB = require('./db/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const promptRoutes = require('./routes/prompt.routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent with requests
  }
))
connectionToDB()

app.use("/api/auth", authRoutes);
app.use("/api/prompts", promptRoutes);

module.exports = app;