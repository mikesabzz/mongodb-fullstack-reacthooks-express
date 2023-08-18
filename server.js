const express = require('express');
const routes = require('./routes');
const PORT = process.env.PORT || 5000;
const db = require("./db/index");
const logger = require('morgan');

const app = express();

const bodyParser = require('body-parser');

app.use((req, res, next) => {
    // Set CORS headers to allow requests from any origin
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/api', routes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});