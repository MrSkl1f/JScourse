"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 1011;
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

function insertRecord(warehouse, cars) {
    let info = JSON.parse(fs.readFileSync("carWarehouse.txt", "utf-8"));
    let check = true;
    for (let i = 0; i < info.length; i++) {
        const obj = info[i];
        if (obj["warehouse"] == warehouse) {
            check = false;
            break;
        }
    }
    if (check) {
        info.push({"warehouse" : carName, "cars" : cars});
        fs.writeFileSync("cars.txt", JSON.stringify(info));
    }
    return check;
}

// {wareHouseName, arrOfCars}
app.post("/insert/record", function(request, response) {
    console.log("yes");
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const warehouse = obj.wareHouseName;
        const cars = obj.arrOfCars;
        let res = insertRecord(warehouse, cars);
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

function selectRecord(warehouse) {
    let info = JSON.parse(fs.readFileSync("carWarehouse.txt", "utf-8"));
    for (let i = 0; i < info.length; i++) {
        const obj = info[i];
        if (obj["warehouse"] == warehouse) {
            return obj;
        }
    }
    return null;
}

// {wareHouseName}
app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const warehouse = obj.wareHouseName;
        let res = selectRecord(warehouse);
        response.end(JSON.stringify({
            answer: res
        }));
    });
});