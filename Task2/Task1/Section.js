"use strict";

const Point = require("./Point");

module.exports = class Section {
    constructor() {
        this.firstPoint = new Point();
        this.secondPoint = new Point();
    }

    init(x1, y1, x2, y2) {
        this.firstPoint.init(x1, y1);
        this.secondPoint.init(x2, y2);
    }

    printSection() {
        console.log("Отрезок: ");
        this.firstPoint.printPoint();
        this.secondPoint.printPoint();
    }

    findLength() {
        return Math.sqrt(Math.pow(this.secondPoint.x - this.firstPoint.x , 2) + Math.pow(this.secondPoint.y - this.firstPoint.y , 2));
    }
}