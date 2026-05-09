/* =========================================================
   admin.js — Authentification + gestion des dates (Firestore)
   ========================================================= */

import { auth, db } from './firebase.js';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

/* ---------- Auth ---------- */
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginError = document.getElementById('loginError');

loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  loginError.style.display = 'none';
  loginBtn.textContent = '...';
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    loginError.style.display = 'block';
    loginBtn.textContent = 'Prijavi se';
  }
});

document.getElementById('loginPassword').addEventListener('keydown', e => {
  if (e.key === 'Enter') loginBtn.click();
});

logoutBtn.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, user => {
  if (user) {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    startCalendar();
  } else {
    loginScreen.style.display = 'block';
    dashboard.style.display = 'none';
    loginBtn.textContent = 'Prijavi se';
  }
});

/* ---------- Calendrier admin ---------- */
const monthNames = ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'];
const weekdays = ['Pon','Uto','Sre','Čet','Pet','Sub','Ned'];

let calCursor = new Date();
calCursor.setDate(1);
let reservedDates = new Set();
let unsubscribe = null;

function pad(n) { return String(n).padStart(2, '0'); }
function isoOf(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}
function friendlyDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d} ${monthNames[parseInt(m) - 1]} ${y}`;
}

function renderCalendar() {
  document.getElementById('calTitle').textContent =
    monthNames[calCursor.getMonth()] + ' ' + calCursor.getFullYear();

  const wdEl = document.getElementById('calWeekdays');
  wdEl.innerHTML = '';
  weekdays.forEach(w => {
    const d = document.createElement('div');
    d.textContent = w;
    d.style.textAlign = 'center';
    wdEl.appendChild(d);
  });

  const daysEl = document.getElementById('calDays');
  daysEl.innerHTML = '';
  const year = calCursor.getFullYear();
  const month = calCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const offset = (firstDay.getDay() + 6) % 7;

  for (let i = 0; i < offset; i++) {
    const d = document.createElement('div');
    d.className = 'cal-day empty';
    daysEl.appendChild(d);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const iso = isoOf(date);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-day';
    btn.textContent = day;
    btn.title = iso;

    if (date.getDay() === 6) btn.classList.add('saturday');
    if (iso === isoOf(today)) btn.classList.add('today');

    if (date < today) {
      btn.classList.add('past');
    } else if (reservedDates.has(iso)) {
      btn.classList.add('reserved');
      btn.addEventListener('click', () => toggleDate(iso, false));
    } else {
      btn.classList.add('available');
      btn.addEventListener('click', () => toggleDate(iso, true));
    }

    daysEl.appendChild(btn);
  }
}

async function toggleDate(iso, reserve) {
  try {
    if (reserve) {
      await setDoc(doc(db, 'reservations', iso), { date: iso });
      showToast(`✓ ${friendlyDate(iso)} — rezervisano`);
    } else {
      await deleteDoc(doc(db, 'reservations', iso));
      showToast(`✓ ${friendlyDate(iso)} — oslobođeno`);
    }
  } catch (e) {
    showToast('Greška — pokušajte ponovo');
  }
}

function renderReservedList() {
  const list = document.getElementById('reservedList');
  list.innerHTML = '';

  const sorted = [...reservedDates].sort();
  if (sorted.length === 0) {
    list.innerHTML = '<li><span class="empty-state">Nema rezervisanih datuma.</span></li>';
    return;
  }

  sorted.forEach(iso => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>
        <span class="date-iso">${friendlyDate(iso)}</span>
        <span class="date-label">${iso}</span>
      </span>
      <button class="btn-del" data-iso="${iso}">Oslobodi</button>
    `;
    li.querySelector('.btn-del').addEventListener('click', () => toggleDate(iso, false));
    list.appendChild(li);
  });
}

function startCalendar() {
  document.getElementById('calPrev').addEventListener('click', () => {
    calCursor.setMonth(calCursor.getMonth() - 1);
    renderCalendar();
  });
  document.getElementById('calNext').addEventListener('click', () => {
    calCursor.setMonth(calCursor.getMonth() + 1);
    renderCalendar();
  });

  if (unsubscribe) unsubscribe();
  unsubscribe = onSnapshot(collection(db, 'reservations'), snapshot => {
    reservedDates = new Set(snapshot.docs.map(doc => doc.id));
    renderCalendar();
    renderReservedList();
  });
}

/* ---------- Toast ---------- */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
