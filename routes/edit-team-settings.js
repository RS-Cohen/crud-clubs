const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//-------- Setting up Multer ---------//
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1500000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('crest-img');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Please upload a valid image!');
  }
}



// Handling GET requests to settings resource
router.get('/:teamId', (req, res, next) => {
  const teams = JSON.parse(fs.readFileSync(`./public/data/equipos.db.json`));
  const teamId = req.params.teamId;
  const teamData = teams.find((team) => team.id.toString() === teamId);

  res.render('settings', {
    layout: 'main',
    teamData,
  });
});

// Get requests to Success resource
router.get('/success-msg', (req, res) => {
  res.render('success-msg', {
    layout: 'main',
  })
});

// Edit / Update team - Handling PATCH requests
router.post('/:teamId', (req, res, next) => {

  upload(req, res, (err) => {
    
    if (err) {
      res.render('new-team', {
        layout: 'main',
        msg: err,
      });
    } else {
      const teams = JSON.parse(fs.readFileSync(`./public/data/equipos.db.json`));
      const teamId = req.params.teamId;
      const teamIndex = teams.findIndex((team) => team.id.toString() === teamId);
      const teamData = teams.find((team) => team.id.toString() === teamId);
      const lastUpdated = new Date().toISOString();

      const {
        name,
        shortName,
        tla,
        address,
        phone,
        website,
        email,
        founded,
        clubColors,
        venue,
        clubCountry,
      } = req.body;

      const teamUpdated = {
        id: teamId,
        area: {
          id: 2072,
          name: clubCountry
        },
        name,
        shortName,
        tla,
        address,
        phone,
        website,
        email,
        founded,
        clubColors,
        venue,
        lastUpdated,
      };

      if (req.file) {
        teamUpdated.crestUrl = `/uploads/${req.file.filename}`
      } else {
        teamUpdated.crestUrl = teamData.crestUrl
      }

      teams[teamIndex] = teamUpdated;
      fs.writeFileSync('./public/data/equipos.db.json', JSON.stringify(teams));
    }

    res.render('success-msg', {
      layout: 'main',
      msg: 'Your settings have been updated successfully! ⚽👍.',
      teams: JSON.parse(fs.readFileSync(`./public/data/equipos.db.json`))
    });
  })
});

module.exports = router;