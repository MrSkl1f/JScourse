const Point = require("./Point");

module.exports = class PointHandler {
    constructor () {
        this.Points = [];
        this.length = this.Points.length;
    }

    checkData(curPoint) {
        for (let i = 0; i < this.length; i++) {
            if (curPoint.name === this.Points[i].name) {
                return 0;
            }
        }
        return 1;
    }

    getPointByName(name) {
        let index = -1;
        for (let i = 0; i < this.length; i++) {
            if (this.Points[i].name === name) {
                index = i;
                break;    
            }
        }
        return index;
    }

    CREATE(curPoint) {
        if (this.checkData(curPoint)) {
            this.Points.push(curPoint);
            this.length++;
        }
        else {
            console.log("Данная точка уже существует.");
        }
    }

    READ(name) {
        let index = this.getPointByName(name);
        if (index === -1) {
            console.log("Данная не найдена.");
        }
        else {
            console.log("Точка: " + this.Points[index].name + ", x: " + this.Points[index].x + ", y: " + this.Points[index].y + ".");
        }
    }

    UPDATE(name, x, y) {
        let index = this.getPointByName(name);
        if (index === -1) {
            console.log("Данная не найдена.");
        }
        else {
            this.Points[index].x = x;
            this.Points[index].y = y; 
        }
    }

    DELETE(name) {
        let index = this.getPointByName(name);
        if (index === -1) {
            console.log("Данная не найдена.");
        }
        else {
            this.Points.splice(index, 1);
            this.length--;
        }
    }

    // Получение расстояние между двумя точками
    getDistance(frstPoint, scndPoint) {
        return Math.sqrt(Math.pow(scndPoint.x - frstPoint.x, 2) + Math.pow(scndPoint.y - frstPoint.y, 2))
    }

    // Получение двух точек, между которыми наибольшее расстояние
    findMaxDistance() {
        let frstPoint = this.Points[0],
            scndPoint = this.Points[1];
        let maxDistance = this.getDistance(frstPoint, scndPoint);
        for (let i = 0; i < this.length - 1; i++) {
            for (let j = i + 1; j < this.length; j++) {
                let curDistance = this.getDistance(this.Points[i], this.Points[j]) 
                if (curDistance > maxDistance) {
                    maxDistance = curDistance;
                    frstPoint = this.Points[i];
                    scndPoint = this.Points[j];
                }
            }
        }
        console.log("Максимальное расстояние = " + maxDistance + " между точками:")
        this.READ(frstPoint.name);
        this.READ(scndPoint.name);
    }

    // Получение точек, находящихся от заданной точки на расстоянии, не превышающем заданную константу
    findPointsByNewPoint(x, y, constant) {
        for (let i = 0; i < this.length; i++) {
            if (this.getDistance(new Point("CheckDistance", x, y), this.Points[i]) <= constant) {
                this.READ(this.Points[i].name);
            }
        }
    }

    // Получение точек, находящихся выше / ниже / правее / левее заданной оси координат
    // 0 - x, 1 - y
    findAboutX() {
        console.log("Выше Y:");
        for (let i = 0; i < this.length; i++) {
            if (this.Points[i].y > 0) {
                this.READ(this.Points[i].name);
            }
        }
        console.log("Ниже Y:");
        for (let i = 0; i < this.length; i++) {
            if (this.Points[i].y < 0) {
                this.READ(this.Points[i].name);
            }
        }
    }

    findAboutY() {
        console.log("Правее X:");
        for (let i = 0; i < this.length; i++) {
            if (this.Points[i].x > 0) {
                this.READ(this.Points[i].name);
            }
        }
        console.log("Левее X:");
        for (let i = 0; i < this.length; i++) {
            if (this.Points[i].x < 0) {
                this.READ(this.Points[i].name);
            }
        }
    }

    findPointsAboutGivenAxis(axis) {
        if (!axis) {
            this.findAboutX();
        }
        else {
            this.findAboutY();
        }
    }

    findMaxCoords(curRect) {
        let maxX = curRect.curRectangle[0].x, 
            maxY = curRect.curRectangle[0].y;
        for (let i = 0; i < 4; i++) {
            if (maxX < curRect.curRectangle[i].x) {
                maxX = curRect.curRectangle[i].x;
            }
            if (maxY < curRect.curRectangle[i].y) {
                maxY = curRect.curRectangle[i].y;
            }
        }
        return new Point("", maxX, maxY);
    }
     
    findMinCoords(curRect) {
        let minX = curRect.curRectangle[0].x, 
            minY = curRect.curRectangle[0].y;
        for (let i = 0; i < 4; i++) {
            if (minX > curRect.curRectangle[i].x) {
                minX = curRect.curRectangle[i].x;
            }
            if (minY > curRect.curRectangle[i].y) {
                minY = curRect.curRectangle[i].y;
            }
        }
        return new Point("", minX, minY);
    }

    IsInRect(curRect, curPoint) {
        let maxPoint = this.findMaxCoords(curRect);
        let minPoint = this.findMinCoords(curRect);
        if (curPoint.x < maxPoint.x && curPoint.x > minPoint.x && 
            curPoint.y < maxPoint.y && curPoint.y > minPoint.y) {
                return 1;
        }
        return 0;
    }

    // Получение точек, входящих внутрь заданной прямоугольной зоны
    findPointsInrectangle(curRect) {
        for (let i = 0; i < this.length; i++) {
            if (this.IsInRect(curRect, this.Points[i])) {
                this.READ(this.Points[i].name);
            }
        }
    }
}