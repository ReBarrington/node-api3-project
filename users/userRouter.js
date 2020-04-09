const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb');
const router = express.Router();

// / = /api/users

router.use('/:id', validateUserId);

router.post('/', validateUser, (req, res) => {
  // add user - done
  Users.insert(req.body)
  .then((users) => {
    res.status(201).json(users)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "Error adding user."})
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // add post
  Posts.insert(req.body)
  .then((post) => {
    res.status(201).json(post);
  })
  .catch(err => console.log(err))
});

router.get('/', (req, res) => {
  // get users - done
  Users.get(req.query)
  .then((users) => {
    res.status(200).json({ queryString: req.query, users })
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "Error retrieving users."})
  })
});

router.get('/:id', (req, res) => {
  // see user by id - done
  Users.getById(req.params.id)
  .then((user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Error retrieving user."})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Server error."})
  })
});

router.get('/:id/posts', (req, res) => {
  // see posts by user with id - done 
  Users.getById(req.params.id)
  .then((user) => {
    if (user) {
      Users.getUserPosts(user.id)
      .then((posts) => {
        res.status(200).json(posts)
      })
    } else {
      res.status(404).json({ message: "User not found."})
    }
  })
});

router.delete('/:id', (req, res) => {
  // delete user - done
  Users.getById(req.params.id)
  .then((user) => {
    if (user) {
      Users.remove(user.id)
      .then((user) => {
        res.status(202).json(`DELETING: ${user}`)
      })
    }
  })
});

router.put('/:id', (req, res) => {
  // edit user - done
  Users.getById(req.params.id)
  .then((user) => {
    if (user) {
      Users.update(user.id, req.body)
      .then((user) => {
        res.status(202).json(`UPDATING: ${user}`)
      })
    }
  })
});

//custom middleware

function validateUserId( req, res, next ){
  Users.getById(req.params.id)
  .then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id."})
    }
  })
  .catch(err => {
    res.status(500).json({ message: "error"})
  })
}

function validateUser( req, res, next ) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data"})
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field."})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data"})
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field."})
  } else {
    next();
  }
}

module.exports = router;
