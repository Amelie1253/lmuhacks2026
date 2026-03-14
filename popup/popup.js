const tabButton = document.getElementById("tabButton");
const timerButton = document.getElementById("timerButton");
const gameButton = document.getElementById("gameButton");

tabButton.addEventListener("change", function() {
    if (this.checked) {
        console.log('TAB enabled');
    }
    else {
        console.log('TAB disabled')
    }
});