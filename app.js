/*

  There are some minor modifications to the default Express setup
  Each is commented and marked with [SH] to make them easy to find

 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var proxy = require('html2canvas-proxy');
// [SH] Require Passport
var passport = require('passport');

// [SH] Bring in the data model
require('./api/models/db');
// [SH] Bring in the Passport config after model is defined
require('./api/config/passport');


// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require('./api/routes/index');

var app = express();
app.use('/', proxy());
global.__basedir = __dirname;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const corsOptions = {
    origin: 'https://mybitrade.com',
    credentials: true,

}
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb',extended: true,parameterLimit: 1000000}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(cors());

//app.use(cors(corsOptions));
app.use(express.static('__dirname'));
app.use(express.static('images/'));
app.use(express.static('html/'));
app.use(express.static('uploadedpdf/'));
app.use(express.static('mailattachments/'));
app.use(express.static('uploadedcsv/'));
// app.use(cors());
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
