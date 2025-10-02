/**
 * Hook optimisé pour l'optimisation des performances
 * Version 3.0 - Simplifié et optimisé
 *
 * @version 3.0.0
 * @author Bon Cours Team
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Hook principal pour l'optimisation des performances
 * Version simplifiée et optimisée
 *
 * @returns {Object} API d'optimisation des performances
 */
export const usePerformance = () => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const measurementsRef = useRef([]);

  // Détection des appareils bas de gamme (memoized)
  const checkDevicePerformance = useCallback(() => {
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;

    const isLowEnd =
      memory < 4 ||
      cores < 4 ||
      (connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) ||
      window.innerWidth < 768;

    setIsLowEndDevice(isLowEnd);
  }, []);

  // Détection des préférences de mouvement
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = e => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Détection des appareils
  useEffect(() => {
    checkDevicePerformance();

    const connection = navigator.connection;
    if (connection) {
      connection.addEventListener('change', checkDevicePerformance);
      return () => connection.removeEventListener('change', checkDevicePerformance);
    }
  }, [checkDevicePerformance]);

  // Mesure des performances
  const measurePerformance = useCallback((name, fn) => {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;

    const measurement = {
      name,
      duration,
      timestamp: Date.now(),
    };

    measurementsRef.current.push(measurement);

    // Garder seulement les 20 dernières mesures
    if (measurementsRef.current.length > 20) {
      measurementsRef.current = measurementsRef.current.slice(-20);
    }

    return result;
  }, []);

  // Configuration d'animation optimisée (memoized)
  const animationConfig = useMemo(() => {
    if (prefersReducedMotion) {
      return { duration: 0, ease: 'linear' };
    }
    if (isLowEndDevice) {
      return { duration: 0.2, ease: 'easeOut' };
    }
    return { duration: 0.5, ease: 'easeInOut' };
  }, [prefersReducedMotion, isLowEndDevice]);

  // Statistiques de performance (memoized)
  const performanceStats = useMemo(() => {
    const measurements = measurementsRef.current;
    if (measurements.length === 0) {
      return { totalMeasurements: 0, averageDuration: 0 };
    }

    const totalDuration = measurements.reduce((sum, m) => sum + m.duration, 0);
    return {
      totalMeasurements: measurements.length,
      averageDuration: Math.round((totalDuration / measurements.length) * 100) / 100,
    };
  }, [measurementsRef.current.length]);

  // Nettoyage des mesures
  const clearMeasurements = useCallback(() => {
    measurementsRef.current = [];
  }, []);

  return {
    isLowEndDevice,
    prefersReducedMotion,
    animationConfig,
    measurePerformance,
    performanceStats,
    clearMeasurements,
  };
};

export default usePerformance;
