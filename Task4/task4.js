// Запустить сервер. Реализовать на сервере функцию, которая принимает на вход числа A, B и C. 
// Функция должна выдавать массив целых чисел на отрезке от A до B, которые делятся на C нацело.

"use strict";
const fs = require("fs");
const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

app.get("/task4/section", function(request, response) {
    let A = parseInt(request.query.A);
    let B = parseInt(request.query.B);
    let C = parseInt(request.query.C);
    if (A < B) {
        let arr = []
        for (let i = A; i <= B; i++) {
            if (i % C == 0) {
                arr.push(i)
            }
        }
        const answerJSON = JSON.stringify({result: arr});
        response.end(answerJSON);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});