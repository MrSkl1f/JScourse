"use strict";

let number = Number(process.argv[2]);
let cur = 1;
for (let i = 2; i <= number; i++) {
    cur *= i;
}
console.log(cur);