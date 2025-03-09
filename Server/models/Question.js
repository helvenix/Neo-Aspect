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
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    author: { type: String, required: true },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium',
    },
    answers: {type: [AnswerSchema], default: []},
});

module.exports = mongoose.model('Question', QuestionSchema);
