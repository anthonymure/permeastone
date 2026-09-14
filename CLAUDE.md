# CLAUDE.md

Ce fichier guide Claude Code (et tout dev) sur ce dépôt. Le projet n'est pas encore initialisé (dossier vide) : ce document sert de brief de cadrage avant la première ligne de code.

## 1. Le projet

Site vitrine premium pour **PermeaStone**, marque spécialisée dans les revêtements de sols extérieurs perméables, repositionnée pour s'adresser en priorité au secteur de **l'hôtellerie et de l'hospitalité** (hôtels, établissements touristiques, et selon périmètre : architectes, paysagistes, maîtres d'œuvre).

- Un configurateur de solutions est envisagé **plus tard** (v2) — l'architecture doit rester ouverte à cette évolution (voir §8) mais ce n'est **pas** le scope actuel.
- Le site de référence sectoriel (catalogue de solutions) est **https://permeasol.fr/nos-solutions/** — à utiliser uniquement comme contexte fonctionnel sur les familles de sols perméables, jamais comme référence de design ou de ton : PermeaStone doit avoir sa propre identité, premium et éditoriale, pas une logique de catalogue fournisseur.

Document source complet du positionnement de marque : `Permeastone_Branding_Storytelling.docx` (fourni par le client). Ce CLAUDE.md en condense l'essentiel ci-dessous ; se référer au document original en cas de doute.

## 2. Positionnement de marque (à respecter dans tout le contenu et le ton)

**Idée directrice de la homepage : « CE QUE L'ON VOIT. CE QUI LE REND POSSIBLE. »**

- Le visiteur d'un hôtel remarque l'architecture, le paysage, la piscine, la lumière — jamais le sol. Pourtant le sol relie tout et rend l'expérience possible.
- Conviction : *il n'existe pas de sol idéal, seulement le sol adapté à chaque lieu.*
- Promesse : faire en sorte que le sol s'efface au profit du lieu et de l'expérience.
- Signature potentielle du branding stratégique : **« Le bon sol est celui que l'on oublie. »**
- Personnalité de marque : calme, à l'écoute, précise, experte sans être prétentieuse, sûre et rassurante, premium par la maîtrise et la retenue. Émotion recherchée : la **sérénité**.
- Positionnement : un **accompagnateur/partenaire de projet**, pas un simple vendeur de revêtements.

**Territoire verbal** (à piocher pour les textes, CTA, micro-copy) :
- Expérience : expérience, accueil, confort, bien-être, hospitalité, sérénité, harmonie, élégance, usage, extérieur
- Matière/sol : sol, surface, matière, texture, finition, minéral, perméable, drainant, résistant, durable
- Lien : lien, fondation, équilibre, continuité, intégration, transition, connexion, cohérence
- Invisible : invisible, discret, essentiel, sous la surface, effacé, intégré, naturel, silencieux, s'effacer
- Sérénité professionnelle : confiance, sérénité, maîtrise, expertise, accompagnement, précision, conseil, fiabilité

**Grammaire visuelle/narrative** (contrastes à exploiter) : Visible/Invisible · Expérience/Technique · Esthétique/Performance · Surface/Profondeur · Architecture/Sol · Regard/Usage. Le contraste n'oppose pas deux mondes : la technique existe pour que l'expérience reste visible.

> ⚠️ **Point à clarifier avec le client** : le document stratégique pousse vers la signature « le sol qu'on oublie » (positionnement hôtellerie premium), tandis que la planche de marque graphique porte la baseline « Sol perméable · Naturel · Durable » (positionnement plus générique/technique). À réconcilier avant rédaction finale des textes — pour l'instant, prioriser le ton du document stratégique pour la homepage, et la baseline technique peut rester en usage secondaire (footer, cartes de visite, supports déjà imprimés).

## 3. Identité graphique

- **Logo** : monogramme géométrique combinant les lettres P et E, forme hexagonale, évoque l'écoulement de l'eau, la structure minérale et la durabilité. Disponible en vectoriel (fourni par le client) — décliné en blanc sur fond foncé et en version couleur sur fond clair.
- **Palette de couleurs** :
  - `#1E4B3D` — vert foncé (couleur principale/dominante)
  - `#A6B79A` — vert sauge
  - `#D9C6B0` — beige/sable
  - `#2B2B2B` — anthracite/noir
  - `#F5F5F2` — blanc cassé (fond clair)
- **Typographies** :
  - Titres / logotype : **Playfair Display** (serif, élégance éditoriale)
  - Corps de texte : **Montserrat** (sans-serif, lisibilité)
- À déclarer comme design tokens (Tailwind theme / CSS variables), pas en valeurs codées en dur dans les composants.

## 4. Statut des assets (au 2026-09-14)

- ✅ Logo vectoriel disponible.
- ❌ Photos éditoriales hôtelières et réalisations **pas encore disponibles**.
- **Conséquence pratique** : développer avec des placeholders (images de substitution haute qualité, cadrages/ratios corrects) faciles à remplacer ensuite via le CMS (voir §6), sans devoir retoucher la mise en page quand les vraies photos arriveront. Prévoir les bons ratios/formats dès les composants (le style éditorial du site dépend de photographie de qualité, pas de stock générique — privilégier des placeholders sobres plutôt que du stock clairement identifiable comme tel).

## 5. Structure du site & concept d'infinite scroll

### Navigation (persistante, légère, jamais chargée)
- Solutions
- Applications
- Réalisations
- Notre approche
- Votre projet (contact)

La homepage est **émotionnelle et narrative** (infinite scroll) ; la navigation sert à sortir du récit pour accéder directement à l'info recherchée.

### Séquence de l'infinite scroll (homepage)
Chaque étape a une fonction narrative précise — ne pas ajouter d'animation sans fonction :

1. **L'expérience** — grande scène hôtelière (architecture, piscine, terrasse, paysage), très peu de texte.
2. **Le sol que l'on oublie** — le cadrage se rapproche progressivement du sol.
3. **Le lien** — le sol devient le point de connexion entre architecture, paysage, eau, usage.
4. **Sous la surface** — transition forte : coupe du système, circulation de l'eau, structure.
5. **La matière** — retour à la surface, découverte sensorielle des textures/finitions.
6. **Un sol pour chaque lieu** — scènes d'usages hôteliers (piscine, terrasse, spa, restauration, cheminements).
7. **Le projet avant le produit** — méthode d'accompagnement (lieu → architecture → usage → environnement → contraintes → solution).
8. **Les réalisations** — projets présentés comme histoires éditoriales.
9. **La preuve technique** — données/performances présentées clairement après le contexte émotionnel.
10. **La boucle** — retour à une scène hôtelière proche du début.

Architecture globale recommandée : **PROMESSE → PHILOSOPHIE → RÉVÉLATION → SOLUTIONS → APPLICATIONS → ACCOMPAGNEMENT → PREUVES → SÉRÉNITÉ → PROJET**.

### Principes UX / direction artistique (non négociables)
- Homepage très aérée, beaucoup d'espace négatif, très peu de texte simultané à l'écran.
- Photographie éditoriale/architecturale, jamais un rendu « catalogue fournisseur ».
- Typographie généreuse, hiérarchie très claire.
- Animations **lentes, précises, rares** — jamais décoratives sans fonction ; la 3D/profondeur doit toujours expliquer ou révéler quelque chose.
- Le premium vient de la **précision et de la retenue**, pas de la quantité d'effets.
- Les pages Solutions peuvent être plus rationnelles/techniques mais gardent l'esthétique premium.

## 6. Stack technique (décidée avec le client)

- **Framework** : Next.js (App Router), TypeScript.
- **Style** : Tailwind CSS, avec la palette/typographie de marque déclarée en design tokens.
- **Animation / scroll storytelling** : **GSAP + ScrollTrigger** pour les séquences pilotées de l'infinite scroll (pinning, zooms progressifs, transitions « sous la surface »), + **Lenis** pour le smooth scroll. **Framer Motion** pour les micro-interactions (nav, boutons, transitions de page) — ne pas dupliquer les responsabilités entre les deux libs.
- **CMS headless : Sanity.io** — décision motivée par le besoin d'une personne **non technique côté PermeaStone** pour mettre à jour le contenu facilement, sans redéploiement ni intervention dev.
  - `next-sanity` pour la connexion Next.js, requêtes GROQ, revalidation à la demande (webhook Sanity → route Next.js) pour publier sans rebuild complet.
  - Studio Sanity accessible via un login dédié (embarqué sur `/studio` ou en subdomain `*.sanity.studio`) — soigner l'ergonomie des schémas (libellés clairs en français, aperçus visuels, aide contextuelle) car l'éditeur n'est pas technique.
  - Types de contenu à modéliser au minimum : `solution` (nom, description, caractéristiques techniques, photos, applications liées), `realisation` (projet, lieu, photos, texte éditorial), `application` (usage hôtelier : piscine, terrasse, spa...), `page`/`section` pour les textes de la homepage narrative, `siteSettings` (coordonnées, réseaux sociaux, SEO par défaut).
  - Modéliser les `solution` avec des champs structurés (pas juste du texte libre) pour rester compatible avec un futur configurateur (§8).
- **Formulaire de contact** ("Votre projet") : formulaire simple avec envoi d'email (ex. via Resend ou équivalent) pour le lancement. Prévoir une architecture qui permette de brancher un webhook vers un CRM plus tard sans réécrire le formulaire (ex. route API dédiée qui peut être étendue).
- **Langue** : français uniquement pour l'instant. Ne pas sur-ingénierer un système i18n dès maintenant, mais éviter de hardcoder les textes d'une façon qui rendrait un futur ajout de l'anglais coûteux (ex. centraliser les textes de contenu dans Sanity plutôt que dans le JSX, pour tout ce qui est éditorial).

## 7. Hébergement & déploiement

- Le client gère son nom de domaine chez **OVH** mais n'a pas de compétence infra particulière et n'a pas de contrainte technique ferme.
- **Recommandation retenue** : déployer l'application Next.js sur **Vercel** (support natif de l'ISR/SSR de Next.js, zero-config, plan gratuit suffisant pour démarrer, previews automatiques par PR) et **pointer le domaine OVH vers Vercel via DNS** (CNAME/A record). C'est une pratique standard : le nom de domaine reste chez OVH, l'hébergement applicatif se fait sur Vercel.
- Éviter un hébergement web mutualisé/statique classique OVH pour l'app Next.js elle-même : la revalidation de contenu Sanity et le SSR ont besoin d'un runtime Node actif, ce qu'un hébergement mutualisé ne fournit pas nativement (il faudrait un VPS/Public Cloud OVH avec Node + reverse proxy, plus de maintenance pour un gain nul par rapport à Vercel).

## 8. Roadmap de développement (v1)

Phases indicatives pour construire le site, du dossier vide au lancement. À ajuster une fois qu'on démarrera réellement (dépend de la disponibilité des vraies photos, notamment).

1. **Setup projet** — init Next.js (App Router, TypeScript, Tailwind), config des design tokens de marque (§3), mise en place du repo/CI, config Sanity (projet, dataset) et connexion `next-sanity`.
2. **Schémas Sanity & contenu de base** — modéliser `solution`, `realisation`, `application`, `page`/sections narratives, `siteSettings` ; former/documenter l'usage du Studio pour la personne non-technique côté PermeaStone.
3. **Design system & composants de base** — typographie, grille, boutons, nav légère, composants d'image (avec placeholders en attendant les vraies photos, §4).
4. **Homepage narrative** — mise en place de l'infinite scroll avec GSAP/ScrollTrigger + Lenis, séquence des 10 étapes (§5), d'abord avec contenu/placeholders, animations affinées ensuite.
5. **Pages secondaires** — Solutions, Applications, Réalisations, Notre approche, Votre projet (contact) — pilotées par Sanity.
6. **Formulaire de contact** — formulaire + envoi d'email (Resend ou équivalent), structuré pour accueillir un CRM plus tard (§6).
7. **Contenu réel & QA** — intégration des vraies photos/réalisations dès réception, relecture des textes (cf. points ouverts §9), tests responsive/accessibilité/perf, revue des animations (sobriété, §5).
8. **Déploiement & lancement** — mise en place Vercel + DNS du domaine OVH (§7), vérification SEO de base, mise en ligne.

## 9. Évolutions futures (v2+)

- **Configurateur** : permettre à un visiteur (professionnel) de configurer une solution de sol selon son projet (lieu, usage, contraintes). Pas de spec détaillée à ce stade — garder en tête en modélisant les données `solution` de façon structurée dans Sanity (propriétés techniques, compatibilités d'usage) plutôt que du texte libre, pour pouvoir réutiliser ces données dans une logique de configurateur plus tard.
- **CRM** : le formulaire de contact pourra être branché à un CRM plus tard — concevoir la route de soumission de façon à pouvoir ajouter cette intégration sans réécrire le formulaire front.
- **i18n anglais** : possible plus tard — éviter les blocages structurels (voir §6).

## 10. Points ouverts à valider avec le client (issus du document de cadrage)

Ces éléments impactent directement le contenu du site et doivent être clarifiés avant/pendant la rédaction :
- Périmètre exact de prestation PermeaStone : conseil, fourniture, pose, prescription, ou combinaison.
- Liste réelle des familles de solutions proposées par PermeaStone (le catalogue permeasol.fr — résine drainante, béton poreux, stabilisateur de graviers, pavés drainants/gazon synthétique, sol souple EPDM — sert de référence sectorielle générale, pas de liste confirmée pour PermeaStone).
- Performances techniques revendicables et documentables (pour la section « preuve technique »).
- Types de clients prioritaires dans l'hôtellerie (hôtels indépendants ? chaînes ? camping/plein air ? spas ?).
- Réconciliation de la baseline (« Le sol qu'on oublie » vs « Sol perméable · Naturel · Durable », voir §2).
- Photos/réalisations réelles à intégrer dès qu'elles sont disponibles (voir §4).

## 11. Conventions de code (à appliquer dès l'initialisation du projet)

- TypeScript strict activé.
- Design tokens (couleurs, typographies, espacements) centralisés (Tailwind config `theme.extend`), jamais de valeurs de marque codées en dur dans les composants.
- Séparer clairement : composants de mise en page/narration (scroll storytelling homepage) vs composants de contenu piloté par Sanity (Solutions, Réalisations) — les seconds ne doivent pas contenir de texte en dur.
- Respecter les principes UX du §5 dans toute nouvelle animation ou composant : sobriété, fonction narrative claire, pas d'effet gratuit.

---
*Ce fichier doit être mis à jour au fur et à mesure des décisions (choix de structure de dossiers, schémas Sanity finalisés, conventions de nommage) une fois le projet initialisé.*
