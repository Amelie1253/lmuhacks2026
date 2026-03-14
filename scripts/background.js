chrome.alarms.onAlarm.addListener(async () => {
  //once timer is up
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      chrome.tabs.sendMessage(tab.id, {phase: 'screentime-alarm'}).catch(() => {});
    }
  }
  console.log("Alarm is firing")
});
