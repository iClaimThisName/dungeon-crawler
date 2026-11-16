let playerPos = startCoords;
let gameWon = false;

const setWin = () => {
    console.log("You found the exit! Congrats, you win");
    gameWon = true;
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
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[1] = playerPos[1] - 1;
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
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[1] = playerPos[1] + 1;
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
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[0] = playerPos[0] - 1;
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
                    setWin();
                    break;
                }

                mapArray[playerPos[0]][playerPos[1]] = pathTile;
                playerPos[0] = playerPos[0] + 1;
                break;
        }

        mapArray[playerPos[0]][playerPos[1]] = player;
        printMap();
    }
};

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
        case "a":
        case "A":
            movePlayer("left");
            break;
        case "ArrowRight":
        case "d":
        case "D":
            movePlayer("right");
            break;
        case "ArrowUp":
        case "w":
        case "W":
            movePlayer("up");
            break;
        case "ArrowDown":
        case "s":
        case "S":
            movePlayer("down");
            break;
    }
});

movePlayer("start");
printMap();

//place player at the starting point
//move when pressing keys
//when moved, replace the last tile with a path tile
//if player tries to move into a non-path tile, stop it and log error
//^^ Except if it's the exit tile, then log "you win!!!"
//print map after every movement
