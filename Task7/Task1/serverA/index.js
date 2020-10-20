"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 1010;
app.listen(port);
console.log("Server on port " + port);

// заголовки для ответа
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// загрузка тела
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

function insertRecord(carName, carCost) {
    let info = JSON.parse(fs.readFileSync("cars.txt", "utf-8"));
    let check = true;
    for (let i = 0; i < info.length; i++) {
        const obj = info[i];
        if (obj["name"] == carName) {
            check = false;
            break;
        }
    }
    if (check) {
        info.push({"name" : carName, "cost" : carCost});
        fs.writeFileSync("cars.txt", JSON.stringify(info));
    }
    return check;
}

// {carName, carCost}
app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const carName = obj.carName;
        const carCost = obj.carCost;
        let res = insertRecord(carName, carCost);
        if (res) {
            response.end(JSON.stringify({
                answer: "Written down (OK)."
            }));
        } else {
            response.end(JSON.stringify({
                answer: "Already written down (ERROR)."
            }));
        }
    });
});

function selectRecord(carName) {
    let info = JSON.parse(fs.readFileSync("cars.txt", "utf-8"));
    for (let i = 0; i < info.length; i++) {
        const obj = info[i];
        if (obj["name"] == carName) {
            return obj;
        }
    }
    
    return null;
}

// {carName}
app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const carName = obj.carName;
        console.log(carName);
        let res = selectRecord(carName);
        response.end(JSON.stringify({
            answer: res
        }));
    });
});
