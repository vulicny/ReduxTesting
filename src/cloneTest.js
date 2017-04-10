/**
 * Created by ulicny on 05.04.2017.
 */
let switchProto = {
    state: false,
    isOn: function isOn() {
       return this.state;
    },
    toggle: function toggle() {
       this.state = !this.state;
       return this;
    },
    meta : {
        name: 'Light switch'
    }
}

let switch1 = Object.create(switchProto);
let switch2 = Object.create(switchProto);
let switch3 = Object.assign({}, switchProto);

console.log(switch1.isOn());
switch1.toggle();
console.log(switch1.isOn());
console.log(switch2.isOn());
switch1.toggle();
console.log(switch1.isOn());
switch1.meta.name = 'Vladimir'
console.log(switch1.meta)
console.log(switch2.meta)
switch1.meta = {name: 'Breaker switch'}
console.log(switch1.meta)
console.log(switch2.meta)

switch3.meta.name = 'Tomas'
console.log(switch3.meta);
console.log(switch2.meta)
