const db = require('./db.js');

module.exports = {
	//Gets a user from the users collection by username
	getUserByName: async (username) => {
		try {
			const result = await db.getMongo("users").findOne({
				"username": username
			});
			return result;
		} catch(err) {
		    throw new Error(err);
		}
	},
}