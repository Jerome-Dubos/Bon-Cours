/**
 * Configuration pour désactiver temporairement i18n
 * Utilisez ce fichier si vous voulez utiliser les textes en dur
 *
 * Pour l'activer, remplacez l'import dans main.jsx :
 * import './i18n/disable-i18n.js' au lieu de import './i18n'
 */

// Mock de la fonction t() pour retourner directement la clé
export const t = key => {
  // Retourne la clé directement (texte en dur)
  return key;
};

// Mock de useTranslation
export const useTranslation = () => ({
  t,
  i18n: {
    language: 'fr',
    changeLanguage: () => Promise.resolve(),
  },
});

// Mock de Trans
export const Trans = ({ children, i18nKey }) => {
  return children || i18nKey;
};

// Export par défaut pour compatibilité
export default {
  t,
  useTranslation,
  Trans,
};
