const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const accountRouter = require('./routes/accounts');
app.use('/accounts', accountRouter);
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
