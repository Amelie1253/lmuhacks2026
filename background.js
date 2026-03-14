chrome.runtime.onInstalled.addListener(() => {
  // Register an alarm used to periodically wake up the extension to start pop ups
  chrome.alarms.create({ periodInMinutes: (1 / 60)*15});
});

chrome.alarms.onAlarm.addListener(async () => {
  //once timer is up
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      chrome.tabs.sendMessage(tab.id, {phase: 'alarm'}).catch(() => {});
    }
  }
  console.log("timer!")
});
