/******************** USER ROUTER CONFIGURATION ********************/

/* Importing express */
const express = require('express');

/* Creating router with the Router() function */
const router = express.Router();

/* Importing user controller */
const userControl = require('../controllers/user');

/* Creating the user routes */
router.post('/signup', userControl.signup);
router.post('/login', userControl.login);
router.put('/:id', userControl.modifyUser)
router.get('/', userControl.getAllUsers);
router.get('/:id', userControl.getOneUser);
router.delete('/:id', userControl.deleteOneUser);

/* Exporting router */
module.exports = router;