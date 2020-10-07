/* Реализовать функции:
1. Create Read Update Delete yes
2. Получение среднего возраста детей yes
3. Получение информации о самом старшем ребенке yes
4. Получение информации о детях, возраст которых входит в заданный отрезок yes
5. Получение информации о детях, фамилия которых начинается с заданной буквы yes
6. Получение информации о детях, фамилия которых длиннее заданного количества символов yes
7. Получение информации о детях, фамилия которых начинается с гласной буквы
*/ 
"use strict";

function checkData(Kids, newObj)
{
    for (let i = 0; i < Kids.length; i++)
    {
        if (Kids[i] === newObj)
        {
            return 0;
        }
    }
    return 1;
}

function CREATE (Kids, newKid)
{
        if (!checkData(Kids, newKid)) 
        {
            console.log("Данный ребенок уже присутствует в хранилище.");
        }       
        else 
        {
            Kids.push(newKid);
        }
}

function READ (Kids, name)
{
    let checkRes = 0;
    for (let i = 0; i < Kids.length; i++)
    {
        if (Kids[i].surname === name)
        {
            console.log("Возраст", name, ":", Kids[i].age);
            checkRes = 1;
            break;
        }
    }
    if (!checkRes)
    {
        console.log("Данный ребенок не найден.");
    }
}

function UPDATE(Kids, name, age)
{
    let checkRes = 0;
    for (let i = 0; i < Kids.length; i++)
    {
        if (Kids[i].surname === name)
        {
            Kids[i].age = age;
            checkRes = 1;
            break;
        }
    }
    if (!checkRes)
    {
        console.log("Данный ребенок не найден.");
    }
}

function DELETE(Kids, name)
{
    let checkRes = 0;
    let index = -1;
    for (let i = 0; i < Kids.length; i++)
    {
        if (Kids[i].surname == name)
        {
            checkRes = 1;
            index = i;
            break;
        }
    }
    if (checkRes)
    {
        Kids.splice(index, 1);
    }
    else
    {
        console.log("Данный ребенок не найден.");
    }
}

function getAverageAge(Kids)
{
    let sum = 0;
    for (let i = 0; i < Kids.length; i++)
    {
        sum += Kids[i].age;
    }
    return sum / Kids.length;
}

function getInfoOnOldestKid(Kids)
{
    let maxAge = 0,
            index = 0;
    for (let i = 0; i < Kids.length; i++)
    {
        if (maxAge < Kids[i].age)
        {
            maxAge = Kids[i].age;
            index = i;
        }
    }
    console.log("Самый старший ребенок", Kids[index].surname, ", возраст :", Kids[index].age);
}

function getInfoOnSegment(Kids, indexFrom, indexTo)
{
    for (let i = indexFrom; i <= indexTo; i++)
    {
        console.log("Имя:", Kids[i].surname, ", возраст:", Kids[i].age);
    }
}

function getInfoByFirstLetter(Kids, letter)
{
    let checkRes = 0;
    for (let i = 0; i < Kids.length; i++)
    {
        if (Kids[i].surname[0] === letter)
        {
            checkRes = 1;
            console.log("Фамилия:", Kids[i].surname, ", Возраст:", Kids[i].age);
        }
    }
    if (!checkRes)
    {
        console.log("Ни одного реенка не было найдено.");
    }
}

function getInfoOnCountOfLetters(Kids, count)
{
    let checkRes = 0;
    for (let i = 0; i < Kids.length; i++)
    {
        if (Kids[i].surname.length > count)
        {
            checkRes = 1;
            console.log("Фамилия:", Kids[i].surname, ", Возраст:", Kids[i].age);
        }
    }
    if (!checkRes)
    {
        console.log("Ни одного реенка не было найдено.");
    }
}

function checkInLine(first, second)
{
    for (let i = 0; i < second.length; i++)
    {
        if (first === second[i])
        {
            return 1;
        }
    }
    return 0;
}

function getInfoByVowel(Kids)
{
    let vowels = "AEIOU"
    let checkRes = 0;
    for (let i = 0; i < Kids.length; i++)
    {
        if (checkInLine(Kids[i].surname[0], vowels))
        {
            checkRes = 1;
            console.log("Фамилия:", Kids[i].surname, ", Возраст:", Kids[i].age);
        }
    }
    if (!checkRes)
    {
        console.log("Ни одного ребнка не было найдено.");
    }
}

let Kids = [];
let frstObject = {"surname" : "Naydenishev", "age" : 20};
let scndObject = {"surname" : "Syslikov", "age" : 19};
let thrdObject = {"surname" : "Sklifasovsky", "age" : 20};
let frthObject = {"surname" : "Orlov", "age" : 15};
CREATE(Kids, frstObject);
CREATE(Kids, scndObject);
CREATE(Kids, thrdObject);
CREATE(Kids, frthObject);
READ(Kids, "Orlov");
//READ(Kids, "Daniil");
UPDATE(Kids, "Orlov", 16);
READ(Kids, "Orlov");
DELETE(Kids, "Orlov");
//console.log(Kids);
getInfoOnOldestKid(Kids);
getInfoOnSegment(Kids, 1, 2);
getInfoByFirstLetter(Kids, "S");
getInfoOnCountOfLetters(Kids, 8);
getInfoByVowel(Kids);