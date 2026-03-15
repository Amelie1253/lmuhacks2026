chrome.alarms.onAlarm.addListener(async (e) => {
  //once timer is up
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      if (e.name === "work-alarm") {
        console.log("Starting warning alarm")
        chrome.alarms.create("warning-alarm", { delayInMinutes: (1 / 60) * 15, periodInMinutes: (1 / 60) * 15 });
      }
      if (e.name === "warning-alarm")
        chrome.tabs.sendMessage(tab.id, {phase: 'warning-alarm'}).catch(() => {});
    }
  }
  console.log("Alarm is firing")
});
