const db = require('./db.js');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
	//Gets a random scream from collection
	getRandScream: async () => {
		try {
			const result = await db.getMongo("screams").aggregate([{ $sample: { size: 1 } }]).toArray();
			if (result[0] != undefined) {
				return result[0];
			} else {
				return {message: "The Abyss is silent."}
			}	
		} catch(err) {
		    throw new Error(err);
		}
	},

	//Gets all screams from collection
	getAllScreams: async () => {
		try {
			const result = await db.getMongo("screams").find().toArray();
			return result;
		} catch(err) {
		    throw new Error(err);
		}
	},

	//Counts screams in collection
	countScreams: async () => {
		try {
			const result = await db.getMongo("screams").countDocuments();
			return result;
		} catch(err) {
		    throw new Error(err);
		}
	},

	//Inserts scream into collection
	insertScream: async (message) => {
		try {
			const result = await db.getMongo("screams").insertOne({
				message: message, 
				date: Date.now()
			});
			return result;
		} catch(err) {
		    throw new Error(err);
		}
	},

	//Deletes a set of screams from collection
	deleteScreams: async (idArray) => {
		let objArray = [];
		idArray.forEach(stringId => {
			objArray.push(new ObjectID(stringId))
		});
		try {
			const result = await db.getMongo("screams").deleteMany({
				_id: { $in: objArray}
			});
			return result;
		} catch(err) {
		    throw new Error(err);
		}
	},
}