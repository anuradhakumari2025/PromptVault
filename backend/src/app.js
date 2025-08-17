const express = require("express");
const connectionToDB = require("./db/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const promptRoutes = require("./routes/prompt.routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
connectionToDB();

app.use("/api/auth", authRoutes);
app.use("/api/prompts", promptRoutes);

module.exports = app;
