const express = require('express');

const Message = require('../models/message');

const router = express.Router();

router.get('/', (req, res) => {
  Message.getAllMessages((err, messages) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t find all messages \n');
    }
    res.status(200).json(messages);
  });
});

router.post('/', (req, res) => {
  const {
    name, email, subject, message
  } = req.body;

  const newMessage = {};
  newMessage.name = name;
  newMessage.email = email;
  newMessage.subject = subject;
  newMessage.message = message;

  Message.addMessage(newMessage, (err, message) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t create the message \n');
    }
    res.status(200).json(message);
  });
});

router.put('/', (req, res) => {
  const {
    id, name, email, subject, message
  } = req.body;

  const updatedMessage = {};
  
  updatedMessage.name = name;
  updatedMessage.email = email;
  updatedMessage.subject = subject;
  updatedMessage.message = message;

  Message.updateMessage(id, updatedMessage, (err, message) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t update this Message \n');
    }
    res.status(200).json(message);
  });
});

router.delete('/:id', (req, res) => {
  Message.deleteMessage(req.params.id, (err, message) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t delete this message \n');
    }
    res.status(200).json(message);
  });
});

module.exports = router;