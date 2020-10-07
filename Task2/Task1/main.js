"use strict";

const Point = require("./Point");
const Section = require("./Section");

let checkSection = new Section();
checkSection.init(0, 0, 4, 0);
checkSection.printSection();

let length = checkSection.findLength();
console.log(length);