/**
 * Hook optimisé pour la gestion d'erreurs
 * Version 3.0 - Simplifié et optimisé
 *
 * @version 3.0.0
 * @author Bon Cours Team
 */

import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Types d'erreurs supportés
 */
const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  SERVER: 'server',
  CLIENT: 'client',
  UNKNOWN: 'unknown',
};

/**
 * Messages d'erreur par défaut
 */
const DEFAULT_MESSAGES = {
  [ERROR_TYPES.NETWORK]: 'Erreur de connexion. Vérifiez votre connexion internet.',
  [ERROR_TYPES.VALIDATION]: 'Données invalides. Veuillez vérifier vos informations.',
  [ERROR_TYPES.SERVER]: 'Erreur du serveur. Veuillez réessayer plus tard.',
  [ERROR_TYPES.CLIENT]: "Erreur de l'application. Veuillez recharger la page.",
  [ERROR_TYPES.UNKNOWN]: "Une erreur inattendue s'est produite.",
};

/**
 * Hook optimisé pour la gestion d'erreurs
 * @returns {Object} API de gestion d'erreurs
 */
export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const retryCountRef = useRef(0);

  /**
   * Créer un objet d'erreur standardisé
   */
  const createErrorInfo = useCallback(
    (error, type = ERROR_TYPES.UNKNOWN, context = '') => ({
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: error.message || DEFAULT_MESSAGES[type],
      type,
      context,
      timestamp: new Date().toISOString(),
      retryable: [ERROR_TYPES.NETWORK, ERROR_TYPES.SERVER].includes(type),
      originalError: error,
    }),
    []
  );

  /**
   * Gestionnaire d'erreur principal
   */
  const handleError = useCallback(
    (error, type = ERROR_TYPES.UNKNOWN, context = '') => {
      const errorInfo = createErrorInfo(error, type, context);

      console.error(`[${type.toUpperCase()}] ${context}:`, errorInfo);
      setError(errorInfo);

      // Envoi à un service de monitoring en production
      if (process.env.NODE_ENV === 'production') {
        console.error('Production error logged:', errorInfo);
      }
    },
    [createErrorInfo]
  );

  /**
   * Gestionnaire d'erreur avec redirection
   */
  const handleErrorWithRedirect = useCallback(
    (error, redirectPath = '/error', type = ERROR_TYPES.UNKNOWN, context = '') => {
      handleError(error, type, context);
      navigate(redirectPath, { replace: true });
    },
    [handleError, navigate]
  );

  /**
   * Exécuter une action avec gestion d'erreur automatique
   */
  const executeWithErrorHandling = useCallback(
    async (action, context = '', errorType = ERROR_TYPES.UNKNOWN) => {
      try {
        setIsLoading(true);
        setError(null);
        retryCountRef.current = 0;

        const result = await action();
        return result;
      } catch (error) {
        handleError(error, errorType, context);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [handleError]
  );

  /**
   * Retry une action avec backoff exponentiel
   */
  const retryAction = useCallback(
    async (action, maxRetries = 3, context = '', errorType = ERROR_TYPES.NETWORK) => {
      let lastError;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          setIsLoading(true);
          setError(null);
          retryCountRef.current = attempt;

          const result = await action();
          retryCountRef.current = 0;
          return result;
        } catch (error) {
          lastError = error;
          console.warn(`[RETRY ${attempt}/${maxRetries}] ${context}:`, error);

          if (attempt < maxRetries) {
            const baseDelay = 1000 * Math.pow(2, attempt - 1);
            const jitter = Math.random() * 1000;
            await new Promise(resolve => setTimeout(resolve, baseDelay + jitter));
          }
        } finally {
          setIsLoading(false);
        }
      }

      handleError(lastError, errorType, `${context} (après ${maxRetries} tentatives)`);
      throw lastError;
    },
    [handleError]
  );

  /**
   * Nettoyer l'erreur actuelle
   */
  const clearError = useCallback(() => {
    setError(null);
    retryCountRef.current = 0;
  }, []);

  /**
   * Vérifier si une erreur est récupérable
   */
  const isRetryableError = useCallback(errorInfo => {
    if (!errorInfo) return false;
    return (
      errorInfo.retryable === true ||
      [ERROR_TYPES.NETWORK, ERROR_TYPES.SERVER].includes(errorInfo.type)
    );
  }, []);

  return {
    // État
    error,
    isLoading,

    // Gestionnaires d'erreur
    handleError,
    handleErrorWithRedirect,

    // Utilitaires
    executeWithErrorHandling,
    retryAction,
    clearError,
    isRetryableError,
    getRetryCount: () => retryCountRef.current,

    // Constantes utiles
    ERROR_TYPES,
  };
};

export default useErrorHandler;
