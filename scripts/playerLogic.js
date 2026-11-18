let playerPos = startCoords;
let gameWon = false;
let steps = 0;

let lastKey;
let keyDown;

const map = document.querySelector(".map");
const textLog = document.querySelector(".log-text-container");
const stepCounter = document.querySelector(".log-steps");
const buttonLeft = document.querySelector(".controls-item.left");
const buttonRight = document.querySelector(".controls-item.right");
const buttonUp = document.querySelector(".controls-item.up");
const buttonDown = document.querySelector(".controls-item.down");

const colorMain = "#8afc73";
const colorSecondary = "#52b23f";
const colorTertiary = "#206811";

const setWin = () => {
    printMap();
    setVisibleTiles();
    logAction("win");
    gameWon = true;
};

const setVisibleTiles = () => {
    const getChildNum = (rows, items) => {
        const childNum =
            Number(mapArray[0].length) * Number(rows) + Number(items);
        return childNum;
    };

    const tiles = [
        [playerPos[0], playerPos[1]],
        //direct connection
        [playerPos[0], playerPos[1] - 1],
        [playerPos[0], playerPos[1] + 1],
        [playerPos[0] - 1, playerPos[1]],
        [playerPos[0] + 1, playerPos[1]],
        //corners
        [playerPos[0] - 1, playerPos[1] - 1, "corner"],
        [playerPos[0] - 1, playerPos[1] + 1, "corner"],
        [playerPos[0] + 1, playerPos[1] - 1, "corner"],
        [playerPos[0] + 1, playerPos[1] + 1, "corner"],
    ];

    for (element in tiles) {
        let thisTile = tiles[element];

        //out of bounds check
        if (
            thisTile[0] > mapArray.length - 1 ||
            thisTile[0] < 0 ||
            thisTile[1] > mapArray[0].length - 1 ||
            thisTile[1] < 0
        ) {
            continue;
        }

        //set color of tile
        if (thisTile[0] === playerPos[0] && thisTile[1] === playerPos[1]) {
            map.children[getChildNum(thisTile[0], thisTile[1])].style.color =
                colorMain;
            map.children[getChildNum(thisTile[0], thisTile[1])].style.zIndex =
                2;
            continue;
        }

        if (thisTile[0] === exitCoords[0] && thisTile[1] === exitCoords[1]) {
            map.children[getChildNum(thisTile[0], thisTile[1])].style.color =
                colorMain;
            map.children[getChildNum(thisTile[0], thisTile[1])].style.zIndex =
                2;
            continue;
        }

        if (thisTile[2] === "corner") {
            map.children[getChildNum(thisTile[0], thisTile[1])].style.color =
                colorTertiary;
            map.children[getChildNum(thisTile[0], thisTile[1])].style.zIndex =
                2;
            continue;
        }

        map.children[getChildNum(thisTile[0], thisTile[1])].style.color =
            colorSecondary;
        map.children[getChildNum(thisTile[0], thisTile[1])].style.zIndex = 2;
    }
};

const logAction = (action) => {
    let newText = document.createElement("div");
    newText.classList.add("log-text");

    switch (action) {
        case "start":
            newText.textContent =
                "You wake up in a dark place surrounded by stone walls.";

            let newText2 = document.createElement("div");
            newText2.classList.add("log-text");
            newText2.textContent =
                "You don't know where you are but one thing is for certain: you need to get out ASAP";

            setTimeout(() => {
                textLog.insertBefore(newText2, textLog.firstChild);
            }, 2000);

            break;
        case "object":
            newText.textContent =
                "You can't move there, something is in the way";
            break;
        case "left":
            newText.textContent = "You move left";
            break;
        case "right":
            newText.textContent = "You move right";
            break;
        case "up":
            newText.textContent = "You move up";
            break;
        case "down":
            newText.textContent = "You move down";
            break;
        case "win":
            newText.textContent = "Congrats, you found the exit! You win!";
            break;
    }

    textLog.insertBefore(newText, textLog.firstChild);
};

const updateSteps = () => {
    stepCounter.textContent = "steps taken: " + steps;
};

const movePlayer = (dir) => {
    if (!gameWon) {
        switch (dir) {
            case "start":
                mapArray[playerPos[0]][playerPos[1]] = player;
                logAction("start");
                break;

            case "left":
                if (isWall(dir, playerPos[0], playerPos[1])) {
                    logAction("object");
                    break;
                }

                if (isExit(dir, playerPos[0], playerPos[1])) {
                    mapArray[playerPos[0]][playerPos[1]] = pathTile;
                    playerPos[1] = playerPos[1] - 1;
                    steps++;
                    logAction(dir);
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[1] = playerPos[1] - 1;
                steps++;
                logAction(dir);
                break;

            case "right":
                if (isWall(dir, playerPos[0], playerPos[1])) {
                    logAction("object");
                    break;
                }

                if (isExit(dir, playerPos[0], playerPos[1])) {
                    mapArray[playerPos[0]][playerPos[1]] = pathTile;
                    playerPos[1] = playerPos[1] + 1;
                    steps++;
                    logAction(dir);
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[1] = playerPos[1] + 1;
                steps++;
                logAction(dir);
                break;

            case "up":
                if (isWall(dir, playerPos[0], playerPos[1])) {
                    logAction("object");
                    break;
                }

                if (isExit(dir, playerPos[0], playerPos[1])) {
                    mapArray[playerPos[0]][playerPos[1]] = pathTile;
                    playerPos[0] = playerPos[0] - 1;
                    steps++;
                    logAction(dir);
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[0] = playerPos[0] - 1;
                steps++;
                logAction(dir);
                break;

            case "down":
                if (isWall(dir, playerPos[0], playerPos[1])) {
                    logAction("object");
                    break;
                }

                if (isExit(dir, playerPos[0], playerPos[1])) {
                    mapArray[playerPos[0]][playerPos[1]] = pathTile;
                    playerPos[0] = playerPos[0] + 1;
                    steps++;
                    logAction(dir);
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[0] = playerPos[0] + 1;
                steps++;
                logAction(dir);
                break;
        }

        mapArray[playerPos[0]][playerPos[1]] = player;
        printMap();
        setVisibleTiles();
        updateSteps();
        console.log("steps taken: " + steps);
    }
};

document.addEventListener("keydown", (event) => {
    if (!keyDown) {
        lastKey = event.key;

        switch (event.key) {
            case "ArrowLeft":
            case "a":
            case "A":
                movePlayer("left");
                keyDown = true;
                break;
            case "ArrowRight":
            case "d":
            case "D":
                movePlayer("right");
                keyDown = true;
                break;
            case "ArrowUp":
            case "w":
            case "W":
                movePlayer("up");
                keyDown = true;
                break;
            case "ArrowDown":
            case "s":
            case "S":
                movePlayer("down");
                keyDown = true;
                break;
        }
    }
});

document.addEventListener("keyup", (event) => {
    event.key === lastKey ? (keyDown = false) : "";
});

buttonLeft.addEventListener("click", (event) => {
    movePlayer("left");
});
buttonRight.addEventListener("click", (event) => {
    movePlayer("right");
});
buttonUp.addEventListener("click", (event) => {
    movePlayer("up");
});
buttonDown.addEventListener("click", (event) => {
    movePlayer("down");
});

movePlayer("start");
printMap();
setVisibleTiles();
