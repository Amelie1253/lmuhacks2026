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
    // if (this.checked) {
    //     console.log('TAB enabled');
    //     console.log("Starting work alarm")
    //     chrome.alarms.create("work-alarm", { delayInMinutes: Number(timeSlider.value) });
    //     // chrome.alarms.create("warning-alarm", { delayInMinutes: (1 / 60) * 15, periodInMinutes: (1 / 60) * 15 });
    // }
    // else {
    //     console.log('TAB disabled')
    //     chrome.alarms.clearAll()
    // }
});

export { timeSlider }; 

const tabButton = document.getElementById("tabButton");
const timeSlider = document.getElementById("timeSlider");
const timeValue = document.getElementById('rangeValue');

// Load saved values
chrome.storage.local.get(['tabState', 'workMinutes'], (res) => {
  tabButton.checked = res.tabState || false;
  timeSlider.value = res.workMinutes || 30;
  timeValue.textContent = timeSlider.value;
});

timeSlider.addEventListener('input', function() {
  timeValue.textContent = this.value;
  chrome.storage.local.set({ workMinutes: Number(this.value) });
});

tabButton.addEventListener("change", function() {
  chrome.storage.local.set({ tabState: this.checked });
});