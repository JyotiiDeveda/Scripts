const { MongoClient } = require("mongodb");

// Create Instance of MongoClient for mongodb
const client = new MongoClient(
	"mongodb://mongo:Abcd_1234@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1/pillpal",
);

const executeQuery = async () => {
	try {
		await client.connect();
		console.log("Connected successfully");
		const db = client.db("pillpal");
		const collection = db.collection("accounts");

		// get the distinct roles
		const data = await getDistinctRoles(collection);
		console.log("Roles: ", data);
	} catch (err) {
		console.log(err);
	}
};

executeQuery()
	.then(() => console.log("Done with executing queries"))
	.catch((err) => console.log("Error occurred: ", err));

// get distinct roles
const getDistinctRoles = async (collection) => {
	try {
		const result = await collection.aggregate([
			{
				$project: {
					arr: {
						$objectToArray: "$roles",
					},
				},
			},
			{
				$unwind: "$arr",
			},
			{
				$group: {
					_id: "$arr.k",
					count: {
						$count: {},
					},
				},
			},
		]);

		const roles = [];
		for await (const doc of result) {
			roles.push(doc._id);
			// console.x`log(doc);
		}
		console.log("Roles: ", roles);

		return roles;
	} catch (err) {
		console.log("Error in getting roles: ", err);
	}
};

module.exports = {
	executeQuery,
};
