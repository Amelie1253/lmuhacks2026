const tabButton = document.getElementById("tabButton");
const timerButton = document.getElementById("timerButton");
const gameButton = document.getElementById("gameButton");

const timeSlider = document.getElementById("timeSlider")
const timeValue = document.getElementById('rangeValue');

// Update label when slider changes
timeSlider.addEventListener('input', function() {
    timeValue.textContent = this.value;
});

if (localStorage.getItem("tabState") && localStorage.getItem("tabState") === "true" ) {
    tabButton.checked = true
} else {
    tabButton.checked = false
}

tabButton.addEventListener("change", async function() {
    localStorage.setItem("tabState", this.checked)
    localStorage.setItem("timerValue", Number(timeSlider.value))
    if (this.checked) {
        console.log('TAB enabled');
        console.log("Starting work alarm")
        chrome.alarms.create("work-alarm", { delayInMinutes: Number(timeSlider.value)});
    }
    else {
        console.log('TAB disabled')
        chrome.alarms.clearAll()
    }
});