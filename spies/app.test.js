const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');

describe('App', () => {
    const db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it ('Should call the spy correctly', () => {
        const spy = expect.createSpy();        
        spy('Andrew', 25);
        expect(spy).toHaveBeenCalledWith('Andrew', 25);
    })

    it ('should call saveUser with user object', () => {
        const email = 'nomsouzoanya@yahoo.co.uk';
        const password = '12345678';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({ email, password });
    }); 
});