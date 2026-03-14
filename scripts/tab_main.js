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
        console.log("Starting alarm for 1 minute")

        await chrome.alarms.create('screentime-alarm', {
                delayInMinutes: 1,
                periodInMinutes: 1
            });
    }
    else {
        console.log('TAB disabled')
    }
});