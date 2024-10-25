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
	} catch (err) {
		console.log(err);
	}
};

executeQuery()
	.then(() => console.log("Done with executing queries"))
	.catch((err) => console.log("Error occurred: ", err));

module.exports = {
	executeQuery,
};
