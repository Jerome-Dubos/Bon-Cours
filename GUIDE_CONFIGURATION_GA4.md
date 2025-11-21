# Guide Configuration Google Analytics 4

## Objectif

Creer un compte Google Analytics 4 pour suivre les performances du site boncours.fr

Temps estime : 10-15 minutes
Cout : Gratuit

## Prerequis

- Un compte Google (Gmail)
- Acces a l'adresse email du compte Google
- Environ 15 minutes de temps

## Etape 1 : Acceder a Google Analytics

1. Ouvrez votre navigateur web
2. Allez sur : https://analytics.google.com/
3. Connectez-vous avec votre compte Google

## Etape 2 : Creer un compte Analytics

1. Si c'est votre premiere fois, cliquez sur "Commencer la mesure" ou "Creer un compte"
2. Si vous avez deja un compte, cliquez sur l'icone Parametres (en bas a gauche), puis "Creer un compte"

Nom du compte :
Institut Bon Cours

Parametres de partage de donnees :

- Cochez toutes les cases
- Cliquez sur "Suivant"

## Etape 3 : Creer une propriete

1. Nom de la propriete : Institut Bon Cours - Site Web
2. Fuseau horaire : (UTC+01:00) Paris
3. Devise : Euro (EUR)
4. Cliquez sur "Suivant"

## Etape 4 : Informations entreprise

1. Secteur d'activite : Education (ou "Formation" si disponible)
2. Taille de l'entreprise : Petite (1-10 employes)
3. Comment souhaitez-vous utiliser Google Analytics ?
   - Mesurer l'engagement des clients
   - Mesurer les conversions (objectifs)
   - Obtenir des informations sur les clients
   - Optimiser les performances
4. Cliquez sur "Creer"
5. Acceptez les conditions d'utilisation

## Etape 5 : Configurer flux de donnees Web

1. Cliquez sur "Flux de donnees Web" ou "Ajouter un flux"

URL du site web : https://boncours.fr
Nom du flux : Site Web Principal
Mesure amelioree : Laissez active (recommandé)

3. Cliquez sur "Creer un flux"

## Etape 6 : Recuperer ID de mesure GA4

Felicitations ! Votre compte GA4 est cree.

1. Sur la page qui s'affiche, vous verrez votre ID de mesure
   - Format : G-XXXXXXXXXX (commence par G- suivi de 10 caracteres)
   - Exemple : G-ABC123XYZ4

2. IMPORTANT : Copiez cet ID de mesure
   - Exemple : G-ABC123XYZ4

3. Envoyez cet ID a votre developpeur (Jerome)
   - Par email ou pendant la visio

## Ou trouver l'ID de mesure

- Sur la page de configuration du flux de donnees
- Dans les parametres : Parametres > Propriete > Flux de donnees > Cliquez sur votre flux > L'ID est affiche en haut

## Verification

Une fois le code installe sur le site :

1. Attendez 24-48 heures
2. Revenez sur https://analytics.google.com/
3. Allez dans "Rapports" (menu de gauche)
4. Vous devriez commencer a voir des donnees de visiteurs

## Ce que vous pourrez voir dans GA4

1. Nombre de visiteurs par jour/semaine/mois
2. Pages les plus visites (accueil, offres, contact, etc.)
3. Origine du trafic (Google, reseaux sociaux, liens directs)
4. Appareils utilises (mobile, tablette, ordinateur)
5. Zones geographiques (d'ou viennent vos visiteurs)
6. Temps passe sur le site
7. Actions des visiteurs (clics sur "Contact", telechargements, etc.)

## Problemes courants

"Je ne trouve pas l'ID de mesure"

- Allez dans : Parametres > Propriete > Flux de donnees
- Cliquez sur votre flux de donnees web
- L'ID est affiche en haut de la page

"Je n'ai pas de compte Google"

- Creez-en un gratuitement sur https://accounts.google.com/signup
- Utilisez une adresse email professionnelle si possible

"Je ne vois pas de donnees apres 48h"

- Verifiez que votre developpeur a bien installe le code
- Verifiez que le site est bien en ligne
- Contactez votre developpeur pour verifier l'installation

## Checklist rapide

- [ ] Compte Google cree / connecte
- [ ] Compte Analytics cree
- [ ] Propriete creee pour boncours.fr
- [ ] Flux de donnees web configure
- [ ] ID de mesure GA4 copie (format : G-XXXXXXXXXX)
- [ ] ID de mesure envoye au developpeur

## Bonus : Apres l'installation

Une fois le code installe, votre developpeur pourra vous aider a :

- Configurer des evenements de conversion (clics sur "Contact", envois de formulaires)
- Creer des tableaux de bord personnalises
- Configurer des alertes (ex: notification si le trafic chute)

Astuce : Gardez cet ID de mesure dans un endroit sur. Vous en aurez besoin si vous changez de developpeur ou si vous souhaitez ajouter d'autres outils de suivi.

Besoin d'aide ? Contactez votre developpeur ou consultez la documentation Google Analytics : https://support.google.com/analytics
