let playerPos = startCoords;
let gameWon = false;
let steps = 0;

let lastKey;
let keyDown;

const setWin = () => {
    printMap();
    setVisibleTiles();
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

        if (
            thisTile[0] > mapArray.length - 1 ||
            thisTile[1] > mapArray[0].length - 1
        ) {
            continue;
        }

        if (thisTile[0] === playerPos[0] && thisTile[1] === playerPos[1]) {
            map.children[getChildNum(thisTile[0], thisTile[1])].style.color =
                "yellow";
            continue;
        }

        if (thisTile[0] === exitCoords[0] && thisTile[1] === exitCoords[1]) {
            map.children[getChildNum(thisTile[0], thisTile[1])].style.color =
                "blue";
            continue;
        }

        if (thisTile[2] === "corner") {
            map.children[getChildNum(thisTile[0], thisTile[1])].style.color =
                "#644905";
            continue;
        }

        map.children[getChildNum(thisTile[0], thisTile[1])].style.color =
            "#bb7d0b";
    }
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
