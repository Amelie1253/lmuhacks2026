const tabButton = document.getElementById("tabButton");
const timerButton = document.getElementById("timerButton");
const gameButton = document.getElementById("gameButton");

if (localStorage.getItem("tabState") && localStorage.getItem("tabState") === "true" ) {
    tabButton.checked = true
} else {
    tabButton.checked = false
}

tabButton.addEventListener("change", async function() {
    localStorage.setItem("tabState", this.checked)
    if (this.checked) {
        console.log('TAB enabled');
        console.log("Starting alarm")
        chrome.alarms.create({ delayInMinutes: (1 / 60) * 15, periodInMinutes: (1 / 60) * 15 });
    }
    else {
        console.log('TAB disabled')
        chrome.alarms.clear("screentime-alarm")
    }
});