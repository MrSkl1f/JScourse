
"use strict";

function checkInterval(startNumber, endNumber, intervalTime, i) {
    let interval = setInterval(() => {
        console.log(startNumber);
        startNumber++;
        if (startNumber == endNumber + 1) {
            clearInterval(interval);
            i++;
            let start = i % 2 * 10 + 1;
            let end = start + 9;
            let intTime = 1000;
            if (i % 2 == 0) {
                intTime = 2000;
            }
            checkInterval(start, end, intTime, i);
        }
    }, intervalTime);
}

checkInterval(1, 10, 2000, 0);

    