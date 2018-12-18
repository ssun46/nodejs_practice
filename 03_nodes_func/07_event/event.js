const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
    console.log('event_1');
});
myEvent.on('event2', () => {
    console.log('event_2');
});
myEvent.on('event2', () => {
    console.log('event_2 추가');
});

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.once('event3', () => {
    console.log('event_3');
});
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
    console.log('event_4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = () => {
    console.log('event_5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('evnet5');

console.log(myEvent.listenerCount('event2'));