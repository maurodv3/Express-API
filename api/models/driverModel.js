'use strict';

let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

let DriverSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    favoriteFruit_id: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

DriverSchema.index({name: "text"});
DriverSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Driver', DriverSchema);