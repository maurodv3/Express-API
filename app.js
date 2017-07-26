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

// database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.99.100:32768/bbb', { useMongoClient: true });

// init app
let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// authorization service
authProxy.registerServer();
app.use(authProxy.authRequest);

// init routes
let providerRoutes = require('./api/routes/providerRoute');
app.use('/v1', providerRoutes);

// error handling
app.use(errorHandler.handleErrors);

module.exports = app;
