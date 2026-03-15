chrome.alarms.onAlarm.addListener(async (e) => {
  //once timer is up
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      if (e.name === "work-alarm") {
        console.log("Starting warning alarm")
        chrome.alarms.create("warning-alarm", { delayInMinutes: 2.5 });
        broadcast({ phase: 'warning' });
      }
      if (e.name === "warning-alarm") {
        console.log("Starting break alarm")
        chrome.alarms.create("break-alarm", { delayInMinutes: 5 });
        broadcast({ phase: 'break' });
    }
      if (e.name === "break-alarm") {
        console.log("Starting work alarm")
        chrome.alarms.create("work-alarm", { delayInMinutes: localStorage.getItem("timerValue")});
        broadcast({ phase: 'work' });
    }
  }
}
  console.log("Alarm is firing")
});

async function broadcast(message) {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      chrome.tabs.sendMessage(tab.id, message).catch(() => {});
    }
  }
}
