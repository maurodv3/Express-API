var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

// models
var Provider = require('./api/models/providerModel');

// database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.99.100:32770/bbb', { useMongoClient: true });

// routes
var providerRoutes = require('./api/routes/providerRoute');

// init app
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// init routes
app.use('/v1', providerRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({url: req.originalUrl + ' not found'})
});

module.exports = app;
