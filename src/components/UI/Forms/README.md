# Formulaires UI - Bon Cours

Bibliothèque de formulaires réutilisables et modernes pour l'application Bon Cours.

## 📦 Composants disponibles

### ContactForm

Formulaire de contact complet avec validation, gestion des préférences de contact et notifications.

### LoginForm

Formulaire de connexion sécurisé avec gestion du mot de passe, "Se souvenir de moi" et notifications.

## 🚀 Installation & Utilisation

### Import des composants

```jsx
import { ContactForm, LoginForm } from '@/components/UI/Forms';
```

### ContactForm - Utilisation basique

```jsx
import { ContactForm } from '@/components/UI/Forms';

function ContactPage() {
  const handleSubmit = async formData => {
    // Traiter les données du formulaire
    console.log(formData);
    // formData contient: { nom, prenom, email, telephone, message, jours, horaires, preferenceContact }

    // Retourner un objet de résultat
    return { success: true };
  };

  return (
    <ContactForm
      onSubmit={handleSubmit}
      onSuccess={data => console.log('Succès!', data)}
      onError={error => console.error('Erreur:', error)}
    />
  );
}
```

### ContactForm - Props disponibles

| Prop                | Type                | Par défaut                   | Description                                               |
| ------------------- | ------------------- | ---------------------------- | --------------------------------------------------------- |
| `onSubmit`          | `function`          | `undefined`                  | Fonction appelée lors de la soumission (async recommandé) |
| `submitText`        | `string`            | `t('forms.contact.submit')`  | Texte du bouton d'envoi                                   |
| `loadingText`       | `string`            | `t('forms.contact.loading')` | Texte pendant le chargement                               |
| `className`         | `string`            | `''`                         | Classes CSS additionnelles                                |
| `variant`           | `'full' \| 'modal'` | `'full'`                     | Variante d'affichage                                      |
| `showJoursHoraires` | `boolean`           | `true`                       | Afficher les champs jours/horaires                        |
| `initialData`       | `object`            | `{}`                         | Données initiales du formulaire                           |
| `onSuccess`         | `function`          | `undefined`                  | Callback de succès                                        |
| `onError`           | `function`          | `undefined`                  | Callback d'erreur                                         |

### LoginForm - Utilisation basique

```jsx
import { LoginForm } from '@/components/UI/Forms';

function LoginPage() {
  const handleLogin = async ({ email, password, rememberMe }) => {
    // Authentifier l'utilisateur
    const response = await authService.login(email, password);

    if (rememberMe) {
      // Sauvegarder la session
      localStorage.setItem('remember', 'true');
    }

    return response;
  };

  const handleForgotPassword = () => {
    // Rediriger vers la page de récupération
    navigate('/forgot-password');
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSuccess={data => navigate('/dashboard')}
      onError={error => console.error('Erreur de connexion:', error)}
    />
  );
}
```

### LoginForm - Props disponibles

| Prop                 | Type       | Par défaut                 | Description                                              |
| -------------------- | ---------- | -------------------------- | -------------------------------------------------------- |
| `onSubmit`           | `function` | `undefined`                | Fonction appelée lors de la connexion (async recommandé) |
| `onForgotPassword`   | `function` | `undefined`                | Fonction appelée au clic sur "Mot de passe oublié"       |
| `submitText`         | `string`   | `t('forms.login.submit')`  | Texte du bouton de connexion                             |
| `loadingText`        | `string`   | `t('forms.login.loading')` | Texte pendant le chargement                              |
| `className`          | `string`   | `''`                       | Classes CSS additionnelles                               |
| `showRememberMe`     | `boolean`  | `true`                     | Afficher "Se souvenir de moi"                            |
| `showForgotPassword` | `boolean`  | `true`                     | Afficher "Mot de passe oublié"                           |
| `onSuccess`          | `function` | `undefined`                | Callback de succès                                       |
| `onError`            | `function` | `undefined`                | Callback d'erreur                                        |

## 🎨 Personnalisation CSS

Les formulaires utilisent des variables CSS pour faciliter la personnalisation :

```css
:root {
  --primary: #4a90e2;
  --secondary: #357abd;
  --error: #ef4444;
  --text-light: #e0e0e0;
}
```

Vous pouvez surcharger les styles en utilisant les classes CSS :

- `.contact-form`, `.login-form` : Conteneurs principaux
- `.contact-field`, `.login-field` : Champs de formulaire
- `.contact-input`, `.login-input` : Inputs
- `.contact-submit-button`, `.login-submit-button` : Boutons de soumission

## ✅ Règles de validation

Les formulaires incluent des règles de validation réutilisables :

```jsx
import {
  createRequiredRule,
  createEmailRule,
  createPhoneRule,
  createNameRule,
  createPasswordRule,
  createMessageRule,
  createMinLengthRule,
  createMaxLengthRule,
  createPatternRule,
  createMatchRule,
} from '@/components/UI/Forms';

// Exemple d'utilisation personnalisée
const validateCustomField = value => {
  const error = createRequiredRule()(value) || createMinLengthRule(5)(value);
  return error;
};
```

## 🔔 Notifications

Les formulaires gèrent automatiquement les notifications de succès et d'erreur. Elles utilisent les composants `SuccessNotification` et `ErrorNotification` de la bibliothèque UI.

## 🌍 Internationalisation (i18n)

Les formulaires sont entièrement traduits via react-i18next. Les clés de traduction sont :

### ContactForm

- `forms.contact.submit`, `forms.contact.loading`
- `forms.contact.success`, `forms.contact.error`
- `forms.contact.fields.*`
- `forms.contact.placeholders.*`
- `forms.contact.options.*`

### LoginForm

- `forms.login.submit`, `forms.login.loading`
- `forms.login.success`, `forms.login.error`
- `forms.login.fields.*`
- `forms.login.placeholders.*`

## 📱 Responsive

Les deux formulaires sont entièrement responsive et s'adaptent automatiquement :

- Desktop : Layout en 2 colonnes (ContactForm)
- Tablet : Layout adapté
- Mobile : Layout en 1 colonne, optimisé pour les écrans tactiles

## ♿ Accessibilité

- Labels appropriés pour tous les champs
- Support complet du clavier
- ARIA labels pour les boutons d'action
- Focus visible pour la navigation au clavier
- Support de `prefers-reduced-motion`

## 📝 Exemples avancés

### ContactForm avec données initiales

```jsx
<ContactForm
  initialData={{
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean@example.com',
    preferenceContact: 'telephone',
  }}
  variant='modal'
/>
```

### LoginForm avec validation personnalisée

```jsx
<LoginForm
  onSubmit={async ({ email, password }) => {
    // Validation personnalisée
    if (email.includes('admin') && !isAdminAllowed()) {
      throw new Error('Accès administrateur non autorisé');
    }

    return await authService.login(email, password);
  }}
  showRememberMe={false}
/>
```

## 🧪 Tests

Les formulaires incluent une validation complète et gèrent tous les cas d'erreur :

- Champs requis
- Format d'email valide
- Format de téléphone français
- Longueur de mot de passe
- Validation en temps réel (au blur)

## 📦 Dépendances

- React
- react-i18next
- react-icons (FaUser, FaEnvelope, FaPhone, etc.)
- Composants UI/Notifications

## 🤝 Support

Pour toute question ou problème, contactez l'équipe de développement.
