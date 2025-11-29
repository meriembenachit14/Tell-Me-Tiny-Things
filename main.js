/* =========================
   Tiny Whispers — main.js (FINAL)
   ========================= */

/* CONFIG */
const CONFIG = { bgmFile: 'bgm.mp3' };

/* simple helpers */
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

/* start */
window.addEventListener('load', () => {
  const loading = qs('#loading');
  if (loading) loading.style.opacity = '0';
  setTimeout(()=> { if (loading) loading.style.display = 'none'; }, 420);

  generateClouds();
  initCounters();
  initMascot();
  initAffirmations();
  initTypingSound();
  initToolbar();
});

/* CLOUDS: create positioned clouds and set per-cloud float animations */
function generateClouds(){
  const container = qs('#clouds'); if(!container) return;

  const presets = [
    {left:'6%', top:'8vh', cls:'large'},
    {left:'72%', top:'6vh', cls:'med'},
    {left:'18%', top:'28vh', cls:'med'},
    {left:'80%', top:'62vh', cls:'small'},
    {left:'4%', top:'76vh', cls:'small'},
    {left:'52%', top:'48vh', cls:'large'}
  ];

  presets.forEach((p, i) => {
    const c = document.createElement('div');
    c.className = `cloud ${p.cls}`;
    c.style.left = p.left;
    c.style.top = p.top;
    c.style.opacity = (0.75 + Math.random()*0.25).toString();

    const dur = 20 + Math.random()*30; // seconds
    const delay = Math.random()*5;
    // apply CSS keyframe with custom duration + delay
    c.style.animation = `floatCloud ${dur}s ease-in-out ${delay}s infinite`;
    container.appendChild(c);
  });
}

/* COUNTERS */
function initCounters(){
  const visitsKey='tw_visits'; const sendsKey='tw_sends';
  let visits = Number(localStorage.getItem(visitsKey) || 0); visits++; localStorage.setItem(visitsKey, visits);
  let sends = Number(localStorage.getItem(sendsKey) || 0);

  const vEl = qs('#visitCount'); if(vEl) vEl.textContent = visits;
  const sEl = qs('#sentCount'); if(sEl) sEl.textContent = sends;

  const form = qs('#tinyForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      // update local sends, show celebration, then submit
      sends++; localStorage.setItem(sendsKey, sends);
      if(sEl) sEl.textContent = sends;
      celebrationThenSubmit(form);
    });
  }

  const clearBtn = qs('#clearBtn');
  if(clearBtn) clearBtn.addEventListener('click', ()=>{
    const cod = qs('#codename'); const msg = qs('#message');
    if(cod) cod.value=''; if(msg) msg.value='';
  });
}

/* celebration visuals */
function celebrationThenSubmit(form){
  spawnHearts(10);
  spawnConfetti(24);
  setTimeout(()=> form.submit(), 900);
}

function spawnHearts(n){
  for(let i=0;i<n;i++){
    setTimeout(()=> {
      const h = document.createElement('div');
      h.className = 'heart';
      h.innerText = '💗';
      h.style.left = (6 + Math.random()*88) + 'vw';
      h.style.fontSize = (12 + Math.random()*20) + 'px';
      h.style.zIndex = 1400;
      const dur = 6 + Math.random()*4;
      h.style.animation = `rise ${dur}s linear forwards`;
      document.body.appendChild(h);
      setTimeout(()=> h.remove(), (dur*1000)+200);
    }, i*60);
  }
}

function spawnConfetti(n){
  const colors = ['#ff9edb','#c79aff','#ffd4f4','#fff6ea'];
  for(let i=0;i<n;i++){
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = (8 + Math.random()*84) + 'vw';
    el.style.top = (-10 - Math.random()*20) + 'vh';
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
  const beep = qs('#typeBeep'); if(!beep) return;
  typingAudio = beep; typingAudio.volume = 0.18;
  qsa('#message, #codename').forEach(el=>{
    el.addEventListener('input', ()=>{
      try{ typingAudio.currentTime = 0; typingAudio.play(); }catch(e){}
    });
  });
}

/* mascot micro interactions */
function initMascot(){
  const m = qs('#mascot'); if(!m) return;
  setInterval(()=> { m.style.transform = 'translateY(-8px) rotate(4deg)'; setTimeout(()=> m.style.transform = '', 520); }, 3600);
  const txt = qs('#message'); if(txt) txt.addEventListener('focus', ()=> { m.style.transform = 'translateY(-12px) rotate(-3deg) scale(1.02)'; setTimeout(()=> m.style.transform = '',700); });
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
  let i=0;
  function rot(){ el.style.opacity=0; setTimeout(()=>{ el.textContent=list[i]; i=(i+1)%list.length; el.style.opacity=1; },260); }
  rot(); setInterval(rot,4200);
}

/* toolbar, bgm, help modal */
function initToolbar(){
  const bgmEl = qs('#bgm');
  const darkBtn = qs('#darkToggle');
  const musicBtn = qs('#musicToggle');
  const helpBtn = qs('#helpBtn');
  const helpModal = qs('#helpModal');
  const helpClose = qs('#helpClose');

  if(bgmEl){ bgmEl.src = CONFIG.bgmFile; bgmEl.volume = 0.22; }

  if(darkBtn) darkBtn.addEventListener('click', ()=> {
    document.body.classList.toggle('dark');
    const pressed = document.body.classList.contains('dark');
    darkBtn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  });

  if(musicBtn){
    musicBtn.addEventListener('click', ()=> {
      if(!bgmEl) return;
      if(bgmEl.paused){ bgmEl.play().catch(()=>{}); musicBtn.textContent='🔊'; }
      else { bgmEl.pause(); musicBtn.textContent='🔈'; }
    });
  }

  if(helpBtn && helpModal){
    helpBtn.addEventListener('click', ()=> helpModal.classList.add('show'));
    if(helpClose) helpClose.addEventListener('click', ()=> helpModal.classList.remove('show'));
    helpModal.addEventListener('click', e => { if(e.target === helpModal) helpModal.classList.remove('show'); });
  }
}

/* ensure drop keyframe exists (for confetti) */
(function injectKF(){ const s=document.createElement('style'); s.innerHTML='@keyframes drop{0%{transform:translateY(0);opacity:1}100%{transform:translateY(110vh);opacity:0}}'; document.head.appendChild(s); })();
