const express = require('express');

const router = express.Router();
const Post = require('../models/post');
const checkAuth = require('../middleware/check_auth');

//adding post
router.post('', checkAuth, (req, res, next) => {
  //const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
      creator: req.userData.userId
    })
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a post failed!"
    });
  });
})

router.put('/:id', checkAuth, (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    console.log(result);
    if(result.nModified > 0) {
      res.status(200).json({message: "Updated successfully"});
    }
    else {
      res.status(401).json({message: "Not authorized!"});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update post!"
    });
  });
})

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found!"});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });
})

router.get('', (req, res, next) => {
  /*
  const posts = [
    {
      id: 'sdfjalskdfjadfafa',
      title: 'First Server-side Post',
      content: 'This is coming from the server'
    },
    {
      id: 'fasdfasdbfvfdgadsfa',
      title: 'Second Server-side Post',
      content: 'This is coming from the server!'
    }
  ]
  */
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  console.log(pageSize, currentPage);
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts= documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: fetchedPosts,
        maxPosts: count
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching posts failed!"
        });
      });
    })
  //console.log('First MiddleWare');
  //next();
});

router.delete('/:id', checkAuth, (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    console.log(result);
    if(result.n > 0) {
      res.status(200).json({message: "Post Deleted!"});
    }
    else {
      res.status(401).json({message: "Not authorized!"});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    });
  });
});

module.exports = router;
