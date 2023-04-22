const app = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
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
dotenv.config({ path: './.env' });

//db connection
const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASS,
	database: process.env.DATABASE
})

db.connect((error) => {
	if (error) {
		console.log(error)
	}
	else {
		console.log("MySQL connected....");
	}
})

//app port
app.listen(80, () => {
	console.log('listening on port 80.......');
})
