/**
 * Hook optimisé pour la détection de seuil de scroll
 * Version 3.0 - Simplifié et optimisé
 *
 * @version 3.0.0
 * @author Bon Cours Team
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook optimisé pour détecter les seuils de scroll
 * @param {number|Object} options - Seuil en pixels ou objet de configuration
 * @param {number} options.threshold - Seuil de scroll en pixels (défaut: 100)
 * @param {boolean} options.enabled - Active ou désactive le hook (défaut: true)
 * @param {Function} options.onThreshold - Callback appelé lors du dépassement du seuil
 * @param {Function} options.onReset - Callback appelé lors du retour en dessous du seuil
 * @returns {Object} État et informations sur le scroll
 */
const useScrollThreshold = (options = {}) => {
  // Normalisation des options
  const config =
    typeof options === 'number'
      ? { threshold: options, enabled: true }
      : { threshold: 100, enabled: true, ...options };

  const [scrollState, setScrollState] = useState({
    hasScrolled: false,
    scrollY: 0,
    direction: 'down',
    progress: 0,
    isAtTop: true,
    isAtBottom: false,
  });

  const lastScrollY = useRef(0);
  const rafId = useRef(null);

  // Calculer les métriques de scroll
  const calculateScrollMetrics = useCallback(() => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const direction = scrollY > lastScrollY.current ? 'down' : 'up';
    const hasScrolled = scrollY > config.threshold;
    const progress = Math.min(scrollY / Math.max(documentHeight - windowHeight, 1), 1);
    const isAtTop = scrollY <= 0;
    const isAtBottom = scrollY + windowHeight >= documentHeight - 1;

    return {
      hasScrolled,
      scrollY,
      direction,
      progress,
      isAtTop,
      isAtBottom,
    };
  }, [config.threshold]);

  // Gestionnaire de scroll optimisé
  const handleScroll = useCallback(() => {
    if (!config.enabled || rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      const metrics = calculateScrollMetrics();

      setScrollState(prevState => {
        const newState = { ...prevState, ...metrics };

        // Callbacks pour les changements d'état
        if (newState.hasScrolled && !prevState.hasScrolled && config.onThreshold) {
          config.onThreshold(newState);
        }

        if (!newState.hasScrolled && prevState.hasScrolled && config.onReset) {
          config.onReset(newState);
        }

        return newState;
      });

      lastScrollY.current = metrics.scrollY;
      rafId.current = null;
    });
  }, [config.enabled, config.onThreshold, config.onReset, calculateScrollMetrics]);

  // Effet principal
  useEffect(() => {
    if (!config.enabled) return;

    // État initial
    const initialMetrics = calculateScrollMetrics();
    setScrollState(initialMetrics);
    lastScrollY.current = initialMetrics.scrollY;

    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [config.enabled, handleScroll, calculateScrollMetrics]);

  // Réinitialiser l'état
  const reset = useCallback(() => {
    setScrollState({
      hasScrolled: false,
      scrollY: 0,
      direction: 'down',
      progress: 0,
      isAtTop: true,
      isAtBottom: false,
    });
    lastScrollY.current = 0;
  }, []);

  return {
    // État principal
    hasScrolled: scrollState.hasScrolled,
    scrollY: scrollState.scrollY,
    direction: scrollState.direction,
    progress: scrollState.progress,
    isAtTop: scrollState.isAtTop,
    isAtBottom: scrollState.isAtBottom,

    // Utilitaires
    reset,
    threshold: config.threshold,
    enabled: config.enabled,
  };
};

export default useScrollThreshold;
