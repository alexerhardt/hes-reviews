require('./config/index.js');

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');

const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

app.use(express.static(publicPath));

app.use('/users', users);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
