# Configuration EmailJS pour Bon Cours

## Email de destination

Les emails du formulaire de contact sont envoyés à : **contact@boncours.fr**

## Configuration dans EmailJS

### 1. Paramètres du template

Dans votre dashboard EmailJS, configurez le template "Contact Us" avec les paramètres suivants :

#### Variables disponibles :
- `{{name}}` - Nom complet de l'expéditeur
- `{{email}}` - Email de l'expéditeur
- `{{message}}` - Message du formulaire
- `{{time}}` - Date et heure du message
- `{{title}}` - Titre du message (optionnel)
- `{{user_phone}}` - Téléphone (si renseigné)
- `{{preference_contact}}` - Préférence de contact (email ou telephone)
- `{{jours_preferes}}` - Jours préférés (si renseignés)
- `{{horaires_preferes}}` - Horaires préférés (si renseignés)
- `{{school_name}}` - Nom de l'école (Bon Cours)

### 2. Configuration du template EmailJS

#### Dans l'onglet "Content" :

**Subject (Sujet) :**
```
Nouveau message de contact: {{title}}
```

**Content (Corps de l'email) :**

Copiez le contenu du fichier `public/email-templates/contact-template.html` dans l'éditeur HTML du template EmailJS.

OU utilisez cette version simplifiée compatible avec EmailJS :

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #233158; border-radius: 16px;">
          <!-- En-tête -->
          <tr>
            <td style="padding: 40px; text-align: center; background: #233158;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                📧 Nouveau Message de Contact
              </h1>
              <p style="margin: 12px 0 0; color: #92bedf; font-size: 16px;">
                Bon Cours - Institut de Langues
              </p>
            </td>
          </tr>
          
          <!-- Corps -->
          <tr>
            <td style="padding: 40px; background-color: #ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 20px; background: rgba(255, 214, 176, 0.2); border-radius: 12px; border-left: 4px solid #ffd6b0;">
                    <strong style="color: #233158; font-size: 14px; text-transform: uppercase;">Expéditeur</strong>
                    <p style="color: #233158; font-size: 18px; font-weight: 600; margin: 8px 0;">{{name}}</p>
                    <p style="color: #233158; font-size: 14px; margin: 4px 0;">
                      <strong>Email:</strong> <a href="mailto:{{email}}" style="color: #233158;">{{email}}</a>
                    </p>
                    <p style="color: #233158; font-size: 14px; margin: 4px 0;">
                      <strong>Date:</strong> {{time}}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 30px;">
                    <strong style="color: #233158; font-size: 14px; text-transform: uppercase;">Message</strong>
                    <div style="color: #233158; font-size: 16px; line-height: 1.6; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 3px solid #92bedf; margin-top: 12px; white-space: pre-wrap;">{{message}}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Bouton d'action -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #ffffff;">
              <a href="mailto:{{email}}?subject=Re: Votre message de contact" style="display: inline-block; padding: 14px 32px; background: #ffd6b0; color: #233158; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                ✉️ Répondre à {{name}}
              </a>
            </td>
          </tr>
          
          <!-- Pied de page -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background: #1a2640;">
              <p style="margin: 0 0 12px; color: #92bedf; font-size: 14px;">
                <strong style="color: #ffffff;">Bon Cours</strong> - Institut de Langues
              </p>
              <p style="margin: 0; color: #92bedf; font-size: 12px; opacity: 0.7;">
                Ce message a été envoyé depuis le formulaire de contact de votre site web
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

#### Dans l'onglet "Settings" :

**To Email (À l'email) :**
```
contact@boncours.fr
```

**From Email (De l'email) :**
Cochez "Use Default Email Address" (utiliser l'adresse email par défaut du service)

**Reply To (Répondre à) :**
```
{{email}}
```

### 3. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```bash
VITE_EMAILJS_PUBLIC_KEY=votre_cle_publique
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID_CONTACT=votre_template_id
VITE_CONTACT_EMAIL=contact@boncours.fr
VITE_SCHOOL_NAME=Bon Cours
```

### 4. Couleurs de la charte graphique

Les couleurs utilisées dans le template correspondent à votre charte graphique :

- **Bleu foncé (Primary Blue)** : `#233158`
- **Bleu foncé sombre (Primary Blue Dark)** : `#1a2640`
- **Bleu ciel (Sky Blue)** : `#92bedf`
- **Pêche (Peach)** : `#ffd6b0`
- **Blanc** : `#ffffff`
- **Fond gris clair** : `#f4f4f4`

### 5. Test

Pour tester l'envoi d'email :

1. Vérifiez que toutes les variables d'environnement sont configurées
2. Redémarrez le serveur de développement (`npm run dev`)
3. Remplissez le formulaire de contact sur le site
4. Vérifiez que l'email arrive bien à `contact@boncours.fr`

## Dépannage

Si les emails n'arrivent pas :

1. **Vérifiez la console du navigateur** - Des messages d'erreur EmailJS y apparaissent
2. **Vérifiez le dashboard EmailJS** - Section "Email History" pour voir l'historique des envois
3. **Vérifiez les variables d'environnement** - Assurez-vous que toutes les variables sont bien définies dans `.env.local`
4. **Vérifiez le template EmailJS** - Les noms de variables doivent correspondre exactement (`{{name}}`, `{{email}}`, etc.)
5. **Vérifiez le service email** - Dans EmailJS, vérifiez que le service email est bien configuré et actif

## Support

Pour plus d'aide, consultez la documentation EmailJS : https://www.emailjs.com/docs/

