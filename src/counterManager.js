/**
 * Created by ulicny on 07.04.2017.
 */
var expect = require('expect');
var deepFreeze = require('deep-freeze');

const addCounter = (list) => {
    return [...list, 0];
}

const removeCounter = (list, index)=> {
    return [...list.slice(0, index),
            ...list.slice(index+1)];
}

const incrementCounter = (list, index)=> {
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index+1)
    ]
}

//tests
const testAddCounter = ()=> {
    let before = [];
    let after = [0];
    deepFreeze(before);
    expect(addCounter(before)).toEqual(after);

}

const testRemoveCounter = ()=> {
    let before = [0, 1, 2];
    let after =[0, 1];
    deepFreeze(before);
    expect(removeCounter(before, 2)).toEqual(after);

}

const testIncrementCounter =()=> {
    let before = [0, 1, 2];
    let after = [0, 2, 2];
    expect(incrementCounter(before, 1)).toEqual(after);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('Tests passed')
