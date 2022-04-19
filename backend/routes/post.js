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
router.get('/', auth, postControl.getAllPosts);
router.get('/:id', auth, postControl.getAllPostsFromOneUser);
router.delete('/:id', auth, postControl.deleteOnePost);
router.put('/:id', auth, multer, postControl.modifyPost);

/* Exporting router */ 
module.exports = router;