// Написать программу, которая на вход получает массив названий полей и адрес запроса (куда отправлять).
// Программа должна генерировать HTML разметку страницы, в которую встроена форма для отправки запроса.

const fs = require("fs");
const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

