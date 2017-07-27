let express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    authProxy = require('./aaa/authProxy'),
    errorHandler = require('./error/errorHandler');

// models
let Provider = require('./api/models/providerModel');
let Fruit = require('./api/models/fruitModel');
let Driver = require('./api/models/driverModel');

// database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.99.100:32769/bbb', { useMongoClient: true });

// init routes
let providerRoutes = require('./api/routes/providerRoute'),
    fruitRoutes = require('./api/routes/fruitRoute'),
    driverRoutes = require('./api/routes/driverRoute');

// init app
let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// authorization service
authProxy.registerServer();
app.use(authProxy.authRequest);

app.use('/v1', providerRoutes);
app.use('/v1', fruitRoutes);
app.use('/v1', driverRoutes);

// error handling
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler.handleErrors);

module.exports = app;
