const express = require("express");
const bodyParser = require("body-parser");
const screamModel = require('./screamModel.js');

const router = express.Router();

router.use(bodyParser.json());

//Gets a random scream
router.get('/scream', async (req, res, next) => {
	try {
		let result = await screamModel.getRandScream();
		res.status("200").json({success: true, result: result.message});
	} catch(err) {
		next(err);
	}
});

//Posts a scream
router.post('/scream', async (req, res, next) => {
    try {   	
    	if (!req.body.scream) {
    		res.status("400");
			next(new Error());
			return;
    	} 
    	let inScream = req.body.scream.toString();
    	if (inScream.length > 500) {
    		res.status("400");
			next(new Error());
    	} else {
    		await screamModel.insertScream(inScream);
			res.status("200").json({success: true});
    	}	
	} catch(err) {
		next(err);
	}
});

//Gets the number of screams in the scream collection
router.get('/screamcount', async (req, res, next) => {
	try {
		let result = await screamModel.countScreams();
		res.status("200").json({success: true, result: result});
	} catch(err) {
		next(err);
	}
});

//Gets all screams in the screams collection (requires session)
router.get('/screams', async (req, res, next) => {
	try {
		/*if (!("user" in req.session)) {
			res.status("403");
			next(new Error());
	   		return;
		}*/
		let result = await screamModel.getAllScreams();
		res.status("200").json({success: true, result: result});
	} catch(err) {
		next(err);
	}
});

//Deletes a set of screams from the screams collection (requires session)
router.delete('/screams', async (req, res, next) => {
	try {
		/*if (!("user" in req.session)) {
			res.status("403");
			next(new Error());
	   		return;
		}*/
		if (!req.body.screamIds || typeof req.body.screamIds !== "object") {
			res.status("400");
			next(new Error());
	   		return;
		}
		let result = await screamModel.deleteScreams(req.body.screamIds);
		res.status("200").json({success: true});
	} catch(err) {
		next(err);
	}
});

module.exports = router;