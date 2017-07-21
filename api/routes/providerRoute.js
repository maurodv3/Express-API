'use strict';

var express = require('express');
var router = express.Router();
var providerController = require('../controllers/providerController');

router.get('/providers', providerController.list_all);
router.post('/providers', providerController.create);

router.get('/providers/:id', providerController.read);
router.put('/providers/:id', providerController.update);
router.delete('/providers/:id', providerController.delete);

router.get('/search/providers/:term', providerController.search);

module.exports = router;

