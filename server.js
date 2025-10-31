const express = require('express');
const app = express();
const mongodb = require('./data/database');

const port = process.env.Port || 3000;

app.use(express.json());

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to MongoDB and server is running on http://localhost:${port}`);
    });
  }
});