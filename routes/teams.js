const fs = require('fs');
const express = require('express');
const router = express.Router();


// Handling GET requests to /teams
router.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    teams: JSON.parse(fs.readFileSync('./public/data/equipos.db.json')),
    helpers: {
      plusOne: (val, opts) => {
        return parseInt(val) + 1;
      },
      getLength: (obj) => {
        return obj.length;
      }
    },
    active: { teams: true }
  });
});


module.exports = router;
