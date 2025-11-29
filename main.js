/* ------------------------------
   Tiny Whispers – main.js
--------------------------------*/

// Cloud generator
window.addEventListener("DOMContentLoaded", () => {
  const cloudContainer = document.getElementById("clouds");

  for (let i = 0; i < 6; i++) {
    const cloud = document.createElement("div");
    cloud.className = "cloud";
    cloud.style.left = Math.random() * 90 + "%";
    cloud.style.animationDuration = 20 + Math.random() * 15 + "s";
    cloudContainer.appendChild(cloud);
  }

  // Loading fade out
  setTimeout(() => {
    document.getElementById("loading").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
    }, 400);
  }, 800);
});

/* ------------------------------
   Affirmations rotation
--------------------------------*/
const affirmations = [
  "You're safe here 💗",
  "Tiny thoughts matter 🌸",
  "You’re doing your best 🫶",
  "Soft hearts are strong hearts 🌷",
  "One tiny whisper at a time 💌"
];

function showAffirmation() {
  const el = document.getElementById("affirmation");
  el.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];
  el.style.opacity = 1;
}
setInterval(showAffirmation, 5000);
showAffirmation();

/* ------------------------------
   LocalStorage counters
--------------------------------*/
let visits = Number(localStorage.getItem("tw_visits") || 0) + 1;
localStorage.setItem("tw_visits", visits);

document.getElementById("visitCount").textContent = visits;

let sends = Number(localStorage.getItem("tw_sends") || 0);
document.getElementById("sentCount").textContent = sends;

/* ------------------------------
   Form handlers
--------------------------------*/
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("codename").value = "";
  document.getElementById("message").value = "";
});

document.getElementById("tinyForm").addEventListener("submit", () => {
  localStorage.setItem("tw_sends", sends + 1);
});

/* ------------------------------
   Dark mode toggle
--------------------------------*/
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* ------------------------------
   Background music
--------------------------------*/
const bgm = document.getElementById("bgm");
bgm.src = "birthday-bgmusic.mp3"; // your file name

let musicOn = false;

document.getElementById("musicToggle").addEventListener("click", () => {
  musicOn = !musicOn;
  if (musicOn) bgm.play();
  else bgm.pause();
});

/* ------------------------------
   Help modal
--------------------------------*/
document.getElementById("helpBtn").addEventListener("click", () => {
  document.getElementById("helpModal").setAttribute("aria-hidden", "false");
});

document.getElementById("helpClose").addEventListener("click", () => {
  document.getElementById("helpModal").setAttribute("aria-hidden", "true");
});
