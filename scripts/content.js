chrome.alarms.onAlarm.addListener(async (alarm) => {
    console.log("Alarm fired")
      // get active tab
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tab) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: createPopup
    });
});

