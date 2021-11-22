const path = require("path");
const readline = require("readline");
const fs = require("fs");
const inquirer = require("inquirer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Введите название каталога для поиска в текущей папке: ", function(inputedPath) {
    const catPath = path.join(__dirname, inputedPath);
    console.log(catPath)
    rl.close();

    fs.access(catPath, function(error){
        if (error) {
            console.log("Каталог не найден");
        } else {
            if(fs.lstatSync(catPath).isDirectory()) {
                console.log(catPath)
                const list = fs.readdirSync(catPath)
                var clearlist = []
                list.forEach(cat => {
                    if(fs.lstatSync(path.join(catPath, cat)).isDirectory()) {
                        clearlist.push(cat)
                    }
                })
                if(clearlist.length>0) {
                    inquirer
                    .prompt([{
                            name: "catName",
                            type: "list",
                            message: "Выберите каталог:",
                            choices: clearlist,
                        }])
                    .then((answer) => {
                        clearlist = []
                        //console.log(answer.catName);
                        const newcatPath = path.join(catPath, answer.catName);
                        const secondlist = fs.readdirSync(newcatPath)
                        secondlist.forEach(cat => {
                            if(fs.lstatSync(path.join(newcatPath, cat)).isFile()) {
                                clearlist.push(cat)
                            }
                        })
                        if(clearlist.length>0) {
                            inquirer
                            .prompt([{
                                    name: "fileName",
                                    type: "list",
                                    message: "Выберите файл:",
                                    choices: clearlist,
                                }])
                            .then((answer) => {
                                console.log(answer.fileName);
                                const finalfilePath = path.join(newcatPath, answer.fileName);
                                const rl2 = readline.createInterface({
                                    input: process.stdin,
                                    output: process.stdout
                                });
                                
                                rl2.question("Введите слово для поиска в файле: ", function(word) {
                                    const regexp = new RegExp(`${word}`, 'g')
                                    fs.readFile(finalfilePath,'utf8', (err, data) => {
                                        if(regexp.test(data)) {
                                            console.log("Слово встречается в файле");
                                        } else {
                                            console.log("Слово не встречается в файле");
                                        }
                                    });
                                    rl2.close();
                                });
                            });
                        } else {
                            console.log("В выбранном каталоге нет файлов для чтения")    
                        }
                    });
                } else {
                    console.log("Выбран пустой каталог")
                }
            } else {
                console.log("Каталог не найден");
            }
        }
    });
});



