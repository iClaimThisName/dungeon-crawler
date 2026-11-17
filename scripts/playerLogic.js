let playerPos = startCoords;
let gameWon = false;
let steps = 0;

let lastKey;
let keyDown;

const setWin = () => {
    console.log("You found the exit! Congrats, you win");
    gameWon = true;
};

const setVisibleTiles = () => {
    const map = document.querySelector(".map");

    const getChildNum = (rows, items) => {
        const childNum =
            Number(mapArray[0].length) * Number(rows) + Number(items);
        return childNum;
    };

    let tileLeft = [playerPos[0], playerPos[1] - 1];
    let tileRight = [playerPos[0], playerPos[1] + 1];
    let tileUp = [playerPos[0] - 1, playerPos[1]];
    let tileDown = [playerPos[0] + 1, playerPos[1]];

    map.children[getChildNum(tileLeft[0], tileLeft[1])].style.color = "gray";
    map.children[getChildNum(tileRight[0], tileRight[1])].style.color = "gray";
    map.children[getChildNum(tileUp[0], tileUp[1])].style.color = "gray";
    map.children[getChildNum(tileDown[0], tileDown[1])].style.color = "gray";
    map.children[getChildNum(playerPos[0], playerPos[1])].style.color = "white";
};

const movePlayer = (dir) => {
    if (!gameWon) {
        switch (dir) {
            case "start":
                mapArray[playerPos[0]][playerPos[1]] = player;
                break;

            case "left":
                if (isWall(dir, playerPos[0], playerPos[1])) {
                    console.log(
                        "You can't move there, something is in the way",
                    );
                    break;
                }

                if (isExit(dir, playerPos[0], playerPos[1])) {
                    mapArray[playerPos[0]][playerPos[1]] = pathTile;
                    playerPos[1] = playerPos[1] - 1;
                    steps++;
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[1] = playerPos[1] - 1;
                steps++;
                break;

            case "right":
                if (isWall(dir, playerPos[0], playerPos[1])) {
                    console.log(
                        "You can't move there, something is in the way",
                    );
                    break;
                }

                if (isExit(dir, playerPos[0], playerPos[1])) {
                    mapArray[playerPos[0]][playerPos[1]] = pathTile;
                    playerPos[1] = playerPos[1] + 1;
                    steps++;
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[1] = playerPos[1] + 1;
                steps++;
                break;

            case "up":
                if (isWall(dir, playerPos[0], playerPos[1])) {
                    console.log(
                        "You can't move there, something is in the way",
                    );
                    break;
                }

                if (isExit(dir, playerPos[0], playerPos[1])) {
                    mapArray[playerPos[0]][playerPos[1]] = pathTile;
                    playerPos[0] = playerPos[0] - 1;
                    steps++;
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[0] = playerPos[0] - 1;
                steps++;
                break;

            case "down":
                if (isWall(dir, playerPos[0], playerPos[1])) {
                    console.log(
                        "You can't move there, something is in the way",
                    );
                    break;
                }

                if (isExit(dir, playerPos[0], playerPos[1])) {
                    mapArray[playerPos[0]][playerPos[1]] = pathTile;
                    playerPos[0] = playerPos[0] + 1;
                    steps++;
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[0] = playerPos[0] + 1;
                steps++;
                break;
        }

        mapArray[playerPos[0]][playerPos[1]] = player;
        printMap();
        setVisibleTiles();
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

movePlayer("start");
printMap();
setVisibleTiles();
