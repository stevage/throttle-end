
const throttle = require('./index');
let returns3, plus3;
beforeEach(() => {
    returns3 = jest.fn(() => { return 3 ; } );
    plus3 = jest.fn((x = 0) => { return x + 3 ; } );
});
// jest.useFakeTimers();

test('Returns a function we can call', () => {
    const t = throttle(returns3, 100);
    expect(t()).toEqual(3);
    expect(returns3).toBeCalledTimes(1);
});

test('If we call it twice quickly, the second one is not immediately called.', () => {
    const t = throttle(returns3);
    t();
    t();
    expect(returns3).toBeCalledTimes(1);
});

test('It is called eventually though.', done => {
    const t = throttle(returns3, 100);
    t();
    t();
    expect(returns3).toBeCalledTimes(1);
    setTimeout(() => {
        expect(returns3).toBeCalledTimes(2);
        console.log('yes');
        done();
    }, 150);
});

test('Arguments are passed', done => {
    const t = throttle(plus3, 100);
    t(4);
    expect(plus3).toBeCalledWith(4);
    t(5);
    expect(plus3).toBeCalledTimes(1);
    setTimeout(() => {
        expect(plus3).lastCalledWith(5);
        done();
    }, 150);
});

test('Intermediate calls are skipped', done => {
    const t = throttle(plus3, 100);
    t(4);
    expect(plus3).toBeCalledWith(4);
    t(5);
    setTimeout(() => t(7), 40);
    t(6);
    expect(plus3).toBeCalledTimes(1);
    setTimeout(() => {
        expect(plus3).toBeCalledTimes(2);
        expect(plus3).lastCalledWith(7);
        done();
    }, 150);
});

test('Calling flush() calls the latest function immediately', done => {
    const t = throttle(plus3, 100);
    t(4);
    t(5);
    t(6);
    t.flush();
    expect(plus3).toBeCalledTimes(2);
    expect(plus3).lastCalledWith(6);
    setTimeout(() => {
        expect(plus3).toBeCalledTimes(2);
        expect(plus3).lastCalledWith(6);
        done();
    }, 150);
});

test.only('A queued call can be killed', done => {
    const t = throttle(returns3, 100);
    t(30);
    setTimeout(() => t(40), 90);
    setTimeout(() => t(50), 110);
    expect(returns3).toBeCalledTimes(1);
    setTimeout(() => {
        expect(returns3).toBeCalledTimes(2);
        expect(returns3).lastCalledWith(50);
        done();
    }, 150);
});
