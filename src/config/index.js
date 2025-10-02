/**
 * Point d'entrée centralisé pour toutes les configurations
 * Version 2.0 - Optimisée et typifiée
 *
 * @version 2.0.0
 * @author Bon Cours Team
 */

// === CONFIGURATION D'ENVIRONNEMENT ===
export {
  config,
  getApiConfig,
  getEnvironmentConfig,
  getSecurityConfig,
  getUIConfig,
  isFeatureEnabled,
  isNavLinkHidden,
  validateConfiguration,
} from './environmentConfig';

// === CONFIGURATION EMAIL ===
export {
  EMAILJS_CONFIG,
  getEmailJSConfig,
  getOptionalEnvVars,
  getRequiredEnvVars,
  isEmailJSConfigured,
  showConfigurationInstructions,
  testEmailJSConfiguration,
} from './emailConfig';

// === CONFIGURATION GLOBALE ===
/**
 * Fonction pour valider toutes les configurations
 * @returns {Object} Résultat de la validation globale
 */
export const validateAllConfigurations = () => {
  const { validateConfiguration } = require('./environmentConfig');
  const { isEmailJSConfigured } = require('./emailConfig');

  const envValidation = validateConfiguration();
  const emailValidation = isEmailJSConfigured();

  return {
    isValid: envValidation.isValid && emailValidation.isValid,
    environment: envValidation,
    email: emailValidation,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Fonction pour obtenir toutes les configurations
 * @returns {Object} Toutes les configurations
 */
export const getAllConfigurations = () => {
  const { config } = require('./environmentConfig');
  const { EMAILJS_CONFIG } = require('./emailConfig');

  return {
    environment: config,
    email: EMAILJS_CONFIG,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Fonction pour initialiser les configurations
 * @returns {Object} Résultat de l'initialisation
 */
export const initializeConfigurations = () => {
  try {
    const validation = validateAllConfigurations();

    if (!validation.isValid) {
      console.warn('⚠️ Certaines configurations sont invalides:', validation);
    }

    return {
      success: true,
      validation,
      message: 'Configurations initialisées avec succès',
    };
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation des configurations:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Export par défaut
export default {
  validateAllConfigurations,
  getAllConfigurations,
  initializeConfigurations,
};
