/**
 * Created by ulicny on 07.04.2017.
 */
var expect = require('expect');
var deepFreeze = require('deep-freeze');

const addCounter = (list) => {
    return [...list, 0];
}

const removeCounter = (list, index) => {
    return [...list.slice(0, index),
        ...list.slice(index + 1)];
}

const incrementCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
    ]
}

//tests
const testAddCounter = () => {
    let before = [];
    let after = [0];
    deepFreeze(before);
    expect(addCounter(before)).toEqual(after);

}

const testRemoveCounter = () => {
    let before = [0, 1, 2];
    let after = [0, 1];
    deepFreeze(before);
    expect(removeCounter(before, 2)).toEqual(after);

}

const testIncrementCounter = () => {
    let before = [0, 1, 2];
    let after = [0, 2, 2];
    expect(incrementCounter(before, 1)).toEqual(after);
}

let obj = {
    a: "vlada",
    b: "tom",
    c: "martin"
};

for (let x in obj) {
    console.log(obj[x]);
}

/**
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

Number.method('integer', function() {
    return Math[this<0 ? 'ceiling' : 'floor'](this);
});

console.log((-10/3).integer());

*/
function list() {
    let array = Array.from(arguments);
    return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3);

console.log(list1);


let Quo = function(value) {
    this.status = value;
};

Quo.prototype.get_status = function() {
    return this.value;
};

let myQuo = new Quo('vladimir');
console.log(myQuo.get_status());


let myObject = {
    value: 1,
    increment: function increment(inc) {
        this.value += inc;
    }
};

myObject.increment(3);
console.log(myObject.value);

function add(x, y) {
    return x + y;
}

myObject.double = function () {
    let that = this;
    let helper = function () {
        that.value = add(that.value, that.value);
    };
    helper();
};
myObject.double();
console.log(myObject.value);

/**
 var x = function testF(firstArg, secondArg) {
    let t = this;
    let arg = arguments;
    console.log(this.a);
    console.log(firstArg, secondArg)
    return function(thirdArgs) {
        return firstArg + secondArg + thirdArgs
    };
};
 x.a = 'this is a field';
 x.b = function() {
   console.log('from inner function object function', this.a);
};
 let arrs = [x];

 let innerX = x(1, 2, 5);

 console.log(innerX(3));

 if(typeof  arrs[0] === 'function') {
    console.log(arrs[0](1, 2));
    console.log(arrs[0].a);
    console.log(arrs[0].b());

}

 */
testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('Tests passed')
