const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const PostsController = require("../controllers/posts")

//adding post
router.post('', checkAuth, PostsController.addingPost)

router.put('/:id', checkAuth, PostsController.updatePost)

router.get('/:id', PostsController.getAPost)

router.get('', PostsController.getAllPosts);

router.delete('/:id', checkAuth, PostsController.deletePost);

module.exports = router;
