const { resolveObjectURL } = require('buffer');
const http = require('http');
const fs = require("fs");
const path = require("path");

http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    
    if(request.url=="/") {
        var list = fs.readdirSync(__dirname)
        list.forEach(item => {
            response.write("<div><a href="+item+">"+item+"</a></div>");
        })  
    } else {
        var catpath = path.join(__dirname, request.url);
        console.log(catpath)
        fs.access(catpath, function(error){
            if (!error) {
                if(fs.lstatSync(catpath).isDirectory()) {
                    var list = fs.readdirSync(catpath)
                    list.forEach(item => {
                        response.write("<div><a href="+request.url+"/"+item+">"+item+"</a></div>");
                    }) 
                    response.end('');
                } else {
                    fs.readFile(catpath,'utf8', (err, data) => {
                        response.end(data);
                    });
                }
            }
        })
    } 
}).listen(3000, 'localhost');