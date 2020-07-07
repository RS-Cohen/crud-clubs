const fs = require('fs');
const express = require('express');
const teamsController = require('../controllers/teamsController');
const successController = require('../controllers/successController');
const router = express.Router();


// Handling GET requests to /teams
router.get('/', teamsController.getTeams);

// Handling GET requests to /new-team
router.get('/new-team', teamsController.getNewTeam);

// Handling POST requests to /new-team - Adding Teams
router.post('/new-team', teamsController.addNewTeam);

// Handling GET requests to a specific team - Team details
router.get('/team-details/:teamId', teamsController.getTeamDetails);

//  Delete Team - Handling DELETE requests
router.post('/team-details/:teamId', teamsController.deleteTeam);

//Handling GET requests to edit a specific team 
router.get('/settings/:teamId', teamsController.getTeamSettings);

// Handling PATCH requests to Edit / Update a Team
router.post('/settings/:teamId', teamsController.editTeamSettings);

// Route to success page
router.use('/success-msg', successController.getSuccessMsg);





module.exports = router;