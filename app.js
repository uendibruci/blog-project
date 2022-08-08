"use-strict";

const path = require("path");
const express = require("express");
const cors = require("cors");
const postsRoutes = require("./routes/postsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const globalErrorHandler = require("./controllers/globalErrorHandler");
const AppError = require("./utils/appError");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("test");
});

app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/users", usersRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
