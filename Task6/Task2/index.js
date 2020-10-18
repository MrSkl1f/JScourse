"use strict";

let users = [
    {login : "nagibator228", password : "228", hobby : "Копатели онлайн", age : 16},
    {login : "PBOTA_EHOTA", password : "1234", hobby : "МАЙНКРАФТ - ЭТО МОЯ ЖИЗНЬ", age : 13},
    {login : "PAK-OMAP", password : "1337", hobby : "Моргенштерн", age : 18},
    {login : "Zalypal", password : "1010", hobby : "Санки", age : 20},
    {login : "ideotko", password : "777", hobby : "Сон", age : 11},
    {login : "Alina-popa", password : "root", hobby : "Программирование", age : 19},
]

// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// работа с сессией
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function checkSignIn(login, password) {
    for (let i = 0; i < users.length; i++) {
        let obj = users[i];
        if (obj.login == login && obj.password == password) {
            return true;
        }
    }
    return false;
}

// http://localhost:5000/api/signIn?login=nagibator228&password=228
app.get("/api/signIn", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;
    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");
    if(!checkSignIn(login, password)) return response.end("Login or password was wrong.");
    request.session.login = login;
    request.session.password = password;
    response.end("You signed in!");
});

function getInfo(login, password) {
    let res = null;
    for (let i = 0; i < users.length; i++) {
        let obj = users[i];
        if (obj.login == login && obj.password == password) {
            res = obj;
            break;
        }
    }
    return res;
}

// http://localhost:5000/api/getInfo
app.get("/api/getInfo", function(request, response) {
    if(!request.session.login) return response.end("Sign in first");
    if(!request.session.password) return response.end("Sign in first");
    const login = request.session.login;
    const password = request.session.password;
    let info = getInfo(login, password);
    console.log(info);
    response.render("pageInfo.hbs", info);
});

// http://localhost:5000/api/logOff
app.get("/api/logOff", function(request, response) {
    request.session = null;
    response.end("You logged off");
});