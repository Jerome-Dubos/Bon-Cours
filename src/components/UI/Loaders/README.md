# 🎨 Collection Complète de Loaders

Une collection moderne et complète de composants de chargement pour React, optimisée pour la réutilisabilité dans différents projets.

## 🚀 Installation

```bash
# Copier le dossier Loaders dans votre projet
cp -r Loaders/ src/components/UI/
```

## 📦 Utilisation

### Import

```jsx
import { Loader, LoaderTest } from './components/UI/Loaders';
```

### Page de Test

Une page de test complète est incluse pour tester tous les loaders :

```jsx
import { LoaderTest } from './components/UI/Loaders';

// Utilisation dans votre routeur
<Route path='/loader-test' element={<LoaderTest />} />;
```

### Utilisation de base

```jsx
<Loader />
```

## 🎯 Variants Disponibles

### **Loaders Animés**

- `dots` - Points qui rebondissent (défaut)
- `wave` - Barres qui ondulent
- `bounce` - Points qui rebondissent avec délai
- `squares` - Carrés qui rebondissent
- `hearts` - Cœurs qui battent
- `rotating-squares` - Carrés qui tournent
- `gears` - Engrenages qui tournent
- `dna` - Double hélice qui tourne
- `orbit` - Planètes en orbite
- `ripple` - Ondes concentriques
- `particle` - Particules flottantes

### **Loaders Simples**

- `pulse` - Cercle qui pulse
- `morphing` - Forme qui se transforme
- `glitch` - Effet de glitch numérique
- `neon` - Spinner avec effet néon
- `minimalist` - Barre de progression minimale

### **Loaders Spécialisés**

- `page` - Pour les pages entières
- `image` - Pour le chargement d'images
- `section` - Pour les sections de contenu

## 🎨 Exemples d'utilisation

### Loaders Animés

```jsx
{
  /* Points qui rebondissent */
}
<Loader variant='dots' />;

{
  /* Barres qui ondulent */
}
<Loader variant='wave' />;

{
  /* Cœurs qui battent */
}
<Loader variant='hearts' />;

{
  /* Engrenages */
}
<Loader variant='gears' />;

{
  /* Effet néon */
}
<Loader variant='neon' />;
```

### Loaders Spécialisés

```jsx
{
  /* Pour les pages */
}
<Loader type='page' />;

{
  /* Pour les images */
}
<Loader type='image' />;

{
  /* Pour les sections */
}
<Loader type='section' />;
```

### Avec personnalisation

```jsx
<Loader
  variant='pulse'
  size='large'
  message='Chargement en cours...'
  fullScreen={false}
  className='custom-loader'
/>
```

## 📏 Tailles Disponibles

- `small` - 32px
- `default` - 48px (défaut)
- `large` - 64px
- `xlarge` - 80px

## 🎨 Couleurs Disponibles

- `primary` - Bleu principal
- `success` - Vert de succès
- `warning` - Orange d'avertissement
- `error` - Rouge d'erreur
- `default` - Or secondaire (défaut)

## 🎛️ Props

| Prop         | Type    | Défaut            | Description                |
| ------------ | ------- | ----------------- | -------------------------- |
| `variant`    | string  | `'dots'`          | Type de loader             |
| `type`       | string  | `'component'`     | Type spécialisé            |
| `size`       | string  | `'default'`       | Taille du loader           |
| `message`    | string  | `'Chargement...'` | Message affiché            |
| `fullScreen` | boolean | `true`            | Plein écran                |
| `className`  | string  | `''`              | Classes CSS additionnelles |

## 🎯 Cas d'usage

### **Applications Web**

```jsx
{
  /* Chargement de page */
}
<Loader variant='pulse' type='page' />;

{
  /* Chargement d'images */
}
<Loader variant='ripple' type='image' />;

{
  /* Chargement de sections */
}
<Loader variant='dots' type='section' />;
```

### **Applications Mobile**

```jsx
{
  /* Loader compact */
}
<Loader variant='minimalist' size='small' />;

{
  /* Loader avec message */
}
<Loader variant='bounce' message='Synchronisation...' />;
```

### **Dashboards**

```jsx
{
  /* Loader élégant */
}
<Loader variant='neon' size='large' />;

{
  /* Loader discret */
}
<Loader variant='minimalist' fullScreen={false} />;
```

## 🎨 Personnalisation CSS

### Variables CSS disponibles

```css
:root {
  --secondary-gold: #eabd83;
  --primary-blue: #3f4d5f;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### Classes CSS personnalisées

```css
.custom-loader {
  /* Vos styles personnalisés */
}
```

## 📱 Responsive

Tous les loaders s'adaptent automatiquement aux écrans mobiles :

- Réduction de taille sur mobile
- Optimisation des animations
- Support de `prefers-reduced-motion`

## ♿ Accessibilité

- Support de `prefers-reduced-motion`
- Animations désactivées si nécessaire
- Messages de chargement accessibles
- Contraste respecté

## 🚀 Performance

- Animations CSS optimisées
- Pas de JavaScript pour les animations
- Légères et rapides
- Compatibles avec tous les navigateurs

## 📦 Export pour autres projets

Ce composant est conçu pour être facilement exportable :

1. **Copier le dossier** `Loaders/`
2. **Importer** dans votre projet
3. **Utiliser** directement

### Structure du composant

```
Loaders/
├── src/
│   ├── components/
│   │   ├── Loader.jsx
│   │   ├── Loader.css
│   │   └── LoadingSpinner.css
│   ├── pages/
│   │   ├── LoaderTest/
│   │   │   ├── LoaderTest.jsx
│   │   │   └── LoaderTest.css
│   │   └── index.js
│   └── index.js
├── index.js
├── package.json
└── README.md
```

## 🎉 Collection complète

Cette collection offre **20+ variants** de loaders différents, couvrant tous les cas d'usage possibles :

- **Loaders classiques** : spinner, dots, wave
- **Loaders modernes** : neon, glitch, morphing
- **Loaders créatifs** : hearts, gears, dna, orbit
- **Loaders spécialisés** : page, image, section
- **Loaders minimalistes** : pulse, minimalist

Parfait pour créer des expériences utilisateur riches et variées ! 🎨✨
