const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/:teamId', (req, res) => {
  const teams = JSON.parse(fs.readFileSync(`./public/data/equipos.db.json`));
  const teamData = teams.find((team) => {
    return team.id == req.params.teamId;
  });

  res.render('team-details', {
    layout: 'main',
    teamData,
    googleMapsKey: process.env.MAPS_EMBED_API
  });
});

module.exports = router;