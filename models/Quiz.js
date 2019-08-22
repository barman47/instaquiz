const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    type: {
        type: String,
        required: true
    },

    question: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    optionA: {
        type: Object,
        text: {
            type: String,
            required: true
        },
        answer: {
            type: Boolean,
            required: true
        }
    },
    optionB: {
        type: Object,
        text: {
            type: String,
            required: true
        },
        answer: {
            type: Boolean,
            required: true
        }
    },
    optionC: {
        type: Object,
        text: {
            type: String,
            required: true
        },
        answer: {
            type: Boolean,
            required: true
        }
    },
    optionD: {
        type: Object,
        text: {
            type: String,
            required: true
        },
        answer: {
            type: Boolean,
            required: true
        }
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('quiz', QuizSchema);