# Fleurs pour Tous — Mini-site produit accessible

## Présentation
Fleurs pour Tous est un mini-site de présentation d’un coffret floral mensuel conçu autour de l’accessibilité.
Le projet respecte une approche “mobile-first” et applique des bonnes pratiques inspirées des WCAG :
structure claire, navigation clavier, composants contrôlables (carrousel, modales), formulaires guidés et validés.

Objectif pédagogique : produire un mini-site complet (HTML/CSS/JS vanilla) avec une page produit accessible,
une vidéo sous-titrée, un carrousel contrôlable, un formulaire compréhensible et des éléments robustes (validation, audits).

## Pages du site
- Accueil (index.html)
  - Hero banner avec bouton d’appel à l’action vers la page produit.
- Produit (produit.html)
  - Carrousel d’images (défilement + contrôles clavier + bouton Pause/Lecture).
  - Vidéo via balise <video> avec sous-titres externes (.vtt).
  - Cartes produits (présentation détaillée).
- Contact (contact.html)
  - Formulaire complet avec aide à la saisie, fieldset, validations inclusives et retours utilisateur.
- À propos (apropos.html)
  - Présentation de la boutique/marque et au moins une photo.

## Fonctionnalités d’accessibilité (exemples)
- Lien d’évitement (skip link) vers le contenu principal.
- Navigation cohérente (header fixe) et footer identique sur toutes les pages.
- Carrousel contrôlable :
  - Navigation au clavier
  - Bouton Pause/Lecture pour arrêter l’auto-défilement
- Vidéo accessible :
  - <video> + sous-titres externes (.vtt)
- Formulaire compréhensible :
  - Champs requis : Nom, Prénom, Date de naissance, Email, Téléphone, Plage horaire (radio), Message
  - Aide aux formats (JJ/MM/AAAA, téléphone, email)
  - Groupes via fieldset (coordonnées et plage horaire)
  - Validation stricte mais inclusive (accents autorisés)
  - Feedback utilisateur : erreurs claires + notification succès + modale de confirmation
- Modales :
  - Ouverture/fermeture clavier (Échap)
  - Gestion du focus (piège + retour au déclencheur)

## Technologies
- HTML5
- CSS3 (mobile-first)
- JavaScript vanilla (sans framework, sans librairie externe)

## Arborescence
- index.html
- produit.html
- contact.html
- style.css
- script.js
- assets/
  - images/
  - icones/
  - flower_logo.svg
- media/
  - interview_fleuriste.mp4
  - soustitres_interview.vtt
- audits/
  - lighthouse.pdf
  - wave.png (capture du résumé WAVE)

## Lancer le projet
1) Télécharger/cloner le dépôt.
2) Ouvrir index.html dans un navigateur.
   Recommandé : utiliser “Live Server” dans VS Code pour éviter certains blocages de fichiers locaux.

## Audits (à fournir dans le dépôt)
- Lighthouse : rapport en PDF.
- WAVE : capture d’écran du résumé (erreurs/alertes).

## Crédits
- Images : fichiers personnels / intégrés dans assets/images.
- Icônes : fichiers SVG intégrés dans assets/icones.
- Vidéo : fichier local dans media/ (avec sous-titres .vtt).
