const express = require('express');
const connectionToDB = require('./db/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const promptRoutes = require('./routes/prompt.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
connectionToDB()

app.use("/api/auth", authRoutes);
app.use("/api/prompts", promptRoutes);

module.exports = app;