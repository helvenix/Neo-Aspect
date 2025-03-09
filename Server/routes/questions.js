const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err){
        res.status(500).json({error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const qid = parseInt(req.params.id, 10);
        const question = await Question.findOne({ id: qid });
        if(!question) return res.status(404).json({message: 'Question not found'});
        res.json(question);
    } catch (err){
        res.status(500).json({error: err.message});
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const questions = await Question.find({}, {id: 1, _id:0}).sort({id:1})

        let newId = 1;
        for(const question of questions){
            if (question.id === newId){
                newId++;
            }else if(question.id > newId){
                break;
            }
        }
        const newQuestion = new Question({
            id: newId,
            ...req.body
        });
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

// PUT/UPDATE
router.put('/:id', async (req, res) => {
    try {
        const qid = parseInt(req.params.id, 10);
        const updatedQuestion = await Question.findOneAndUpdate(
            { id: qid },
            req.body,
            { new: true }
        );
        if (!updatedQuestion) return res.status(404).json({message: 'Question not found'});
        res.json(updatedQuestion);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const qid = parseInt(req.params.id, 10);
        const deletedQuestion = await Question.findOneAndDelete({ id: qid });
        if(!deletedQuestion) return res.status(404).json({message: 'Question not found'});
        res.json({message: 'Question deleted'});
    } catch (err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;