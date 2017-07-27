'use strict';

let mongoose = require('mongoose');

exports.GenericController = class {

    constructor(entity) {
        this.Entity = mongoose.model(entity);
        this.list_all = this.list_all.bind(this);
        this.create = this.create.bind(this);
        this.read = this.read.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.search = this.search.bind(this);
    }

    list_all(req, res) {

        let page = Number(req.query.page).valueOf() || 1,
            limit = Number(req.query.result).valueOf() || 10;

        this.Entity.paginate({}, {page: page, limit: limit}, function (err, results) {
            if (err) {
                res.send(err);
            }
            res.json(results);
        });
    };

    create(req, res) {
        let new_entity = new this.Entity(req.body);
        new_entity.save(function (err, entity) {
            if (err) {
                res.send(err);
            }
            res.json(entity);
        });
    };

    read(req, res) {
        this.Entity.findById(req.params.id, function (err, entity) {
            if (err) {
                res.send(err);
            }
            res.json(entity);
        });
    };

    update(req, res) {
        this.Entity.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, entity) {
            if (err) {
                res.send(err);
            }
            res.json(entity);
        });
    };

    delete(req, res) {
        this.Entity.remove({_id: req.params.id}, function (err, entity) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Entity successfully deleted'});
        });
    };

    search(req, res) {

        let searchController = require("./searchController");
        searchController.search(req, res, this.Entity);

    };

};