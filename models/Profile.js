const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    phone: {
        type: String,
    },

    balance: {
        type: Number,
        default: 100
    },

    // hints: {
    //     type: Number,
    //     default: 5
    // },

    totalEarnings: {
        type: Number,
        default: 0
    },

    gamesPlayed: {
        type: Number,
        default: 0
    },

    rank: {
        type: String,
        default: 'Novice'
    },

    wins: {
        type: Number,
        default: 0,
    },

    losses: {
        type: Number,
        default: 0
    },

    bank: {
        type: String
    },

    accountNumber: {
        type: String
    },

    accountName: {
        type: String
    },

    profilePicture: {
        data: Buffer,
        contentType: String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);