const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 4
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        apartment: {
            type: String,
            required: true,
            min: 2
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model('Admin', AdminSchema);
