const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cse470:cse470project@cluster0.7lvcosh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const db = client.db('learning-platform');
router.get('/', async (req, res) => {
    const accounts = await db.collection('Accounts');
    const results = await accounts.find().toArray();
    res.send(results);
})

module.exports = router;