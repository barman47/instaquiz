const express = require('express');
const passport = require('passport');

const validateProfileInput = require('../../utils/validation/profile');

const router = express.Router();

// Register new user
// @route PUT /api/profiles
// @desc Create or edit user profile
// @access Private
router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {
        phone: req.body.phone,
        bank: req.body.bank,
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber
    };

    Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
        .then(profile => {
            res.json(profile);
        })
        .catch(err => console.log(err));
});

module.exports = router;