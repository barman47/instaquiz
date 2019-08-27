// const request = require('supertest');
// const expect = require('expect');

// const { app } = require('../../../server');

// describe('#PUT /api/profile', () => {
//     it ('should update profile data', (done) => {
//         request(app)
//             .put('/api/admin')
//             .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2OTE2NDc5LCJleHAiOjE1NjY5MjAwNzl9.b0-OqRsEdOrx1g2SDMAPJYqYsETaFc_As5wNITa4UUE')
//             .send({
//                 phone: '09026425337', 
//                 bank: 'Diamond Bank',
//                 accountName: 'nomsouzoanya@yahoo.co.uk',
//                 accountNumber: '12345678'
//             })
//             .expect(401)
//             .end(done);
//     })

//     it ('should not update profile data if data is invalid', (done) => {
//         request(app)
//             .put('/api/admin')
//             .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjQzNjk4ZGNjYzFkMjkzYzIzMWMzOCIsImZpcnN0TmFtZSI6IkRvbWluaWMiLCJsYXN0TmFtZSI6IlV6b2FueWEiLCJ1c2VybmFtZSI6ImJhcm1hbiIsImVtYWlsIjoibm9tc291em9hbnlhQHlhaG9vLmNvLnVrIiwiaWF0IjoxNTY2OTE2NDc5LCJleHAiOjE1NjY5MjAwNzl9.b0-OqRsEdOrx1g2SDMAPJYqYsETaFc_As5wNITa4UUE')
//             .send({})
//             .expect(400)
//             .expect((res) => {
//                 expect(res.body).toBeA('object');
//             })
//             .end(done);
//     })
// });