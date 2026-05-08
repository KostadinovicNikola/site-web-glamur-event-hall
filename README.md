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

[Aperçu](#-aperçu) · [Fonctionnalités](#-fonctionnalités) · [Structure](#-structure-du-projet) · [Personnaliser](#-personnaliser-le-site) · [Déployer](#-déployer)

</div>

---

## Aperçu

Site vitrine moderne, élégant et bilingue (serbe / anglais) pour la salle d'événements **Glamur Event Hall** située à Jagodina, en Serbie. Single-page entièrement statique — aucun serveur, aucune base de données, aucune dépendance lourde. Tout tient dans une poignée de fichiers.

```
Stack    │  HTML5  ·  CSS3  ·  Vanilla JavaScript
Fonts    │  Cormorant Garamond  ·  Montserrat
Form     │  Web3Forms (gratuit, sans backend)
SEO      │  JSON-LD EventVenue  ·  Open Graph  ·  hreflang
Hosting  │  Compatible Netlify, Vercel, Cloudflare Pages, Apache
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
| **Calendrier de réservation** | Visuel, dates passées/réservées désactivées, click → formulaire pré-rempli |
| **Formulaire de contact** | Branché à Web3Forms, anti-bot honeypot, cooldown anti-spam, consentement RGPD |
| **Carte Google Maps** | Iframe centrée sur l'adresse exacte |
| **Bouton WhatsApp + Viber** | Flottant, accessible partout, animation pulse |
| **Politique de confidentialité** | Page séparée, conforme LZPL serbe + RGPD |
| **SEO local complet** | JSON-LD EventVenue, geo tags, Open Graph, sitemap.xml, robots.txt |
| **Sécurité** | CSP stricte, HSTS, X-Frame-Options, anti-clickjacking, noopener noreferrer |
| **Responsive** | Desktop · tablette · mobile (menu burger) |
| **Performance** | Aucun bundler, aucun framework — chargement instantané |

---

## Structure du projet

```
.
├── index.html           ← Page principale (single-page complet)
├── privacy.html         ← Politique de confidentialité bilingue
├── robots.txt           ← Directives pour les moteurs de recherche
├── sitemap.xml          ← Carte du site pour Google
├── _headers             ← En-têtes de sécurité (Netlify)
├── vercel.json          ← Configuration Vercel
├── .htaccess            ← Configuration Apache (hébergeurs classiques)
├── .gitignore
└── README.md
```

---

## Démarrer localement

Aucun build, aucune installation. Il suffit d'ouvrir le fichier dans un navigateur :

```bash
# option 1 — ouvrir directement
open index.html              # macOS
start index.html             # Windows

# option 2 — serveur local (recommandé pour tester le formulaire)
python3 -m http.server 8000
# puis aller sur http://localhost:8000
```

---

## Personnaliser le site

### 1. Activer le formulaire de contact

Le formulaire est branché à **[Web3Forms](https://web3forms.com)**, qui envoie les soumissions par email sans backend.

1. Aller sur [web3forms.com](https://web3forms.com)
2. Saisir l'email de réception (celui de Glamur Event Hall)
3. Récupérer la clé d'accès reçue par email
4. Dans `index.html`, remplacer `REPLACE_WITH_WEB3FORMS_KEY` par cette clé

```html
<input type="hidden" name="access_key" value="VOTRE_CLEF_ICI" />
```

### 2. Ajouter / mettre à jour les photos

Les emplacements de photo sont actuellement remplis par des *placeholders* élégants. Pour ajouter une vraie photo, remplacer le bloc :

```html
<div class="placeholder-img">
  <svg>...</svg>
  <span class="ph-label">Venčanje</span>
</div>
```

par :

```html
<img src="photos/wedding-1.jpg" alt="Venčanje u Glamur Event Hall" loading="lazy" />
```

> Conseil : convertir les images en **WebP** (perte de poids ~70 %) avant de les déposer dans un dossier `/photos`.

### 3. Marquer des dates comme réservées

Dans `index.html`, modifier la liste `reservedDates` :

```js
const reservedDates = [
  '2026-06-12',
  '2026-06-15',
  '2026-07-04'
];
```

Les dates listées apparaîtront barrées et non cliquables sur le calendrier.

### 4. Modifier les coordonnées

Toutes les références au numéro de téléphone, email et adresse sont centralisées dans `index.html` (sections `<head>`, JSON-LD, contact, formulaire) et dans `privacy.html`. Un simple Rechercher / Remplacer fait le travail.

| Cherche | Remplace par |
|---------|--------------|
| `+381655026666` | nouveau numéro international |
| `065 502 6666` | nouveau numéro affiché |
| `contact@glamureventhall.rs` | nouvelle adresse email |
| `Jevrema Popovića 70` | nouvelle adresse postale |

### 5. Changer le domaine

Une fois le domaine acheté (ex. `glamureventhall.rs`), faire un Rechercher / Remplacer global de la chaîne `https://glamureventhall.rs/` dans **tous** les fichiers du projet pour pointer vers le vrai domaine.

---

## Déployer

### Netlify (recommandé, gratuit, 2 minutes)

1. Créer un compte sur [netlify.com](https://netlify.com)
2. Glisser le dossier du projet dans la zone de dépôt
3. Site en ligne. Les en-têtes de sécurité (`_headers`) sont appliqués automatiquement.

### Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Importer le repo GitHub ou glisser le dossier
3. Le fichier `vercel.json` configure automatiquement les en-têtes.

### Hébergement classique (cPanel, OVH, Hostgator)

1. Téléverser le contenu du dossier via FTP dans le répertoire `public_html` ou équivalent.
2. Le fichier `.htaccess` applique les en-têtes de sécurité côté Apache.

### Cloudflare Pages

1. Créer un compte Cloudflare
2. Connecter le repo Git
3. Auto-déploiement à chaque commit

---

## Référencement Google

Une fois le site en ligne :

1. **Google Business Profile** — créer la fiche sur [business.google.com](https://business.google.com) (étape la plus importante pour le SEO local).
2. **Google Search Console** — ajouter le domaine sur [search.google.com/search-console](https://search.google.com/search-console) et soumettre `sitemap.xml`.
3. **Bing Webmaster Tools** — pareil, en complément.

Comptez **4 à 8 semaines** pour apparaître dans les premiers résultats locaux.

---

## Sécurité

- **CSP** stricte limitant les ressources externes à Google Fonts, Web3Forms et Google Maps
- **HSTS** sur 1 an
- **X-Frame-Options: SAMEORIGIN** (anti-clickjacking)
- **X-Content-Type-Options: nosniff**
- **Referrer-Policy: strict-origin-when-cross-origin**
- Tous les liens externes en `rel="noopener noreferrer"`
- Aucune dépendance npm, aucune supply-chain à auditer
- Honeypot et cooldown anti-spam sur le formulaire

---

## Conformité

- **LZPL** (Loi serbe sur la protection des données personnelles, 2018)
- **RGPD** (UE) — pour les visiteurs européens
- Politique de confidentialité bilingue présente
- Aucun cookie de tracking, aucun analytics par défaut

---

## Crédits

Conçu et développé pour **Glamur Event Hall**.

Polices : [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) · [Montserrat](https://fonts.google.com/specimen/Montserrat)

---

<div align="center">

**Glamur Event Hall** — Jevrema Popovića 70, 35000 Jagodina, Serbia
[Instagram](https://www.instagram.com/glamur_event_hall/) · [Facebook](https://mtouch.facebook.com/profile.php?id=61579001601017) · 065 502 6666

</div>
