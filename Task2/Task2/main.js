    "use strict";

    const Triangle = require("./Tiangle");

    let checkTriangle = new Triangle();
    checkTriangle.init(5, 5, 6);
    console.log(checkTriangle.isExist());
    console.log(checkTriangle.getPerimeter());
    console.log(checkTriangle.getArea());
    console.log(checkTriangle.isRectangular());

    console.log("\n");
    let checkNewTriangle = new Triangle();
    checkNewTriangle.init(1, 1, 4);
    console.log(checkNewTriangle.isExist());

    console.log("\n");
    checkNewTriangle.init(3, 4, 5);
    console.log(checkNewTriangle.isExist());
    console.log(checkNewTriangle.isRectangular());