const request = require('supertest');
const expect = require('expect');

var app = require('../server').app;

describe('Server', () => {
    describe('# GET /', () => {
        it('should return hello world response', (done) => {
            request(app)
                .get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found.'
                    });
                })
                .end(done);
        });
    });

    describe('GET /testUsers', () => {
        it ('should return my user object', (done) => {
            request(app)
                .get('/testUsers')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toBeA('object').toInclude({
                        name: 'Dominic',
                        age: 23
                    });
                })
                .end(done);
        });
    });
});