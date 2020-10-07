// С клавиатуры считывается число N. Далее считывается N строк - имена текстовых файлов.
// Необходимо склеить всё содержимое введенных файлов в одну большую строку и сохранить в новый файл.

"use strict";

const fs = require("fs");
const readlineSync = require('readline-sync');
let folder = "./fifthTask/";
const count = readlineSync.question("Input count of files: ");
let mainLine = ""
for (let _ = 0; _ < count; _++) {
    let check = 0;
    while (!check) {
        const file = readlineSync.question("Input name of file " + (_ + 1) + ": ");
        if (fs.existsSync(folder + file)) {
            let content = fs.readFileSync(folder + file, "utf8");
            mainLine += content + "\n";        
            check = 1;
        } else {
            console.log("File was not found");
        }
    }
}

fs.writeFileSync(folder + "TaskFive.txt", mainLine);