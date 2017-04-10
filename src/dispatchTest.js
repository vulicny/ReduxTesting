let methods = {
    init: function (args) {
        return 'initializing ...'
    },
    hello: function (args) {
        return 'Hello, ' + args;
    },
    goodbay: function (args) {
        return 'Good bye cruel ' + args;
    }
}
var greet = function (options) {
    var args = [].slice.call(arguments, 0),
        intializing = false,
        action = 'init';

    if(typeof options === 'string' && typeof methods[options] === 'function') {
        action = options;
        args.shift();
    }
    return methods[action](args);
}

var test1 = greet('hello', 'world!');
console.log(test1)