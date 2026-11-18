const debugButton = document.querySelector(".debug-button");
let isDebugMode = false;

const checkMode = () => {
    if (isDebugMode) {
        map.style.backgroundColor = "white";
    } else {
        map.style.backgroundColor = "black";
    }
};

checkMode();

debugButton.addEventListener("click", (event) => {
    console.log("clicked button");
    if (!isDebugMode) {
        isDebugMode = true;
        checkMode();
    } else {
        isDebugMode = false;
        checkMode();
    }
});
