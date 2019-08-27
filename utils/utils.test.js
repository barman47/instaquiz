const expect = require('expect');

const utils = require('./utils');

describe('utils', () => {
    describe('#add', () => {
        it ('should add two numbers', () => {
            var res = utils.add(33, 11);
        
            expect(res).toBe(44).toBeA('number');
        });
        
        it ('should async add two numbers', (done) => {
            utils.asyncAdd(4, 3, (sum) => {
                expect(sum).toBe(7).toBeA('number');
                done();
            });
        });
    });

    describe('#square', () => {
        it ('should square a number', () => {
            const res = utils.square(4);
        
            expect(res).toBe(16).toBeA('number');
        });
        
        it ('should async square a number', (done) => {
            utils.asyncSquare(4, (square) => {
                expect(square).toBe(16).toBeA('number');
                done();
            });
        });
    });
});

// it ('should expect some values', () => {
//     // expect(12).toNotBe(12);
//     // expect({ name: 'dominic' }).toNotEqual({ name: 'Dominic' });
//     // expect([2, 3, 4]).toExclude(1);

//     expect({
//         name: 'Dominic',
//         age: 23,
//         location: 'Abuja'
//     }).toExclude({
//         age: 25
//     });
// });

it ('should verify first and last names are set', () => {
    const user = {
        age: 23,
        location: 'Abuja',
        name: 'Dominic Uzoanya'
    };

    const res = utils.setName(user, 'Dominic Uzoanya');

    expect(res).toInclude({
        firstName: 'Dominic',
        lastName: 'Uzoanya'
    }).toBeA('object')
});