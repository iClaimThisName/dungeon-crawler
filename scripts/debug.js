const debugButton = document.querySelector(".debug");
let isDebugMode = false;

const unCheck = () => {
    debugButton.checked = false;
};

const checkMode = () => {
    if (isDebugMode) {
        map.style.backgroundColor = "white";
    } else {
        map.style.backgroundColor = "black";
    }
};

checkMode();
unCheck();

debugButton.addEventListener("change", (event) => {
    if (event.target.checked) {
        isDebugMode = true;
        checkMode();
    } else {
        isDebugMode = false;
        checkMode();
    }
});
