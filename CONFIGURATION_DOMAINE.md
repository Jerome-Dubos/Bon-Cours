# Configuration du domaine Boncours.fr avec Vercel via Gandi

Ce guide vous explique étape par étape comment connecter votre site hébergé sur Vercel au nom de domaine **boncours.fr** géré par Gandi.

## 📋 Prérequis

- Un compte Vercel avec le projet déployé
- Un compte Gandi avec accès à la gestion du domaine boncours.fr
- Le projet doit être déjà déployé sur Vercel

## 🚀 Étape 1 : Ajouter le domaine dans Vercel

1. Connectez-vous à votre [dashboard Vercel](https://vercel.com/dashboard)
2. Sélectionnez votre projet (boncours-frontend)
3. Allez dans l'onglet **Settings** (Paramètres)
4. Cliquez sur **Domains** dans le menu de gauche
5. Ajoutez les domaines suivants :
   - `boncours.fr`
   - `www.boncours.fr` (optionnel mais recommandé)
6. Vercel va vous afficher les **valeurs DNS à configurer** pour chaque domaine

## 🔧 Étape 2 : Configurer les DNS dans Gandi

### 2.1 Accéder à la zone DNS dans Gandi

1. Connectez-vous à votre [compte Gandi](https://id.gandi.net/)
2. Allez dans **Domaines** → Sélectionnez **boncours.fr**
3. Cliquez sur **Enregistrements DNS** ou **Zone DNS**

### 2.2 Configurer les enregistrements

Vercel propose généralement deux méthodes pour connecter un domaine racine :

#### **Option A : Utiliser les enregistrements A (recommandé pour les domaines racine)**

Ajoutez/modifiez les enregistrements suivants dans votre zone DNS Gandi :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | `76.76.21.21` | 3600 |
| A | @ | `76.76.22.22` | 3600 |
| CNAME | www | `cname.vercel-dns.com.` | 3600 |

> ⚠️ **Note** : Les adresses IP ci-dessus sont les adresses par défaut de Vercel. Vérifiez dans votre dashboard Vercel les valeurs exactes qui vous sont données.

#### **Option B : Utiliser CNAME via DNS flattening**

Si Gandi supporte les CNAME pour le domaine racine (ALIAS/ANAME) :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| ALIAS ou CNAME | @ | `cname.vercel-dns.com.` | 3600 |
| CNAME | www | `cname.vercel-dns.com.` | 3600 |

### 2.3 Instructions détaillées pour Gandi

1. **Pour le domaine racine (boncours.fr)** :
   - Si vous choisissez l'option A : Supprimez l'ancien enregistrement A s'il existe, puis ajoutez les deux nouveaux enregistrements A avec les IP de Vercel
   - Si vous choisissez l'option B : Créez un enregistrement ALIAS (ou ANAME selon Gandi) pointant vers `cname.vercel-dns.com.`

2. **Pour www.boncours.fr** :
   - Créez ou modifiez un enregistrement CNAME :
     - **Nom** : `www`
     - **Type** : `CNAME`
     - **Valeur** : `cname.vercel-dns.com.` (notez le point à la fin)
     - **TTL** : `3600` (ou la valeur par défaut)

### 2.4 Exemple de configuration dans Gandi

Dans l'interface Gandi, voici à quoi ressemblerait votre zone DNS :

```
@        IN A        76.76.21.21
@        IN A        76.76.22.22
www      IN CNAME    cname.vercel-dns.com.
```

Ou si vous utilisez ALIAS :

```
@        IN ALIAS    cname.vercel-dns.com.
www      IN CNAME    cname.vercel-dns.com.
```

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

**Note** : Les valeurs IP et CNAME spécifiques à votre projet sont affichées dans le dashboard Vercel lorsque vous ajoutez un domaine. Utilisez toujours ces valeurs plutôt que celles génériques mentionnées ci-dessus.

