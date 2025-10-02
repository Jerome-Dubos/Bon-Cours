/**
 * Configuration hybride i18n
 * Permet d'utiliser les textes en dur tout en gardant la structure i18n
 *
 * @version 1.0.0
 * @author Bon Cours Team
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Textes français en dur pour le développement
const frenchTexts = {
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
  home: {
    hero_title: 'MAÎTRISEZ LES LANGUES • EXCELLENCE SCOLAIRE',
    hero_subtitle: '',
    hero_desc: "Testez votre niveau et découvrez nos offres et nos méthodes d'apprentissage",
    cta_test: 'Testez votre niveau',
    cta_courses: 'Voir nos cours',
    why_choose: 'Pourquoi choisir Bon Cours ?',
    feature_innovative: 'Cours adaptés à vos besoins',
    feature_innovative_desc: 'Diagnostic initial, cours personnalisables, bilans intermédiaires',
    feature_expert: 'Professeurs qualifiés',
    feature_expert_desc: 'Équipe pédagogique diplômée et expérimentée',
    feature_results: 'Horaires flexibles',
    feature_results_desc: 'Cours adaptés à votre emploi du temps',
    feature_flexible: 'Accompagnement illimité',
    feature_flexible_desc: 'Suivi individuel dans vos démarches',
    languages_taught: 'Nos langues enseignées',
    testimonials_title: 'Ce que disent nos étudiants',
    cta_learn_more: 'En savoir plus',
  },
};

// Configuration i18next simplifiée
i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: frenchTexts,
    },
  },
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  debug: false, // Désactiver les logs de debug
});

// Fonction utilitaire pour obtenir un texte avec fallback
export const getText = (key, fallback = key) => {
  try {
    const keys = key.split('.');
    let value = frenchTexts;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return value || fallback;
  } catch (error) {
    console.warn(`Erreur lors de la récupération du texte pour "${key}":`, error);
    return fallback;
  }
};

// Hook personnalisé pour les textes
export const useTexts = () => {
  return {
    t: getText,
    getText,
    texts: frenchTexts,
  };
};

export default i18n;
