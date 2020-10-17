// Написать программу, которая на вход получает массив названий полей и адрес запроса (куда отправлять).
// Программа должна генерировать HTML разметку страницы, в которую встроена форма для отправки запроса.

const fs = require("fs");
const express = require("express");
const htmlStart = "<!DOCTYPE html>\n\
<html>\n\
<head>\n\
\t<meta charset='UTF-8'>\n\
\t<title>Task 3</title>\n\
</head>\n\
<body>\n\
\t<h1>Task 3</h1>\n"
const htmlEnd    = "\t\t<br>\n\
\t\t<input type='submit' value='Отправить запрос'>\n\
\t</form>\n\
</body>\n\
</html>\n";

function createArr(jsonArr) {
    let arr = JSON.parse(jsonArr);
    return arr;
}

function createPage(arr, address) {
    fs.writeFileSync("task3End.html", htmlStart);
    let adr = "\t<form method='GET' action=\"" + address + "\">\n";
    fs.appendFileSync("task3End.html", adr);
    for (let i = 0; i < arr.length; i++) {
        let curStr = "\t\t<p>Введите поле " + arr[i] + "</p>\n" + 
            "\t\t<input name=\"" + arr[i] + "\" spellcheck='false' autocomplete='off'>\n";
            fs.appendFileSync("task3End.html", curStr);
    }
    fs.appendFileSync("task3End.html", htmlEnd);
}

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

app.get("/task3/createPage", function(request, response) {
    let address = request.query.address;
    try {
        let arr = createArr(request.query.arr);
        createPage(arr, address);
        const contentString = fs.readFileSync("task3End.html", "utf8");
        response.end(contentString);
    } catch (error) {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});
