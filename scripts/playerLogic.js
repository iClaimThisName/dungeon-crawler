document.addEventListener("keydown", (event) => {
    let buttonPressed;

    switch (event.key) {
        case "ArrowLeft":
        case "a":
        case "A":
            buttonPressed = "left";
            break;
        case "ArrowRight":
        case "d":
        case "D":
            buttonPressed = "right";
            break;
        case "ArrowUp":
        case "w":
        case "W":
            buttonPressed = "up";
            break;
        case "ArrowDown":
        case "s":
        case "S":
            buttonPressed = "down";
            break;
        default:
            buttonPressed = "unknown";
    }

    console.log("button pressed: " + buttonPressed);
});
