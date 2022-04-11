/******************** USER ROUTER CONFIGURATION ********************/

/* Importing express */
const express = require('express');

/* Creating router with the Router() function */
const router = express.Router();

/* Importing user controller */
const userControl = require('../controllers/user');

/* Creating the signup and login routes */
router.post('/signup', userControl.signup);

/* Exporting router */
module.exports = router;