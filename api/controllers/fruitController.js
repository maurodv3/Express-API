'use strict';

let {GenericController} = require('./genericController');
let controller = new GenericController('Fruit');

module.exports = {
    list_all: controller.list_all,
    create: controller.create,
    read: controller.read,
    update: controller.update,
    delete: controller.delete,
    search: controller.search
};