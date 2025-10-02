/**
 * Point d'entrée pour tous les exemples d'utilisation des composants
 * @version 1.0.0
 * @author Bon Cours Team
 */

// Exemples d'utilisation des composants
export { default as ButtonUsageExample } from './ButtonUsageExample';
export { default as FormUsageExample } from './FormUsageExample';
export { default as ModalUsageExample } from './ModalUsageExample';
export { default as NavigationUsageExample } from './NavigationUsageExample';
export { default as TextUsageExample } from './TextUsageExample';

// Liste de tous les exemples disponibles
export const EXAMPLES = [
  {
    id: 'text-usage',
    name: 'TextUsageExample',
    title: 'Utilisation des textes',
    description: 'Montre comment utiliser les hooks de textes optimisés avec i18n',
    component: 'TextUsageExample',
    category: 'Hooks',
    tags: ['i18n', 'textes', 'hooks'],
  },
  {
    id: 'button-usage',
    name: 'ButtonUsageExample',
    title: 'Utilisation des boutons',
    description: 'Démontre toutes les variantes, tailles et fonctionnalités des composants Button',
    component: 'ButtonUsageExample',
    category: 'UI Components',
    tags: ['boutons', 'variantes', 'icônes', 'états'],
  },
  {
    id: 'modal-usage',
    name: 'ModalUsageExample',
    title: 'Utilisation des modales',
    description: "Exemples complets d'utilisation des composants Modal avec toutes les options",
    component: 'ModalUsageExample',
    category: 'UI Components',
    tags: ['modales', 'overlay', 'taille', 'footer'],
  },
  {
    id: 'form-usage',
    name: 'FormUsageExample',
    title: 'Utilisation des formulaires',
    description: "Exemples de formulaires avec validation et gestion d'état",
    component: 'FormUsageExample',
    category: 'UI Components',
    tags: ['formulaires', 'validation', 'état', 'soumission'],
  },
  {
    id: 'navigation-usage',
    name: 'NavigationUsageExample',
    title: 'Utilisation de la navigation',
    description: 'Exemples de navigation avec authentification et menu responsive',
    component: 'NavigationUsageExample',
    category: 'Navigation',
    tags: ['navigation', 'navbar', 'mobile', 'authentification'],
  },
];

// Fonction utilitaire pour obtenir un exemple par ID
export const getExampleById = id => {
  return EXAMPLES.find(example => example.id === id);
};

// Fonction utilitaire pour obtenir tous les exemples d'une catégorie
export const getExamplesByCategory = category => {
  return EXAMPLES.filter(example => example.category === category);
};

// Fonction utilitaire pour rechercher des exemples par tags
export const getExamplesByTags = tags => {
  return EXAMPLES.filter(example => tags.some(tag => example.tags.includes(tag)));
};

// Export par défaut de tous les exemples
export default {
  TextUsageExample,
  ButtonUsageExample,
  ModalUsageExample,
  FormUsageExample,
  NavigationUsageExample,
  EXAMPLES,
  getExampleById,
  getExamplesByCategory,
  getExamplesByTags,
};
