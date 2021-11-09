var a = process.argv[2]
var b = process.argv[3]

var arr = [2,3,5]

if(/^(0|[1-9]\d*)$/.test(a) && /^(0|[1-9]\d*)$/.test(b)) {
    arr.forEach(function(item, i, arr) {        
        if(item>=a && item<=b) {
            console.log(item)           
        } else {
            console.log("Число "+item+" вне заданного диапозона")
        }   
    })
} else {
    console.log("Ошибка в задании диапазона")    
}

