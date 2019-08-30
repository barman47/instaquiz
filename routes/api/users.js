const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');

const validateRegisterInput = require('../../utils/validation/register');
const validateLoginInput = require('../../utils/validation/login');
const validateChangePasswordInput = require('../../utils/validation/changePassword');
const validateUpdateDataInput = require('../../utils/validation/updateData');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const router = express.Router();

// Register new user
// @route POST /api/users/register
// @desc register user
// @access Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username })
        .then(returnedUser => {
            if (returnedUser) {
                errors.username = 'Username already exists!';
                return res.status(406).json(errors);
            }
            User.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        errors.email = 'Email already exists!';
                        return res.status(406).json(errors);
                    } 

                    const userData = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    });
                
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            return console.log(err);
                        }
                
                        bcrypt.hash(userData.password, salt, (err, hash) => {
                            if (err) {
                                return console.log(err);
                            }
                            userData.password = hash;
                            userData.save()
                                .then(savedUser => {
                                    const userProfile = new Profile({
                                        user: savedUser.id
                                    });
                                    userProfile.save()
                                        .then(profile => {
                                            res.json({ message: 'Registration Successful!' });
                                        })
                                        .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                        });
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// Login user
// @route POST /api/users/login /Returmn JWT token
// @desc login user
// @access Private
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username })
        .then(user => {
            if (!user) {
                errors.username = 'User not found!';
                res.status(404).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched
                        const payload = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            email: user.email,
                            lastSeen: user.lastSeen,
                            createdAt: user.createAt
                        }; // JWT Payload

                        // Sign the token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        });
                    } else {
                        errors.password = 'Password incorrect!';
                        return res.status(401).json(errors)
                    }
                })
                .catch(err => console.log(err));
        })
        .catch(err => {});
});

// Register change password
// @route POST /api/users/changePassword
// @desc change user password
// @access Public
router.put('/changePassword', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateChangePasswordInput(req.body);
    const { currentPassword, newPassword } = req.body;

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById(req.user.id)
        .then(user => {
            if (user) {
                bcrypt.compare(currentPassword, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            bcrypt.genSalt(10, (err, salt) => {
                                if (err) {
                                    return console.log(err);
                                }
                        
                                bcrypt.hash(newPassword, salt, (err, hash) => {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    bcrypt.compare(newPassword, user.password)
                                        .then(isMatch => {
                                            if (isMatch) {
                                                console.log('match');
                                                errors.newPassword = 'New password cannot be the same with the current password';
                                                return res.status(403).json(errors);
                                            } else {
                                                console.log('no match!');
                                                user.password = hash;
                                                user.save()
                                                    .then(updatedUser => res.json({ success: 'Password changed successfully!' }))
                                                    .catch(err => console.log(err));
                                            }
                                        })
                                        .catch(err => console.log(err));
                                });
                            });
                        } else {
                            errors.password = 'Incorrect Password!';
                            return res.status(401).json(errors);
                        }
                    })
                    .catch(err => console.log(err));
            } 
        })
        .catch(err => console.log(err));
});

// Update data
// @route PUT /api/users/updateData
// @desc update user data
// @access Private
router.put('/updateData', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateUpdateDataInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    User.findOne({ _id: req.user.id })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            user.firstName = userData.firstName;
                            user.lastName = userData.lastName;
                            user.email = userData.email;
                            user.save()
                                .then(updatedUser => {
                                    res.json(updatedUser);
                                })
                                .catch(err => console.log(err));
                        } else {
                            errors.password = 'Incorrect password!';
                            res.status(401).json(errors);
                        }
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});

// Gets quiz questions
// @route GET /api/users/quiz/category/:category
// @desc get questions by category
// @access Private
router.get('/quiz/category/:quizCategory', passport.authenticate('jwt', { session: false }), (req, res) => {
    Quiz.find({ type: req.params.quizCategory })
        .then(quizzes => res.json(quizzes))
        .catch(err => console.log(err));
});

module.exports = router;