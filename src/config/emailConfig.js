/**
 * Configuration EmailJS optimisée pour l'envoi d'emails
 * Version 2.0 - Avec validation et gestion d'erreurs
 *
 * @version 2.0.0
 * @author Bon Cours Team
 */

// Constantes de validation
const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAILJS_KEY_VALIDATION_REGEX = /^[a-zA-Z0-9_-]+$/;

// Valeurs par défaut
const DEFAULT_CONFIG = {
  PUBLIC_KEY: 'your_public_key_here',
  SERVICE_ID: 'your_service_id_here',
  TEMPLATE_ID_CONTACT: 'template_contact',
  CONTACT_EMAIL: 'contact@boncours.fr', // Email de destination par défaut
  SCHOOL_NAME: 'Bon Cours',
};

/**
 * Valide une clé EmailJS
 * @param {string} key - Clé à valider
 * @returns {boolean} True si la clé est valide
 */
const validateEmailJSKey = key => {
  return (
    typeof key === 'string' &&
    key.length > 0 &&
    key !== DEFAULT_CONFIG.PUBLIC_KEY &&
    EMAILJS_KEY_VALIDATION_REGEX.test(key)
  );
};

/**
 * Valide un email
 * @param {string} email - Email à valider
 * @returns {boolean} True si l'email est valide
 */
const validateEmail = email => {
  return typeof email === 'string' && EMAIL_VALIDATION_REGEX.test(email);
};

/**
 * Configuration EmailJS optimisée avec validation
 */
export const EMAILJS_CONFIG = {
  // Clé publique EmailJS avec validation
  PUBLIC_KEY: validateEmailJSKey(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
    ? import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    : DEFAULT_CONFIG.PUBLIC_KEY,

  // ID du service EmailJS avec validation
  SERVICE_ID: validateEmailJSKey(import.meta.env.VITE_EMAILJS_SERVICE_ID)
    ? import.meta.env.VITE_EMAILJS_SERVICE_ID
    : DEFAULT_CONFIG.SERVICE_ID,

  // ID du template pour les messages de contact avec validation
  TEMPLATE_ID_CONTACT: validateEmailJSKey(import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT)
    ? import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT
    : DEFAULT_CONFIG.TEMPLATE_ID_CONTACT,

  // Email de destination avec validation
  CONTACT_EMAIL: validateEmail(import.meta.env.VITE_CONTACT_EMAIL)
    ? import.meta.env.VITE_CONTACT_EMAIL
    : DEFAULT_CONFIG.CONTACT_EMAIL,

  // Nom de l'école
  SCHOOL_NAME: import.meta.env.VITE_SCHOOL_NAME || DEFAULT_CONFIG.SCHOOL_NAME,

  // Configuration avancée
  TIMEOUT: parseInt(import.meta.env.VITE_EMAILJS_TIMEOUT) || 10000,
  MAX_RETRIES: parseInt(import.meta.env.VITE_EMAILJS_MAX_RETRIES) || 3,
  ENABLE_LOGGING: import.meta.env.VITE_EMAILJS_ENABLE_LOGGING === 'true',
};

/**
 * Vérifie si EmailJS est correctement configuré avec validation avancée
 * @returns {Object} Résultat de la validation
 */
export const isEmailJSConfigured = () => {
  const config = EMAILJS_CONFIG;
  const errors = [];
  const warnings = [];

  // Validation de la clé publique
  if (!validateEmailJSKey(config.PUBLIC_KEY)) {
    errors.push('Clé publique EmailJS invalide ou manquante');
  }

  // Validation du service ID
  if (!validateEmailJSKey(config.SERVICE_ID)) {
    errors.push('ID du service EmailJS invalide ou manquant');
  }

  // Validation du template ID
  if (!validateEmailJSKey(config.TEMPLATE_ID_CONTACT)) {
    errors.push('ID du template EmailJS invalide ou manquant');
  }

  // Validation de l'email de contact
  if (!validateEmail(config.CONTACT_EMAIL)) {
    errors.push('Email de contact invalide');
  }

  // Vérification des variables d'environnement manquantes
  if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
    warnings.push('Variable VITE_EMAILJS_PUBLIC_KEY manquante');
  }

  if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) {
    warnings.push('Variable VITE_EMAILJS_SERVICE_ID manquante');
  }

  if (!import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT) {
    warnings.push('Variable VITE_EMAILJS_TEMPLATE_ID_CONTACT manquante');
  }

  return {
    isValid: errors.length === 0,
    isConfigured: errors.length === 0 && warnings.length === 0,
    errors,
    warnings,
    config,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Affiche les instructions de configuration optimisées
 * @param {boolean} showWarnings - Afficher les avertissements
 */
export const showConfigurationInstructions = (showWarnings = true) => {
  const validation = isEmailJSConfigured();

  console.group('📧 Configuration EmailJS');

  if (validation.isValid) {
    console.log('✅ EmailJS est correctement configuré');
  } else {
    console.log('❌ Configuration EmailJS incomplète');
    console.log('Erreurs:', validation.errors);
  }

  if (showWarnings && validation.warnings.length > 0) {
    console.log('⚠️ Avertissements:', validation.warnings);
  }

  console.log('\n📋 Instructions de configuration:');
  console.log('1. Créez un compte sur https://www.emailjs.com/');
  console.log('2. Créez un service email (Gmail, Outlook, etc.)');
  console.log("3. Créez un template d'email");
  console.log('4. Ajoutez vos clés dans le fichier .env.local :');
  console.log('   VITE_EMAILJS_PUBLIC_KEY=votre_cle_publique');
  console.log('   VITE_EMAILJS_SERVICE_ID=votre_id_service');
  console.log('   VITE_EMAILJS_TEMPLATE_ID_CONTACT=votre_id_template');
  console.log('   VITE_CONTACT_EMAIL=contact@boncours.fr');
  console.log('   VITE_SCHOOL_NAME=Bon Cours');
  console.log('5. Redémarrez le serveur de développement');

  console.groupEnd();
};

/**
 * Fonction pour obtenir la configuration EmailJS avec validation
 * @returns {Object} Configuration EmailJS validée
 */
export const getEmailJSConfig = () => {
  const validation = isEmailJSConfigured();

  if (!validation.isValid) {
    console.warn('Configuration EmailJS invalide:', validation.errors);
    showConfigurationInstructions();
  }

  return {
    ...EMAILJS_CONFIG,
    validation,
    isReady: validation.isValid,
  };
};

/**
 * Fonction pour tester la configuration EmailJS
 * @returns {Promise<Object>} Résultat du test
 */
export const testEmailJSConfiguration = async () => {
  const validation = isEmailJSConfigured();

  if (!validation.isValid) {
    return {
      success: false,
      error: 'Configuration EmailJS invalide',
      details: validation.errors,
    };
  }

  try {
    // Test de base de la configuration
    const config = EMAILJS_CONFIG;

    return {
      success: true,
      message: 'Configuration EmailJS valide',
      config: {
        publicKey: config.PUBLIC_KEY.substring(0, 8) + '...',
        serviceId: config.SERVICE_ID,
        templateId: config.TEMPLATE_ID_CONTACT,
        contactEmail: config.CONTACT_EMAIL,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Erreur lors du test de configuration',
      details: error.message,
    };
  }
};

/**
 * Fonction pour obtenir les variables d'environnement requises
 * @returns {Array} Liste des variables d'environnement requises
 */
export const getRequiredEnvVars = () => {
  return [
    'VITE_EMAILJS_PUBLIC_KEY',
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID_CONTACT',
    'VITE_CONTACT_EMAIL',
  ];
};

/**
 * Fonction pour obtenir les variables d'environnement optionnelles
 * @returns {Array} Liste des variables d'environnement optionnelles
 */
export const getOptionalEnvVars = () => {
  return [
    'VITE_SCHOOL_NAME',
    'VITE_EMAILJS_TIMEOUT',
    'VITE_EMAILJS_MAX_RETRIES',
    'VITE_EMAILJS_ENABLE_LOGGING',
  ];
};
