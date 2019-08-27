if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys-prod');
} else if (process.env.NODE_ENV === 'test') {
    module.exports = require('./keys-test');
} else {
    module.exports = require('./keys-dev');
}