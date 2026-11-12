let wallTile = "W";
let exitTile = "E";
let chestTile = "c";
let monsterTile = "m";
let emptyTile = "-";

let mapArray = [];

const createMapArray = (width, height) => {
    for (let i = 0; i < height; i++) {
        mapArray[i] = [];
        for (let a = 0; a < width; a++) {
            mapArray[i].push(emptyTile);
        }
    }
    console.log(mapArray);
};

const createOuterWalls = () => {
    //top and bottom walls
    for (let i = 0; i < mapArray[0].length; i++) {
        mapArray[0][i] = wallTile;
        mapArray[mapArray.length - 1][i] = wallTile;
    }

    //left and right walls
    for (let i = 0; i < mapArray.length; i++) {
        mapArray[i][0] = wallTile;
        mapArray[i][mapArray[0].length - 1] = wallTile;
    }
};

const createExit = () => {
    //only loops once if placement is wrong, make it loop until
    //the placement is valid
    let x;
    let y;
    let min = 1;
    let maxX = mapArray[0].length - 2;
    let maxY = mapArray.length - 2;

    const exitPlacement = () => {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                x = Math.floor(Math.random() * (maxX - min + 1)) + min;
                y = 0;
                break;

            case 1:
                x = Math.floor(Math.random() * (maxX - min + 1)) + min;
                y = mapArray.length - 1;
                break;

            case 2:
                x = 0;
                y = Math.floor(Math.random() * (maxY - min + 1)) + min;
                break;

            case 3:
                x = mapArray[0].length - 1;
                y = Math.floor(Math.random() * (maxY - min + 1)) + min;
                break;
        }

        console.log(`exit placed at ${x}, ${y}`);
    };

    exitPlacement();
    mapArray[y][x] = exitTile;

    console.log(mapArray);
};

const createMap = (width = 5, height = 5) => {
    mapArray = [];
    createMapArray(width, height);
    createOuterWalls();
    createExit();
    //create path from exit to start
    //add branches from the main path that are between 1-5 tiles long
    //add chests on spots surrounded by 3 tiles (so it doesn't block the way)
    //add monsters on random spots. The amount is based on the map size
};

createMap(3, 6);

/////////////////////////////////////

class monster {
    HP;
    DMG;

    attack() {}
    die() {}
}
