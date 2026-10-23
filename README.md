# ERE Habitat — site web

Site vitrine et d'acquisition de prospects pour **ERE Habitat** (Ifs, Calvados) : panneaux photovoltaïques et batteries de stockage.

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript strict**
- **Tailwind CSS 4**, composants maison inspirés de shadcn/ui, **Radix** (accordéon), **Lucide**
- **React Hook Form + Zod 4** (validation partagée client / serveur)
- Polices auto-hébergées (Schibsted Grotesk, IBM Plex Sans / Mono) via `next/font/local` — aucune requête vers Google Fonts
- Tests **Playwright** (+ axe-core pour l'accessibilité)

---

## 1. Démarrer

```bash
npm install
cp .env.example .env.local     # puis renseigner les valeurs
npm run dev                    # http://localhost:3000
```

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` | ESLint (règles Next.js + TypeScript) |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests Playwright (lance `next start` — faire `npm run build` avant) |
| `npm run check:placeholders` | Liste les informations à compléter avant publication |

> Playwright : en local, installez un navigateur avec `npx playwright install chromium`, ou indiquez un Chromium existant via `PW_CHROMIUM=/chemin/vers/chrome`.

---

## 2. Arborescence

```
src/
  app/                       Routes (App Router)
    [slug]/page.tsx          Pages SEO (services + locales), générées statiquement
    blog/, faq/, contact/…   Pages institutionnelles
    api/lead/route.ts        Réception des demandes (validation, anti-spam, notification)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx
  components/
    home/                    Sections de la page d'accueil
    page/                    Gabarits des pages intérieures (blocs de contenu, CTA, liens)
    forms/                   Formulaires rapide et détaillé
    simulator/               Simulateur solaire
    consent/                 Bandeau cookies (CNIL)
    layout/ seo/ ui/
  content/                   ★ Tout le contenu éditorial (pages, FAQ, blog, preuves)
  lib/
    site.ts                  ★ Informations de l'entreprise (placeholders à compléter)
    simulator.ts             Logique et hypothèses du simulateur (pure, testée)
    lead-schema.ts           Schémas Zod des formulaires
    seo.ts                   Métadonnées et données structurées JSON-LD
tests/                       Tests Playwright
scripts/                     Outils (placeholders, captures, géométrie de l'illustration)
```

**Modifier un texte** : tout est dans `src/content/` et `src/lib/site.ts`. Les pages SEO sont décrites sous forme de blocs typés (`prose`, `specs`, `compare`, `steps`, `cta`, `simulator`, `leadForm`…) dans `src/content/pages/`.

---

## 3. Déploiement (Vercel recommandé)

1. Pousser le dépôt sur GitHub, l'importer dans Vercel (framework détecté automatiquement).
2. Renseigner les variables d'environnement (`.env.example`) — au minimum `NEXT_PUBLIC_SITE_URL` et **un canal de notification** (`LEAD_WEBHOOK_URL` ou `RESEND_API_KEY` + `LEAD_NOTIFICATION_EMAIL`). Sans canal, l'API renvoie une erreur 503 et le formulaire invite à appeler : aucune demande n'est perdue silencieusement.
3. Ajouter le domaine (ex. `ere-habitat.com`) et rediriger `www` vers le domaine sans www (adresse principale : ere-habitat.com).
4. Les prévisualisations Vercel ne sont pas indexées (`robots.txt` bloquant hors production).

Autre hébergeur Node : `npm run build && npm start` (Node ≥ 20.9). Mettre alors à jour `site.legal.host`.

### Google Search Console
1. Ajouter une propriété **Domaine** et valider par enregistrement DNS TXT (recommandé), ou une propriété **Préfixe d'URL** avec `NEXT_PUBLIC_GSC_VERIFICATION` (balise méta générée automatiquement).
2. Soumettre `https://ere-habitat.com/sitemap.xml`.
3. Demander l'indexation de l'accueil et des pages Caen / Calvados.

### Google Business Profile
Créer ou revendiquer la fiche si l'entreprise y est éligible (adresse pouvant recevoir du courrier, ou zone desservie). Puis dans `src/lib/site.ts` : renseigner l'adresse exacte, passer `address.verified` à `true` (active le JSON-LD `LocalBusiness`) et ajouter l'URL de la fiche dans `social.googleBusinessProfile`. Le nom, l'adresse et le téléphone doivent être **strictement identiques** sur le site et la fiche.

---

## 4. Formulaires et prospects

Trois parcours : formulaire rapide, formulaire détaillé, demande d'étude depuis le simulateur. Tous passent par `POST /api/lead/` :

- validation Zod côté client **et** serveur (mêmes schémas) ;
- anti-spam : champ piège invisible + délai minimal de remplissage ; contrôle d'origine ; taille de requête limitée ;
- limitation de débit par IP (5 demandes / 10 min par défaut, `LEAD_RATE_LIMIT`) ;
- notification par **webhook** (signé HMAC si `LEAD_WEBHOOK_SECRET`) et/ou **e-mail Resend** ;
- **aucune donnée stockée** par le site ; redirection vers `/merci/` (non indexée).

Intégration CRM : pointer `LEAD_WEBHOOK_URL` vers Make, Zapier, n8n ou l'API du CRM. Le corps JSON contient les champs du formulaire, le résumé du simulateur et la page d'origine.

> La limitation de débit est en mémoire : suffisante sur une instance, approximative en serverless multi-instances. Pour un contrôle strict, la brancher sur Upstash Redis / Vercel KV (`src/lib/rate-limit.ts`).

---

## 5. Simulateur

Logique dans `src/lib/simulator.ts`, sans dépendance à l'interface. Hypothèses **affichées et modifiables** par l'utilisateur :

| Hypothèse | Valeur par défaut | Origine |
| --- | --- | --- |
| Productible | 1 050 kWh/kWc/an | Ordre de grandeur PVGIS pour le Calvados, toiture sud — à vérifier par adresse |
| Coefficient d'orientation | sud 1 · SE/SO 0,95 · E/O 0,82 · inconnue 0,90 | Approximation prudente |
| Prix moyen du kWh | 0,25 €/kWh | Uniquement pour convertir une facture en kWh ; réglable de 0,15 à 0,40 € |
| Production visée | 55 % de la consommation (85 % avec batterie) | Choix de dimensionnement |
| Part de consommation le soir | 45 % | Pour la capacité de batterie |

Aucun montant d'économie, de rentabilité ou d'aide n'est calculé ni affiché.

---

## 6. SEO

- Un H1 par page, `title` et `description` uniques (vérifiés par les tests), canonical absolue, Open Graph / Twitter, image OG générée.
- JSON-LD : `Organization`, `WebSite`, `BreadcrumbList`, `Service` (pages commerciales et locales), `BlogPosting`, `FAQPage` (uniquement sur `/faq/`), `LocalBusiness` (uniquement quand l'adresse est vérifiée).
- `sitemap.xml` dynamique (pages indexables uniquement), `robots.txt`, redirections 301 (`next.config.ts`), page 404 utile.
- Maillage interne : menu, pied de page, liens « À consulter aussi » sur chaque page, liens contextuels depuis l'accueil.

### Cartographie des intentions (anti-cannibalisation)

| Intention principale | Page cible |
| --- | --- |
| panneaux solaires (produit, maison) | `/panneaux-solaires/` |
| installation panneaux solaires (étapes, démarches) | `/installation-panneaux-solaires/` |
| panneaux solaires Caen, installation panneaux solaires Caen | `/panneaux-solaires-caen/` |
| entreprise photovoltaïque Calvados, autoconsommation Normandie (local) | `/panneaux-solaires-calvados/` |
| batterie stockage solaire (produit) | `/batterie-stockage-solaire/` |
| installation batterie solaire | `/installation-batterie-solaire/` |
| ajouter batterie panneaux existants, batterie pour panneaux existants | `/batterie-solaire-installation-existante/` |
| batterie solaire Caen, installation batterie solaire Caen | `/batterie-solaire-caen/` |
| batterie stockage photovoltaïque Calvados | `/batterie-stockage-calvados/` |
| autoconsommation solaire (comprendre) | `/autoconsommation-solaire/` |
| prix panneaux solaires / prix batterie solaire maison | `/prix-panneaux-solaires/`, `/prix-batterie-solaire/` |
| devis photovoltaïque Caen / devis batterie | `/devis-panneaux-solaires/`, `/devis-batterie-solaire/` |
| Bayeux, Lisieux, Falaise, Deauville (+ Côte Fleurie) | pages locales dédiées, au contenu propre à chaque territoire |

Règle : ne créer une nouvelle page locale que si elle apporte un contenu réellement distinct (bâti, urbanisme, usages).

### Blog
`src/content/blog.ts` : 4 articles publiés, 6 sujets planifiés en brouillon (non publiés, non indexés) avec leur angle et les sources à réunir. Les sujets « prix » ne doivent être publiés qu'avec des prix réels et datés.

---

## 7. Qualité — résultats mesurés (22/10/2026, environnement de build)

| Contrôle | Résultat |
| --- | --- |
| `npm run lint` | 0 erreur, 0 avertissement |
| `npm run typecheck` | OK |
| `npm run build` | OK — 39 pages statiques + API |
| Tests Playwright | **49 réussis** (desktop + mobile), 6 ignorés (tests réservés au mobile) |
| axe-core WCAG 2.2 AA | 0 violation grave/critique sur 6 pages types |
| Lighthouse desktop | Performance 100 (LCP 0,7–0,8 s, CLS 0) |
| Lighthouse mobile (throttling simulé) | Performance 79–92, Accessibilité 100, Bonnes pratiques 100, SEO 100 · CLS 0 · LCP simulé 3,0–3,6 s |

Les mesures mobiles ont été faites sur un conteneur de build lent, sans CDN : elles sous-estiment probablement le résultat réel. **Mesurer après mise en ligne** avec PageSpeed Insights et le rapport Core Web Vitals de la Search Console (données terrain). Objectif : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.

Ce que couvrent les tests : toutes les URL du sitemap (statut, H1 unique, title/description uniques, canonical), liens internes, JSON-LD, robots/sitemap, 404 et redirections, en-têtes de sécurité, API (validation, anti-spam, limitation de débit, origine), formulaires rapide et détaillé de bout en bout, simulateur complet, logique de calcul (tests unitaires), accessibilité, navigation clavier, absence de défilement horizontal sur mobile, menu mobile, bandeau cookies.

---

## 8. À compléter avant publication

`npm run check:placeholders` liste précisément les éléments restants. En résumé :

1. **Téléphone, e-mail, horaires** réels (`src/lib/site.ts`).
2. **Adresse postale** et décision sur `address.verified` (fiche Google Business Profile).
3. **Mentions légales** : forme juridique définitive, SIRET, immatriculation, TVA, responsable de publication.
4. **Assurance RC Pro** : uniquement si souscrite.
5. **Installateurs partenaires** : raison sociale, qualifications (RGE…) vérifiables — `site.partners`.
6. **Médiateur de la consommation** auquel l'entreprise adhère (obligatoire en B2C).
7. **Sous-traitants** réellement utilisés (Vercel, Resend, outil CRM…) dans la politique de confidentialité.
8. **Présentation du fondateur** (page À propos) : parcours, photo.
9. **Photos réelles** d'installations, avec accord écrit des clients (`src/content/proof.ts`) — la galerie s'affiche automatiquement.
10. **Avis clients** authentiques (idéalement liés à la fiche Google) — la section s'affiche automatiquement.
11. **Domaine** définitif (`NEXT_PUBLIC_SITE_URL`) et canal de notification des demandes.
12. Vérifier le **productible PVGIS** pour Caen et ajuster `DEFAULT_ASSUMPTIONS` si besoin.

Rien de ce qui précède n'a été inventé : en l'absence d'information, le site affiche une mention neutre ou masque la section.

---

## 9. Optimisations futures, par impact commercial

| Impact | Action |
| --- | --- |
| ★★★ | Fiche **Google Business Profile** + collecte d'avis après chaque chantier : premier levier du référencement local. |
| ★★★ | **Photos réelles** de chantiers et études de cas chiffrées (avec accord client) : principal levier de confiance et de conversion. |
| ★★★ | Brancher un **CRM** (webhook) avec relance automatique sous 1 h ouvrée ; suivre le taux de transformation par source. |
| ★★☆ | Publier les 6 articles planifiés, avec prix et données réelles datées ; mise à jour semestrielle. |
| ★★☆ | Activer **GTM / GA4** (consentement déjà géré) : objectifs `lead_submit`, `phone_click`, `simulator_step` (abandons par étape). |
| ★★☆ | Netlinking local : annuaires professionnels, partenaires (artisans, agences immobilières), presse locale. |
| ★★☆ | Remplacer l'illustration du hero par une photo d'une installation ERE Habitat (format AVIF, `priority`). |
| ★☆☆ | Simulateur : appel à l'API PVGIS côté serveur pour un productible à l'adresse exacte. |
| ★☆☆ | Prise de rendez-vous en ligne (créneaux de visite technique). |
| ★☆☆ | CSP à nonce via `proxy.ts` pour retirer `'unsafe-inline'` des scripts ; limitation de débit sur Redis. |
| ★☆☆ | Nouvelles pages locales (Vire, Ouistreham, Honfleur…) **uniquement** avec contenu distinct et réalisations sur place. |
