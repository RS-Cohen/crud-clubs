const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


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

// Get requests to Success resource
router.get('/success-msg', (req, res) => {
  res.render('success-msg', {
    layout: 'main',
  })
})

// Handling GET requests to /new-team
router.get('/', (req, res) => {
  res.render('new-team', {
    layout: 'main',
    active: { addTeam: true }
  });
});


// Handling POST requests to /new-team - Adding Teams
router.post('/', (req, res) => {  
  
  upload(req, res, (err) => {
    console.log(req.file);
    if (err) {
      res.render('new-team', {
        layout: 'main',
        msg: err,
      });
    } else if (req.file == undefined) {
      res.render('new-team', {
        layout: 'main',
        msg: 'Error: No File Selected!',
      });
    } else {
      const teams = JSON.parse(fs.readFileSync(`./public/data/equipos.db.json`));
      const teamIds = teams
        .map((team) => team.id)
        .sort((a, b) => (a > b ? 1 : -1));
      const newTeamId = teamIds[teamIds.length - 1] + 1;
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


      const teamToAdd = {
        id: newTeamId,
        area: {
          id: 2072,
          name: clubCountry,
        },
        name,
        shortName,
        tla,
        crestUrl: `/uploads/${req.file.filename}`,
        address,
        phone,
        website,
        email,
        founded,
        clubColors,
        venue,
        clubCountry,
        lastUpdated,
      };

      teams.push(teamToAdd);
      fs.writeFileSync("./public/data/equipos.db.json", JSON.stringify(teams));
      fs.writeFileSync(`./public/data/equipos/${tla}.json`, JSON.stringify(teamToAdd));

      res.render('success-msg', {
        layout: 'main',
        msg: 'Congrats! you\'ve just added a new team. ⚽',
        teams: JSON.parse(fs.readFileSync('./public/data/equipos.db.json'))
      });
    }
  });
});

module.exports = router;