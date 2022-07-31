const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.post('/notes', (req, res) => {
  let save = req.body;
  save.id = uuidv4();
  db.push(save);
  fs.writeFile(path.join(__dirname, '../db/db.json'),
  JSON.stringify(db),
  function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('please try again.')
    } else {
      res.json(save)
    };
  }
  );
});

module.exports = router;
