// С клавиатуры считывается строка - название расширения файлов. Далее считывается строка - адрес папки. Необходимо перебрать все
// файлы в папке и вывести содержимое файлов, у которых расширение совпадает с введенным расширением.

"use strict";

const fs = require("fs");
const readlineSync = require('readline-sync');

const expansion = readlineSync.question("Input expansion (without point): ");
const folder = readlineSync.question("Input folder: ");
// Считываем содержимое дирректории
const arrOfFiles = fs.readdirSync(folder);

let curFile, curPath;
for (let i = 0; i < arrOfFiles.length; i++) {
    curFile = arrOfFiles[i].split(".");
    // Проверка совпадения расширения файла с заданным расширением
    if (curFile[curFile.length - 1] == expansion) {
        // "Склеиваем" адрес и название файл
        curPath = folder + arrOfFiles[i];
        // Выводим содержимое
        console.log(fs.readFileSync(curPath, "utf8"));
    }
}

