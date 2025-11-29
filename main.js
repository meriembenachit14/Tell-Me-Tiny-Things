/* ============================
   Loading Screen
============================ */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
    }, 400);
  }, 600);
});

/* ============================
   Clouds Generator
============================ */
const cloudContainer = document.getElementById("clouds");
function makeCloud(size) {
  const c = document.createElement("div");
  c.className = `cloud ${size}`;
  c.style.top = Math.random() * 90 + "vh";
  c.style.left = Math.random() * 90 + "vw";
  c.style.animation = `floatCloud ${12 + Math.random()*10}s ease-in-out infinite`;
  cloudContainer.appendChild(c);
}

["small","med","large"].forEach(size => {
  for (let i = 0; i < 4; i++) makeCloud(size);
});

/* ============================
   Floating Hearts
============================ */
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = "💖";
  h.style.left = Math.random()*100 + "vw";
  h.style.bottom = "-20px";
  h.style.animationDuration = (4 + Math.random()*3) + "s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 5000);
}
setInterval(spawnHeart, 1400);

/* ============================
   Dark Mode
============================ */
const darkBtn = document.getElementById("darkToggle");
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* ============================
   Music Toggle
============================ */
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicToggle");
let musicOn = false;

musicBtn.addEventListener("click", () => {
  if (!musicOn) {
    bgm.volume = 0.6;
    bgm.play().catch(() => {});
    musicBtn.textContent = "🔈";
  } else {
    bgm.pause();
    musicBtn.textContent = "🔊";
  }
  musicOn = !musicOn;
});

/* ============================
   Form – Send + Local Stats
============================ */
const form = document.getElementById("tinyForm");
const sentCount = document.getElementById("sentCount");
const visitCount = document.getElementById("visitCount");

// count visits
let visits = localStorage.getItem("tw_visits") || 0;
visits++;
localStorage.setItem("tw_visits", visits);
visitCount.textContent = visits;

// count sends
let sends = localStorage.getItem("tw_sends") || 0;
sentCount.textContent = sends;

// clear button
document.getElementById("clearBtn").addEventListener("click", () => {
  form.reset();
});

// on submit, increment sends
form.addEventListener("submit", () => {
  sends++;
  localStorage.setItem("tw_sends", sends);
});

/* ============================
   Help Modal
============================ */
const helpModal = document.getElementById("helpModal");
document.getElementById("helpBtn").onclick = () => helpModal.classList.add("show");
document.getElementById("helpClose").onclick = () => helpModal.classList.remove("show");
