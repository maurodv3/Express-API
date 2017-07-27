'use strict';

let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

let FruitSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    family: {
        type: String,
        required: true,
        trim: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

FruitSchema.index({name: "text", family: "text"});
FruitSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Fruit', FruitSchema);