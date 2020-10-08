// Написать код, который позволяет определить максимальный возможный уровень вложенности друг в друга полей в объекте, 
// чтобы данный объект можно было преобразовать в строку формата JSON. Ответом является целое число.
"use strict";

let mainObj = {};
let maxLevel = 0;
let check = true;
let curObj = mainObj;
while (check) {
    curObj.newObj = {};
    maxLevel++;
    try {
        const jsonStr = JSON.stringify(mainObj);
        curObj = curObj.newObj;
    } catch (error) {
        check  = false;
    }
}

console.log(maxLevel);
