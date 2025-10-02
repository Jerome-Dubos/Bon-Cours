// ===== EXPORTS DES COMPOSANTS MODULAIRES =====

// Formulaires principaux
export { default as ContactForm } from './components/ContactForm/ContactForm.simple';
export { default as LoginForm } from './components/LoginForm';

// Utilitaires
export * from './utils/validationRules';

// ===== EXPORTS PAR DÉFAUT =====

// Export par défaut du ContactForm (formulaire le plus utilisé)
export { default } from './components/ContactForm/ContactForm.simple';
