const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const { promisify } = require("util")
const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const bodyParser = require("body-parser");


//intializing express.js
const app = express();

//middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// declare static path
let staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));
express().use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

// dotenv config
dotenv.config({ path: './.env' });

// db connection
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
app.listen(3000, () => {
	console.log('listening on port 3000.......');
})

//routes

app.post('/auth/login', async (req, res) => {
	const phone = req.body.phone;
	const password = req.body.pass;

	db.query(
		"select * from PHONE where PHONE=?",
		[phone],
		(error, result) => {
			console.log(phone);
			console.log(result);
			if (error) {
				console.log(error);
				const msg = "Internal Server Error";
				return res.status(500).send({
					error: {
						message: msg
					}
				});
			}
			if (result.length <= 0) {
				console.log("Wrong phone");
				const msg = "Wrong phone";
				return res.status(400).send({
					error: {
						message: msg
					}
				});
			} else {
				const uid = result[0].UID;
				console.log(uid);
				db.query("select * from USER where UID=?", [uid], (error, resu) => {
					if (error) {
						console.log(error);
						const msg = "Internal Server Error";
						return res.status(500).send({
							error: {
								message: msg
							}
						});
					}
					const pass = resu[0].password;
					if (pass == password) {
						const name = resu[0].name;
						const token = jwt.sign({ id: uid, name: name }, process.env.JWT_SECRET, {
							expiresIn: process.env.JWT_EXPIRES_IN,
						});
						console.log("The Token is " + token);
						const cookieOptions = {
							expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
						};
						return res.status(200).cookie("log", token, cookieOptions).redirect("/profile");
					}
					else {
						console.log("Wrong password");
						const msg = "Wrong password";
						return res.status(400).send({
							error: {
								message: msg
							}
						});
					}
				});
			}
		}
	);
});

//login screen
app.get("/login", (req, res) => {
	res.sendFile(path.join(staticPath, "../views/login.html"));
});

//rentals screen
app.get("/rentals", (req, res) => {
	if (getUID(req, res)) {
		res.sendFile(path.join(staticPath, "../views/rentals.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//Property screen
app.get("/property", (req, res) => {
	if (getUID(req, res)) {
		res.sendFile(path.join(staticPath, "../views/property.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//profile screen
app.get("/profile", (req, res) => {
	if (getUID(req, res)) {
		res.sendFile(path.join(staticPath, "../views/profile.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//adduser screen
app.get("/adduser", (req, res) => {
	if (getUID(req, res)) {
		res.sendFile(path.join(staticPath, "../views/adduser.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//report screen
app.get("/report", (req, res) => {
	if (getUID(req, res)) {
		res.sendFile(path.join(staticPath, "../views/report.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//logout screen
app.get("/logout", (req, res) => {
	res.cookie("log", "logout", {
		expires: new Date(Date.now() + 2 * 1000),
		httpOnly: true,
	});
	res.status(200).redirect("/login");
});

//uid function
async function getUID(req, res) {
	if (req.cookies.log) {
		console.log(req.cookies.log);
		try {
			const decode = await promisify(jwt.verify)(
				req.cookies.log,
				process.env.JWT_SECRET
			);
			const uid = decode.id;
			return uid;
		} catch (error) {
			console.log(error);
			res.status(200).redirect('/login');
		}
	} else {
		res.status(200).redirect('/login');
	}
};

app.get('/getData/profile', async (req, res) => {

})