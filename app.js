const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const hbs = require('express-handlebars');


const teamsRoute = require('./routes/teams');
const newTeamRoute = require('./routes/new-team');
const teamDetailsRoute = require('./routes/team-details');
const editTeamSettingsRoute = require('./routes/edit-team-settings');
const deleteTeamRoute = require('./routes/delete-team')

const app = express();


//View engine setup
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    //helpers: hbsHelpers
  }));


app.set('view engine', 'hbs');

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


//Public static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(`${__dirname}/public/img/icon/favicon.ico`));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/teams', teamsRoute);
app.use('/teams/new-team', newTeamRoute);
app.use('/teams/team-details', teamDetailsRoute);
app.use('/teams/settings', editTeamSettingsRoute);
app.use('/teams/team-details', deleteTeamRoute);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//Captures errors happening in a hypothetical database.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error-page', {
    layout: 'main',
    error: {
      message: error.message,
      status: error.status  
    }
  })
})


module.exports = app;