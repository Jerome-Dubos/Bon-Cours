# 📚 Exemples d'utilisation des composants

Ce dossier contient des exemples pratiques et interactifs pour tous les composants et hooks de l'application Bon Cours. Ces exemples servent de documentation vivante et de guide d'utilisation pour les développeurs.

## 🎯 Objectif

- **Documenter** l'utilisation des composants de manière interactive
- **Guider** les développeurs dans l'implémentation
- **Standardiser** les bonnes pratiques de développement
- **Faciliter** l'onboarding de nouveaux développeurs

## 📋 Exemples disponibles

### 🎨 UI Components

#### [ButtonUsageExample](./ButtonUsageExample.jsx)

**Utilisation des composants Button**

Démontre toutes les fonctionnalités des composants Button :

- ✅ Toutes les variantes (primary, secondary, outline, text, success, danger, warning)
- ✅ Toutes les tailles (small, medium, large, xlarge)
- ✅ États (normal, disabled, loading)
- ✅ Icônes (position left/right)
- ✅ Accessibilité (ARIA labels, focus management)
- ✅ Pleine largeur et types de boutons

**Cas d'usage :**

```jsx
import { Button } from '../UI/Buttons';
import { FaHeart } from 'react-icons/fa';

// Bouton avec icône et état de chargement
<Button
  variant='primary'
  icon={FaHeart}
  iconPosition='left'
  loading={isLoading}
  loadingText='Envoi en cours...'
>
  J'aime
</Button>;
```

#### [ModalUsageExample](./ModalUsageExample.jsx)

**Utilisation des composants Modal**

Exemples complets d'utilisation des modales :

- ✅ Toutes les tailles (small, medium, large, fullscreen)
- ✅ Options de fermeture (bouton, overlay, escape)
- ✅ Footer personnalisé
- ✅ Modales de confirmation
- ✅ Modales d'alerte (info, warning, success)
- ✅ Animations et transitions

**Cas d'usage :**

```jsx
import { Modal } from '../UI/Modales';

// Modal avec footer personnalisé
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title='Confirmation'
  showFooter={true}
  footerContent={
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant='outline' onClick={() => setIsOpen(false)}>
        Annuler
      </Button>
      <Button variant='primary' onClick={handleConfirm}>
        Confirmer
      </Button>
    </div>
  }
>
  <p>Êtes-vous sûr de vouloir effectuer cette action ?</p>
</Modal>;
```

#### [FormUsageExample](./FormUsageExample.jsx)

**Utilisation des composants Form**

Exemples de formulaires avec validation :

- ✅ Formulaire simple avec validation
- ✅ Gestion des erreurs et états
- ✅ Composant ContactForm
- ✅ Formulaire dans une modal
- ✅ Validation en temps réel
- ✅ Gestion des soumissions asynchrones

**Cas d'usage :**

```jsx
import ContactForm from '../UI/Forms/src/components/ContactForm/ContactForm';

// Utilisation du composant ContactForm
<ContactForm
  onSubmit={handleContactFormSubmit}
  variant='full'
  submitText='Envoyer le message'
  loadingText='Envoi en cours...'
/>;
```

### 🧭 Navigation

#### [NavigationUsageExample](./NavigationUsageExample.jsx)

**Utilisation de la navigation**

Exemples de navigation avec authentification :

- ✅ Navigation horizontale responsive
- ✅ Menu mobile avec hamburger
- ✅ Dropdown utilisateur
- ✅ Gestion de l'authentification
- ✅ Indicateurs de page active
- ✅ Accessibilité et navigation clavier

**Cas d'usage :**

```jsx
import { Link, useLocation } from 'react-router-dom';

// Lien avec indicateur d'état actif
<Link to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
  {link.label}
</Link>;
```

### 🔧 Hooks

#### [TextUsageExample](./TextUsageExample.jsx)

**Utilisation des hooks de textes**

Guide d'utilisation des hooks optimisés :

- ✅ Hook `useTexts()` pour l'internationalisation
- ✅ Accès aux textes par catégorie
- ✅ Fallbacks et gestion d'erreurs
- ✅ Optimisation des performances

**Cas d'usage :**

```jsx
import { useTexts } from '../../hooks';

const MyComponent = () => {
  const { getNavText, getFooterText, getHomeText } = useTexts();

  return (
    <div>
      <h1>{getHomeText('hero_title')}</h1>
      <nav>
        <a href='/'>{getNavText('home')}</a>
      </nav>
    </div>
  );
};
```

## 🚀 Utilisation

### Import des exemples

```jsx
// Import individuel
import { ButtonUsageExample } from './components/Examples';

// Import de tous les exemples
import { EXAMPLES } from './components/Examples';

// Utilisation dans un composant
function ExamplesPage() {
  return (
    <div>
      <ButtonUsageExample />
      <ModalUsageExample />
      <FormUsageExample />
    </div>
  );
}
```

### Recherche d'exemples

```jsx
import { getExamplesByCategory, getExamplesByTags } from './components/Examples';

// Exemples par catégorie
const uiExamples = getExamplesByCategory('UI Components');

// Exemples par tags
const formExamples = getExamplesByTags(['formulaires', 'validation']);
```

## 📖 Bonnes pratiques

### ✅ À faire

- **Tester** vos composants avec ces exemples avant l'implémentation
- **Suivre** les patterns montrés dans les exemples
- **Utiliser** les props et variantes documentées
- **Respecter** les conventions d'accessibilité
- **Optimiser** les performances avec les hooks fournis

### ❌ À éviter

- **Ignorer** les exemples lors du développement
- **Dévier** des patterns établis sans justification
- **Négliger** l'accessibilité et la responsivité
- **Dupliquer** du code déjà optimisé
- **Oublier** de tester sur différents appareils

## 🔧 Développement

### Ajouter un nouvel exemple

1. **Créer** le fichier d'exemple dans ce dossier
2. **Suivre** la convention de nommage : `[ComponentName]UsageExample.jsx`
3. **Documenter** toutes les fonctionnalités du composant
4. **Ajouter** des exemples de code interactifs
5. **Exporter** dans le fichier `index.js`
6. **Mettre à jour** ce README

### Structure recommandée

```jsx
/**
 * Exemple d'utilisation du composant [ComponentName]
 * Description détaillée des fonctionnalités
 */

import React, { useState } from 'react';
import { ComponentName } from '../UI/Components';

const ComponentUsageExample = () => {
  // États et logique
  const [state, setState] = useState();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Exemples d'utilisation de [ComponentName]</h1>

      {/* Sections d'exemples */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Fonctionnalité 1</h2>
        {/* Exemples interactifs */}
      </section>

      {/* Code d'exemple */}
      <section>
        <h2>Code d'exemple</h2>
        <pre>{/* Code formaté */}</pre>
      </section>
    </div>
  );
};

export default ComponentUsageExample;
```

## 📝 Maintenance

Ces exemples doivent être maintenus à jour avec les évolutions des composants. Lors de modifications importantes :

1. **Mettre à jour** les exemples correspondants
2. **Tester** que tous les exemples fonctionnent
3. **Vérifier** la cohérence avec la documentation
4. **Valider** l'accessibilité et la responsivité

## 🤝 Contribution

Pour contribuer aux exemples :

1. **Fork** le projet
2. **Créer** une branche feature
3. **Ajouter** ou améliorer un exemple
4. **Tester** sur différents navigateurs
5. **Soumettre** une pull request

---

**Note :** Ces exemples sont essentiels pour maintenir la qualité et la cohérence du code. Ils servent de référence pour toute l'équipe de développement.
