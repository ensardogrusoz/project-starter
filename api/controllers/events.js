const express = require('express');
const router = express.Router();
const db = require('../models');
const { Event } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id 

// There are other styles for creating these route handlers, we typically
// explore other patterns to reduce code duplication.
// TODO: Can you spot where we have some duplication below?


router.get('/', (req,res) => {
  Event.findAll({})
    .then(events => res.json(events));
});


router.post('/', (req, res) => {
  let { eventName } = req.body.eventName;
  let { eventDescription } = req.body.eventDescription;

  let { eventLocation } = req.body.eventLocation;

  Event.create({ eventName, eventDescription,  eventLocation })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  Event.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      res.json(post);
    });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  Event.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      post.content = req.body.content;
      post.save()
        .then(post => {
          res.json(post);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Event.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      post.destroy();
      res.sendStatus(204);
    });
});


module.exports = router;