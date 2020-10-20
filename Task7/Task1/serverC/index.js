"use strict";

// импорт библиотек
const express = require("express");
const request = require("request");

// запускаем сервер
const app = express();
const port = 1100;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));

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
        response.end(JSON.stringify({
            result: answer
        }));
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
        if (answer == null) {
            response.end(JSON.stringify({
                result: "Didn't find"
            }));
        } else {
            response.end(JSON.stringify({
                result: answer
            }));
        }
    });
});

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

async function checkCars(arr) {
    let check = true;
    for (let i = 0; i < arr.length; i++) {
        sendPost("http://localhost:1010/select/record", JSON.stringify({
            carName: arr[i]
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const answer = answerObject.answer;
            if (answer == null) {
                check = false;
            }
        });    
        await new Promise((resolve, reject) => setTimeout(resolve, 50)); 
        if (!check) {
            return check;
        }
    }
    return check;
}

// создание нового склада с находящимися в нём машинами
app.post("/insertWarehouse", function(request, response) {
    loadBody(request, async function(body) {
        const obj = JSON.parse(body);
        const warehouse = obj["warehouse"];
        const arr = obj["arr"];
        let res = checkCars(arr);
        await new Promise((resolve, reject) => setTimeout(resolve, arr.length * 50 + 100));
        res = await Promise.resolve(res);
        if (res) {
            sendPost("http://localhost:1011/insert/record", JSON.stringify({
                wareHouseName: warehouse,
                arrOfCars : arr
            }), function(answerString) {
                const answerObject = JSON.parse(answerString);
                const answer = answerObject.answer;
                response.end(JSON.stringify({
                    result: answer
                }));
            });   
        } else {
            response.end(JSON.stringify({
                result: "You didn't add all cars."
            }));
        }
    });
});



async function getCars(arr) {
    let resArr = [];
    for (let i = 0; i < arr.length; i++) {
        let curObj;
        sendPost("http://localhost:1010/select/record", JSON.stringify({
            carName: arr[i]
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const answer = answerObject.answer;
            curObj = [answer["name"], answer["cost"]];
        });   
        await new Promise((resolve, reject) => setTimeout(resolve, 50));
        resArr.push(curObj);
    }
    return resArr;
}

// получение информации о машинах на складе по названию склада
app.post("/selectWarehouse", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const warehouse = obj["warehouse"];
        sendPost("http://localhost:1011/select/record", JSON.stringify({
            wareHouseName: warehouse
        }), async function(answerString) {
            const answerObject = JSON.parse(answerString);
            const answer = answerObject.answer;
            if (answer == null) {
                response.end(JSON.stringify({
                    result: "Didn't find anything"
                }));
            } else {
                let res = getCars(answer.cars);
                let resStr = "Результат: " + "склад - " + answer.warehouse;
                await new Promise((resolve, reject) => setTimeout(resolve, answer.cars.length * 50 + 50));
                let res2 = await Promise.resolve(res);
                for (let i = 0; i < res2.length; i++) {
                    resStr += ", " + String(i + 1) + ") машина - " + (res2[i])[0] + ", цена - " + (res2[i])[1]; 
                }
                response.end(JSON.stringify({
                    result: resStr
                }));
            }
        }); 
    });
});