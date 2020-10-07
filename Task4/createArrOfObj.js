"use strict";

const fs = require("fs");

let group1 = {
    num: 51,
    count: 24,
};

let group2 = {
    num: 52,
    count: 23,
};

let group3 = {
    num: 53,
    count: 29,
};

let group4 = {
    num: 54,
    count: 14,
};

let group5 = {
    num: 55,
    count: 28,
};

let groups = [group1, group2, group3, group4, group5];
const jsonStr = JSON.stringify(groups);
fs.writeFileSync("task2.txt", jsonStr);

