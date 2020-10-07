"use strict";

const readlineSync = require('readline-sync');
const fs = require("fs");
const fileName = "./files/firstTask.txt";

let arr = [];
let countOfLines = readlineSync.question("Input count of lines: ");
let curLine = "";
for (let i = 0; i < parseInt(countOfLines); i++) {
    curLine = readlineSync.question("Input " + (i + 1) + " line: ");
    if (curLine.length % 2 == 0) {
        arr.push(curLine);
    }
}

let jsonString = JSON.stringify(arr);
console.log(jsonString);
fs.writeFileSync(fileName, jsonString);