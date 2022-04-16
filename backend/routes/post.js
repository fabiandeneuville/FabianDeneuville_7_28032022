/******************** POST ROUTER CONFIGURATION ********************/

/* Importing express */
const express = require('express');

/* Creating router with the Router() function */
const router = express.Router();

/* Importing post controller */
const postControl = require('../controllers/post');

/* Importing the authentication middleware */
const auth = require('../middleware/auth');

/* Importing the multer configuration to handle files */
const multer = require('../middleware/multer-config')

/* Creating the post routes */
router.post('/', auth, multer, postControl.createPost);

/* Exporting router */
module.exports = router;