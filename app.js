const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const mongooseConnect = require("./mongoose");
mongooseConnect();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/User");

const app = express();

// stops cors error from frontend api calls
app.use(cors({origin: process.env.CORS_ORIGIN}))
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//logger shows us requested url path
app.use(logger("dev"));
//parse the data coming
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
