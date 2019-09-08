const express = require('express');
const passport = require('passport');
const router = express.Router();

const Quiz = require('../../models/Quiz');

const validateAddQuestion = require('../../utils/validation/addQuestion');

// Add new quiz question
// @route POST /api/quizr
// @desc add question
// @access Private
router.post('/', /*passport.authenticate('jwt-admin', { session: false }),*/ (req, res) => {
    const { errors, isValid } = validateAddQuestion(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const quiz = new Quiz({
        type: req.body.type,
        question: req.body.question,
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD,
        answer: req.body.answer
        
    });

    quiz.save()
        .then(quiz => res.json(quiz))
        .catch(err => console.log(err));
});

// Gets free quiz questions
// @route GET /api/quiz/getFreeQuiz
// @desc get questions
// @access Private
router.get('/getFreeQuiz', (req, res) => {
    Quiz.aggregate([{ $sample: { size: 15 } }])
        .exec((err, result) => {
            if (err) {
                return console.log(err);
            }
            res.json(result);
        });
});

// Gets all quiz questions
// @route GET /api/quiz/all
// @desc get questions
// @access Private
router.get('/all', (passport.authenticate('jwt-admin', { session: false })), (req, res) => {
    Quiz.find()
        .then(quizzes => res.json(quizzes))
        .catch(err => console.log(err));
});

// Gets quiz questions
// @route GET /api/quiz/category/:category
// @desc get questions by category
// @access Private
router.get('/category/:quizCategory', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Quiz.find({ type: req.params.quizCategory })
        .then(quizzes => res.json(quizzes))
        .catch(err => console.log(err));
});

// Update Quiz
// @route PUT /api/quiz/updateQuestion/:id
// @desc update quiz question by Id
// @access Private
router.put('/updateQuestion/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const { errors, isValid } = validateAddQuestion(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const quiz = new Quiz({
        type: req.body.type,
        question: req.body.question,
        optionA: {
            text: req.body.optionAText,
            answer: req.body.optionAAnswer
        },
        optionB: {
            text: req.body.optionBText,
            answer: req.body.optionBAnswer
        },
        optionC: {
            text: req.body.optionCText,
            answer: req.body.optionCAnswer
        },
        optionD: {
            text: req.body.optionDText,
            answer: req.body.optionDAnswer
        }
    });

    Quiz.findOneAndDelete({ _id: req.params.id })
        .then((returnedQuiz) => {
            if (!returnedQuiz) {
                errors.noQuiz = 'No Question found';
                return res.status(404).json(errors);
            }
            quiz.save()
                .then(() => {
                    res.json({ message: 'Question updated successfully!' });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// removes all quiz questions
// @route DELETE /api/quiz/all
// @desc remove questions
// @access Private
router.delete('/all', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Quiz.remove()
        .then(info => res.json({  message: 'Successfully removed questions' }))
        .catch(err => console.log(err));
});

// removes quiz question
// @route DELETE /api/quiz/category/:category
// @desc removes quiz questions by category
// @access Private
router.delete('/category/:quizCategory', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Quiz.remove({ type: req.params.quizCategory })
        .then(() => res.json({ message: 'Successfully removed questions' }))
        .catch(err => console.log(err));
});

// removes quiz questions
// @route DELETE /api/quiz/:id
// @desc removes quiz question by id
// @access Private
router.delete('/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Quiz.findByIdAndDelete({ _id: req.params.id })
        .then(() => res.json({ message: 'Successfully removed question' }))
        .catch(err => console.log(err));
});

module.exports = router;