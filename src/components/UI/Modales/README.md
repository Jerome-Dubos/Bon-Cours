# 🎯 Bibliothèque de Modales React

Une bibliothèque de modales React moderne et flexible, organisée de manière professionnelle.

## 📁 Structure du Projet

```
Modales/
├── src/                          # Code source de la bibliothèque
│   ├── components/               # Composants React
│   │   ├── Modals.jsx           # Composant de base
│   │   └── ModalsLibrarie.jsx   # Modales prédéfinies
│   ├── styles/                  # Fichiers CSS
│   │   ├── Modals.css           # Styles de base
│   │   └── ModalsLibrarie.css   # Styles spécialisés
│   └── index.js                 # Point d'entrée
├── examples/                    # Exemples d'utilisation
│   ├── ModalsExample.jsx        # Composant de démonstration
│   └── ModalsExample.css        # Styles des exemples
├── docs/                        # Documentation détaillée
│   └── README.md                # Guide complet
└── index.js                     # Point d'entrée principal
```

## 🚀 Utilisation Rapide

### Import simple

```javascript
import { ConfirmModal, InfoModal, FormModal } from './Modales';
```

### Import complet

```javascript
import ModalLibraries from './Modales';
const { ConfirmModal, DeleteModal, SuccessModal } = ModalLibraries;
```

## 🎨 Fonctionnalités

- ✅ **4 tailles de modales** (small, medium, large, fullscreen)
- ✅ **10 types spécialisés** prêts à l'emploi
- ✅ **Accessibilité** intégrée (ARIA, focus management, clavier)
- ✅ **Animations fluides** avec support des préférences utilisateur
- ✅ **Responsive design** complet
- ✅ **Personnalisation** avancée
- ✅ **Gestion du scroll** automatique
- ✅ **Support du mode sombre**

## 🔧 Installation

1. Copiez le dossier `Modales/` dans votre projet
2. Assurez-vous d'avoir les variables CSS requises dans votre `index.css`
3. Importez et utilisez !

## 📚 Documentation

Consultez le dossier `docs/` pour la documentation complète :

- [Guide d'utilisation détaillé](./docs/README.md)
- [Exemples d'utilisation](./examples/ModalsExample.jsx)

## 🎯 Modales Disponibles

### Modales par Taille

- `SmallModal` - Petite modal (400px)
- `MediumModal` - Modal moyenne (600px)
- `LargeModal` - Grande modal (800px)
- `FullScreenModal` - Modal plein écran

### Modales Spécialisées

- `ConfirmModal` - Confirmation d'action
- `DeleteModal` - Suppression avec avertissement
- `InfoModal` - Information générale
- `SuccessModal` - Message de succès
- `WarningModal` - Avertissement
- `ErrorModal` - Message d'erreur
- `FormModal` - Formulaire avec actions
- `ImageModal` - Affichage d'image
- `VideoModal` - Lecture de vidéo
- `CustomModal` - Modal personnalisable

## 🎨 Utilisation

### Modal de Base

```javascript
import { Modal } from './Modales';

const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='Ma Modal' size='medium'>
  <p>Contenu de la modal</p>
</Modal>;
```

### Modal de Confirmation

```javascript
import { ConfirmModal } from './Modales';

<ConfirmModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="Confirmer l'action"
  message='Êtes-vous sûr de vouloir continuer ?'
  confirmText='Oui, continuer'
  cancelText='Annuler'
/>;
```

### Modal de Formulaire

```javascript
import { FormModal } from './Modales';

<FormModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={handleSubmit}
  title='Formulaire de Contact'
  submitText='Envoyer'
  cancelText='Annuler'
>
  <form>
    <input type='text' placeholder='Nom' />
    <textarea placeholder='Message'></textarea>
  </form>
</FormModal>;
```

## 🎨 Personnalisation

### Classes CSS personnalisées

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

### Modal personnalisée

```javascript
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
</CustomModal>
```

## 🔧 Variables CSS Requises

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

## 🎯 Props du Composant Modal

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
| `showFooter`          | boolean  | false    | Afficher le footer                        |
| `footerContent`       | node     | -        | Contenu du footer                         |

## 🎨 Classes CSS Disponibles

### Modales spécialisées

- `.modal-confirm` - Modal de confirmation
- `.modal-delete` - Modal de suppression
- `.modal-info` - Modal d'information
- `.modal-success` - Modal de succès
- `.modal-warning` - Modal d'avertissement
- `.modal-error` - Modal d'erreur
- `.modal-form` - Modal de formulaire
- `.modal-image` - Modal d'image
- `.modal-video` - Modal vidéo

### États spéciaux

- `.modal-long-content` - Contenu long avec scroll
- `.modal-no-header` - Sans header
- `.modal-no-footer` - Sans footer
- `.modal-actions-centered` - Actions centrées
- `.modal-actions-left` - Actions à gauche
- `.modal-actions-spread` - Actions espacées

### Thèmes

- `.modal-dark` - Mode sombre
- `.modal-bordered-primary` - Bordure primaire
- `.modal-bordered-success` - Bordure succès
- `.modal-bordered-warning` - Bordure avertissement
- `.modal-bordered-error` - Bordure erreur

## 🐛 Dépannage

- **Couleurs manquantes** : Vérifiez les variables CSS dans votre `index.css`
- **Styles manquants** : Assurez-vous que les fichiers CSS sont importés
- **Erreur d'import** : Vérifiez les chemins dans la structure organisée
- **Scroll bloqué** : La modal gère automatiquement le scroll du body
- **Accessibilité** : Toutes les modales sont accessibles par défaut

## 🎯 Bonnes Pratiques

1. **Toujours fournir un titre** pour l'accessibilité
2. **Utiliser les modales spécialisées** quand approprié
3. **Gérer les états de chargement** dans les formulaires
4. **Tester l'accessibilité** avec un lecteur d'écran
5. **Éviter les modales imbriquées** (UX déconseillée)

## 🚀 Exemples Avancés

### Modal avec état de chargement

```javascript
const [isLoading, setIsLoading] = useState(false);

<FormModal
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={async () => {
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
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

### Modal avec validation

```javascript
<ConfirmModal
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={() => {
    if (validateForm()) {
      handleConfirm();
    }
  }}
  title='Confirmer les modifications'
  message='Voulez-vous sauvegarder les modifications ?'
/>
```

---

## 🚀 Dubos Web Services

Cette bibliothèque est développée et maintenue par **[Dubos Web Services](https://www.duboswebservices.fr/)**.

<div align="center">
  <a href="https://www.duboswebservices.fr/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Dubos%20Web%20Services-Professional%20Development-blue?style=for-the-badge&logo=react&logoColor=white" alt="Dubos Web Services" />
  </a>
</div>

### 🎯 Nos Services

- **Développement Web** - Sites et applications React modernes
- **Maintenance** - Support technique et mises à jour
- **Optimisation** - Performance et SEO
- **Formation** - Accompagnement technique

### 📞 Contact

- **Site Web :** [www.duboswebservices.fr](https://www.duboswebservices.fr/)
- **Email :** contact@duboswebservices.fr
- **Téléphone :** +33 7 69 28 91 79

---

**Note :** Cette bibliothèque est conçue pour être autonome et réutilisable dans tous vos projets React. Elle utilise les variables CSS de votre projet pour maintenir la cohérence visuelle et offre une expérience utilisateur optimale.
