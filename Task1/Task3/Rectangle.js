const Point = require("./Point")

module.exports = class Rectangle {
    constructor(firstPoint, secondPoint, thirdPoint, fourthPoint) {
        this.curRectangle = [];
        this.curRectangle.push(firstPoint);
        this.curRectangle.push(secondPoint);
        this.curRectangle.push(thirdPoint);
        this.curRectangle.push(fourthPoint);
        }
}