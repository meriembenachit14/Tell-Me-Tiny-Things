/* =========================
   Tiny Whispers — MAIN JS
   ========================= */

/* CONFIG */
const CONFIG = {
  assetsPath: "",
  bgmFile: "bgm.mp3"
};

/* Short DOM helpers */
const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

/* ——— Window Load ——— */
window.addEventListener("load", () => {
  const loading = qs("#loading");
  if (loading) loading.style.display = "none";

  initClouds();
  initCounters();
  initMascot();
  initAffirmations();
  initTypingSound();
});

/* ——— Clouds ——— */
function initClouds() {
  const container = qs("#clouds");
  if (!container) return;

  for (let i = 0; i < 6; i++) {
    const c = document.createElement("div");
    c.className = "cloud";

    const w = 120 + Math.random() * 200;
    const h = Math.round(w * 0.55);

    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    c.style.left = `${-200 - Math.random() * 200}px`;
    c.style.top = `${8 + Math.random() * 78}vh`;
    c.style.opacity = 0.6 + Math.random() * 0.3;
    c.style.animationDuration = `${30 + Math.random() * 40}s`;

    container.appendChild(c);
  }
}

/* ——— Counters ——— */
function initCounters() {
  const visitsKey = "tw_visits_v1";
  const sendsKey = "tw_sends_v1";

  let visits = Number(localStorage.getItem(visitsKey) || 0);
  visits++;
  localStorage.setItem(visitsKey, visits);

  let sends = Number(localStorage.getItem(sendsKey) || 0);

  const vEl = qs("#visitCount");
  if (vEl) vEl.textContent = visits;

  const sEl = qs("#sentCount");
  if (sEl) sEl.textContent = sends;

  const form = qs("#tinyForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      sends++;
      localStorage.setItem(sendsKey, sends);
      if (sEl) sEl.textContent = sends;

      e.preventDefault();
      playConfirmSequence(form);
    });
  }
}

/* ——— Celebration ——— */
function playConfirmSequence(form) {
  spawnHearts(10);
  throwConfetti(26);
  setTimeout(() => form.submit(), 900);
}

function spawnHearts(n) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.className = "heart";
      h.innerText = "💗";
      h.style.left = `${5 + Math.random() * 90}vw`;
      h.style.fontSize = `${14 + Math.random() * 18}px`;
      h.style.zIndex = 1400;
      h.style.animationDuration = `${4200 + Math.random() * 3000}ms`;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 9000);
    }, i * 70);
  }
}

function throwConfetti(n) {
  const colors = ["#ff9edb", "#c79aff", "#ffd4f4", "#fff6ea"];
  for (let i = 0; i < n; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.style.left = `${10 + Math.random() * 80}vw`;
    el.style.top = `${-10 - Math.random() * 10}vh`;
    el.style.width = `${6 + Math.random() * 12}px`;
    el.style.height = el.style.width;
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = "2px";
    el.style.zIndex = 1300;
    el.style.opacity = 0.95;
    el.style.animation = `drop ${900 + Math.random() * 700}ms forwards ease`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
}

/* ——— Typing Sound ——— */
let typingAudio = null;

function initTypingSound() {
  const beep = qs("#typeBeep");
  if (!beep) return;
  typingAudio = beep;
  typingAudio.volume = 0.18;

  qsa("#message, #codename").forEach((el) => {
    el.addEventListener("input", () => {
      try {
        typingAudio.currentTime = 0;
        typingAudio.play();
      } catch (e) {}
    });
  });
}

/* ——— Mascot ——— */
function initMascot() {
  const mascot = qs("#mascot");
  if (!mascot) return;

  setInterval(() => {
    mascot.style.transform = "translateY(-8px) rotate(4deg)";
    setTimeout(() => (mascot.style.transform = ""), 520);
  }, 3800);

  const txt = qs("#message");
  if (txt) {
    txt.addEventListener("focus", () => {
      mascot.style.transform =
        "translateY(-12px) rotate(-3deg) scale(1.02)";
      setTimeout(() => (mascot.style.transform = ""), 700);
    });
  }
}

/* ——— Affirmations ——— */
function initAffirmations() {
  const lines = [
    "You matter — even the tiny things.",
    "It's safe to whisper here.",
    "Small truths are still truths.",
    "A little thought can mean a lot.",
    "Thank you for being brave.",
  ];

  const el = qs("#affirmation");
  if (!el) return;

  let i = 0;

  function rotate() {
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = lines[i];
      i = (i + 1) % lines.length;
      el.style.opacity = 1;
    }, 300);
  }

  rotate();
  setInterval(rotate, 4200);
}

/* ——— Toolbar + Audio ——— */
(function initAudioToolbar() {
  const bgmEl = qs("#bgm");
  const darkBtn = qs("#darkToggle");
  const musicBtn = qs("#musicToggle");
  const helpBtn = qs("#helpBtn");
  const helpModal = qs("#helpModal");
  const helpClose = qs("#helpClose");

  if (bgmEl) {
    bgmEl.src = CONFIG.bgmFile;
    bgmEl.volume = 0.22;
  }

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (!bgmEl) return;
      if (bgmEl.paused) {
        bgmEl.play().catch(() => {});
        musicBtn.textContent = "🔊";
      } else {
        bgmEl.pause();
        musicBtn.textContent = "🔈";
      }
    });
  }

  if (helpBtn && helpModal) {
    helpBtn.addEventListener("click", () =>
      helpModal.classList.add("show")
    );
    if (helpClose)
      helpClose.addEventListener("click", () =>
        helpModal.classList.remove("show")
      );
    helpModal.addEventListener("click", (e) => {
      if (e.target === helpModal)
        helpModal.classList.remove("show");
    });
  }
})();

/* ——— Inject Keyframe ——— */
(function injectKF() {
  const s = document.createElement("style");
  s.innerHTML = `
    @keyframes drop {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(110vh); opacity: 0; }
    }
  `;
  document.head.appendChild(s);
})();
