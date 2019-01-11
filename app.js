// importing modules
const express = require('express');
const exphbs = require('express-handlebars');
const forceSSL = require('express-force-ssl');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const auth = require('cirrus-ping-auth-module');

// Importing the express module under the `app` variable
const app = express();
auth.authenticate(app);
auth.ignore(['/crawler']);
/* If the user is local development import the .env file, else do not load the
.env file. Also if production is set start newrelic for monitoring*/
if (app.get('env') === 'development') {
  /* eslint-disable global-require */
  require('dotenv').config();
} else if (app.get('env') === 'production') {
  // Import the NewRelic Module.
  require('newrelic');
  // Force https protocol for any connection
  app.use(forceSSL);
  /* Ensure that the XFPHeader is trusted, otherwise can cause redirect loop */
  app.set('forceSSLOptions', {
    trustXFPHeader: true,
    sslRequireMessage: 'SSL Required.',
  });
} else {
  console.log('Please set your NODE_ENV to either `development` or `production`');
}

// Importing the favicon, remove if you do not have one.
app.use(favicon(`${__dirname}/lib/public/img/favicon.ico`));

// Added further layer of security
app.use(helmet());

/*
  Once a brwoser receives the HSTS header (Strict Transport Security Header)
  that browser will prevent any communications from being sent over HTTP and will
  instead send all communications over HTTPS for a specificied amount of time.

  The 'maxAge' parameter specified how many seconds after the first comm to use
  HTTPS in seconds, therefore 5184000s represents 60 days.
*/
app.use(helmet.hsts({
  maxAge: 5184000,
}));

// Importing all routes to the server
const authenticatedRoutes = require('./lib/routes/authenticated-routes');

// Configure the express app
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// compress all routes
app.use(compression());

// view engine setup and public static directory
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'lib/public')));

// Load authenticated routes
app.use('/', authenticatedRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// development error handler will print stck trace
// To run in development mode set config var NODE_ENV to 'development'
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler. No stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
