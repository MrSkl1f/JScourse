"use strict";

function checkVowels(curString) {
    let arrOfVowels = "AEIOUaeiou";
    let check = 0;
    for (let i = 0; i < curString.length; i++) {
        
        for (let j = 0; j < arrOfVowels.length; j++) {
            if (curString[i] == arrOfVowels[j]) {
                check = 1;
                break;
            }
        }
        if (!check) {
            return 0;
        }
        check = 0;
    }
    return 1;
}

const fs = require("fs");
const fileName = "./files/secondTask.txt";

const contentString = fs.readFileSync(fileName, "utf8");
let arr = JSON.parse(contentString);
for (let i = 0; i < arr.length; i++) {
    if (checkVowels(arr[i])) {
        console.log(arr[i]);
    }
}