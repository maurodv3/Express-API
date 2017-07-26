'use strict';

let mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

let ProviderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    direction: {
        type: String,
        required: true,
        trim: true,
        default: "N/A"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

ProviderSchema.index({name: "text", description: "text", direction: "text"});
ProviderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Provider', ProviderSchema);