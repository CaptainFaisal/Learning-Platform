const express = require('express');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen')
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cse470:cse470project@cluster0.7lvcosh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const EMAIL = "md.faisal@g.bracu.ac.bd";
const PASSWORD = "twgvtfkykfvoefdg";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const sendMail = async (name, email, code) => {

  const transporterConfig = {
      service: 'gmail',
      auth: {
          user: EMAIL,
          pass: PASSWORD
      }
  }

  const transporter = nodemailer.createTransport(transporterConfig);

  const MailGenerator = new Mailgen({
      theme: "default",
      product: {
          name: "Learning Platform",
          link: 'https://www.bracu.ac.bd/'
      }
  })

  const messageContent = {
      body: {
          name,
          intro: `Here is your verification code: ${code}.`
      }
  }

  const mail = MailGenerator.generate(messageContent)

  const message = {
      from: EMAIL,
      to: email,
      subject: "Your verification code for BRACU Community is " + code,
      html: mail
  }

  try {
      const result = await transporter.sendMail(message)
      return result
  } catch (err) {
      throw new Error(err.message)
  }
}
const accounts = client.db('learning-platform').collection("Accounts");
const codeTable = client.db('learning-platform').collection("Code");
const getVerificationMail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await accounts.findOne({ email });
    if (!user) {
      throw Error("No user is associeted with this email");
    }
    if (user.status=="verified") {
      throw Error("Already verified");
    }
    // 6 digit random code
    const code = Math.floor(100000 + Math.random() * 899999);
    const result = await sendMail(user.name, email, code);
    await codeTable.deleteOne({ email })
    await codeTable.insertOne({ email, code });
    res.status(200).json({...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
router.get('/', async (req, res) => {
    const results = await accounts.find().toArray();
    res.send(results);
})
router.post('/create-user', async (req, res) => {
  const {user, password, email} = req.body;
  const userExists = await accounts.findOne({ email });
  if (userExists) {
    res.send({msg:"User already exists"});
    return;
  }
  try{
    await accounts.insertOne({user, password, email, status: "not-verified", role: "user"});
    await getVerificationMail(req, res);
  }catch(err){
    console.log(err);
    res.send({msg:"Error creating user"})
  }
   
})
router.post('/verify-user', async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await accounts.findOne({ email });
    if (!user) {
      throw Error("No user is associeted with this email");
    }
    const codeData = await codeTable.findOne({ email });
    if (!codeData) {
      throw Error("No verification code found for this email");
    }
    if (codeData.code != code) {
      throw Error("Invalid code");
    }
    await accounts.updateOne({ email }, { $set: { status: "verified" } });
    await codeTable.deleteOne({ email });
    res.status(200).json({ msg: "User verified" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;