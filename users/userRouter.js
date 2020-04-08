const express = require('express');
const Users = require('./userDb.js');
const router = express.Router();

router.post('/', (req, res) => {
  
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
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
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId( req, res, next) {
  if (!req.params.id) {
    res.status(404).json({ message: "no id."})
  } else {
    req.user = req.body;
  }
}

function validateUser( req, res, next ) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data"})
  } else if (!res.body.name) {
    res.status(400).json({ message: "missing required name field."})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
