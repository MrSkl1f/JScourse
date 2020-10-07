// Дана вложенная структура файлов и папок. Все файлы имеют раширение "txt". Необходимо рекурсивно перебрать вложенную структуру и 
// вывести имена файлов, у которых содержимое не превышает по длине 10 символов.
"use strict;"

const fs = require("fs");

function checkFolder(folder) {
    fs.readdir(folder, (err, arr) => {
        console.log("Folder: " + folder);
        for(let i = 0; i < arr.length; i++) {
            var line = arr[i].split(".");
            if (line[line.length - 1] == "txt") {
                const contentStr = fs.readFileSync(folder + "/" + arr[i], "utf8");
                if (contentStr.length <= 10) {
                    console.log("Name of file: " + arr[i]);
                }
            }
            else {
                checkFolder(folder + "/" + arr[i]);
            }
        }
    });
    return;
}

var folder = "./fourthTask";
checkFolder(folder);