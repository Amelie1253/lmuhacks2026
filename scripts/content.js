const occupiedRects = [];

const BLOB_CONFIGS = [
  {
    bg: "#FFD6E8",
    face: "😸",
    label: "take a break!",
    stars: ["#FF6B9D", "#FFB3D1", "#FF85B3"],
  },
  {
    bg: "#D6F0FF",
    face: "🌙",
    label: "stretch time~",
    stars: ["#5BB8FF", "#A8DDFF", "#7DC9FF"],
  },
  {
    bg: "#E8D6FF",
    face: "⭐",
    label: "look away!",
    stars: ["#9B5FFF", "#C8A8FF", "#B07FFF"],
  },
  {
    bg: "#D6FFE8",
    face: "🌿",
    label: "breathe!",
    stars: ["#2ECC71", "#7DEBA8", "#50D98A"],
  },
  {
    bg: "#FFF3D6",
    face: "☀️",
    label: "rest your eyes",
    stars: ["#F5A623", "#FFCA70", "#FFB84D"],
  },
];

const STAR_POSITIONS = [
  { top: "-10px", left: "12px" },
  { top: "-8px", right: "14px" },
  { bottom: "-6px", left: "16px" },
  { bottom: "-8px", right: "12px" },
  { top: "20%", left: "-10px" },
  { top: "25%", right: "-10px" },
];

const BLOB_CSS = `
  @keyframes blobPopIn  { 0%{transform:scale(0) rotate(-8deg);opacity:0} 70%{transform:scale(1.08) rotate(2deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes blobPopOut { to{transform:scale(0) rotate(6deg);opacity:0} }
  @keyframes blobFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes twinkle    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
  .blob-popup  { position:fixed; animation:blobPopIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; z-index:999999; }
  .blob-popup.out { animation:blobPopOut 0.3s ease forwards; }
  .blob-inner  { width:100%;height:100%;border-radius:60% 40% 55% 45%/50% 55% 45% 50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;animation:blobFloat 3.5s ease-in-out infinite;box-shadow:0 6px 24px rgba(0,0,0,0.10),inset 0 -3px 0 rgba(0,0,0,0.07);position:relative;overflow:visible; }
  .blob-star   { position:absolute;animation:twinkle var(--td) ease-in-out infinite;animation-delay:var(--dl);pointer-events:none;font-size:var(--fs); }
  .blob-face   { font-size:28px;line-height:1;z-index:1; }
  .blob-label  { font-size:12px;font-weight:600;color:rgba(0,0,0,0.55);letter-spacing:0.02em;text-align:center;padding:0 16px;z-index:1;font-family:sans-serif; }
`;

// Inject styles once
if (!document.getElementById("blob-styles")) {
  const style = document.createElement("style");
  style.id = "blob-styles";
  style.textContent = BLOB_CSS;
  document.head.appendChild(style);
}

function findOpenPosition(width, height) {
  const margin = -150;
  const maxAttempts = 50;
  for (let i = 0; i < maxAttempts; i++) {
    const x = margin + Math.random() * (window.innerWidth - width - margin * 2);
    const y =
      margin + Math.random() * (window.innerHeight - height - margin * 2);
    const overlaps = occupiedRects.some(
      (r) =>
        x < r.x + r.w + margin &&
        x + width + margin > r.x &&
        y < r.y + r.h + margin &&
        y + height + margin > r.y,
    );
    if (!overlaps) return { x, y };
  }
  return null;
}

function showPopup() {
  const width = 300,
    height = 300;
  const pos = findOpenPosition(width, height);
  if (!pos) return;

  const cfg = BLOB_CONFIGS[Math.floor(Math.random() * BLOB_CONFIGS.length)];

  const stars = STAR_POSITIONS.map((s, i) => {
    const styleStr = Object.entries(s)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
    const col = cfg.stars[i % cfg.stars.length];
    const td = (0.7 + Math.random() * 0.9).toFixed(2) + "s";
    const dl = (Math.random() * 1.2).toFixed(2) + "s";
    const fs = 10 + Math.floor(Math.random() * 6) + "px";
    return `<span class="blob-star" style="${styleStr};--td:${td};--dl:${dl};--fs:${fs};color:${col}">★</span>`;
  }).join("");

  const popup = document.createElement("div");
  popup.className = "blob-popup";
  popup.style.cssText = `left:${pos.x}px; top:${pos.y}px; width:${width}px; height:${height}px;`;
  popup.innerHTML = `
    <div class="blob-inner" style="background:${cfg.bg}">
      ${stars}
      <div class="blob-face">${cfg.face}</div>
      <div class="blob-label">${cfg.label}</div>
    </div>
  `;
  document.body.appendChild(popup);

  const rect = { x: pos.x, y: pos.y, w: width, h: height, el: popup };
  occupiedRects.push(rect);
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.phase === 'screentime-alarm') {
      console.log("Showing popup")
      showPopup();
    }
  });