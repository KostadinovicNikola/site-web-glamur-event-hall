/* =========================================================
   main.js — Navigation, scroll reveal, sparkles, formulaire
   ========================================================= */

/* ---------- Navigation au scroll ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- Menu mobile (burger + overlay) ---------- */
const navBurger = document.getElementById('navBurger');
const mobMenu = document.getElementById('mobMenu');
function toggleMobMenu(open) {
  if (!nav || !navBurger || !mobMenu) return;
  nav.classList.toggle('open', open);
  mobMenu.classList.toggle('open', open);
  navBurger.setAttribute('aria-expanded', open);
  mobMenu.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
}
if (navBurger) {
  navBurger.addEventListener('click', () => {
    toggleMobMenu(!mobMenu.classList.contains('open'));
  });
}
if (mobMenu) {
  mobMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMobMenu(false));
  });
  mobMenu.addEventListener('click', (e) => {
    if (e.target === mobMenu) toggleMobMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobMenu.classList.contains('open')) toggleMobMenu(false);
  });
  document.getElementById('mobLangSr')?.addEventListener('click', () => {
    if (typeof setLang === 'function') setLang('sr');
    document.getElementById('mobLangSr').classList.add('active');
    document.getElementById('mobLangEn').classList.remove('active');
  });
  document.getElementById('mobLangEn')?.addEventListener('click', () => {
    if (typeof setLang === 'function') setLang('en');
    document.getElementById('mobLangEn').classList.add('active');
    document.getElementById('mobLangSr').classList.remove('active');
  });
}

/* ---------- Révélation au scroll ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden');
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add('visible');
  } else {
    el.classList.add('hidden');
    revealObserver.observe(el);
  }
});

/* ---------- Sparkles du hero ---------- */
const sparkleContainer = document.getElementById('sparkles');
for (let i = 0; i < 30; i++) {
  const s = document.createElement('div');
  s.className = 'sparkle';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 4 + 's';
  s.style.animationDuration = (3 + Math.random() * 3) + 's';
  sparkleContainer.appendChild(s);
}

/* ---------- Contrôles vidéos atmosfera ---------- */
document.querySelectorAll('.ig-card').forEach(card => {
  const video = card.querySelector('video');
  const playBtn = card.querySelector('.ig-play');
  const restartBtn = card.querySelector('.ig-restart');
  if (!video || !playBtn || !restartBtn) return;

  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      card.classList.remove('paused');
    } else {
      video.pause();
      card.classList.add('paused');
    }
  });

  restartBtn.addEventListener('click', () => {
    video.currentTime = 0;
    video.play();
    card.classList.remove('paused');
  });

  video.addEventListener('play', () => card.classList.remove('paused'));
  video.addEventListener('pause', () => card.classList.add('paused'));

  // Tap/clic sur la vidéo: bascule play/pause + affiche les contrôles
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    const controls = card.querySelector('.ig-controls');
    controls.classList.add('visible');
    clearTimeout(card._hideControlsTimer);
    card._hideControlsTimer = setTimeout(() => {
      controls.classList.remove('visible');
    }, 2500);
  });
});

/* ---------- Formulaire de contact (Web3Forms) ----------
   Pour activer : remplacer REPLACE_WITH_WEB3FORMS_KEY dans
   index.html par ta clé obtenue sur https://web3forms.com
   -------------------------------------------------------- */
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

const formMessages = {
  sr: {
    loading: 'Slanje upita...',
    success: 'Hvala vam! Vaš upit je uspešno poslat. Javićemo vam se uskoro.',
    error: 'Došlo je do greške. Pokušajte ponovo ili nas kontaktirajte direktno na 065 502 6666.',
    cooldown: 'Vaš upit je već poslat. Sačekajte trenutak pre slanja novog.'
  },
  en: {
    loading: 'Sending inquiry...',
    success: 'Thank you! Your inquiry has been sent. We will be in touch shortly.',
    error: 'Something went wrong. Please try again or call us directly at +381 65 502 6666.',
    cooldown: 'Your inquiry has just been sent. Please wait a moment before sending another.'
  }
};

let lastSubmitOk = 0;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const lang = document.documentElement.lang;
  const msgs = formMessages[lang] || formMessages.sr;
  const button = form.querySelector('button[type="submit"]');

  if (Date.now() - lastSubmitOk < 5000) {
    statusEl.className = 'form-status loading';
    statusEl.textContent = msgs.cooldown;
    return;
  }

  statusEl.className = 'form-status loading';
  statusEl.textContent = msgs.loading;
  button.disabled = true;

  const formData = new FormData(form);
  const json = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(json)
    });
    const data = await res.json();
    if (data.success) {
      statusEl.className = 'form-status success';
      statusEl.textContent = msgs.success;
      form.reset();
      lastSubmitOk = Date.now();
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    statusEl.className = 'form-status error';
    statusEl.textContent = msgs.error;
  } finally {
    button.disabled = false;
    setTimeout(() => {
      if (statusEl.classList.contains('success')) {
        statusEl.className = 'form-status';
        statusEl.textContent = '';
      }
    }, 8000);
  }
});
