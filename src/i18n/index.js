/**
 * Point d'entrée principal pour l'internationalisation
 * Version optimisée avec chargement lazy et gestion d'erreurs améliorée
 */

// Export de la configuration i18n optimisée
export {
  changeLanguage,
  getAvailableLanguages,
  getCurrentLanguage,
  getLanguageName,
  default as i18n,
  loadLanguage,
  preloadLanguages,
} from './config.js';

// Export par défaut pour la compatibilité
export { default } from './config.js';
