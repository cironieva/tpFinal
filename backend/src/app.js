// REQUIREMENTS

// express
const express = require('express');
const app = express();

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// morgan
const morgan = require('morgan');
app.use(morgan("dev"))

// SERVER INIT
const PORT = 3000;
app.listen(PORT, console.log('Server on port:', PORT));

// cors
const cors = require('cors');
app.use(cors());

// ROUTING

// Products
app.use(require('./routes/products'));

// Users
app.use(require('./routes/users'));
