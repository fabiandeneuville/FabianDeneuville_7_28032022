/******************** EXPRESS APPLICATION CONFIGURATION ********************/

/* Importing express */
const express = require('express');

/* Importing db connection configuration  */
const mysql = require('./dbConnection').connection;

mysql.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Connected to database')
})

/* Creating the express app using the express method */
const app = express();

/* Creating a middleware using the .json method from express to get access to the request body */
app.use(express.json());

/* Specifying specific access control headers for all the response objects to allow cross-origin requests (and prevent CORS errors) */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/* Exporting the express app to be used on other files */
module.exports = app;
