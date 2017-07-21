'use strict';

var mongoose = require('mongoose'),
    Provider = mongoose.model('Provider');

exports.list_all = function(req, res) {

    let page = Number(req.query.page).valueOf() || 1,
        limit = Number(req.query.result).valueOf() || 10;

    Provider.paginate({}, { page: page, limit: limit }, function(err, results) {
        if (err) {
            res.send(err);
        }
        res.json(results);
    });
};

exports.create = function(req, res) {
    var new_provider = new Provider(req.body);
    new_provider.save(function(err, provider) {
        if (err) {
            res.send(err);
        }
        res.json(provider);
    });
};

exports.read = function(req, res) {
    Provider.findById(req.params.id, function(err, provider) {
        if (err) {
            res.send(err);
        }
        res.json(provider);
    });
};

exports.update = function(req, res) {
    Provider.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, provider) {
        if (err) {
            res.send(err);
        }
        res.json(provider);
    });
};

exports.delete = function(req, res) {
    Provider.remove({_id: req.params.id}, function(err, provider) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Provider successfully deleted' });
    });
};

exports.search = function(req, res) {

    var searchController = require("./searchController");

    searchController.search(req, res, Provider);

};

