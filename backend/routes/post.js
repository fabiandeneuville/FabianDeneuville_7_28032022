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
router.get('/:id', auth, postControl.getOnePost);
router.get('/user/:id', auth, postControl.getAllPostsFromOneUser);
router.delete('/:id', auth, postControl.deleteOnePost);
router.put('/:id', auth, multer, postControl.modifyPost);
router.post('/:id/comment', auth, postControl.createComment);
router.get('/:id/comment', auth, postControl.getAllCommentsFromOnePost);
router.get('/:id/comment/:commentid', auth, postControl.getOneCommentFromOnePost);
router.delete('/:id/comment/:commentid', auth, postControl.deleteOneComment);
router.put('/:id/comment/:commentid', auth, postControl.modifyOneComment);
router.post('/:id/like', auth, postControl.likePost);
router.post('/comment/:id/like', auth, postControl.likeComment);
router.get('/:id/like', auth, postControl.checkPostLike);
router.get('/comment/:id/like', auth, postControl.checkCommentLike);

/* Exporting router */ 
module.exports = router;