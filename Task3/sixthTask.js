// Написать код, который позволяет определить максимальный возможный уровень вложенности друг в друга полей в объекте, 
// чтобы данный объект можно было преобразовать в строку формата JSON. Ответом является целое число.
"use strict";

function checkNesting(obj) {
    let maxLevel = 1;
    for (let key in obj) {
        if (typeof (obj[key]) == "object") {
            let lvl = checkNesting(obj[key]) + 1;
            if (lvl > maxLevel) {
                maxLevel = lvl;
            }
        }
    }
    return maxLevel;
}

const obj111 = {
    fac: 7,
};

const obj11 = {
    group: 55,
    fac: obj111,
};

const obj1 = {
    name: "George",
    age: 20,
    group: obj11,
};

const obj21 = {
    group: 54,
};

const obj2 = {
    name: "Danya",
    age: 19,
    group: obj21,
};

const obj3 = {
    name: "Denis",
    age: 20,
};

const obj4 = {
    name: "Sanya",
    age: 20,
};

const group = {
    stud1: obj1,
    stud2: obj2,
    stud3: obj3,
    stud4: obj4,
};

let count = checkNesting(group);
console.log(count);
