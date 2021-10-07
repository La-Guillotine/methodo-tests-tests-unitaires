import { assert } from 'chai';
import { FizzBuzz } from './fizz-buzz';

describe('FizzBuzz', () => {
    it('Test nothing',() => {
        const res = FizzBuzz.fizzBuzz();
        // console.log(res);
        assert.equal(res[0], 1);
    });
    it('Test 3',() => {
        const res = FizzBuzz.fizzBuzz();
        
        assert.equal(res[2], 'Fizz');
    });
    it('Test 5',() => {
        const res = FizzBuzz.fizzBuzz();
        
        assert.equal(res[4], 'Buzz');
    });
    it('Test 3 && 5',() => {
        const res = FizzBuzz.fizzBuzz();
        
        assert.equal(res[14], 'FizzBuzz');
    });

    it('Test limit array',() => {
        const res = FizzBuzz.fizzBuzz();
        
        assert.notExists(res[100]);
    });
})