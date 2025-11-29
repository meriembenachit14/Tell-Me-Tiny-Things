/* =========================
   Tiny Whispers — main.js
   ========================= */

/* CONFIG */
const CONFIG = { bgmFile: 'bgm.mp3' };

/* helpers */
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

/* loading + init */
window.addEventListener('load', () => {
  // hide loading overlay
  const loading = qs('#loading');
  if (loading) loading.style.opacity = '0';
  setTimeout(() => { if (loading) loading.style.display = 'none'; }, 420);

  initClouds();
  initCounters();
  initMascot();
  initAffirmations();
  initTypingSound();
  initToolbar();
});

/* cloud generator: scattered soft clouds */
function initClouds(){
  const container = qs('#clouds');
  if (!container) return;
  // positions for varied coverage
  const presets = [
    {left:'6%', top:'8vh', cls:'large'},
    {left:'72%', top:'6vh', cls:'med'},
    {left:'18%', top:'28vh', cls:'med'},
    {left:'80%', top:'62vh', cls:'small'},
    {left:'4%', top:'76vh', cls:'small'},
    {left:'52%', top:'48vh', cls:'large'}
  ];
  presets.forEach(p=>{
    const c = document.createElement('div');
    c.className = `cloud ${p.cls}`;
    c.style.left = p.left;
    c.style.top = p.top;
    c.style.opacity = (0.75 + Math.random()*0.25).toString();
    // subtle float animation
    const dur = 25 + Math.random()*30;
    c.style.transition = `transform ${dur}s linear`;
    container.appendChild(c);
    // gently animate sideways
    setTimeout(()=> { c.style.transform = `translateX(${(10 - Math.random()*20)}px)`; }, 120);
    setInterval(()=> { c.style.transform = `translateX(${(10 - Math.random()*20)}px)`; }, dur*1000);
  });
}

/* counters (localStorage) */
function initCounters(){
  const visitsKey = 'tw_visits';
  const sendsKey = 'tw_sends';
  let visits = Number(localStorage.getItem(visitsKey) || 0);
  visits++;
  localStorage.setItem(visitsKey, visits);
  const vEl = qs('#visitCount'); if (vEl) vEl.textContent = visits;

  let sends = Number(localStorage.getItem(sendsKey) || 0);
  const sEl = qs('#sentCount'); if (sEl) sEl.textContent = sends;

  const form = qs('#tinyForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      // bump sends locally, show animations then submit
      e.preventDefault();
      sends++;
      localStorage.setItem(sendsKey, sends);
      if (sEl) sEl.textContent = sends;
      playConfirmSequence(form);
    });
  }

  const clearBtn = qs('#clearBtn');
  if (clearBtn){
    clearBtn.addEventListener('click', ()=>{
      const cod = qs('#codename'); const msg = qs('#message');
      if (cod) cod.value=''; if (msg) msg.value='';
    });
  }
}

/* celebration visuals then submit */
function playConfirmSequence(form){
  spawnHearts(12);
  throwConfetti(28);
  setTimeout(()=> form.submit(), 900);
}

function spawnHearts(n){
  for(let i=0;i<n;i++){
    setTimeout(()=> {
      const h = document.createElement('div');
      h.className = 'heart';
      h.innerText = '💗';
      h.style.left = (8 + Math.random()*84) + 'vw';
      h.style.fontSize = (12 + Math.random()*20) + 'px';
      h.style.zIndex = 1400;
      h.style.animationDuration = (4200 + Math.random()*2800) + 'ms';
      document.body.appendChild(h);
      setTimeout(()=> h.remove(), 9000);
    }, i*60);
  }
}

function throwConfetti(n){
  const colors = ['#ff9edb','#c79aff','#ffd4f4','#fff6ea'];
  for(let i=0;i<n;i++){
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = (8 + Math.random()*84) + 'vw';
    el.style.top = (-10 - Math.random()*12) + 'vh';
    el.style.width = (6 + Math.random()*12) + 'px';
    el.style.height = el.style.width;
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.borderRadius = '2px';
    el.style.zIndex = 1300;
    el.style.opacity = 0.95;
    el.style.animation = `drop ${900 + Math.random()*700}ms forwards ease`;
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 1800);
  }
}

/* typing sound */
let typingAudio = null;
function initTypingSound(){
  const beep = qs('#typeBeep');
  if(!beep) return;
  typingAudio = beep;
  typingAudio.volume = 0.18;
  qsa('#message, #codename').forEach(el=>{
    el.addEventListener('input', ()=> {
      try{ typingAudio.currentTime = 0; typingAudio.play(); }catch(e){}
    });
  });
}

/* mascot micro-interactions */
function initMascot(){
  const m = qs('#mascot'); if(!m) return;
  setInterval(()=> {
    m.style.transform = 'translateY(-8px) rotate(4deg)';
    setTimeout(()=> m.style.transform = '', 520);
  }, 3600);
  const txt = qs('#message');
  if(txt) txt.addEventListener('focus', ()=> { m.style.transform = 'translateY(-12px) rotate(-3deg) scale(1.02)'; setTimeout(()=> m.style.transform = '',700); });
}

/* affirmation rotation */
function initAffirmations(){
  const list = [
    "You matter — even the tiny things.",
    "It's safe to whisper here.",
    "Small truths are still truths.",
    "A little thought can mean a lot.",
    "Thank you for being brave."
  ];
  const el = qs('#affirmation'); if(!el) return;
  let i = 0;
  function rot(){
    el.style.opacity = 0;
    setTimeout(()=> { el.textContent = list[i]; i = (i+1)%list.length; el.style.opacity = 1; }, 260);
  }
  rot(); setInterval(rot, 4200);
}

/* toolbar + bgm + help modal */
function initToolbar(){
  const bgmEl = qs('#bgm');
  const darkBtn = qs('#darkToggle');
  const musicBtn = qs('#musicToggle');
  const helpBtn = qs('#helpBtn');
  const helpModal = qs('#helpModal');
  const helpClose = qs('#helpClose');

  if (bgmEl) {
    bgmEl.src = CONFIG.bgmFile;
    bgmEl.volume = 0.22;
  }

  if (darkBtn) darkBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    const pressed = document.body.classList.contains('dark');
    darkBtn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  });

  if (musicBtn){
    musicBtn.addEventListener('click', ()=>{
      if (!bgmEl) return;
      if (bgmEl.paused){ bgmEl.play().catch(()=>{}); musicBtn.textContent='🔊'; }
      else { bgmEl.pause(); musicBtn.textContent='🔈'; }
    });
  }

  if (helpBtn && helpModal){
    helpBtn.addEventListener('click', ()=> helpModal.classList.add('show'));
    if (helpClose) helpClose.addEventListener('click', ()=> helpModal.classList.remove('show'));
    helpModal.addEventListener('click', e => { if (e.target === helpModal) helpModal.classList.remove('show'); });
  }
}

/* ensure keyframe for confetti */
(function injectDropKF(){
  const s = document.createElement('style');
  s.innerHTML = '@keyframes drop{0%{transform:translateY(0);opacity:1}100%{transform:translateY(110vh);opacity:0}}';
  document.head.appendChild(s);
})();
