/**
 * Hook optimisé pour la gestion des textes
 * Version 2.0 - Simplifié et optimisé
 *
 * @version 2.0.0
 * @author Bon Cours Team
 */

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook optimisé pour utiliser les textes
 * @returns {Object} Fonctions et données pour les textes
 */
export const useTexts = () => {
  const { t } = useTranslation();

  /**
   * Obtenir un texte avec fallback optimisé
   */
  const getText = useCallback(
    (key, fallback = key) => {
      try {
        const text = t(key);
        return text === key ? fallback : text;
      } catch (error) {
        console.warn(`Erreur lors de la récupération du texte pour "${key}":`, error);
        return fallback;
      }
    },
    [t]
  );

  /**
   * Obtenir un texte de navigation
   */
  const getNavText = useCallback(key => getText(`nav.${key}`, key), [getText]);

  /**
   * Obtenir un texte de footer
   */
  const getFooterText = useCallback(key => getText(`footer.${key}`, key), [getText]);

  /**
   * Obtenir un texte commun
   */
  const getCommonText = useCallback(key => getText(`common.${key}`, key), [getText]);

  /**
   * Obtenir un texte de la page d'accueil
   */
  const getHomeText = useCallback(key => getText(`home.${key}`, key), [getText]);

  return {
    t,
    getText,
    getNavText,
    getFooterText,
    getCommonText,
    getHomeText,
  };
};

export default useTexts;
