var a = process.argv[2]
var b = process.argv[3]

var arr = [2,3,5]

const colors = require('colors');

if(/^(0|[1-9]\d*)$/.test(a) && /^(0|[1-9]\d*)$/.test(b)) {
    arr.forEach(function(item, i, arr) {        
        if(item>=a && item<=b) {
            if(i==0) {
                console.log(colors.green(item)) 
            } else if(i==1) {
                console.log(colors.yellow(item))     
            } else {
                console.log(colors.red(item)) 
            }                      
        } else {
            console.log(colors.red("Число "+item+" вне заданного диапозона"))
        }   
    })
} else {
    console.log(colors.red("Ошибка в задании диапазона"))    
}

