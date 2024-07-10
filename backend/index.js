const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://cse470:cse470project@cluster0.7lvcosh.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to the server");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);