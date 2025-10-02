# 📚 Documentation Complète - Bibliothèque de Modales React

## 📋 Table des Matières

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Composant Modal de Base](#composant-modal-de-base)
4. [Modales Prédéfinies](#modales-prédéfinies)
5. [Personnalisation](#personnalisation)
6. [Accessibilité](#accessibilité)
7. [Responsive Design](#responsive-design)
8. [Animations](#animations)
9. [Bonnes Pratiques](#bonnes-pratiques)
10. [Dépannage](#dépannage)
11. [API Référence](#api-référence)

## 🎯 Introduction

La bibliothèque de Modales React offre une solution complète et flexible pour créer des modales modernes et accessibles. Elle suit les meilleures pratiques UX/UI et s'intègre parfaitement dans vos projets React.

### 🎨 Caractéristiques Principales

- **Modularité** : Composant de base + modales spécialisées
- **Accessibilité** : Support complet ARIA et navigation clavier
- **Responsive** : Adaptation automatique à tous les écrans
- **Personnalisable** : Classes CSS et props flexibles
- **Performance** : Optimisé pour les applications React

## 🔧 Installation

### Prérequis

```bash
npm install prop-types
```

### Variables CSS Requises

Ajoutez ces variables dans votre `index.css` :

```css
:root {
  --primary-blue: #364252;
  --primary-blue-light: #4a5a6d;
  --primary-blue-dark: #2a364e;
  --secondary-gold: #eabd83;
  --secondary-gold-light: #f0c9a3;
  --secondary-gold-dark: #d4a76a;
  --text-light: #f5f5f5;
  --text-dark: #2a364e;
}
```

### Import

```javascript
// Import simple
import { Modal, ConfirmModal } from './Modales';

// Import complet
import ModalLibraries from './Modales';
```

## 🎯 Composant Modal de Base

### Props Principales

```javascript
<Modal
  isOpen={boolean}           // État d'ouverture
  onClose={function}         // Fonction de fermeture
  children={node}            // Contenu de la modal
  title={string}             // Titre (optionnel)
  size="medium"              // Taille (small, medium, large, fullscreen)
  showCloseButton={true}     // Bouton de fermeture
  closeOnOverlayClick={true} // Fermer au clic overlay
  closeOnEscape={true}       // Fermer avec Escape
  showFooter={false}         // Afficher le footer
  footerContent={node}       // Contenu du footer
/>
```

### Exemple Basique

```javascript
import React, { useState } from 'react';
import { Modal } from './Modales';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Ouvrir Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='Ma Modal' size='medium'>
        <p>Contenu de ma modal</p>
        <button onClick={() => setIsOpen(false)}>Fermer</button>
      </Modal>
    </>
  );
}
```

## 🎨 Modales Prédéfinies

### 1. Modales par Taille

#### SmallModal (400px)

```javascript
import { SmallModal } from './Modales';

<SmallModal isOpen={isOpen} onClose={onClose} title='Petite Modal'>
  Contenu pour petite modal
</SmallModal>;
```

#### MediumModal (600px)

```javascript
import { MediumModal } from './Modales';

<MediumModal isOpen={isOpen} onClose={onClose} title='Modal Moyenne'>
  Contenu pour modal moyenne
</MediumModal>;
```

#### LargeModal (800px)

```javascript
import { LargeModal } from './Modales';

<LargeModal isOpen={isOpen} onClose={onClose} title='Grande Modal'>
  Contenu pour grande modal
</LargeModal>;
```

#### FullScreenModal

```javascript
import { FullScreenModal } from './Modales';

<FullScreenModal isOpen={isOpen} onClose={onClose} title='Modal Plein Écran'>
  Contenu plein écran
</FullScreenModal>;
```

### 2. Modales Spécialisées

#### ConfirmModal

```javascript
import { ConfirmModal } from './Modales';

<ConfirmModal
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={handleConfirm}
  title="Confirmer l'action"
  message='Êtes-vous sûr de vouloir continuer ?'
  confirmText='Oui, continuer'
  cancelText='Annuler'
/>;
```

#### DeleteModal

```javascript
import { DeleteModal } from './Modales';

<DeleteModal
  isOpen={isOpen}
  onClose={onClose}
  onDelete={handleDelete}
  title="Supprimer l'élément"
  message='Cette action est irréversible.'
  itemName='cet élément'
/>;
```

#### InfoModal

```javascript
import { InfoModal } from './Modales';

<InfoModal
  isOpen={isOpen}
  onClose={onClose}
  title='Information'
  message='Voici une information importante.'
/>;
```

#### SuccessModal

```javascript
import { SuccessModal } from './Modales';

<SuccessModal isOpen={isOpen} onClose={onClose} title='Succès' message='Opération réussie !' />;
```

#### WarningModal

```javascript
import { WarningModal } from './Modales';

<WarningModal
  isOpen={isOpen}
  onClose={onClose}
  title='Attention'
  message='Cette action peut avoir des conséquences.'
/>;
```

#### ErrorModal

```javascript
import { ErrorModal } from './Modales';

<ErrorModal
  isOpen={isOpen}
  onClose={onClose}
  title='Erreur'
  message="Une erreur s'est produite."
/>;
```

#### FormModal

```javascript
import { FormModal } from './Modales';

<FormModal
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={handleSubmit}
  title='Formulaire'
  submitText='Envoyer'
  cancelText='Annuler'
>
  <form>
    <input type='text' placeholder='Nom' />
    <textarea placeholder='Message'></textarea>
  </form>
</FormModal>;
```

#### ImageModal

```javascript
import { ImageModal } from './Modales';

<ImageModal
  isOpen={isOpen}
  onClose={onClose}
  src='https://example.com/image.jpg'
  alt="Description de l'image"
  title='Image'
/>;
```

#### VideoModal

```javascript
import { VideoModal } from './Modales';

<VideoModal isOpen={isOpen} onClose={onClose} src='https://example.com/video.mp4' title='Vidéo' />;
```

#### CustomModal

```javascript
import { CustomModal } from './Modales';

<CustomModal
  isOpen={isOpen}
  onClose={onClose}
  title='Modal Personnalisée'
  size='large'
  showFooter={true}
  footerContent={
    <div className='modal-actions'>
      <button onClick={onCancel}>Annuler</button>
      <button onClick={onSave}>Sauvegarder</button>
    </div>
  }
>
  <div>Contenu personnalisé</div>
</CustomModal>;
```

## 🎨 Personnalisation

### Classes CSS Personnalisées

```javascript
<Modal
  isOpen={isOpen}
  onClose={onClose}
  className='ma-modal-custom'
  overlayClassName='mon-overlay'
  headerClassName='mon-header'
  bodyClassName='mon-body'
  footerClassName='mon-footer'
>
  Contenu
</Modal>
```

### Styles CSS Personnalisés

```css
/* Modal personnalisée */
.ma-modal-custom {
  border-radius: 16px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
}

/* Overlay personnalisé */
.mon-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
}

/* Header personnalisé */
.mon-header {
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-gold));
  color: white;
}

/* Body personnalisé */
.mon-body {
  padding: 32px;
}

/* Footer personnalisé */
.mon-footer {
  background-color: rgba(54, 66, 82, 0.05);
}
```

### Classes CSS Disponibles

#### Modales spécialisées

- `.modal-confirm` - Modal de confirmation
- `.modal-delete` - Modal de suppression
- `.modal-info` - Modal d'information
- `.modal-success` - Modal de succès
- `.modal-warning` - Modal d'avertissement
- `.modal-error` - Modal d'erreur
- `.modal-form` - Modal de formulaire
- `.modal-image` - Modal d'image
- `.modal-video` - Modal vidéo

#### États spéciaux

- `.modal-long-content` - Contenu long avec scroll
- `.modal-no-header` - Sans header
- `.modal-no-footer` - Sans footer
- `.modal-actions-centered` - Actions centrées
- `.modal-actions-left` - Actions à gauche
- `.modal-actions-spread` - Actions espacées

#### Thèmes

- `.modal-dark` - Mode sombre
- `.modal-bordered-primary` - Bordure primaire
- `.modal-bordered-success` - Bordure succès
- `.modal-bordered-warning` - Bordure avertissement
- `.modal-bordered-error` - Bordure erreur

## ♿ Accessibilité

### Fonctionnalités d'Accessibilité

1. **ARIA Labels** : Toutes les modales ont les attributs ARIA appropriés
2. **Focus Management** : Le focus est géré automatiquement
3. **Navigation Clavier** : Support complet des touches clavier
4. **Lecteurs d'écran** : Compatible avec tous les lecteurs d'écran

### Navigation Clavier

- **Escape** : Ferme la modal
- **Tab** : Navigation dans la modal
- **Shift + Tab** : Navigation inverse
- **Enter** : Active les boutons

### Exemple Accessible

```javascript
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title='Modal Accessible'
  aria-describedby='modal-description'
>
  <div id='modal-description'>Description détaillée pour les lecteurs d'écran</div>
  <button aria-label='Fermer la modal' onClick={onClose}>
    Fermer
  </button>
</Modal>
```

## 📱 Responsive Design

### Breakpoints

- **Desktop** : 1200px+
- **Tablet** : 768px - 1199px
- **Mobile** : 320px - 767px

### Comportement Responsive

- **Tailles adaptatives** : Les modales s'adaptent à l'écran
- **Padding réduit** : Espacement optimisé pour mobile
- **Actions empilées** : Boutons en colonne sur mobile
- **Scroll automatique** : Gestion du contenu long

### Exemple Responsive

```javascript
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title='Modal Responsive'
  size='medium' // S'adapte automatiquement
>
  <div className='responsive-content'>
    <p>Contenu qui s'adapte à tous les écrans</p>
  </div>
</Modal>
```

## 🎬 Animations

### Animations Par Défaut

- **Fade In** : Apparition en fondu
- **Slide In** : Glissement depuis le haut
- **Scale** : Effet d'échelle subtil

### Personnalisation des Animations

```css
/* Animation personnalisée */
.modal-custom-animation {
  animation: customModalIn 0.4s ease-out;
}

@keyframes customModalIn {
  0% {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### Réduction de Mouvement

```css
/* Support des préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal {
    animation: none;
  }
}
```

## 🎯 Bonnes Pratiques

### 1. Gestion d'État

```javascript
// ✅ Bon
const [isOpen, setIsOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

// ❌ Éviter
const [modalState, setModalState] = useState({ isOpen: false, type: null });
```

### 2. Nettoyage

```javascript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  }

  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isOpen]);
```

### 3. Validation

```javascript
const handleConfirm = () => {
  if (validateForm()) {
    setIsLoading(true);
    // Action
    setIsLoading(false);
    setIsOpen(false);
  }
};
```

### 4. Accessibilité

```javascript
// ✅ Toujours fournir un titre
<Modal title="Action importante" />

// ✅ Utiliser des labels descriptifs
<button aria-label="Fermer la modal de confirmation">
  Fermer
</button>
```

### 5. Performance

```javascript
// ✅ Lazy loading pour les modales complexes
const ComplexModal = React.lazy(() => import('./ComplexModal'));

// ✅ Mémoisation si nécessaire
const ModalContent = React.memo(({ data }) => <div>{/* Contenu */}</div>);
```

## 🐛 Dépannage

### Problèmes Courants

#### 1. Modal ne s'affiche pas

```javascript
// ✅ Vérifier l'état
console.log('Modal state:', isOpen);

// ✅ Vérifier les styles CSS
// Assurez-vous que les fichiers CSS sont importés
```

#### 2. Scroll bloqué

```javascript
// ✅ La modal gère automatiquement le scroll
// Si problème persiste, vérifiez les styles CSS conflictuels
```

#### 3. Focus perdu

```javascript
// ✅ Utiliser le focus management intégré
// Éviter de manipuler le focus manuellement
```

#### 4. Styles manquants

```css
/* ✅ Vérifier les variables CSS */
:root {
  --primary-blue: #364252;
  --text-light: #f5f5f5;
  /* ... autres variables */
}
```

#### 5. Erreur d'import

```javascript
// ✅ Vérifier les chemins
import { Modal } from './Modales'; // Chemin correct
```

### Solutions Avancées

#### Modal avec état de chargement

```javascript
const [isLoading, setIsLoading] = useState(false);

<FormModal
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={async () => {
    setIsLoading(true);
    try {
      await handleSubmit();
    } finally {
      setIsLoading(false);
    }
  }}
  footerContent={
    <div className='modal-actions'>
      <button disabled={isLoading}>Annuler</button>
      <button disabled={isLoading}>{isLoading ? 'Envoi...' : 'Envoyer'}</button>
    </div>
  }
>
  Formulaire
</FormModal>;
```

#### Modal avec validation

```javascript
const [errors, setErrors] = useState({});

<FormModal
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={() => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      handleSubmit();
    } else {
      setErrors(newErrors);
    }
  }}
>
  <form>
    <input type='text' className={errors.name ? 'error' : ''} />
    {errors.name && <span className='error-message'>{errors.name}</span>}
  </form>
</FormModal>;
```

## 📖 API Référence

### Modal (Composant de Base)

#### Props

| Prop                  | Type     | Défaut   | Description                               |
| --------------------- | -------- | -------- | ----------------------------------------- |
| `isOpen`              | boolean  | -        | État d'ouverture de la modal              |
| `onClose`             | function | -        | Fonction appelée à la fermeture           |
| `children`            | node     | -        | Contenu de la modal                       |
| `title`               | string   | -        | Titre de la modal                         |
| `size`                | string   | "medium" | Taille (small, medium, large, fullscreen) |
| `showCloseButton`     | boolean  | true     | Afficher le bouton de fermeture           |
| `closeOnOverlayClick` | boolean  | true     | Fermer au clic sur l'overlay              |
| `closeOnEscape`       | boolean  | true     | Fermer avec la touche Escape              |
| `className`           | string   | ""       | Classe CSS pour la modal                  |
| `overlayClassName`    | string   | ""       | Classe CSS pour l'overlay                 |
| `headerClassName`     | string   | ""       | Classe CSS pour le header                 |
| `bodyClassName`       | string   | ""       | Classe CSS pour le body                   |
| `footerClassName`     | string   | ""       | Classe CSS pour le footer                 |
| `showFooter`          | boolean  | false    | Afficher le footer                        |
| `footerContent`       | node     | -        | Contenu du footer                         |

#### Événements

| Événement   | Description                |
| ----------- | -------------------------- |
| `onClose`   | Déclenché à la fermeture   |
| `onConfirm` | Déclenché sur confirmation |
| `onDelete`  | Déclenché sur suppression  |
| `onSubmit`  | Déclenché sur soumission   |

### Modales Spécialisées

#### ConfirmModal

| Prop          | Type     | Défaut             | Description                     |
| ------------- | -------- | ------------------ | ------------------------------- |
| `onConfirm`   | function | -                  | Fonction de confirmation        |
| `message`     | string   | "Êtes-vous sûr..." | Message de confirmation         |
| `confirmText` | string   | "Confirmer"        | Texte du bouton de confirmation |
| `cancelText`  | string   | "Annuler"          | Texte du bouton d'annulation    |

#### DeleteModal

| Prop       | Type     | Défaut            | Description                  |
| ---------- | -------- | ----------------- | ---------------------------- |
| `onDelete` | function | -                 | Fonction de suppression      |
| `message`  | string   | "Cette action..." | Message d'avertissement      |
| `itemName` | string   | "cet élément"     | Nom de l'élément à supprimer |

#### FormModal

| Prop         | Type     | Défaut      | Description                   |
| ------------ | -------- | ----------- | ----------------------------- |
| `onSubmit`   | function | -           | Fonction de soumission        |
| `submitText` | string   | "Soumettre" | Texte du bouton de soumission |
| `cancelText` | string   | "Annuler"   | Texte du bouton d'annulation  |

#### ImageModal / VideoModal

| Prop  | Type   | Défaut | Description                   |
| ----- | ------ | ------ | ----------------------------- |
| `src` | string | -      | URL de l'image/vidéo          |
| `alt` | string | ""     | Texte alternatif (ImageModal) |

---

## 🚀 Conclusion

Cette bibliothèque de modales offre une solution complète et professionnelle pour tous vos besoins de modales React. Elle combine simplicité d'utilisation, flexibilité de personnalisation et respect des standards d'accessibilité.

Pour plus d'informations ou du support, consultez la documentation principale ou contactez Dubos Web Services.
