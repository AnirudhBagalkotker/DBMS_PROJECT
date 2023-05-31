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
app.use(express.json());

// declare static path
let staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
			// console.log(phone);
			// console.log(result);
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
				// console.log(uid);
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
						const role = resu[0].role;
						const token = jwt.sign({ id: uid, name: name, role: role }, process.env.JWT_SECRET, {
							expiresIn: process.env.JWT_EXPIRES_IN,
						});
						// console.log("The Token is " + token);
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
app.get("/property", async (req, res) => {
	const role = await getRole(req, res);
	// console.log(role);
	if (role != 3) {
		res.sendFile(path.join(staticPath, "../views/property.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//profile/home screen
app.get(["/profile", "/", "/home"], (req, res) => {
	if (getUID(req, res)) {
		res.sendFile(path.join(staticPath, "../views/profile.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//adduser screen
app.get("/adduser", async (req, res) => {
	const role = await getRole(req, res);
	// console.log(role);
	if (role == 0) {
		res.sendFile(path.join(staticPath, "../views/adduser.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//addproperty screen
app.get("/addproperty", async (req, res) => {
	if (getUID(req, res)) {
		res.sendFile(path.join(staticPath, "../views/addproperty.html"));
	}
	else {
		res.status(200).redirect("/login");
	}
});

//report screen
app.get("/report", async (req, res) => {
	const role = await getRole(req, res);
	if (role == 0 || role == 1) {
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

app.get('/getData/profile', async (req, res) => {
	const uid = await getUID(req, res);
	db.query("SELECT * FROM USER, PHONE WHERE USER.UID = PHONE.UID and USER.UID=?", [uid], (error, result) => {
		const name = result[0].name;
		const age = result[0].age;
		const address = result[0].address;
		const aadhar = result[0].aadhar;
		const phone = result[0].Phone;
		const role = result[0].role;
		db.query("SELECT * FROM ADDRESS WHERE AID=?", [address], (error, result) => {
			const add = result[0].Door + ", " + result[0].Street + ", " + result[0].city + ", " + result[0].state;
			db.query("SELECT RoleName FROM ROLE WHERE RoleId=?", [role], (error, result) => {
				const roleName = result[0].RoleName;
				return res.json({ uid, roleName, name, age, aadhar, phone, add });
			})
		})
	})
})

app.get('/getData/property', async (req, res) => {
	const uid = await getUID(req, res);
	const role = await getRole(req, res);
	if (role <= 1) {
		db.query("SELECT * FROM PROPERTY, ADDRESS WHERE PROPERTY.Address = ADDRESS.AID", (error, result) => {
			return res.json({ result });
		})
	}
	else {
		db.query("SELECT * FROM PROPERTY, ADDRESS WHERE PROPERTY.Address = ADDRESS.AID and Owner_UID=?", [uid], (error, result) => {
			return res.json({ result });
		})
	}
})

app.get('/getData/myproperty', async (req, res) => {
	const uid = await getUID(req, res);
	db.query("SELECT * FROM PROPERTY, ADDRESS WHERE PROPERTY.Address = ADDRESS.AID and Owner_UID=?", [uid], (error, result) => {
		return res.json({ result });
	})
})

app.get('/getData/rented', async (req, res) => {
	const uid = await getUID(req, res);
	db.query("SELECT * FROM RENT R, RENT_HISTORY RH, PROPERTY P, ADDRESS A WHERE R.Tenant=? and R.RID = RH.RID and R.Property = P.PID and P.Address = A.AID", [uid], (error, result) => {
		return res.json({ result });
	})
})

app.post('/getData/report', async (req, res) => {
	const pid = req.body.prop;
	console.log(pid);
	db.query("SELECT * FROM RENT R LEFT JOIN RENT_HISTORY RH ON R.RID = RH.RID WHERE Property = ?", [pid], (error, result) => {
		if (error) {
			return res.status(500).json({ error });
		}
		return res.json({ result });
	})
});


app.get('/getData/rentals', async (req, res) => {
	// const uid = await getUID(req, res);
	db.query("SELECT * FROM PROPERTY P, ADDRESS A WHERE Available = 1 and P.Address = A.AID", (error, result) => {
		return res.json({ result });
	})
})

app.post('/setData/users', async (req, res) => {
	const { usernameField: name, phoneField: ph, passwordField: pass, ageField: age, DoorField: door, StreetField: street, CityField: city, PinField: pin, StateField: state, roleField: role, aadharField: aadhar } = req.body;
	// console.log({ name, ph, pass, age, door, street, city, pin, state, role, aadhar });
	db.query("CALL add_full_user(?,?,?,?,?,?,?,?,?,?,?)",
		[name, pass, age, door, street, city, pin, state, role, aadhar, ph],
		(error, result) => {
			if (error) {
				console.log(error);
				return res.status(500).send("Internal Server Error");
			}
			// console.log(result);
			return res.status(200).redirect("/");
		})
});

app.post('/setData/property', async (req, res) => {
	const uid = await getUID(req, res);
	// console.log(uid);
	let { DoorField, StreetField, CityField, PinField, StateField, facilitiesField, rentField, stdateField, enddateField, hikeField, areaField, plinthField, ConstructionField, floorsField, typeField, bhkField } = req.body;
	const st_date = stdateField;
	const en_date = enddateField;
	db.query("CALL add_full_property(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
		[uid, 1, facilitiesField, st_date, en_date, parseInt(rentField), parseInt(hikeField), parseInt(areaField), parseInt(plinthField), ConstructionField, parseInt(floorsField), parseInt(typeField), parseInt(bhkField), DoorField, StreetField, CityField, parseInt(PinField), StateField],
		(error, result) => {
			if (error) {
				console.log(error);
				return res.status(500).send("Internal Server Error");
			}
			// console.log(result);
			return res.status(200).redirect("/");
		})
});

app.post('/setData/rentout', async (req, res) => {
	const uid = await getUID(req, res);
	let pid = req.body.prop;
	db.query("CALL add_rental(?,?,?)", [uid, pid, 15], (error, result) => {
		if (error) {
			console.log(error);
			return res.status(500).send("Internal Server Error");
		}
		// console.log(result);
		return res.status(200).redirect("/");
	})
});

// app.post('/editData/property', async (req, res) => {
// 	const uid = await getUID(req, res);
// 	let { DoorField, StreetField, CityField, PinField, StateField, facilitiesField, rentField, stdateField, enddateField, hikeField, areaField, plinthField, ConstructionField, floorsField, typeField, bhkField } = req.body;
// 	const st_date = stdateField;
// 	const en_date = enddateField;
// 	db.query("CALL update_full_property(?,?,?,?,?,?,?,?,?,?,?,?,?)",  [pid,], (error, result) => {
// 		if (error) {
// 			console.log(error);
// 			return res.status(500).send("Internal Server Error");
// 		}
// 		// console.log(result);
// 		return res.status(200).redirect("/");
// 	})
// });

// app.post('/delData/property', async (req, res) => {
// 	let pid = req.body.prop;
// 	db.query("CALL delete_full_property(?)", [pid], (error, result) => {
// 		if (error) {
// 			console.log(error);
// 			return res.status(500).send("Internal Server Error");
// 		}
// 		// console.log(result);
// 		return res.status(200).redirect("/");
// 	})
// });

//uid function
async function getUID(req, res) {
	if (req.cookies.log) {
		// console.log(req.cookies.log);
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

async function getRole(req, res) {
	if (req.cookies.log) {
		// console.log(req.cookies.log);
		try {
			const decode = await promisify(jwt.verify)(
				req.cookies.log,
				process.env.JWT_SECRET
			);
			const RoleId = decode.role;
			// console.log(RoleId);
			return RoleId;
		} catch (error) {
			console.log(error);
			res.status(200).redirect('/login');
		}
	} else {
		res.status(200).redirect('/login');
	}
}