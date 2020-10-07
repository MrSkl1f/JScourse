// Запустить сервер. Реализовать на сервере функцию для сравнения трёх чисел и выдачи наибольшего из них.
// Реализовать страницу с формой ввода для отправки запроса на сервер.

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

app.get("/calculate/sum", function(request, response) {
    const a = parseInt(request.query.a);
    const b = parseInt(request.query.b);
    const c = parseInt(request.query.c);
    const answerJSON = JSON.stringify({result: Math.max(a, b, c)});
    response.end(answerJSON);
});

//http://localhost:5015/me/page?p=a.html