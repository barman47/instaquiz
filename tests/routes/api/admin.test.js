/*
const request = require('supertest');
const expect = require('expect');

const { app } = require('../../../server');

describe('#POST /api/admin/register', () => {
    // it ('it should register an admin', (done) => {
        // const admin = {
        //     username: 'barman',
        //     password: '12345678',
        //     confirmPassword: '12345678'
        // };
    //     request(app)
    //         .post('/api/admin/register')
    //         .send(admin)
    //         .expect(200)
    //         .expect((res) => {
    //             expect(res.body).toBeA('object').toInclude({
    //                 username: admin.username
    //             });
    //         })
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             done();
    //         });
    // });

    it ('should not register admin with invalid data', (done) => {
        request(app)
            .post('/api/admin/register')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body).toBeA('object');
            })
            .end(done);
    });

    it ('should not register admin if admin exists', (done) => {
        request(app)
            .post('/api/admin/register')
            .send({
                username: 'barman',
                password: '12345678',
                confirmPassword: '12345678'
            })
            .expect(501)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    username: 'Admin already exists!'
                });
            })
            .end(done);
    });
});

describe('#POST /api/admin/login', () => {
    it ('should login admin', (done) => {
        request(app)
            .post('/api/admin/login')
            .send({
                username: 'barman',
                password: '12345678'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    success: true
                });
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it ('should not login admin with invalid data', (done) => {
        request(app)
            .post('/api/admin/login')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body).toBeA('object');
            })
            .end(done);
    });

    it ('should not login admin if admin is not found', (done) => {
        request(app)
            .post('/api/admin/login')
            .send({
                username: 'landlord',
                password: '12345678'
            })
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    username: 'Admin not found!'
                });
            })
            .end(done);
    });

    it ('should not login admin if password is incorrect', (done) => {
        request(app)
            .post('/api/admin/login')
            .send({
                username: 'barman',
                password: 'landlord'
            })
            .expect(401)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    password: 'Password incorrect!'
                });
            })
            .end(done);
    });
});

describe('#PUT /api/admin/changePassword', () => {
    // it ('should change admin password', (done) => {
    //     request(app)
    //         .put('/api/admin/changePassword')
    //         .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjUxMDk1YjgzYjgzMDIzNGE5MzAyMiIsInVzZXJuYW1lIjoiYmFybWFuIiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0yN1QxMToxNDoyOS4xMTBaIiwiaWF0IjoxNTY2OTE0NTkwLCJleHAiOjE1NjY5MTgxOTB9.C5UaNcFUNRZFD9_zoohPlZOT1yDkY-GNl8scYnxVZWY')
    //         .send({
    //             currentPassword: '12345678',
    //             newPassword: 'yahooyahoo',
    //             confirmPassword: 'yahooyahoo'
    //         })
    //         .expect(200)
    //         .expect((res) => {
    //             expect(res.body).toBeA('object').toInclude({ message: 'Password changed successfully!' });
    //         })
    //         .end(done);
    // });
    
    it ('should not change admin password if password is not correct', (done) => {
        request(app)
            .put('/api/admin/changePassword')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjUzOTY4MjUwYWY3NGY1MGE3Mjg3OSIsInVzZXJuYW1lIjoiYmFybWFuIiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0yN1QxNDowODo0MC4wODdaIiwiaWF0IjoxNTY2OTE1MjU1LCJleHAiOjE1NjY5MTg4NTV9.aZz8i5VPqz89GZXO2f6wycWwFgpCPeX4E_HMz8vd30Q')
            .send({
                currentPassword: '1234567',
                newPassword: '87654321',
                confirmPassword: '87654321'
            })
            .expect(401)
            .expect((res) => {
                expect(res.body).toBeA('object');
            })
            .end(done);
    });

    it ('should not change admin password if data is invalid', (done) => {
        request(app)
            .put('/api/admin/changePassword')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjUzOTY4MjUwYWY3NGY1MGE3Mjg3OSIsInVzZXJuYW1lIjoiYmFybWFuIiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0yN1QxNDowODo0MC4wODdaIiwiaWF0IjoxNTY2OTE1MjU1LCJleHAiOjE1NjY5MTg4NTV9.aZz8i5VPqz89GZXO2f6wycWwFgpCPeX4E_HMz8vd30Q')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body).toBeA('object');
            })
            .end(done);
    });

    // it ('should not change admin password if admin is not found', (done) => {
    //     request(app)
    //         .put('/api/admin/changePassword')
    //         .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjUzOTY4MjUwYWY3NGY1MGE3Mjg3OSIsInVzZXJuYW1lIjoiYmFybWFuIiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0yN1QxNDowODo0MC4wODdaIiwiaWF0IjoxNTY2OTE1MjU1LCJleHAiOjE1NjY5MTg4NTV9.aZz8i5VPqz89GZXO2f6wycWwFgpCPeX4E_HMz8vd30Q')
    //         .send({
    //             currentPassword: '12345678',
    //             newPassword: '87654321',
    //             confirmPassword: '87654321'
    //         })
    //         .expect(404)
    //         .expect((res) => {
    //             expect(res.body).toBeA('object').toInclude({
    //                 username: 'Admin not found!'
    //             });
    //         })
    //         .end(done);
    // });

    it ('should not change password if current and new are the same', (done) => {
        request(app)
            .put('/api/admin/password')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjUzYmYwNDcyYmM4NTViYzZiMzM4ZSIsInVzZXJuYW1lIjoiYmFybWFuIiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0yN1QxNDoxOToyNy44MjRaIiwiaWF0IjoxNTY2OTE1NzUzLCJleHAiOjE1NjY5MTkzNTN9.tYrfba0CkIu3lntbI1RtdqG23K2kocG3n6Mokzq1M9w')
            .send({
                currentPassword: '12345678',
                newPassword: '12345678',
                confirmPassword: '12345678'
            })
            .expect(406)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    password: 'New password cannot be the same as the current one'
                });
            })
            .end(done);
    });
});
*/