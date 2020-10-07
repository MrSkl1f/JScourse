"use strict";

module.exports = class Triangle {
    constructor() {
        this.lenA = 0;
        this.lenB = 0;
        this.lenC = 0;
    }

    init(len1, len2, len3) {
        this.lenA = len1;
        this.lenB = len2;
        this.lenC = len3;
    }

    isExist() {
        if (this.lenA + this.lenB > this.lenC && 
            this.lenA + this.lenC > this.lenB &&
            this.lenB + this.lenC > this.lenA) {
            return 1;
        }
        return 0;
    }

    getPerimeter() {
        if (this.isExist()) {
            return this.lenA + this.lenB + this.lenC;
        }
        else {
            console.log("Треугольника не существует.");
            return -1;
        }
    }

    getArea() {
        if (this.isExist()) {
            let perimeter = this.getPerimeter();
            return Math.sqrt(perimeter * (perimeter - this.lenA) * (perimeter - this.lenB) * (perimeter - this.lenC));
        }
        else {
            console.log("Треугольника не существует.");
            return -1;
        }
    }

    checkSide(firstLen, secondLen, thirdLen) {
        if (Math.pow(firstLen, 2) + Math.pow(secondLen, 2) === Math.pow(thirdLen, 2)) {
            return 1;
        }
        return 0;
    }

    isRectangular() {
        if (this.isExist()) {
            if (this.checkSide(this.lenA, this.lenB, this.lenC) || this.checkSide(this.lenA, this.lenС, this.lenB) || this.checkSide(this.lenB, this.lenС, this.lenA)) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else {
            console.log("Треугольника не существует.");
            return -1;
        }
    }
}