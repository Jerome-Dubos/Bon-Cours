/**
 * Hook optimisé pour le debounce
 * Version 1.0 - Simple et efficace
 *
 * @version 1.0.0
 * @author Bon Cours Team
 */

import { useCallback, useRef } from 'react';

/**
 * Hook pour créer une fonction debounced
 * @param {Function} callback - Fonction à debouncer
 * @param {number} delay - Délai en millisecondes
 * @returns {Function} Fonction debounced
 */
export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef();

  return useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};

export default useDebounce;
