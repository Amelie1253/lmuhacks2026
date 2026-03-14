console.log("hi")
const tabButton = document.getElementById("tabButton");

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    active = false
});

if (active) {
    tabButton.checked = true
}