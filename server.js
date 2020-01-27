const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

const db = require('./backend/db.js');
const config = require("./config.json");

const api = require('./backend/api');
const admin = require('./backend/admin');

//Server vars
const port = (config.port || 5000);
const env = (config.env || "development");
const sessionSecret = config.session_secret;
let sessionStore;
let server;
let errOutput = true;

const app = express();

//Database connections
db.connectMongo(async (err, client) => {
  	if (err) {
    	console.error("Unable to connect to MongoDB database.");
    	console.error(err);
    	process.exit(1);
  	} else {
      	console.log("Successfully connected to MongoDB database!");
      	bootTasks();
  	}
});

//Sessions
try {
	sessionStore = new MongoStore({
		url: config.mongo.URI,
		dbName: "abyss"
	});
	app.use(session({
		secret: config.sessionSecret,
		resave: false,
		rolling: true,
		proxy: true,
			saveUninitialized: false,
		store: sessionStore,
		cookie: {
			maxAge: 31536000000,
			secure: (env === "production")
		}
	}));
} catch(err) {
	console.error("There was an issue setting up sessions:");
	console.error(err);
	db.stop(function(err) {
		console.log("Closed database connections.")
		process.exit(err ? 1 : 0);
	});
}

app.use(cookieParser(config.sessionSecret, {}));

app.use(bodyParser.json());

//The Clacks
app.use(function (req, res, next) {
  res.set('X-Clacks-Overhead', 'GNU Terry Pratchet');
  next();
});

//Routes
app.use('/api', api);
app.use('/admin', admin);

//Serve React
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//Error handling
app.use((err, req, res, next) => {
	if (errOutput) {console.error(res.statusCode + ": " + err.message)}
	let errmsg = "";
	switch (parseInt(res.statusCode)) {
		case 400: errmsg = err.message || "One or more required fields were missing or malformed."; break;
		case 403: errmsg = err.message || "You aren't allowed to do that!"; break;
		case 404: errmsg = err.message || "That resource could not be located."; break;
		case 500: errmsg = err.message || "Something went wrong on our end. Sorry! Try again later."; break;
		case 200: res.status(500); errmsg = "Something went really wrong on our end. Sorry! Try again later."; break;
		default: errmsg = "Something has gone horribly, horribly wrong (but it's probably not your fault). Sorry! Try again later."; break;
	}
	res.format({
		json: () => {res.json({success: false, msg: errmsg});},
		text: () => {res.send(errmsg);}
	});	
});

//Boot tasks
async function bootTasks() {
	try {
		//Initialize Mongodb database
		if (config.scream_ttl !== "null") {
			await db.getMongo("screams").createIndex({"date": 1}, {
				expireAfterSeconds: parseInt(config.scream_ttl)
			});
		}
		//All tasks complete.
		console.log("Boot tasks completed successfully.");
		server = app.listen(port);
		console.log('App is listening on port ' + port);
	} catch (err) {
		console.error("Boot failed!");
		console.error(err);
		db.stop(function(err) {
	    	console.log("Closed database connections.")
	    	process.exit(err ? 1 : 0);
		});
	}	
}

//Server shutdown
function shutdown() {
	try {
		//Force shutdown after ten seconds
	   	setTimeout(function() {
	       	console.log("Shutdown timed out. Forcefully ending process...");
	       	process.exit(1);
	  	}, 10000);
	  	//Clean shutdown
		server.close(function() { 
	  		console.log("Closed server.");
		    db.stop(function(err) {
		    	console.log("Closed database connections.")
		    	console.log("See you later, space cowboy.")
		    	process.exit(err ? 1 : 0);
			});
		});
	} catch(err) {
		console.error(err);
		console.log("Shutdown encountered an error. Forcefully ending process...");
		process.exit(1);
	}
}

process.on('SIGINT', function() {
	console.log("(SIGINT) Shutting down...");
	shutdown();
});

process.on('SIGTERM', function() {
	console.log("(SIGTERM) Shutting down...");
	shutdown();
});