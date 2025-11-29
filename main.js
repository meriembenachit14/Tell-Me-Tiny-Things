/* ------------------------------------------------------------ */
/* FLOATING HEARTS                                              */
/* ------------------------------------------------------------ */

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 900);

/* ------------------------------------------------------------ */
/* DARK MODE TOGGLE                                             */
/* ------------------------------------------------------------ */

const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* ------------------------------------------------------------ */
/* MUSIC TOGGLE                                                 */
/* ------------------------------------------------------------ */

const music = document.getElementById("bgm");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = "🔈";
  } else {
    music.pause();
    musicToggle.textContent = "🔊";
  }
});

/* ------------------------------------------------------------ */
/* HELP MODAL                                                   */
/* ------------------------------------------------------------ */

const helpBtn = document.getElementById("helpBtn");
const helpModal = document.getElementById("helpModal");
const helpClose = document.getElementById("helpClose");

helpBtn.onclick = () => helpModal.classList.remove("hidden");
helpClose.onclick = () => helpModal.classList.add("hidden");

helpModal.onclick = (e) => {
  if (e.target === helpModal) helpModal.classList.add("hidden");
};

/* ------------------------------------------------------------ */
/* FLOATING CLOUDS — CREATED IN JS                              */
/* ------------------------------------------------------------ */

function spawnCloud(className) {
  const cloud = document.createElement("div");
  cloud.classList.add("cloud", className);
  document.body.appendChild(cloud);
}

spawnCloud("c1");
spawnCloud("c2");
spawnCloud("c3");
spawnCloud("c4");
