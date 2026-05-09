/* =========================================================
   gallery.js — Lightbox de la galerie photo
   Quand tu ajoutes de vraies photos : remplace les
   .placeholder-img par des balises <img src="...">
   dans index.html. Le lightbox s'adapte automatiquement.
   ========================================================= */

const lb = document.getElementById('lightbox');
const lbContent = document.getElementById('lbContent');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let lbIndex = 0;

function openLightbox(index) {
  lbIndex = index;
  renderLightboxContent();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightboxContent() {
  const item = galleryItems[lbIndex];
  const inner = item.querySelector('.placeholder-img');
  const img = item.querySelector('img');
  const captionEl = item.querySelector('.gallery-overlay span');
  const caption = captionEl ? captionEl.textContent : '';

  lbContent.innerHTML = '';

  if (img) {
    const cloned = img.cloneNode(true);
    cloned.className = 'lightbox-image';
    lbContent.appendChild(cloned);
  } else if (inner) {
    const cloned = inner.cloneNode(true);
    cloned.classList.add('lightbox-placeholder');
    lbContent.appendChild(cloned);
  }

  if (caption) {
    const cap = document.createElement('div');
    cap.className = 'lightbox-caption';
    cap.textContent = caption;
    lbContent.appendChild(cap);
  }
}

function navLightbox(dir) {
  lbIndex = (lbIndex + dir + galleryItems.length) % galleryItems.length;
  renderLightboxContent();
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => navLightbox(-1));
document.getElementById('lbNext').addEventListener('click', () => navLightbox(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowLeft') navLightbox(-1);
  else if (e.key === 'ArrowRight') navLightbox(1);
});
