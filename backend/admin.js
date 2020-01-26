const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const screamModel = require('./screamModel.js');
const userModel = require('./userModel.js');
const config = require("../config.json");

const router = express.Router();

router.use(bodyParser.json());

//Redirects users without a session attempting to go to the admin page to the login page
router.get('/', async (req, res, next) => {
	try {
		if (!("user" in req.session)) {
			res.redirect("/login");
		} else {
			next();
		}
	} catch(err) {
		next(err);
	}
});

//Creates a session if credentials are valid and in database
router.post('/login', async (req, res, next) => {
	try {
		if (!req.body.username || !req.body.password) {
			res.status("400");
			next(new Error());
	   		return;
		}
		if (req.body.password.length !== 96) {
			res.status("400");
			next(new Error("Malformed password hash."));
			return;
	   	}
	   	const userMatch = await userModel.getUserByName(req.body.username);
	   	if (!userMatch) {
	   		res.status("400");
			next(new Error("Sorry, we don't recognize that username.")); 
			return;
	   	}
	   	if (await bcrypt.compare(req.body.password, userMatch.passhash.toString())) {
	   		req.session.user = userMatch.username;
			res.status("200").json({success: true});
		} else {
			res.status("400");
			next(new Error("Password is incorrect."));
			return;
		}
	} catch(err) {
		next(err);
	}
});

//Deletes a session
router.get('/logout', async (req, res, next) => {
	try {
		if (req.session) {
			req.session.destroy((err) => {
		  		if (err) {
		  			res.status("500");
					next(new Error());
		  		} else {
		  			res.status("200").json({success: true});
		  		}
	  		});
		} else {
			res.status("200").json({success: true});
		}
	} catch(err) {
		next(err);
	}
});

module.exports = router;