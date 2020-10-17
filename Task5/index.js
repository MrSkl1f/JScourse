"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
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

function checkUnique(a, b, c) {
    let info = JSON.parse(fs.readFileSync("file.txt", "utf-8"));
    let check = true;
    for (let i = 0; i < info.length && check; i++) {
        let obj = info[i];
        if (obj["mail"] == a || obj["number"] == c) {
            check = false;
        }
    }
    return check;
}

app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const mail = obj["mainInfo"];
        const name = obj["nameInfo"];
        const number = obj["numberInfo"];
        if (checkUnique(mail, name, number)) {
            let info = JSON.parse(fs.readFileSync("file.txt", "utf-8"));
            info.push({"mail" : mail, "name" : name, "number" : number});
            const obj = JSON.stringify(info);
            fs.writeFileSync("file.txt", obj);
            response.end(JSON.stringify({
                result: "Save content ok"
            }));
        }
        else {
            response.end(JSON.stringify({
                result: "Not unique mail or number"
            }));
        }
    });
});

function getInfo(mail) {
    let info = JSON.parse(fs.readFileSync("file.txt", "utf-8"));
    let result = null;
    for (let i = 0; i < info.length; i++) {
        let obj = info[i];
        if (obj["mail"] == mail) {
            result = obj;
            break;
        }
    }
    return result;
}

app.get("/getInfo", function(request, response) {
    const mail = request.query.mail;
    let res = getInfo(mail);
    response.end(JSON.stringify({
        result: res
    }));
});