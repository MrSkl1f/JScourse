"use strict";

module.exports = class Point {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    init(x, y) {
        this.x = x;
        this.y = y;
    }

    printPoint() {
        console.log("Точка: " + this.x + ";" + this.y);
    }
}