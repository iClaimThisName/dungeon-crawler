let wallTile = "W";
let startTile = "S";
let exitTile = "E";
let pathTile = "p";
let chestTile = "c";
let monsterTile = "m";
let emptyTile = "-";

let mapArray = [];
let exitCoords;

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

    console.log(`exit placed at y: ${y} and x: ${x}`);

    mapArray[y][x] = exitTile;
    exitCoords = [y, x];
};

const createPath = () => {
    let isFirstMove = true;
    let dir;
    let lastSpot;
    let y = exitCoords[0];
    let x = exitCoords[1];
    let furthest = [];
    let diffScore;
    let tileAmount = Math.floor(
        0.5 * ((mapArray.length - 2) * (mapArray[0].length - 2)),
    );
    console.log("required path tiles: " + tileAmount);

    const setLastSpot = () => {
        if (dir === "left") {
            return "right";
        }
        if (dir === "right") {
            return "left";
        }
        if (dir === "up") {
            return "down";
        }
        if (dir === "down") {
            return "up";
        }
    };

    const isWall = (direction, y, x) => {
        switch (direction) {
            case "left":
                if (
                    mapArray[y][x - 1] === wallTile ||
                    mapArray[y][x - 1] === exitTile
                ) {
                    return true;
                } else {
                    return false;
                }
            case "right":
                if (
                    mapArray[y][x + 1] === wallTile ||
                    mapArray[y][x + 1] === exitTile
                ) {
                    return true;
                } else {
                    return false;
                }
            case "up":
                if (
                    mapArray[y - 1][x] === wallTile ||
                    mapArray[y - 1][x] === exitTile
                ) {
                    return true;
                } else {
                    return false;
                }
            case "down":
                if (
                    mapArray[y + 1][x] === wallTile ||
                    mapArray[y + 1][x] === exitTile
                ) {
                    return true;
                } else {
                    return false;
                }
        }
    };

    const setDir = () => {
        if (!isFirstMove) {
            do {
                switch (Math.floor(Math.random() * 6)) {
                    case 0:
                        dir = "left";
                        break;
                    case 1:
                        dir = "right";
                        break;
                    case 2:
                        dir = "up";
                        break;
                    case 3:
                        dir = "down";
                        break;
                    //make it more likely to move straight
                    case 4 & 5:
                        break;
                }
            } while (dir === lastSpot || isWall(dir, y, x));
        } else {
            exitCoords[0] === 0 ? (dir = "down") : "";
            exitCoords[0] === mapArray.length - 1 ? (dir = "up") : "";
            exitCoords[1] === 0 ? (dir = "right") : "";
            exitCoords[1] === mapArray[0].length - 1 ? (dir = "left") : "";

            console.log("direction to go is: " + dir);
            isFirstMove = false;
        }
    };

    const checkFurthestFromExit = () => {
        let yDiff;
        let xDiff;

        if (y > exitCoords[0]) {
            yDiff = y - exitCoords[0];
        } else if (y < exitCoords[0]) {
            yDiff = exitCoords[0] - y;
        } else {
            yDiff = 0;
        }

        if (x > exitCoords[1]) {
            xDiff = x - exitCoords[1];
        } else if (y < exitCoords[1]) {
            xDiff = exitCoords[1] - x;
        } else {
            xDiff = 0;
        }

        if (!diffScore || xDiff + yDiff > diffScore) {
            furthest[0] = y;
            furthest[1] = x;
            diffScore = xDiff + yDiff;
        }
    };

    const placeTiles = () => {
        for (i = 0; i <= tileAmount; i++) {
            setDir();
            lastSpot = setLastSpot();

            switch (dir) {
                case "left":
                    x--;
                    break;
                case "right":
                    x++;
                    break;
                case "up":
                    y--;
                    break;
                case "down":
                    y++;
                    break;
            }

            checkFurthestFromExit();

            if (i === tileAmount) {
                mapArray[furthest[0]][furthest[1]] = startTile;
            }

            mapArray[y][x] = pathTile;
        }
    };

    const placeStart = () => {
        mapArray[furthest[0]][furthest[1]] = startTile;
    };

    placeTiles();
    placeStart();
};

const printMap = () => {
    const cols = mapArray.length;
    const rows = mapArray[0].length;
    const grid = document.querySelector(".test-map");

    grid.style.setProperty("--map-col", cols);
    grid.style.setProperty("--map-row", rows);

    for (element in mapArray) {
        let currentRow = element;

        for (element in mapArray[currentRow]) {
            newDiv = document.createElement("div");
            newDiv.textContent = mapArray[currentRow][element];

            switch (mapArray[currentRow][element]) {
                case exitTile:
                    newDiv.style.color = "red";
                    break;
                case startTile:
                    newDiv.style.color = "blue";
                    break;
                case pathTile:
                    newDiv.style.color = "gray";
            }

            grid.appendChild(newDiv);
        }
    }
};

const createMap = (height = 5, width = 5) => {
    mapArray = [];
    createMapArray(height, width);
    createOuterWalls();
    createExit();
    //create path from exit to start
    createPath();
    console.log(mapArray);
    printMap();
    //add branches from the main path that are between 1-5 tiles long
    //add chests on spots surrounded by 3 tiles (so it doesn't block the way)
    //add monsters on random spots. The amount is based on the map size
};

createMap(15, 15);
