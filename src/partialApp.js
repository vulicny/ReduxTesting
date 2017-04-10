/**
 * Created by ulicny on 05.04.2017.
 */
var multiply = function multiply(x, y) {
    return x * y;
}

var partial = function partial(fn, factor) {

    return function(x) {
        return fn.apply(this, [x, factor]);
    }
}

var double = partial(multiply, 2);

console.log(double(4));