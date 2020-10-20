"use strict";

// импорт библиотек
const express = require("express");
const request = require("request");

// запускаем сервер
const app = express();
const port = 1100;
app.listen(port);
console.log(`Server on port ${port}`);

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// функция для отправки POST запроса на другой сервер
function sendPost(url, body, callback) {
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

// создание нового типа машины
app.get("/insertCar", function(request, response) {
    const carName = request.query.car;
    const carCost = request.query.cost;
    sendPost("http://localhost:1010/insert/record", JSON.stringify({
        carName: carName,
        carCost: carCost
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        response.end("Answer: " + answer);
    });
});

// получение информации о стоимости машины по её типу
app.get("/selectCar", function(request, response) {
    const carName = request.query.car;
    sendPost("http://localhost:1010/select/record", JSON.stringify({
        carName: carName,
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        console.log(answer)
        if (answer == "null") {
            response.end("Didn't find");
        } else {
            response.end(answer.name + answer.cost);
        }
    });
});

// создание нового склада с находящимися в нём машинами
