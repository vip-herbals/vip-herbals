const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const flatDataSchema = new Schema({
    flat_id: {
        type: String,
        required: true
    },
    "apartment": {
        type: String,
        required: true
    },
    "type": {
        type: String,
        required: true
    },
    "block": {
        type: String,
        required: true
    },
    "flatNumber": {
        type: Number,
        required: true
    },
    "residents": {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model('flatData', flatDataSchema)