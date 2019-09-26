const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    phone: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: new Date()
    },

    lastSeen: {
        type: Date
    }
});

module.exports = User = mongoose.model('user', UserSchema);