const request = require('supertest');
const expect = require('expect');

const { app } = require('../server');

describe('Server', () => {
    describe('#GET /', () => {
        it ('should return hello world response', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toBeA('object').toEqual({
                        message: 'Hello World!'
                    });
                })
                .end(done);
        })
    });
});