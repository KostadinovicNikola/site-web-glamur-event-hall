/* =========================================================
   calendar.js — Widget de réservation
   Pour marquer une date comme réservée :
   ajouter la date en format ISO dans le tableau reservedDates.
   Exemple : '2026-07-19'
   ========================================================= */

const reservedDates = [
  // '2026-06-15',
  // '2026-07-04',
];

const monthNames = {
  sr: ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December']
};
const weekdayNames = {
  sr: ['Pon','Uto','Sre','Čet','Pet','Sub','Ned'],
  en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
};

let calCursor = new Date();
calCursor.setDate(1);

function pad(n) { return String(n).padStart(2, '0'); }
function isoOf(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

function renderCalendar() {
  const lang = document.documentElement.lang || 'sr';
  const months = monthNames[lang] || monthNames.sr;
  const weekdays = weekdayNames[lang] || weekdayNames.sr;

  document.getElementById('calTitle').textContent =
    months[calCursor.getMonth()] + ' ' + calCursor.getFullYear();

  const wdEl = document.getElementById('calWeekdays');
  wdEl.innerHTML = '';
  weekdays.forEach(w => {
    const d = document.createElement('div');
    d.textContent = w;
    wdEl.appendChild(d);
  });

  const daysEl = document.getElementById('calDays');
  daysEl.innerHTML = '';
  const year = calCursor.getFullYear();
  const month = calCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const offset = (firstDay.getDay() + 6) % 7; // lundi = 0

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

    if (date.getDay() === 6) btn.classList.add('saturday');

    if (date < today) {
      btn.classList.add('past');
    } else if (reservedDates.includes(iso)) {
      btn.classList.add('reserved');
      btn.setAttribute('aria-label', iso + ' — reserved');
    } else {
      btn.classList.add('available');
      btn.addEventListener('click', () => selectDate(iso, btn));
    }

    if (iso === isoOf(today)) btn.classList.add('today');
    daysEl.appendChild(btn);
  }
}

function selectDate(iso, btn) {
  document.querySelectorAll('.cal-day.selected').forEach(el => el.classList.remove('selected'));
  btn.classList.add('selected');

  const dateInput = document.querySelector('#contactForm input[name="date"]');
  if (dateInput) dateInput.value = iso;

  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

  const formEl = document.getElementById('contactForm');
  formEl.style.transition = 'box-shadow 0.6s ease';
  formEl.style.boxShadow = '0 0 0 2px rgba(201, 169, 97, 0.6)';
  setTimeout(() => { formEl.style.boxShadow = ''; }, 1800);
}

document.getElementById('calPrev').addEventListener('click', () => {
  calCursor.setMonth(calCursor.getMonth() - 1);
  const today = new Date();
  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  if (calCursor < minMonth) calCursor = minMonth;
  renderCalendar();
});

document.getElementById('calNext').addEventListener('click', () => {
  calCursor.setMonth(calCursor.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

/* Re-render quand la langue change */
const _origSetLang = setLang;
setLang = function(lang) {
  _origSetLang(lang);
  renderCalendar();
};
