module.exports = class StudentsHolder {
    constructor () {
        this.Students = [];
    }

    getNeedStudent(needNumber) {
        let index = -1;
        for (let i = 0; i < this.Students.length; i++) {
            if (this.Students[i].number === needNumber) {
                index = i;
                break;
            }
        }
        return index;
    }

    checkData(newObj) {
        for (let i = 0; i < this.Students.length; i++) {
            if (this.Students[i].number === newObj.number) {
                return 0;
            }
        }
        return 1;
    }

    CREATE(newStudent) {
        if (!this.checkData(newStudent)) {
            console.log("Данный студент уже присутствует в хранилище.");
        }       
        else {
            this.Students.push(newStudent);
        }
    }
    // название группы, номер студака, оценки по проге 
    READ(needStudent) {
        let index = this.getNeedStudent(needStudent);
        if (index === -1) {
            console.log("Данный студент не найден.");
        }
        else {
            console.log("Group:", this.Students[index].group, "Number:", this.Students[index].number, "Marks:", this.Students[index].marks);
        }
    }

    UPDATE(needNumber, newGroup, newMarks) {
        let index = this.getNeedStudent(needNumber);
        if (index === -1) {
            console.log("Данный студент не найден.");
        }
        else {
            this.Students[index].group = newGroup;
            this.Students[index].marks = newMarks;
        }
    }

    DELETE(needNumber) {
        let index = this.getNeedStudent(needNumber);
        if (index === -1) {
            console.log("Данный студент не найден.");
        }
        else {
            this.Students.splice(index, 1);
        }
    }

    sum(arr) {
        let res = 0;
        for (let i = 0; i < arr.length; i++) {
            res += arr[i];
        }
        return res;
    }

    getAverageMarks(needNumber) {
        let index = this.getNeedStudent(needNumber);
        if (index === -1) {
            console.log("Данный студент не найден.");
        }
        else {
            let sum = this.sum(this.Students[index].marks);
            if (this.Students[index].marks.length != 0) {
                console.log(sum / this.Students[index].marks.length);
            }
            else {
                console.log("У данного студента нет оценок.");
            }
        }
    }

    getInfoByGroup(needGroup) {
        for (let i = 0; i < this.Students.length; i++) {
            if (this.Students[i].group === needGroup) {
                this.READ(this.Students[i].number);
            }
        }
    }

    getInfoByMaxMarks() {
        let index = -1;
        let maxMarks = 0;
        for (let i = 0; i < this.Students.length; i++) {
            if (maxMarks < this.Students[i].marks.length) {
                maxMarks = this.Students[i].marks.length;
                index = i;
            } 
        }
        if (index != -1) {
            this.READ(this.Students[index].number);
        }
        else {
            console.log("Не нашлись нужный студент");
        }
    }

    getInfoByNoMarks() {
        for (let i = 0; i < this.Students.length; i++) {
            if (this.Students[i].marks.length === 0) {
                this.READ(this.Students[i].number);
            }
        }
    }
} 
