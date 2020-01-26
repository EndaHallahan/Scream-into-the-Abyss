const MongoClient = require('mongodb').MongoClient;
const config = require("../config.json");

let mongoPool;
let mongoClient;
let mn;

module.exports = {
	//Connect to the MongoDB database and create a connection pool
	connectMongo: (callback) => {
		MongoClient.connect(config.mongo.URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}, (err, db) => {
			if (err) {
				callback(err);
			} else {
				mn = db;
				mongoPool = db.db(config.mongo.name);
				callback(false, mn);
			}
		});	
	},

	//Retrieve a connection to the MongoDB database
	getMongo: (optCollection) => {
		if (optCollection) {
			return mongoPool.collection(optCollection);
		} else {
			return mongoPool;
		}	
	},

	//Close database connections
	stop: (done) => {
		try {
			mn.close();
			done(0);
		} catch {
			done(1)
		}
	},
}