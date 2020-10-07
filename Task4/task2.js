// Запустить сервер. На стороне сервера должен храниться файл, внутри которого находится JSON строка. 
// В этой JSON строке хранится информация о массиве объектов.
// Реализовать на сервере функцию, которая принимает индекс и выдает содержимое ячейки массива по данному индексу.
// Реализовать страницу с формой ввода для отправки запроса на сервер.

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

app.get("/task2/index", function(request, response) {
    let i = parseInt(request.query.i);
    let groups = JSON.parse(fs.readFileSync("task2.txt", "utf8"));
    if (i >= 0 && i < groups.length) {
        const answerJSON = JSON.stringify({result: groups[i]});
        response.end(answerJSON);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});