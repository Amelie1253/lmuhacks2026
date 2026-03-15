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