const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const { database_URI } = require('./config/keys');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(database_URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', users);
app.use('/api/profile', profile);

app.get('/', (req, res) => {
    res.send('Homepage');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));