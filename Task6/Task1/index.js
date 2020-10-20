"use strict";

let games = [
    {name : "SKYRIM", description : "приключенческая ролевая игра", restrictions : 16},
    {name : "Grand Theft Auto 5", description : "Игроку предоставлена полная свобода действий - он может путешествовать по городу и его окрестностям, грабить прохожих, воровать машины - или же жить простой жизнью обычного человека.", restrictions : 18},
    {name : "MineCraft", description : "инди-игра в жанре песочницы с элементами выживания и открытым миром. ", restrictions : 0},
    {name : "Assassin's Creed", description : "приключенческий экшен от третьего лица. ", restrictions : 18},
    {name : "Mass Effect", description : "мультиплатформенный сиквел, вторая часть космической ролевой оперы. ", restrictions : 16},
    {name : "Mafia", description : "риключенческий экшен, который переносит игроков в преступный мир Америки 40-50-х годов прошлого века.", restrictions : 18},
    {name : "Far Cry", description : "приключенческий шутер от первого лица с открытым миром и элементами RPG", restrictions : 18},
];

// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function findNeedGames(age) {
    let arr = [];
    for (let i = 0; i < games.length; i++) {
        let obj = games[i];
        if (Number(age) > obj.restrictions) {
            arr.push(obj);
        }
    }
    return arr;
}
 
// выдача страницы с информацией о компьютерных играх
app.get("/page/getGames", function(request, response) {
    const age = request.query.age;
    let res = findNeedGames(age);
    console.log(res);
    const infoObject = {
        games : res
    };
    response.render("pageGetGames.hbs", infoObject);
});
//http://localhost:5000/page/getGames?age=${15}