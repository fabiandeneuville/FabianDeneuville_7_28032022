/******************** EXPRESS APPLICATION CONFIGURATION ********************/

/* Importing express */
const express = require('express');

/* Importing helmet */
const helmet = require('helmet');

/* Importing node path package */
const path = require('path');

/* Importing environment variables */
require('dotenv').config();
const dbName = process.env.dbName;

/* Importing db connection configuration  */
const mysql = require('./dbConnection').connection;

/* Logging connection info */
mysql.connect(function(err){
    if(err){
        throw err;
    }
    console.log(`Connected successfully to ${dbName} database`)
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

/* Setting helmet with crossOriginResourcePolicy*/
app.use(helmet({ 
    crossOriginResourcePolicy: { 
        policy: "same-site" 
    } 
}));

/* Importing user router */
const userRoutes = require('./routes/user')
app.use('/api/user', userRoutes);

/* Importing post router */
const postRoutes = require('./routes/post')
app.use('/api/post', postRoutes);

/* Creating a middleware to handle requests that add images to the images folder */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* Exporting the express app to be used on other files */
module.exports = app;

