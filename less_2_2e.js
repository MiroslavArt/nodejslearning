var time1 = process.argv[2]
var time2 = process.argv[3]

var minute1= time1.slice(0,2);
var hour1 = time1.slice(3,5); 
var day1 = time1.slice(6,8);
var month1 = time1.slice(9,11);
var year1 = time1.slice(12,16);

var minute2 = time2.slice(0,2);
var hour2 = time2.slice(3,5); 
var day2 = time2.slice(6,8);
var month2 = time2.slice(9,11);
var year2 = time2.slice(12,16);

var deadline1 = new Date(year1, month1, day1, hour1, minute1)
var deadline2 = new Date(year2, month2, day2, hour2, minute2)

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('gotimer', (diff) =>
    {
        var days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        var hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        var minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        var seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        console.log(seconds+':'+minutes+':'+hours+':'+days)   
    }
);
emitter.on('stoptimer', (error) =>
    console.log('Error: ', error)
);

let timerId1 = setInterval(() => {
    var diff = deadline1 - new Date();
    if(diff<0) {
        clearInterval(timerId1);
        emitter.emit('stoptimer', 'таймер остановлен');
    } else {
        emitter.emit('gotimer', diff);
    }
}, 1000);

let timerId2 = setInterval(() => {
    var diff = deadline2 - new Date();
    if(diff<0) {
        clearInterval(timerId2);
        emitter.emit('stoptimer', 'таймер остановлен');
    } else {
        emitter.emit('gotimer', diff);
    }
}, 1000);