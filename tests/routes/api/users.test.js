/*

const request = require('supertest');
const expect = require('expect');

const User = require('../../../models/User');
const Profile = require('../../../models/Profile');

const { app } = require('../../../server');

// beforeEach((done) => {
//     User.deleteMany()
//         .then(() => done());
// });

// beforeEach((done) => {
//     Profile.deleteMany()
//         .then(() => done());
// });

describe('#POST /api/users/register', () => {
    // it ('should create a new user', (done) => {
    //     const user = {
    //         firstName: 'Dominic',
    //         lastName: 'Uzoanya',
    //         username: 'barman',
    //         email: 'nomsouzoanya@yahoo.co.uk',
    //         password: '12345678',
    //         confirmPassword: '12345678'
    //     };

    //     request(app)
    //         .post('/api/users/register')
    //         .send(user)
    //         .expect(200)
    //         .expect((res) => {
    //             expect(res.body).toBeA('object').toInclude({
    //                 balance: 100,
    //                 hints: 5,
    //                 totalEarnings: 0,
    //                 gamesPlayed: 0
    //             });
    //         })
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
                
    //             Profile.find()
    //                 .then((profiles) => {
    //                     expect(profiles.length).toBe(1);
    //                     expect(profiles[0]).toInclude({
    //                         balance: 100,
    //                         hints: 5,
    //                         totalEarnings: 0,
    //                         gamesPlayed: 0
    //                     }).toBeA('object');
    //                     done();
    //                 })
    //                 .catch((err) => done(err));
    //         });
    // });

    it ('should not create user with invalid data', (done) => {
        request(app)
            .post('/api/users/register')
            .send({})
            .expect(400)
            .expect(res => {
                expect(res.body).toBeA('object').toInclude({
                    firstName: 'First name is required!'
                });
            })
            .end(done);
    });

    it ('should not create user if username exists', (done) => {
        const errors = { username: 'Username already exists!' };
        request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Dominic',
                lastName: 'Uzoanya',
                username: 'barman',
                email: 'nomsouzoanya@yahoo.co.uk',
                password: '12345678',
                confirmPassword: '12345678'
            })
            .expect(406)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude(errors);
            })
            .end(done);
    });

    it ('should not create user if email exists', (done) => {
        const errors = {
            email: 'Email already exists!'
        }
        request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Dominic',
                lastName: 'Uzoanya',
                username: 'landlord',
                email: 'nomsouzoanya@yahoo.co.uk',
                password: '12345678',
                confirmPassword: '12345678'
            })
            .expect(406)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude(errors);
            })
            .end(done);
    });
});

describe('#POST /api/users/login', () => {
    const user = {
        username: 'barman',
        password: 'vicecity'
    };

    it ('should not login user if data is invalid', (done) => {
        request(app)
            .post('/api/users/login')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    username: 'username is required!',
                    password: 'password is required!'
                });
            })
            .end(done);
    });

    it ('should return 404 if user not found', (done) => {
        request(app)
            .post('/api/users/login')
            .send({ username: 'landlord', password: 'landlord' })
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    username: 'User not found!'
                }).toBeA('object');
            })
            .end(done);
    });

    it ('should return 401 if password is incorrect', (done) => {
        request(app)
            .post('/api/users/login')
            .send({ username: 'barman', password: '1234567' })
            .expect(401)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    password: 'Password incorrect!'
                })
            })
            .end(done);
    });

    it ('should return 200 if user logged in successfully', (done) => {
        request(app)
            .post('/api/users/login')
            .send({
                username: 'barman',
                password: '12345678'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({ success: true })
            })
            .end(done);
    });
});

describe('#PUT /api/users/changePassword', () => {
    it ('should not change password if data is invalid', (done) => {
        request(app)
            .put('/api/users/changePassword')
            .send({})
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2ODQ4NzcwLCJleHAiOjE1NjY4NTIzNzB9.1ckCh45lsKPqIIlBGnJySpiSmii-5Xr7Cl2Y1vhdLcY')
            .expect(400)
            .expect((res) => {
                expect(res.body).toBeA('object');
            })
            .end(done);
    });

    it ('should not change password if new and old are the same', (done) => {
        request(app)
            .put('/api/users/changePassword')
            .send({
                currentPassword: '12345678',
                newPassword: '12345678',
                confirmPassword: '12345678'
            })
            .expect(403)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2ODQ4NzcwLCJleHAiOjE1NjY4NTIzNzB9.1ckCh45lsKPqIIlBGnJySpiSmii-5Xr7Cl2Y1vhdLcY')
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    newPassword: 'New password cannot be the same with the current password'
                })
            })
            .end(done);
    });

    it ('should not change password if password is not correct', (done) => {
        request(app)
            .put('/api/users/changePassword')
            .send({
                currentPassword: 'yahooyahoo',
                newPassword: 'yahooyahoo',
                confirmPassword: 'yahooyahoo'
            })
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2ODQ4NzcwLCJleHAiOjE1NjY4NTIzNzB9.1ckCh45lsKPqIIlBGnJySpiSmii-5Xr7Cl2Y1vhdLcY')
            .expect(401)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    password: 'Incorrect Password!'
                })
            })
            .end(done);
    });

    // it ('should change password successfully', (done) => {
    //     request(app)
    //         .put('/api/users/changePassword')
    //         .send({
    //             currentPassword: '12345678',
    //             newPassword: 'yahooyahoo',
    //             confirmPassword: 'yahooyahoo'
    //         })
    //         .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjJlOWVjOTY0OTcyNmE2MGVjNzY3MSIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2ODQ4MTA5LCJleHAiOjE1NjY4NTE3MDl9.89U5wo1OtyyrYkZFFDR_rgEDlgSoiq0iULH2kKYWukU')
    //         .expect(200)
    //         .expect((res) => {
    //             expect(res.body).toBeA('object').toInclude({
    //                 success: 'Password changed successfully!'
    //             })
    //         })
    //         .end(done);
    // });
});

describe('#PUT /api/users/updateData', () => {
    it ('should not update user data with invalid credentials', (done) => {
        request(app)
            .put('/api/users/updateData')
            .send({})
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2ODQ4NzcwLCJleHAiOjE1NjY4NTIzNzB9.1ckCh45lsKPqIIlBGnJySpiSmii-5Xr7Cl2Y1vhdLcY')
            .expect(400)
            .expect((res) => {
                expect(res.body).toBeA('object');
            })
            .end(done);
    });

    it ('should not update user data if password is incorrect', (done) => {
        request(app)
            .put('/api/users/updateData')
            .send({
                firstName: 'Dominic',
                lastName: 'Uzoanya',
                email: 'nomsouzoanya@yahoo.co.uk',
                password: 'wrongpassword'
            })
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2ODQ4NzcwLCJleHAiOjE1NjY4NTIzNzB9.1ckCh45lsKPqIIlBGnJySpiSmii-5Xr7Cl2Y1vhdLcY')
            .expect(401)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({ password: 'Incorrect password!' });
            })
            .end(done);
    });

    it ('should update user data', (done) => {
        const user = {
            firstName: 'Dominic',
            lastName: 'Uzoanya',
            email: 'nomsouzoanya@yahoo.co.uk',
            password: '12345678'
        };

        request(app)
            .put('/api/users/updateData')
            .send(user)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2ODQ4NzcwLCJleHAiOjE1NjY4NTIzNzB9.1ckCh45lsKPqIIlBGnJySpiSmii-5Xr7Cl2Y1vhdLcY')
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeA('object').toInclude({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                });
            })
            .end(done);
    });
}); 

// describe('#GET /api/quiz/:id', () => {
//     it ('should get quiz by category', (done) => {
//         request(app)
//             .get('api/quiz/biology')
//             .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2ODQ4NzcwLCJleHAiOjE1NjY4NTIzNzB9.1ckCh45lsKPqIIlBGnJySpiSmii-5Xr7Cl2Y1vhdLcY')
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body).toBeA('object')
//             })
//             .end(done);
//     })
// });

*/