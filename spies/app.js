const db = require('./db');

module.exports.handleSignup = (email, password) => {
    // Check if email already exists
    db.saveUser({ email, password });
    // Send the welcome email
};