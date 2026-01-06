Fleurs pour Tous — Page Web Accessible

Projet Web - Accessibilité et Standards W3C

Objectif du projet

Ce projet consiste à créer une page web unique respectant les règles d’accessibilité et les standards du W3C (HTML5 sémantique, attributs ARIA, contrastes, navigation clavier).
Le thème choisi, "Fleurs pour Tous", présente un coffret de fleurs mensuel conçu pour être accessible à tous, y compris aux personnes malvoyantes, daltoniennes, dyslexiques ou sourdes/malentendantes.

L’objectif est de proposer une page :

- accessible

- lisible

- compatible avec les lecteurs d’écran

- validée par le validateur W3C

Présentation du projet

"Fleurs pour Tous" met en avant un coffret de fleurs conçu autour de plusieurs principes d’accessibilité :

- contraste visuel suffisant

- textures facilement identifiables

- fiche explicative simple et claire

- QR code menant vers une description audio

Cette page illustre le produit tout en appliquant les bonnes pratiques essentielles de l’accessibilité numérique.

Structure générale de la page

La page utilise une structure HTML5 sémantique pour offrir une organisation claire et interprétable par les lecteurs d’écran.

Header

    Logo et nom du site

    Menu de navigation utilisable au clavier, avec attributs ARIA

Section Produit

    Titre principal (h1)

    Présentation du coffret

    Bouton d’action accessible

Section Le Coffret

    Image descriptive avec texte alternatif

    Description du contenu du coffret

Section Accessibilité

    Présentation des mesures d’accessibilité appliquées

    Informations sur les contrastes, la typographie et l’audio-description

Section Vidéo

    Vidéo intégrée avec sous-titres

    Légende via figcaption

    Attributs ARIA pour améliorer l’interprétation

Section Formulaire

    Formulaire de contact conforme WCAG

    Labels associés à chaque champ

    Messages d’erreur clairs

    Navigation possible uniquement au clavier

Footer

    Mentions légales

    Contact

    Lien vers une déclaration d’accessibilité

Accessibilité : principes appliqués

Le site respecte les critères WCAG 2.1 niveau AA.

Structure et navigation

    Utilisation des balises header, nav, main, section et footer

    Hiérarchie correcte des titres (h1, h2, h3)

    Focus visible sur les éléments interactifs

    Navigation clavier complète

Contenu lisible

    Contrastes conformes aux exigences

    Texte simple et clair

    Typographie lisible et interlignage suffisant

Compatibilité lecteurs d’écran

    Attributs ARIA lorsque nécessaire

    Texte alternatif détaillé pour les images

    Vidéo accessible avec sous-titres

    Liens explicites

Formulaire accessible

    Labels reliés via l’attribut "for"

    Attributs aria-required et aria-invalid si besoin

    Indications d’erreur simples et visibles

Technologies utilisées

    HTML5 (structure sémantique)

    CSS3

    JavaScript léger si nécessaire

    Validation via le validateur HTML W3C

Validation du site

La page sera vérifiée via :

- Validateur HTML W3C

- Tests avec lecteurs d’écran (NVDA, VoiceOver)

- Vérification des contrastes (WebAIM)

- Tests de navigation uniquement au clavier

- Interprétation par un navigateur d’écran

Arborescence prévue

index.html
css/style.css
images/
video/
README.md

Auteur

Projet réalisé par Deverchere Geoffrey dans le cadre du module consacré à l’accessibilité Web.