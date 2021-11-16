var a = process.argv[2]
var b = process.argv[3]

const colors = require('colors');

if(/^(0|[1-9]\d*)$/.test(a) && /^(0|[1-9]\d*)$/.test(b)) {
    a = Number (a)
    b = Number (b)
    if(a<b) {       
        var primes = [];
        for(var i = a; i < b; i++){
            if(isPrime(i)) primes.push(i);
        }
        if(primes.length==0) {
            console.log(colors.red("В интервале нет простых чисел")) 
        } else {
            var count = 0
            primes.forEach(function(item, n, primes) { 
                if(count==0) {
                    console.log(colors.green(item)) 
                } else if(count==1) {
                    console.log(colors.yellow(item)) 
                } else if(count==2) {
                    console.log(colors.red(item)) 
                }
                count++
                if(count>2) {
                    count=0
                }
            })
        }
    } else {
        console.log(colors.red("Ошибка в задании диапазона"))  
    }
} else {
    console.log(colors.red("Ошибка в задании диапазона"))    
}

function isPrime(num) {
    if(num < 2) return false;
    for (var i = 2; i < num; i++) {
        if(num%i==0)
            return false;
    }
    return true;
}
