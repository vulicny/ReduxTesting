/**
 * Created by ulicny on 06.04.2017.
 */
var expect = require('expect');

export function counter(state = 0, action) {

    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

//document.addEventListener('click', ()=>{store.dispatch({type:'INCREMENT'})});


// SIMPLE TESTS

expect(
    counter(0, {type: 'INCREMENT'})
).toEqual(1);

expect(
    counter(1, {type: 'DECREMENT'})
).toEqual(0);
console.log('Test passed')


