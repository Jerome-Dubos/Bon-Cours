import React from 'react';
import '../styles/ButtonsLibrarie.css';
import Button from './Buttons';

// Boutons prédéfinis avec configurations spécifiques
export const PrimaryButton = ({ children, size = 'medium', ...props }) => (
  <Button variant='primary' size={size} {...props}>
    {children}
  </Button>
);

export const SecondaryButton = ({ children, size = 'medium', ...props }) => (
  <Button variant='secondary' size={size} {...props}>
    {children}
  </Button>
);

export const OutlineButton = ({ children, size = 'medium', ...props }) => (
  <Button variant='outline' size={size} {...props}>
    {children}
  </Button>
);

export const TextButton = ({ children, size = 'medium', ...props }) => (
  <Button variant='text' size={size} {...props}>
    {children}
  </Button>
);

// Boutons avec tailles prédéfinies
export const SmallButton = ({ children, variant = 'primary', ...props }) => (
  <Button variant={variant} size='small' {...props}>
    {children}
  </Button>
);

export const MediumButton = ({ children, variant = 'primary', ...props }) => (
  <Button variant={variant} size='medium' {...props}>
    {children}
  </Button>
);

export const LargeButton = ({ children, variant = 'primary', ...props }) => (
  <Button variant={variant} size='large' {...props}>
    {children}
  </Button>
);

// Boutons spécialisés pour des cas d'usage courants
export const SubmitButton = ({ children = 'Soumettre', ...props }) => (
  <Button variant='primary' type='submit' {...props}>
    {children}
  </Button>
);

export const CancelButton = ({ children = 'Annuler', ...props }) => (
  <Button variant='outline' {...props}>
    {children}
  </Button>
);

export const DeleteButton = ({ children = 'Supprimer', ...props }) => (
  <Button variant='secondary' {...props}>
    {children}
  </Button>
);

export const SaveButton = ({ children = 'Enregistrer', ...props }) => (
  <Button variant='primary' {...props}>
    {children}
  </Button>
);

export const EditButton = ({ children = 'Modifier', ...props }) => (
  <Button variant='outline' size='small' {...props}>
    {children}
  </Button>
);

export const AddButton = ({ children = 'Ajouter', ...props }) => (
  <Button variant='primary' {...props}>
    {children}
  </Button>
);

export const CloseButton = ({ children = 'Fermer', ...props }) => (
  <Button variant='text' {...props}>
    {children}
  </Button>
);

// Boutons avec états prédéfinis
export const LoadingButton = ({ children, loading = false, ...props }) => (
  <Button variant='primary' disabled={loading} {...props}>
    {loading ? 'Chargement...' : children}
  </Button>
);

export const DisabledButton = ({ children, ...props }) => (
  <Button variant='primary' disabled {...props}>
    {children}
  </Button>
);

export const FullWidthButton = ({ children, variant = 'primary', ...props }) => (
  <Button variant={variant} fullWidth {...props}>
    {children}
  </Button>
);

// Composant principal de la bibliothèque
const ButtonLibraries = {
  // Boutons de base
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  TextButton,

  // Boutons par taille
  SmallButton,
  MediumButton,
  LargeButton,

  // Boutons spécialisés
  SubmitButton,
  CancelButton,
  DeleteButton,
  SaveButton,
  EditButton,
  AddButton,
  CloseButton,

  // Boutons avec états
  LoadingButton,
  DisabledButton,
  FullWidthButton,

  // Composant de base pour personnalisation avancée
  Button,
};

export default ButtonLibraries;
