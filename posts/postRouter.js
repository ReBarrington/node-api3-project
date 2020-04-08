const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

// GET /api/posts... Returns an array of all the post objects contained in the database:
router.get('/', (req, res) => {
  Posts.get(req.query)
  .then((posts) => {
      res.status(200).json({ queryString: req.query, posts });
  })
  .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving posts."})
  })
})


// GET /api/posts/:id... Returns the post object with the specified id:
router.get('/:id', (req, res) => {
  Posts.getById(req.params.id)
  .then((post) => {
      if (post) {
          res.status(200).json(post);
      } else {
          res.status(404).json({ message: "Post not found."})
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving the post."})
  })
})

// DELETE /api/posts/:id... Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Posts.getById(id)
  .then((post) => {
      // post is either post with matching id or empty array...
      if (post.length) {
          try {
              Posts.remove(id)
              .then(numRemaining => {
                  res.status(200).json(post)
              })
          // change database to no longer include deleted post.
          }
          catch(err) {
              res.status(500).json({ errorMessage: "The post could not be removed."})
          }
      } else {
          res.status(404).json({ message: "Post not found."})
      }
  })
  .catch(err => {
      res.status(500).json({ message: "Sorry, something went wrong."})
  })
})

// PUT /api/posts/:id.... Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {
  let id = req.params.id;
  let changes = req.body;
  // make sure not missing title or contents
  if (!req.body.title || !req.body.contents) {
      res.status(400).json({ message: "Missing title and/or contents."})
  } else {
      Posts.getById(id)
      .then((post) => {
          // post is either post with matching id or empty array...
          if (post.length) {
              try {
                  // if post is valid: 
                  Posts.update(id, changes)
                  .then(count => {
                      if (count > 0) {
                          // updated correctly:
                          res.status(200).json(changes)
                      }
                  })
              }
              catch(err) {
                  res.status(500).json({ errorMessage: "The post could not be removed."})
              }
          } else {
              res.status(404).json({ message: "Post not found."})
          }
      })
      .catch(err => {
          res.status(500).json({ message: "Sorry, something went wrong."})
      })
  }
})

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
