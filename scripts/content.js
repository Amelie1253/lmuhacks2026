function showPopup() {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "0";
  popup.style.left = "0";
  popup.style.width = "50%";
  popup.style.height = "50%";
  popup.style.backgroundColor = "blue"; // Or any color
  popup.style.zIndex = "999999"; // Ensure it's on top
  document.body.appendChild(popup);
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.phase === 'screentime-alarm') {
        showPopup();
    }
  });