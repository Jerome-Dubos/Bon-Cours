/**
 * Configuration i18next optimisée
 * Gestion centralisée de la configuration d'internationalisation
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des traductions de manière lazy pour optimiser les performances
const loadTranslations = async language => {
  try {
    switch (language) {
      case 'en':
        const { en } = await import('./translations/en.js');
        return en;
      case 'fr':
      default:
        const { fr } = await import('./translations/fr.js');
        return fr;
    }
  } catch (error) {
    console.error(`Erreur lors du chargement des traductions pour ${language}:`, error);
    // Fallback vers le français
    const { fr } = await import('./translations/fr.js');
    return fr;
  }
};

// Configuration optimisée d'i18next
const i18nConfig = {
  // Détection automatique de la langue
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
  },

  // Configuration des ressources - Chargement initial des traductions françaises
  resources: {
    fr: {
      translation: {
        nav: {
          home: 'Accueil',
          offers: 'Offres',
          method: 'Méthode',
          registration: 'Inscription',
          contact: 'Contact',
          courses: 'Cours',
          test: 'Test',
          dashboard: 'Dashboard',
          login: 'Connexion',
          logout: 'Se déconnecter',
          selectLanguage: 'Choisir la langue',
          roles: {
            director: 'Directrice',
            teacher: 'Professeur',
            student: 'Étudiant',
          },
        },
        footer: {
          tagline: 'Accompagnement personnalisé en langues et en soutien scolaire',
          description:
            'Depuis plus de 10 ans, nous accompagnons nos apprenants avec passion et expertise. Notre approche actionnelle garantit des résultats exceptionnels.',
          follow: 'Suivez-nous',
          contact: 'Contact',
          address: '36 quai Mullenheim, 67000 Strasbourg',
          rights: 'Tous droits réservés.',
          contact_us: 'Nous contacter',
          legal: 'Mentions légales',
          privacy: 'Politique de confidentialité',
          terms: 'CGU',
          developer: 'Conçu et développé avec',
          heart: 'à',
          location: 'Schiltigheim, France.',
          solution: 'Une solution',
          company: 'DUBOS WEB SERVICES',
        },
        common: {
          loading: 'Chargement en cours...',
          error: 'Erreur',
          name: 'Nom',
          email: 'Email',
          phone: 'Téléphone',
          message: 'Message',
        },
      },
    },
  },

  // Langue par défaut
  lng: 'fr',
  fallbackLng: 'fr',

  // Configuration de l'interpolation
  interpolation: {
    escapeValue: false, // React échappe déjà les valeurs
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase();
      if (format === 'lowercase') return value.toLowerCase();
      return value;
    },
  },

  // Configuration des namespaces
  defaultNS: 'translation',
  ns: ['translation'],

  // Configuration de la réactivité
  react: {
    useSuspense: false, // Évite les problèmes de suspense
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  },

  // Configuration des performances
  load: 'languageOnly', // Charge seulement la langue, pas la région
  cleanCode: true, // Nettoie les codes de langue
  nonExplicitSupportedLngs: true, // Support des variantes de langue

  // Configuration du debug (uniquement en développement)
  debug: process.env.NODE_ENV === 'development',

  // Configuration de la sauvegarde
  saveMissing: process.env.NODE_ENV === 'development',
  missingKeyHandler: (lng, ns, key, fallbackValue) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Traduction manquante: ${key} pour la langue ${lng}`);
    }
  },
};

// Initialisation d'i18next
i18n.use(initReactI18next).init(i18nConfig);

// Fonction pour charger une langue de manière asynchrone
export const loadLanguage = async language => {
  if (!i18n.hasResourceBundle(language, 'translation')) {
    const translations = await loadTranslations(language);
    i18n.addResourceBundle(language, 'translation', translations.translation);
  }
  return i18n.changeLanguage(language);
};

// Fonction pour précharger les langues
export const preloadLanguages = async (languages = ['fr', 'en']) => {
  const loadPromises = languages.map(lang => loadLanguage(lang));
  await Promise.all(loadPromises);
};

// Fonction pour obtenir la langue actuelle
export const getCurrentLanguage = () => i18n.language;

// Fonction pour changer de langue avec gestion d'erreur
export const changeLanguage = async language => {
  try {
    await loadLanguage(language);
    localStorage.setItem('i18nextLng', language);
    return true;
  } catch (error) {
    console.error(`Erreur lors du changement de langue vers ${language}:`, error);
    return false;
  }
};

// Fonction pour obtenir les langues disponibles
export const getAvailableLanguages = () => ['fr', 'en'];

// Fonction pour obtenir le nom de la langue
export const getLanguageName = code => {
  const names = {
    fr: 'Français',
    en: 'English',
  };
  return names[code] || code;
};

export default i18n;
