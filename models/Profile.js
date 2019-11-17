const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    balance: {
        type: Number,
        default: 100
    },

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
        default: 'Amateur'
    },

    rankPercentage: {
        type: Number,
        default: 0
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

    cardNumber: {
        type: Number
    },

    cardName: {
        type: String
    },

    cvv: {
        type: Number
    },

    cardExp: {
        type: String
    },

    profilePicture: {
        data: Buffer,
        contentType: String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);