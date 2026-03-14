const tabButton = document.getElementById("tabButton");
const timerButton = document.getElementById("timerButton");
const gameButton = document.getElementById("gameButton");

if (localStorage.getItem("tabState") === "true") {
    tabButton.checked = true
}
else {
    tabButton.checked = false
}

tabButton.addEventListener("change", async function() {
    localStorage.setItem("tabState", this.checked)
    if (this.checked) {
        console.log('TAB enabled');
        console.log("Starting alarm")
        chrome.alarms.create({ periodInMinutes: (1 / 60) * 3 });
    }
    else {
        console.log('TAB disabled')
    }
});