const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('admin', AdminSchema);