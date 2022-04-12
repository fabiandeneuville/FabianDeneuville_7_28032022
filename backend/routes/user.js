/******************** USER ROUTER CONFIGURATION ********************/

/* Importing express */
const express = require('express');

/* Creating router with the Router() function */
const router = express.Router();

/* Importing user controller */
const userControl = require('../controllers/user');

/* Importing the authentication middleware */
const auth = require('../middleware/auth');

/* Creating the user routes */
router.post('/signup', userControl.signup);
router.post('/login', userControl.login);
router.put('/:id', auth, userControl.modifyUser)
router.get('/', auth, userControl.getAllUsers);
router.get('/:id', auth, userControl.getOneUser);
router.delete('/:id', auth, userControl.deleteOneUser);

/* Exporting router */
module.exports = router;