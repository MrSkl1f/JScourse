// Из файла считывается строка в формате JSON. В этой строке информация об объекте, в котором находится большое количество вложенных друг в друга полей. 
// Объект представляет из себя дерево. Необходимо рекурсивно обработать дерево и найти максимальную вложенность в дереве. 
// Необходимо вывести на экран ветку с максимальной вложенностью.

const fs = require("fs");
let arrCheck = [];
let maxArr = [];
function checkNesting(obj) {
    let maxLevel = 1;
    for (let key in obj) {
        if (typeof (obj[key]) == "object") {
            arrCheck.push(key);
            let lvl = checkNesting(obj[key]) + 1;
            if (lvl > maxLevel) {
                maxLevel = lvl;
                if (arrCheck.length > maxArr.length) {
                    maxArr = arrCheck;
                    arrCheck = [];
                }
            }
        }
    }
    return maxLevel;
}

const jsonStr = fs.readFileSync("./seventhTask/1.txt");
const obj = JSON.parse(jsonStr);
console.log(checkNesting(obj));
for (let key in maxArr) {
    console.log(maxArr[key]);
}