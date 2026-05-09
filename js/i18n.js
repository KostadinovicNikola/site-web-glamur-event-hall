/* =========================================================
   i18n.js — Traductions SR / EN + fonction setLang()
   Pour ajouter une langue : dupliquer le bloc sr/en,
   changer la clé, et ajouter un bouton dans le HTML.
   ========================================================= */

const translations = {
  sr: {
    'nav.about': 'O nama',
    'nav.services': 'Usluge',
    'nav.gallery': 'Galerija',
    'nav.reservation': 'Rezervacija',
    'nav.contact': 'Kontakt',

    'reservation.eyebrow': 'Rezervacija',
    'reservation.title': 'Izaberite svoj <em>savršen</em> dan',
    'reservation.intro': 'Kliknite na slobodan datum da biste poslali upit. Subote su istaknute zlatnom bojom.',
    'cal.legend.available': 'Slobodno',
    'cal.legend.reserved': 'Zauzeto',
    'cal.legend.past': 'Prošlo',

    'footer.privacy': 'Politika privatnosti',

    'hero.subtitle': 'Event Hall · Jagodina',
    'hero.tagline': 'Vaš san — naše mesto. Ovde počinje vaša bajka.',
    'hero.cta1': 'Pogledaj galeriju',
    'hero.cta2': 'Rezerviši termin',
    'hero.scroll': 'Otkrij',

    'about.eyebrow': 'O nama',
    'about.title': 'Mesto gde se <em>snovi</em> ostvaruju',
    'about.p1': 'Glamur Event Hall je prostor stvoren za nezaboravne trenutke. U srcu Jagodine, pružamo elegantnu i sofisticiranu atmosferu za vaša venčanja, krštenja, rođendane i sve posebne proslave koje zaslužuju savršeno okruženje.',
    'about.p2': 'Svaki detalj je promišljen — od raskošne dekoracije do vrhunske kuhinje i besprekorne usluge. Naš tim posvećen je tome da vaš dan bude tačno onakav kakav ste oduvek sanjali.',
    'about.p3': 'Dobrodošli u svet luksuza, šarma i bezvremenske elegancije.',
    'about.stat1': 'Događaja',
    'about.stat2': 'Pratilaca',
    'about.stat3': 'Posvećenosti',

    'services.eyebrow': 'Naše usluge',
    'services.title': 'Svaki povod, <em>nezaboravan</em>',
    'services.weddings.title': 'Venčanja',
    'services.weddings.text': 'Od bajkovitih ceremonija do raskošnih svadbenih svečanosti — vaš dan, savršen.',
    'services.baptisms.title': 'Krštenja',
    'services.baptisms.text': 'Topla, intimna atmosfera za proslavu najdragocenijih porodičnih trenutaka.',
    'services.birthdays.title': 'Rođendani',
    'services.birthdays.text': 'Tematske dekoracije i raskošne torte — proslavite svaku godinu sa stilom.',
    'services.corporate.title': 'Korporativni događaji',
    'services.corporate.text': 'Profesionalan ambijent za poslovne susrete, gala večeri i timske proslave.',

    'testimonial.quote': '„Glamur nije samo dvorana — to je iskustvo. Svaki detalj je bio savršen, a osmesi naših gostiju nemerljivi."',
    'testimonial.author': '— Mladenci, 2025',

    'gallery.eyebrow': 'Galerija',
    'gallery.title': 'Trenuci <em>uhvaćeni</em> u eleganciji',
    'gallery.ph.wedding': 'Venčanje',
    'gallery.ph.decor': 'Dekoracija',
    'gallery.ph.ceremony': 'Ceremonija',
    'gallery.ph.hall': 'Dvorana',
    'gallery.ph.balloons': 'Balon dekor',
    'gallery.ph.fireworks': 'Vatromet',
    'gallery.ph.cake': 'Mladenačka torta',
    'gallery.ph.gala': 'Gala večera',
    'gallery.cap1': 'Bajka u zlatu',
    'gallery.cap2': 'Cvetna luksuz',
    'gallery.cap3': 'Svečani momenat',
    'gallery.cap4': 'Glamurozni enterijer',
    'gallery.cap5': 'Rođendanska bajka',
    'gallery.cap6': 'Magični trenutak',
    'gallery.cap7': 'Slatki vrhunac',
    'gallery.cap8': 'Korporativni stil',
    'gallery.cta': 'Više na Instagramu',

    'contact.eyebrow': 'Kontaktirajte nas',
    'contact.title': 'Započnimo vašu <em>bajku</em>',
    'contact.intro': 'Pišite nam za dostupne termine, ponude i sve dodatne informacije. Sa zadovoljstvom ćemo organizovati posetu i pokazati vam prostor.',
    'contact.address.label': 'Adresa',
    'contact.phone.label': 'Telefon',
    'contact.phone.value': '065 502 6666',
    'contact.email.label': 'Email',
    'contact.hours.label': 'Radno vreme',
    'contact.hours.value': 'Po dogovoru — sedam dana u nedelji',

    'form.name': 'Ime i prezime',
    'form.phone': 'Telefon',
    'form.email': 'Email',
    'form.event': 'Tip događaja',
    'form.event.choose': '— izaberite —',
    'form.event.wedding': 'Venčanje',
    'form.event.baptism': 'Krštenje',
    'form.event.birthday': 'Rođendan',
    'form.event.corporate': 'Korporativno',
    'form.event.other': 'Drugo',
    'form.date': 'Željeni datum',
    'form.message': 'Poruka',
    'form.consent': 'Slanjem ovog obrasca prihvatam da se moji podaci koriste isključivo za odgovor na ovaj upit.',
    'form.submit': 'Pošalji upit',

    'placeholder.label': 'Vaša fotografija ovde',
    'placeholder.sub': 'Zameni sa fotografijom dvorane',

    'footer.tagline': 'Vaš san — naše mesto · Jagodina',
    'footer.rights': 'Sva prava zadržana.'
  },

  en: {
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.reservation': 'Booking',
    'nav.contact': 'Contact',

    'reservation.eyebrow': 'Booking',
    'reservation.title': 'Choose your <em>perfect</em> day',
    'reservation.intro': 'Click an available date to send a booking request. Saturdays are highlighted in gold.',
    'cal.legend.available': 'Available',
    'cal.legend.reserved': 'Booked',
    'cal.legend.past': 'Past',

    'footer.privacy': 'Privacy policy',

    'hero.subtitle': 'Event Hall · Jagodina',
    'hero.tagline': 'Your dream — our place. Where your fairytale begins.',
    'hero.cta1': 'View gallery',
    'hero.cta2': 'Book a date',
    'hero.scroll': 'Discover',

    'about.eyebrow': 'About us',
    'about.title': 'A place where <em>dreams</em> come true',
    'about.p1': 'Glamur Event Hall is a space designed for unforgettable moments. In the heart of Jagodina, we offer an elegant and sophisticated atmosphere for your weddings, baptisms, birthdays, and every special celebration that deserves a perfect setting.',
    'about.p2': 'Every detail is thoughtfully crafted — from lavish décor to fine cuisine and impeccable service. Our team is dedicated to making your day exactly as you have always dreamed it.',
    'about.p3': 'Welcome to a world of luxury, charm, and timeless elegance.',
    'about.stat1': 'Events',
    'about.stat2': 'Followers',
    'about.stat3': 'Dedication',

    'services.eyebrow': 'Our services',
    'services.title': 'Every occasion, <em>unforgettable</em>',
    'services.weddings.title': 'Weddings',
    'services.weddings.text': 'From fairytale ceremonies to lavish receptions — your day, made perfect.',
    'services.baptisms.title': 'Baptisms',
    'services.baptisms.text': 'A warm and intimate atmosphere to celebrate your most precious family moments.',
    'services.birthdays.title': 'Birthdays',
    'services.birthdays.text': 'Themed décor and exquisite cakes — celebrate every year in style.',
    'services.corporate.title': 'Corporate events',
    'services.corporate.text': 'A professional setting for business gatherings, gala evenings, and team celebrations.',

    'testimonial.quote': '"Glamur isn\'t just a venue — it\'s an experience. Every detail was perfect, and the smiles of our guests, priceless."',
    'testimonial.author': '— Newlyweds, 2025',

    'gallery.eyebrow': 'Gallery',
    'gallery.title': 'Moments <em>captured</em> in elegance',
    'gallery.ph.wedding': 'Wedding',
    'gallery.ph.decor': 'Décor',
    'gallery.ph.ceremony': 'Ceremony',
    'gallery.ph.hall': 'Hall',
    'gallery.ph.balloons': 'Balloons',
    'gallery.ph.fireworks': 'Fireworks',
    'gallery.ph.cake': 'Wedding cake',
    'gallery.ph.gala': 'Gala dinner',
    'gallery.cap1': 'A fairytale in gold',
    'gallery.cap2': 'Floral luxury',
    'gallery.cap3': 'Solemn moment',
    'gallery.cap4': 'Glamorous interior',
    'gallery.cap5': 'Birthday fantasy',
    'gallery.cap6': 'Magical moment',
    'gallery.cap7': 'Sweet finale',
    'gallery.cap8': 'Corporate style',
    'gallery.cta': 'More on Instagram',

    'contact.eyebrow': 'Get in touch',
    'contact.title': 'Let\'s begin your <em>fairytale</em>',
    'contact.intro': 'Write to us for availability, offers, and any additional information. We would be delighted to arrange a visit and show you the space in person.',
    'contact.address.label': 'Address',
    'contact.phone.label': 'Phone',
    'contact.phone.value': '+381 65 502 6666',
    'contact.email.label': 'Email',
    'contact.hours.label': 'Hours',
    'contact.hours.value': 'By appointment — seven days a week',

    'form.name': 'Full name',
    'form.phone': 'Phone',
    'form.email': 'Email',
    'form.event': 'Event type',
    'form.event.choose': '— select —',
    'form.event.wedding': 'Wedding',
    'form.event.baptism': 'Baptism',
    'form.event.birthday': 'Birthday',
    'form.event.corporate': 'Corporate',
    'form.event.other': 'Other',
    'form.date': 'Preferred date',
    'form.message': 'Message',
    'form.consent': 'By submitting this form, I agree that my data will be used solely to respond to this inquiry.',
    'form.submit': 'Send inquiry',

    'placeholder.label': 'Your photo here',
    'placeholder.sub': 'Replace with venue photo',

    'footer.tagline': 'Your dream — our place · Jagodina',
    'footer.rights': 'All rights reserved.'
  }
};

/* Clés dont la valeur contient du HTML (<em>) autorisé */
const HTML_KEYS = new Set([
  'about.title', 'services.title', 'gallery.title', 'contact.title', 'reservation.title'
]);

function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = translations[lang][key];
    if (val === undefined) return;
    if (HTML_KEYS.has(key)) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  document.getElementById('langSr').classList.toggle('active', lang === 'sr');
  document.getElementById('langEn').classList.toggle('active', lang === 'en');

  const gold = '#c9a84c', muted = 'rgba(200,200,200,0.5)';
  const floatSr = document.getElementById('floatLangSr');
  const floatEn = document.getElementById('floatLangEn');
  if (floatSr) floatSr.style.color = lang === 'sr' ? gold : muted;
  if (floatEn) floatEn.style.color = lang === 'en' ? gold : muted;

  try { localStorage.setItem('glamur-lang', lang); } catch(e) {}
}

/* Expose setLang globalement pour les modules ES (calendar.js) */
window.setLang = setLang;

/* Initialisation */
document.getElementById('langSr').addEventListener('click', () => setLang('sr'));
document.getElementById('langEn').addEventListener('click', () => setLang('en'));

let savedLang = 'sr';
try { savedLang = localStorage.getItem('glamur-lang') || 'sr'; } catch(e) {}
setLang(savedLang);
