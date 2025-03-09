const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema(
    {
        answer: { type: String, required: true },
        answerer: { type: String, required: true },
    },
    { _id: false }
);

const QuestionSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    author: { type: String, required: true },
    diff: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium',
    },
    type: {
        type: String,
        enum: ['true-false', 'form', 'multiple-choices']
    },
    choices: { type: [String], default: [] },
    answer: { type: String, required: true },
    attempts: {type: [AnswerSchema], default: []},
});

module.exports = mongoose.model('Question', QuestionSchema);
