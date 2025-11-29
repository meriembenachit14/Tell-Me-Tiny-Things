/* =========================================================
   main.js — controls hearts, clouds (DOM), toolbar, form
   ========================================================= */

/* safe DOM helpers */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ---------- page init ---------- */
window.addEventListener('DOMContentLoaded', () => {
  initClouds();      // ensure cloud elements exist (CSS already styles .cloud classes)
  initCounters();    // visits + sent counters
  initHearts();      // start floating hearts generator
  initToolbar();     // dark/music/help handlers
  initForm();        // form submit behavior
});

/* ---------- CLOUDS (the .cloud elements are already in HTML; JS could add more if needed) ---------- */
function initClouds(){
  // Nothing heavy needed — clouds created in HTML and styled in CSS.
  // This function kept for extensibility (future dynamic clouds).
}

/* ---------- HEARTS ---------- */
let heartInterval = null;
function initHearts(){
  // spawn periodic soft hearts
  heartInterval = setInterval(() => {
    spawnHeart();
  }, 900);
}
function spawnHeart(){
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.style.left = (Math.random()*90) + 'vw';
  heart.style.animationDuration = (4 + Math.random()*3) + 's';
  document.body.appendChild(heart);
  setTimeout(()=> heart.remove(), 7000);
}

/* ---------- COUNTERS ---------- */
function initCounters(){
  const visitsKey = 'tw_visits_v2';
  const sendsKey = 'tw_sends_v2';

  let visits = Number(localStorage.getItem(visitsKey) || 0);
  visits++;
  localStorage.setItem(visitsKey, visits);
  const vEl = $('#visitCount');
  if(vEl) vEl.textContent = visits;

  let sends = Number(localStorage.getItem(sendsKey) || 0);
  const sEl = $('#sentCount');
  if(sEl) sEl.textContent = sends;
}

/* ---------- FORM ---------- */
function initForm(){
  const form = $('#tinyForm');
  if(!form) return;

  const sendsKey = 'tw_sends_v2';
  const sentEl = $('#sentCount');
  const clearBtn = $('#clearBtn');
  const textarea = $('#message');

  // clear button
  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      $('#codename').value = '';
      if(textarea) textarea.value = '';
      localStorage.removeItem('tinyDraft_v1');
      textarea && textarea.focus();
    });
  }

  // autosave draft
  if(textarea){
    const draftKey = 'tinyDraft_v1';
    const saved = localStorage.getItem(draftKey);
    if(saved) textarea.value = saved;
    textarea.addEventListener('input', () => {
      localStorage.setItem(draftKey, textarea.value);
      // small typing sound handled by toolbar init (if desired)
    });
  }

  // submit handler: celebrate then submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let sends = Number(localStorage.getItem(sendsKey) || 0);
    sends++;
    localStorage.setItem(sendsKey, sends);
    if(sentEl) sentEl.textContent = sends;
    localStorage.removeItem('tinyDraft_v1');

    // celebration visuals (hearts + confetti) then submit
    spawnConfetti(20);
    spawnHeartBurst(8);

    // short delay for animation then submit to FormSubmit
    setTimeout(()=> form.submit(), 800);
  });
}

/* small confetti (simple rectangles) */
function spawnConfetti(n){
  const colors = ['#ff9edb','#c79aff','#ffd4f4','#fff6ea'];
  for(let i=0;i<n;i++){
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.position='fixed';
    el.style.left = (5 + Math.random()*90) + 'vw';
    el.style.top = (-10 - Math.random()*10) + 'vh';
    el.style.width = (6 + Math.random()*10) + 'px';
    el.style.height = el.style.width;
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.borderRadius='2px';
    el.style.zIndex=1400;
    el.style.opacity=0.95;
    el.style.animation = `confettiDrop ${900 + Math.random()*700}ms forwards ease`;
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 1800);
  }
}
/* confetti keyframe injected */
(function(){ const s=document.createElement('style'); s.innerHTML='@keyframes confettiDrop{0%{transform:translateY(0);opacity:1}100%{transform:translateY(110vh) rotate(200deg);opacity:0}}'; document.head.appendChild(s); })();

function spawnHeartBurst(n){
  for(let i=0;i<n;i++){
    setTimeout(()=> spawnHeart(), i*80);
  }
}

/* ---------- TOOLBAR (music, dark, help) ---------- */
function initToolbar(){
  const darkToggle = $('#darkToggle');
  const musicToggle = $('#musicToggle');
  const helpBtn = $('#helpBtn');
  const helpModal = $('#helpModal');
  const helpClose = $('#helpClose');
  const bgm = $('#bgm');

  // music toggle
  if(musicToggle && bgm){
    musicToggle.addEventListener('click', () => {
      if(bgm.paused){ bgm.play().catch(()=>{}); musicToggle.textContent='🔈'; }
      else { bgm.pause(); musicToggle.textContent='🔊'; }
    });
  }

  // dark toggle
  if(darkToggle){
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const pressed = document.body.classList.contains('dark');
      darkToggle.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });
  }

  // help modal
  if(helpBtn && helpModal){
    helpBtn.addEventListener('click', ()=> helpModal.classList.remove('hidden'));
    if(helpClose) helpClose.addEventListener('click', ()=> helpModal.classList.add('hidden'));
    helpModal.addEventListener('click', (ev) => { if(ev.target===helpModal) helpModal.classList.add('hidden'); });
  }
}

/* ---------- safety (no errors if elements missing) ---------- */
window.addEventListener('error', (e)=>{ /* swallow harmless errors in pages without some elements */ });
