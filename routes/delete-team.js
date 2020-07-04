const fs = require('fs');
const express = require('express');
const router = express.Router();


// Delete Team - Handling DELETE requests
router.post('/:teamId', (req, res, next) => {

  console.log(req.params)

  const teams = JSON.parse(fs.readFileSync(`./public/data/equipos.db.json`));
  const newTeamsList = teams.filter((team) => team.id.toString() !== req.params.teamId);

  fs.writeFileSync("./public/data/equipos.db.json", JSON.stringify(newTeamsList));

  res.redirect('/teams');
});

module.exports = router;