/**
 * Configuration optimisée de l'environnement
 * Version 2.0 - Avec validation et typification
 *
 * @version 2.0.0
 * @author Bon Cours Team
 */

// Types et constantes
const DEFAULT_CONFIG = {
  appName: 'Bon Cours',
  version: '1.0.0',
  apiBaseUrl: 'http://localhost:3000/api',
  baseUrl: 'http://localhost:5174',
};

const VALIDATION_RULES = {
  apiBaseUrl: url => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  email: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  positiveNumber: num => typeof num === 'number' && num > 0,
};

/**
 * Valide une valeur selon une règle de validation
 * @param {any} value - Valeur à valider
 * @param {Function} validator - Fonction de validation
 * @param {any} fallback - Valeur de fallback
 * @returns {any} Valeur validée ou fallback
 */
const validateConfigValue = (value, validator, fallback) => {
  if (validator(value)) {
    return value;
  }
  console.warn(`Configuration invalide détectée, utilisation du fallback:`, { value, fallback });
  return fallback;
};

/**
 * Configuration optimisée de l'environnement avec validation
 */
export const config = {
  // Configuration de base
  appName: DEFAULT_CONFIG.appName,
  version: DEFAULT_CONFIG.version,

  // URLs et endpoints avec validation
  apiBaseUrl: validateConfigValue(
    import.meta.env.VITE_API_BASE_URL || DEFAULT_CONFIG.apiBaseUrl,
    VALIDATION_RULES.apiBaseUrl,
    DEFAULT_CONFIG.apiBaseUrl
  ),
  baseUrl: validateConfigValue(
    import.meta.env.VITE_BASE_URL || DEFAULT_CONFIG.baseUrl,
    VALIDATION_RULES.apiBaseUrl,
    DEFAULT_CONFIG.baseUrl
  ),

  // Configuration de l'authentification
  auth: {
    tokenKey: 'boncours_token',
    refreshTokenKey: 'boncours_refresh_token',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 heures en millisecondes
    refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 jours
  },

  // Configuration des fonctionnalités
  features: {
    enableChatbot: import.meta.env.VITE_ENABLE_CHATBOT !== 'false',
    enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDebugMode: import.meta.env.DEV,
    enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true',
  },

  // Configuration des langues
  languages: {
    default: import.meta.env.VITE_DEFAULT_LANGUAGE || 'fr',
    supported: ['fr', 'en'],
    fallback: 'fr',
  },

  // Configuration de l'interface
  ui: {
    theme: import.meta.env.VITE_THEME || 'light',
    animations: import.meta.env.VITE_DISABLE_ANIMATIONS !== 'true',
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1200,
  },

  // Configuration des cours
  courses: {
    maxStudentsPerGroup: validateConfigValue(
      parseInt(import.meta.env.VITE_MAX_STUDENTS_PER_GROUP) || 6,
      num => VALIDATION_RULES.positiveNumber(num) && num <= 10,
      6
    ),
    maxStudentsPerSchoolSupport: validateConfigValue(
      parseInt(import.meta.env.VITE_MAX_STUDENTS_SCHOOL_SUPPORT) || 4,
      num => VALIDATION_RULES.positiveNumber(num) && num <= 8,
      4
    ),
    defaultSessionDuration: validateConfigValue(
      parseInt(import.meta.env.VITE_DEFAULT_SESSION_DURATION) || 90,
      num => VALIDATION_RULES.positiveNumber(num) && num <= 180,
      90
    ),
  },

  // Configuration des notifications
  notifications: {
    position: import.meta.env.VITE_NOTIFICATION_POSITION || 'top-right',
    duration: validateConfigValue(
      parseInt(import.meta.env.VITE_NOTIFICATION_DURATION) || 5000,
      VALIDATION_RULES.positiveNumber,
      5000
    ),
    maxNotifications: validateConfigValue(
      parseInt(import.meta.env.VITE_MAX_NOTIFICATIONS) || 5,
      num => VALIDATION_RULES.positiveNumber(num) && num <= 10,
      5
    ),
  },

  // Configuration de sécurité
  security: {
    enableCSP: import.meta.env.VITE_ENABLE_CSP === 'true',
    enableHSTS: import.meta.env.VITE_ENABLE_HSTS === 'true',
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
  },
};

/**
 * Fonction optimisée pour vérifier si un lien de navigation doit être caché
 * @param {string} linkPath - Chemin du lien
 * @param {string|null} userRole - Rôle de l'utilisateur
 * @returns {boolean} True si le lien doit être caché
 */
export const isNavLinkHidden = (linkPath, userRole = null) => {
  // Configuration des liens cachés selon le rôle (memoized)
  const hiddenLinks = {
    student: ['/dashboard/users', '/dashboard/courses/all', '/dashboard/students/all'],
    teacher: ['/dashboard/users', '/dashboard/courses/all', '/dashboard/students/all'],
    director: [],
    admin: [],
  };

  // Si pas de rôle spécifié, pas de restriction
  if (!userRole || !linkPath) {
    return false;
  }

  // Vérifier si le lien est dans la liste des liens cachés pour ce rôle
  return hiddenLinks[userRole]?.includes(linkPath) || false;
};

/**
 * Fonction optimisée pour obtenir la configuration d'un environnement spécifique
 * @param {string} env - Environnement cible
 * @returns {Object} Configuration de l'environnement
 */
export const getEnvironmentConfig = (env = import.meta.env.MODE) => {
  const environments = {
    development: {
      debug: true,
      apiUrl: config.apiBaseUrl,
      enableHotReload: true,
      logLevel: 'debug',
    },
    production: {
      debug: false,
      apiUrl: config.apiBaseUrl,
      enableHotReload: false,
      logLevel: 'error',
    },
    test: {
      debug: true,
      apiUrl: 'http://localhost:3001/api',
      enableHotReload: false,
      logLevel: 'warn',
    },
    staging: {
      debug: true,
      apiUrl: 'https://staging-api.boncours.fr',
      enableHotReload: false,
      logLevel: 'info',
    },
  };

  return environments[env] || environments.development;
};

/**
 * Fonction optimisée pour vérifier si une fonctionnalité est activée
 * @param {string} featureName - Nom de la fonctionnalité
 * @returns {boolean} True si la fonctionnalité est activée
 */
export const isFeatureEnabled = featureName => {
  if (!featureName || typeof featureName !== 'string') {
    console.warn('isFeatureEnabled: featureName invalide', featureName);
    return false;
  }
  return config.features[featureName] || false;
};

/**
 * Fonction optimisée pour obtenir la configuration de l'API
 * @returns {Object} Configuration de l'API
 */
export const getApiConfig = () => {
  return {
    baseURL: config.apiBaseUrl,
    timeout: validateConfigValue(
      parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
      VALIDATION_RULES.positiveNumber,
      10000
    ),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    retries: validateConfigValue(
      parseInt(import.meta.env.VITE_API_RETRIES) || 3,
      num => VALIDATION_RULES.positiveNumber(num) && num <= 5,
      3
    ),
  };
};

/**
 * Fonction pour valider la configuration complète
 * @returns {Object} Résultat de la validation
 */
export const validateConfiguration = () => {
  const errors = [];
  const warnings = [];

  // Validation des URLs
  if (!VALIDATION_RULES.apiBaseUrl(config.apiBaseUrl)) {
    errors.push(`URL API invalide: ${config.apiBaseUrl}`);
  }

  if (!VALIDATION_RULES.apiBaseUrl(config.baseUrl)) {
    errors.push(`URL de base invalide: ${config.baseUrl}`);
  }

  // Validation des valeurs numériques
  if (!VALIDATION_RULES.positiveNumber(config.courses.maxStudentsPerGroup)) {
    errors.push('maxStudentsPerGroup doit être un nombre positif');
  }

  if (!VALIDATION_RULES.positiveNumber(config.notifications.duration)) {
    errors.push('duration des notifications doit être un nombre positif');
  }

  // Vérification des variables d'environnement manquantes
  const requiredEnvVars = ['VITE_API_BASE_URL'];
  requiredEnvVars.forEach(envVar => {
    if (!import.meta.env[envVar]) {
      warnings.push(`Variable d'environnement manquante: ${envVar}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Fonction pour obtenir la configuration de sécurité
 * @returns {Object} Configuration de sécurité
 */
export const getSecurityConfig = () => {
  return {
    ...config.security,
    enableCSP: config.security.enableCSP && import.meta.env.PROD,
    enableHSTS: config.security.enableHSTS && import.meta.env.PROD,
  };
};

/**
 * Fonction pour obtenir la configuration de l'interface utilisateur
 * @returns {Object} Configuration UI
 */
export const getUIConfig = () => {
  return {
    ...config.ui,
    isMobile: () => window.innerWidth <= config.ui.mobileBreakpoint,
    isTablet: () =>
      window.innerWidth > config.ui.mobileBreakpoint &&
      window.innerWidth <= config.ui.tabletBreakpoint,
    isDesktop: () => window.innerWidth > config.ui.tabletBreakpoint,
  };
};

export default config;
