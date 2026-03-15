let phase = 'work';
let workStart = Date.now();

const WORK_MINUTES = 0.1; 
const WARN_MINUTES = 2.5;  
const BREAK_MINUTES = 1; 

chrome.alarms.create('tick', { periodInMinutes: 1/60 }); // every second

chrome.alarms.onAlarm.addListener(async () => {
  const elapsed = (Date.now() - workStart) / 1000 / 60; // minutes elapsed

  if (phase === 'work' && elapsed >= WORK_MINUTES ) {
    phase = 'warning';
    broadcast({ phase: 'warning' });
  }

  if (phase === 'warning' && elapsed >= WORK_MINUTES + WARN_MINUTES) {
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