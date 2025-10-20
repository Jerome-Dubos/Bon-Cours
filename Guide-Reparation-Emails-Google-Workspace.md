# Guide Dubos Web Services

## Configurer les e-mails Google Workspace sur Gandi

Salut Shokoufa ! 👋

Je vais t'aider à résoudre ce problème d'emails qui ne fonctionnent plus. Ne t'inquiète pas, c'est plus simple qu'il n'y paraît ! Je vais te guider étape par étape.

---

## 🔍 Le problème

Actuellement, quand quelqu'un essaie de t'envoyer un email à **contact@boncours.fr**, il reçoit une erreur car ton domaine n'est pas correctement configuré pour recevoir les emails. C'est comme si ta boîte aux lettres n'avait pas d'adresse !

---

## ✅ La solution

Il faut simplement ajouter les bonnes informations dans la configuration de ton domaine chez Gandi pour que Google Workspace puisse recevoir tes emails.

---

## 📋 Étapes à suivre

### Étape 1 : Se connecter à Gandi

1. Va sur le site de Gandi : **https://admin.gandi.net/**
2. Connecte-toi avec tes identifiants habituels
3. Une fois connectée, tu verras la liste de tes domaines

### Étape 2 : Accéder à la configuration du domaine

1. Trouve **boncours.fr** dans la liste de tes domaines
2. Clique dessus
3. Cherche l'onglet ou la section **"Zone DNS"** et clique dessus

### Étape 3 : Vérifier les enregistrements MX

Dans la section "Zone DNS", regarde s'il y a déjà des lignes avec **"MX"** dans la colonne "Type".

- **Si tu vois des lignes MX** : note-les quelque part au cas où, puis supprime-les toutes
- **Si tu ne vois aucune ligne MX** : parfait, on va en ajouter !

### Étape 4 : Ajouter les enregistrements Google

Maintenant, tu vas ajouter **5 nouvelles lignes** avec les informations suivantes :

| Type | Nom | Priorité | Valeur                   |
| ---- | --- | -------- | ------------------------ |
| MX   | @   | 1        | ASPMX.L.GOOGLE.COM.      |
| MX   | @   | 5        | ALT1.ASPMX.L.GOOGLE.COM. |
| MX   | @   | 5        | ALT2.ASPMX.L.GOOGLE.COM. |
| MX   | @   | 10       | ALT3.ASPMX.L.GOOGLE.COM. |
| MX   | @   | 10       | ALT4.ASPMX.L.GOOGLE.COM. |

**⚠️ Important :**

- N'oublie pas le point final **"."** à la fin de chaque valeur
- Les priorités sont : 1, 5, 5, 10, 10 (dans cet ordre)

### Étape 5 : Enregistrer les modifications

1. Une fois les 5 lignes ajoutées, clique sur **"Enregistrer"** ou **"Sauvegarder"**
2. Gandi va te confirmer que les modifications ont été prises en compte

### Étape 6 : Attendre la propagation

Les modifications vont se propager sur internet. Cela peut prendre :

- **30 minutes à 1 heure** généralement
- **Jusqu'à 24 heures maximum** dans les cas rares

Pendant ce temps, tu peux faire autre chose, pas besoin de rester devant ton ordinateur ! 😊

---

## 🧪 Vérifier que tout fonctionne

Une fois que tu as attendu au moins 30 minutes, tu peux vérifier que tout est bien configuré :

1. Va sur le site : **https://mxtoolbox.com/MXLookup.aspx**
2. Dans le champ de recherche, tape : **boncours.fr**
3. Clique sur "MX Lookup"

**✅ Si tout va bien, tu devrais voir apparaître les 5 serveurs Google :**

- ASPMX.L.GOOGLE.COM.
- ALT1.ASPMX.L.GOOGLE.COM.
- ALT2.ASPMX.L.GOOGLE.COM.
- ALT3.ASPMX.L.GOOGLE.COM.
- ALT4.ASPMX.L.GOOGLE.COM.

**❌ Si tu ne vois rien ou des serveurs différents, attends encore un peu et réessaie.**

---

## 🎉 C'est fini !

Une fois que la vérification montre les bons serveurs Google, tes emails devraient fonctionner parfaitement ! Les gens pourront t'envoyer des emails à **contact@boncours.fr** sans problème.

---

## 🆘 Si tu as besoin d'aide

Si tu rencontres des difficultés ou si quelque chose n'est pas clair, n'hésite pas à me contacter. Je suis là pour t'aider ! 😊

---

_Conçu et développé avec ❤️ à Schiltigheim, France._
_Une solution [Dubos Web Services](https://www.duboswebservices.fr)_
