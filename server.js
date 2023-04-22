const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const bodyParser = require("body-parser");


//intializing express.js
const app = express();

//middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// declare static path
let staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

//dotenv config
// dotenv.config({ path: './.env' });

//db connection
// const db = mysql.createConnection({
// 	host: process.env.DATABASE_HOST,
// 	user: process.env.DATABASE_USER,
// 	password: process.env.DATABASE_PASS,
// 	database: process.env.DATABASE
// })

// db.connect((error) => {
// 	if (error) {
// 		console.log(error)
// 	}
// 	else {
// 		console.log("MySQL connected....");
// 	}
// })

//app port
app.listen(3000, () => {
	console.log('listening on port 3000.......');
})

//routes

//login screen
app.get("/login", (req, res) => {
	res.sendFile(path.join(staticPath, "../views/login.html"));
});

//rentals screen
app.get("/rentals", (req, res) => {
	res.sendFile(path.join(staticPath, "../views/rentals.html"));
});

//Property screen
app.get("/property", (req, res) => {
	res.sendFile(path.join(staticPath, "../views/property.html"));
});

//profile screen
app.get("/profile", (req, res) => {
	res.sendFile(path.join(staticPath, "../views/profile.html"));
});

//adduser screen
app.get("/adduser", (req, res) => {
	res.sendFile(path.join(staticPath, "../views/adduser.html"));
});

//report screen
app.get("/report", (req, res) => {
	res.sendFile(path.join(staticPath, "../views/report.html"));
});

//logout screen
app.get("/logout", (req, res) => {
	res.sendFile(path.join(staticPath, "../views/logout.html"));
});