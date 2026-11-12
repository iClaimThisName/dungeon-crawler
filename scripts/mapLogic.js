let wallTile = "W";
let exitTile = "E";
let chestTile = "c";
let monsterTile = "m";
let emptyTile = "-";

let mapArray = [];

const createMapArray = (height, width) => {
    for (let y = 0; y < height; y++) {
        mapArray[y] = [];

        for (let x = 0; x < width; x++) {
            mapArray[y].push(emptyTile);
        }
    }
};

const createOuterWalls = () => {
    for (let y = 0; y < mapArray.length; y++) {
        mapArray[y][0] = wallTile;
        mapArray[y][mapArray[0].length - 1] = wallTile;
    }

    for (let x = 0; x < mapArray[0].length; x++) {
        mapArray[0][x] = wallTile;
        mapArray[mapArray.length - 1][x] = wallTile;
    }
};

const createExit = () => {
    let y;
    let x;
    let min = 1;
    let maxY = mapArray.length - 2;
    let maxX = mapArray[0].length - 2;

    switch (Math.floor(Math.random() * 4)) {
        case 0:
            y = 0;
            x = Math.floor(Math.random() * (maxX - min + 1)) + min;
            break;

        case 1:
            y = mapArray.length - 1;
            x = Math.floor(Math.random() * (maxX - min + 1)) + min;
            break;

        case 2:
            y = Math.floor(Math.random() * (maxY - min + 1)) + min;
            x = 0;
            break;

        case 3:
            y = Math.floor(Math.random() * (maxY - min + 1)) + min;
            x = mapArray[0].length - 1;
            break;
    }

    console.log(`exit placed at y: ${y + 1} and x: ${x + 1}`);

    mapArray[y][x] = exitTile;
};

const createMap = (height = 5, width = 5) => {
    mapArray = [];
    createMapArray(height, width);
    createOuterWalls();
    createExit();
    console.log(mapArray);
    //create path from exit to start
    //add branches from the main path that are between 1-5 tiles long
    //add chests on spots surrounded by 3 tiles (so it doesn't block the way)
    //add monsters on random spots. The amount is based on the map size
};

createMap(6, 3);
