<div align="center">

```
   ██████╗ ██╗      █████╗ ███╗   ███╗██╗   ██╗██████╗
  ██╔════╝ ██║     ██╔══██╗████╗ ████║██║   ██║██╔══██╗
  ██║  ███╗██║     ███████║██╔████╔██║██║   ██║██████╔╝
  ██║   ██║██║     ██╔══██║██║╚██╔╝██║██║   ██║██╔══██╗
  ╚██████╔╝███████╗██║  ██║██║ ╚═╝ ██║╚██████╔╝██║  ██║
   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝
                  E V E N T   H A L L
```

### Site web officiel — Glamur Event Hall, Jagodina

*Vaš san — naše mesto*

**[Voir le site en ligne](https://kostadinovicnikola.github.io/site-web-glamur-event-hall/)**

Aperçu · Fonctionnalités · Structure · Admin · Personnaliser · Déployer

</div>

---

## Aperçu

Site vitrine moderne, élégant et bilingue (serbe / anglais) pour la salle d'événements **Glamur Event Hall** située à Jagodina, en Serbie. Single-page avec calendrier de réservation connecté en temps réel à Firebase Firestore, et page d'administration protégée par authentification.

```
Stack     │  HTML5  ·  CSS3  ·  Vanilla JavaScript (ES Modules)
Fonts     │  Cormorant Garamond  ·  Montserrat
Form      │  Web3Forms (gratuit, sans backend)
Database  │  Firebase Firestore (temps réel)
Auth      │  Firebase Authentication (Email/Password)
SEO       │  JSON-LD EventVenue  ·  Open Graph  ·  hreflang
Hosting   │  GitHub Pages
```

---

## Fonctionnalités

| Module | Détail |
|--------|--------|
| **Bilingue SR / EN** | Switch instantané, préférence sauvegardée localement |
| **Hero animé** | Sparkles dorées, transitions douces, CTA marketing |
| **Section À propos** | Texte + statistiques (événements, abonnés) |
| **4 Services** | Mariages · Krštenja · Anniversaires · Corporate |
| **Galerie + Lightbox** | Grille responsive, ouverture plein écran, navigation clavier |
| **Calendrier Firestore** | Dates réservées en temps réel, dates passées désactivées, clic → formulaire pré-rempli |
| **Page admin protégée** | Login Firebase Auth, gestion des réservations par clic, liste des dates réservées |
| **Lien admin caché** | Petit point discret dans le footer, invisible pour les visiteurs |
| **Formulaire de contact** | Branché à Web3Forms, anti-bot honeypot, cooldown anti-spam, consentement RGPD |
| **Carte Google Maps** | Iframe centrée sur l'adresse exacte |
| **Bouton WhatsApp + Viber** | Flottant, accessible partout, animation pulse |
| **Politique de confidentialité** | Page séparée, conforme LZPL serbe + RGPD |
| **SEO local complet** | JSON-LD EventVenue, geo tags, Open Graph, sitemap.xml, robots.txt |
| **Responsive** | Desktop · tablette · mobile (menu burger) |
| **Performance** | Aucun bundler, aucun framework — chargement instantané |

---

## Structure du projet

```
.
├── index.html           ← Page principale (single-page)
├── admin.html           ← Page d'administration (protégée)
├── privacy.html         ← Politique de confidentialité bilingue
├── robots.txt           ← Directives pour les moteurs de recherche
├── sitemap.xml          ← Carte du site pour Google
├── _headers             ← En-têtes de sécurité (Netlify)
├── vercel.json          ← Configuration Vercel
├── .htaccess            ← Configuration Apache
├── css/
│   ├── style.css        ← Styles du site principal
│   └── admin.css        ← Styles de la page admin
├── js/
│   ├── i18n.js          ← Traductions SR/EN + setLang()
│   ├── calendar.js      ← Calendrier connecté à Firestore (ES Module)
│   ├── gallery.js       ← Lightbox galerie
│   ├── main.js          ← Nav, scroll, animations, formulaire
│   ├── admin.js         ← Auth Firebase + gestion réservations
│   └── firebase.js      ← Config et init Firebase
├── images/
│   └── logo.png         ← Logo Glamur Event Hall
└── README.md
```

---

## Page Admin

La page `/admin.html` permet de gérer le calendrier de réservation sans toucher au code.

### Accès

- URL : `[votre-domaine]/admin.html`
- Lien caché : petit point doré en bas du footer du site principal

### Fonctionnement

1. Connexion avec email + mot de passe (Firebase Auth)
2. Clic sur une date disponible → la marque comme **réservée** (rouge)
3. Clic sur une date réservée → la **libère**
4. La liste des dates réservées s'affiche en bas, avec bouton "Oslobodi"
5. Les changements sont **instantanément visibles** sur le site public (Firestore temps réel)

### Configuration Firebase (à faire une fois)

1. Créer un projet sur [firebase.google.com](https://firebase.google.com)
2. Activer **Firestore** (mode production)
3. Activer **Authentication → Email/Password**
4. Créer un utilisateur admin dans Authentication → Users
5. Copier la config Firebase dans `js/firebase.js`
6. Appliquer ces règles Firestore :

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservations/{date} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Démarrer localement

```bash
# Ouvrir avec Live Server (VS Code) ou :
python3 -m http.server 8000
# puis aller sur http://localhost:8000
```

---

## Personnaliser le site

### 1. Activer le formulaire de contact

1. Aller sur [web3forms.com](https://web3forms.com)
2. Saisir l'email de réception
3. Dans `index.html`, remplacer `REPLACE_WITH_WEB3FORMS_KEY` :

```html
<input type="hidden" name="access_key" value="VOTRE_CLEF_ICI" />
```

### 2. Ajouter les photos

Remplacer les blocs `placeholder-img` par de vraies images :

```html
<img src="images/wedding-1.jpg" alt="Venčanje u Glamur Event Hall" loading="lazy" />
```

> Conseil : convertir en **WebP** pour réduire le poids de ~70 %.

### 3. Modifier les coordonnées

| Cherche | Remplace par |
| ------- | ------------ |
| `+381655026666` | nouveau numéro international |
| `065 502 6666` | nouveau numéro affiché |
| `contact@glamureventhall.rs` | nouvelle adresse email |
| `Jevrema Popovića 70` | nouvelle adresse postale |

### 4. Changer le domaine

Faire un Rechercher / Remplacer global de `https://glamureventhall.rs/` dans tous les fichiers.

---

## Déployer

### GitHub Pages (actuel)

Le site est déployé automatiquement depuis la branche `main` :
**[https://kostadinovicnikola.github.io/site-web-glamur-event-hall/](https://kostadinovicnikola.github.io/site-web-glamur-event-hall/)**

### Netlify (recommandé pour la prod)

1. Créer un compte sur [netlify.com](https://netlify.com)
2. Connecter le repo GitHub
3. Les en-têtes de sécurité (`_headers`) sont appliqués automatiquement.

### Hébergement classique (cPanel, OVH)

Téléverser le contenu via FTP dans `public_html`. Le fichier `.htaccess` configure Apache automatiquement.

---

## Référencement Google

1. **Google Business Profile** — [business.google.com](https://business.google.com)
2. **Google Search Console** — soumettre `sitemap.xml`
3. **Bing Webmaster Tools** — en complément

Comptez **4 à 8 semaines** pour apparaître dans les premiers résultats locaux.

---

## Sécurité

- **CSP** stricte limitant les ressources externes
- **HSTS** sur 1 an
- **X-Frame-Options: SAMEORIGIN** (anti-clickjacking)
- Page admin en `noindex, nofollow` — invisible pour Google
- Tous les liens externes en `rel="noopener noreferrer"`
- Honeypot et cooldown anti-spam sur le formulaire

---

## Conformité

- **LZPL** (Loi serbe sur la protection des données personnelles, 2018)
- **RGPD** (UE) — pour les visiteurs européens
- Politique de confidentialité bilingue
- Aucun cookie de tracking, aucun analytics par défaut

---

## Crédits

Conçu et développé pour **Glamur Event Hall**.

Polices : [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) · [Montserrat](https://fonts.google.com/specimen/Montserrat)
Backend temps réel : [Firebase](https://firebase.google.com)
Formulaire : [Web3Forms](https://web3forms.com)

---

<div align="center">

**Glamur Event Hall** — Jevrema Popovića 70, 35000 Jagodina, Serbia

[Instagram](https://www.instagram.com/glamur_event_hall/) · [Facebook](https://mtouch.facebook.com/profile.php?id=61579001601017) · 065 502 6666

</div>
