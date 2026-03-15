
let phase = 'work';
let workStart = Date.now();
// const timeSlider = document.getElementById("timeSlider")


// const WORK_MINUTES = Number(timeSlider.value); 
const WARN_MINUTES = 2.5;  

chrome.alarms.create('tick', { periodInMinutes: 1/60 }); // every second

chrome.alarms.onAlarm.addListener(async () => {
  const { workMinutes = 30 } = await chrome.storage.local.get('workMinutes');
  const elapsed = (Date.now() - workStart) / 1000 / 60; // minutes elapsed

  if (phase === 'work' && elapsed >= workMinutes ) {
    phase = 'warning';
    broadcast({ phase: 'warning' });
  }

  if (phase === 'warning' && elapsed >= workMinutes + WARN_MINUTES) {
    phase = 'break';
    broadcast({ phase: 'break' });
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'END_BREAK') {
    phase = 'work';
    workStart = Date.now();
    broadcast({ phase: 'work' });
  }
  if (msg.type === 'START_BREAK') {
    phase = 'break';
    workStart = Date.now();
    broadcast({ phase: 'break' });
  }
});

async function broadcast(message) {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      chrome.tabs.sendMessage(tab.id, message).catch(() => {});
    }
  }
}