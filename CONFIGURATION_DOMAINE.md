# Configuration du domaine Boncours.fr avec Vercel via Gandi

Ce guide vous explique étape par étape comment connecter votre site hébergé sur Vercel au nom de domaine **boncours.fr** géré par Gandi.

## 📋 Prérequis

- Un compte Vercel avec le projet déployé
- Un compte Gandi avec accès à la gestion du domaine boncours.fr
- Le projet doit être déjà déployé sur Vercel

## 🚀 Étape 1 : Vérifier les domaines dans Vercel (✅ Déjà fait)

D'après votre dashboard Vercel, les domaines suivants sont déjà ajoutés :
- ✅ `boncours.fr` (statut actuel : Invalid Configuration)
- ✅ `www.boncours.fr` (statut actuel : Invalid Configuration)

Les valeurs DNS à configurer dans Gandi sont :
- **boncours.fr** : Enregistrement **A** avec la valeur `216.198.79.1`
- **www.boncours.fr** : Enregistrement **CNAME** avec la valeur `b77e3e856849c1a2.vercel-dns-017.com.`

> 📝 **Note** : Le statut "Invalid Configuration" indique que les enregistrements DNS n'ont pas encore été configurés correctement dans Gandi. Une fois configurés, le statut passera à "Valid Configuration".

## 🔧 Étape 2 : Configurer les DNS dans Gandi

### 2.1 Accéder à la zone DNS dans Gandi

1. Connectez-vous à votre [compte Gandi](https://id.gandi.net/)
2. Allez dans **Domaines** → Sélectionnez **boncours.fr**
3. Cliquez sur **Enregistrements DNS** ou **Zone DNS**

### 2.2 Configurer les enregistrements DNS dans Gandi

**📌 VALEURS EXACTES À CONFIGURER** (selon votre dashboard Vercel) :

Vous devez créer/modifier les enregistrements suivants dans votre zone DNS Gandi :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | `216.198.79.1` | 3600 |
| CNAME | www | `b77e3e856849c1a2.vercel-dns-017.com.` | 3600 |

> ⚠️ **Important** : 
> - Pour l'enregistrement CNAME, **notez le point (.) à la fin** de la valeur : `b77e3e856849c1a2.vercel-dns-017.com.`
> - Le nom `@` représente le domaine racine (boncours.fr)

### 2.3 Instructions détaillées étape par étape dans Gandi

1. **Connectez-vous à Gandi** :
   - Allez sur [https://id.gandi.net/](https://id.gandi.net/)
   - Connectez-vous avec vos identifiants

2. **Accédez à la zone DNS** :
   - Cliquez sur **Domaines** dans le menu
   - Sélectionnez **boncours.fr**
   - Cliquez sur **Enregistrements DNS** ou **Zone DNS**

3. **Configurez l'enregistrement A pour boncours.fr** :
   - Cherchez s'il existe déjà un enregistrement de type **A** avec le nom **@** (ou vide)
   - **Si oui** : Modifiez-le pour que la valeur soit `216.198.79.1`
   - **Si non** : Créez un nouvel enregistrement :
     - **Type** : `A`
     - **Nom** : `@` (ou laissez vide, selon l'interface Gandi)
     - **Valeur** : `216.198.79.1`
     - **TTL** : `3600` (ou valeur par défaut)
   - Sauvegardez

4. **Configurez l'enregistrement CNAME pour www.boncours.fr** :
   - Cherchez s'il existe déjà un enregistrement de type **CNAME** avec le nom **www**
   - **Si oui** : Modifiez-le pour que la valeur soit `b77e3e856849c1a2.vercel-dns-017.com.`
   - **Si non** : Créez un nouvel enregistrement :
     - **Type** : `CNAME`
     - **Nom** : `www`
     - **Valeur** : `b77e3e856849c1a2.vercel-dns-017.com.` ⚠️ **Avec le point à la fin !**
     - **TTL** : `3600` (ou valeur par défaut)
   - Sauvegardez

5. **Vérifiez vos modifications** :
   - Assurez-vous que les enregistrements sont bien sauvegardés
   - La zone DNS devrait maintenant contenir ces deux enregistrements

### 2.4 À quoi devrait ressembler votre zone DNS dans Gandi

Après configuration, votre zone DNS devrait ressembler à ceci :

```
Type    Nom      Valeur                                    TTL
---------------------------------------------------------------
A       @        216.198.79.1                              3600
CNAME   www      b77e3e856849c1a2.vercel-dns-017.com.      3600
```

> 💡 **Astuce** : Dans certaines interfaces Gandi, le nom `@` peut apparaître comme vide ou comme le nom de domaine lui-même. C'est normal, cela représente toujours le domaine racine.

## ⏱️ Étape 3 : Attendre la propagation DNS

- La propagation DNS peut prendre de **quelques minutes à 48 heures**
- En général, cela prend entre 1 à 4 heures
- Vérifiez le statut dans votre dashboard Vercel : l'icône devrait passer de jaune (en attente) à vert (actif)

## ✅ Étape 4 : Vérifier la configuration

1. Dans Vercel, attendez que les domaines affichent un statut **Valid Configuration**
2. Testez les domaines :
   - `https://boncours.fr`
   - `https://www.boncours.fr`

### Commandes utiles pour vérifier :

```bash
# Vérifier les enregistrements DNS
dig boncours.fr +short
dig www.boncours.fr +short

# Ou avec nslookup
nslookup boncours.fr
nslookup www.boncours.fr
```

## 🔒 Étape 5 : SSL/TLS (Automatique)

Vercel configure automatiquement le certificat SSL gratuit via Let's Encrypt. Une fois les DNS propagés, le certificat est généré automatiquement (peut prendre quelques minutes supplémentaires).

## ⚙️ Configuration HTTPS et redirections

Vercel redirige automatiquement :
- HTTP → HTTPS
- www.boncours.fr → boncours.fr (ou vice-versa selon votre préférence)

Pour configurer les redirections, allez dans **Settings** → **Domains** dans Vercel et configurez la redirection préférée.

## 🐛 Dépannage

### Le domaine ne fonctionne pas après 24h

1. Vérifiez que les enregistrements DNS sont corrects dans Gandi
2. Assurez-vous que le point (.) est présent à la fin des valeurs CNAME
3. Vérifiez dans Vercel que le domaine est bien ajouté
4. Utilisez un outil comme [DNS Checker](https://dnschecker.org/) pour voir la propagation mondiale

### Erreur "Invalid Configuration" dans Vercel

- Vérifiez que vous avez utilisé les bonnes adresses IP ou valeurs CNAME données par Vercel
- Assurez-vous qu'il n'y a pas de conflits avec d'anciens enregistrements DNS

### Problèmes de SSL

- Attendez 15-30 minutes après la propagation DNS pour que Vercel génère le certificat SSL
- Si le problème persiste, supprimez et réajoutez le domaine dans Vercel

## 📞 Support

- **Vercel** : [Documentation Vercel - Domaines](https://vercel.com/docs/concepts/projects/domains)
- **Gandi** : [Support Gandi](https://www.gandi.net/fr/support)

---

## 📝 Récapitulatif rapide

Pour configurer rapidement votre domaine dans Gandi :

1. **boncours.fr** → Créer/modifier enregistrement **A** :
   - Nom : `@`
   - Valeur : `216.198.79.1`

2. **www.boncours.fr** → Créer/modifier enregistrement **CNAME** :
   - Nom : `www`
   - Valeur : `b77e3e856849c1a2.vercel-dns-017.com.` (avec le point à la fin)

3. Attendre la propagation DNS (1-4 heures généralement)

4. Vérifier dans Vercel que le statut passe à "Valid Configuration"

