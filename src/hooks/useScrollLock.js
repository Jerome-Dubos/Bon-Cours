/**
 * Hook optimisé pour le verrouillage de scroll
 * Version 3.0 - Simplifié et optimisé
 *
 * @version 3.0.0
 * @author Bon Cours Team
 */

import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook optimisé pour bloquer/débloquer le scroll de la page
 * @param {boolean} isLocked - État de verrouillage
 * @param {Object} options - Options de configuration
 * @param {boolean} options.preserveScrollbar - Préserver l'espace de la scrollbar (défaut: true)
 * @returns {Object} API de contrôle du scroll
 */
export const useScrollLock = (isLocked, options = {}) => {
  const { preserveScrollbar = true } = options;
  const scrollPosition = useRef(0);
  const originalStyles = useRef({});
  const isLockedRef = useRef(false);

  // Calculer la largeur de la scrollbar (memoized)
  const getScrollbarWidth = useCallback(() => {
    if (!preserveScrollbar) return 0;

    const outer = document.createElement('div');
    outer.style.cssText = 'visibility:hidden;overflow:scroll;ms-overflow-style:scrollbar;';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.remove();

    return scrollbarWidth;
  }, [preserveScrollbar]);

  // Verrouiller le scroll
  const lockScroll = useCallback(() => {
    const body = document.body;
    const html = document.documentElement;

    // Sauvegarder les styles originaux
    originalStyles.current = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };

    // Sauvegarder la position de scroll
    scrollPosition.current = window.pageYOffset || document.documentElement.scrollTop;

    // Appliquer les styles de verrouillage
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition.current}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    // Préserver l'espace de la scrollbar
    if (preserveScrollbar) {
      const scrollbarWidth = getScrollbarWidth();
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
  }, [preserveScrollbar, getScrollbarWidth]);

  // Déverrouiller le scroll
  const unlockScroll = useCallback(() => {
    const body = document.body;
    const html = document.documentElement;

    // Restaurer les styles originaux
    body.style.position = originalStyles.current.bodyPosition;
    body.style.top = originalStyles.current.bodyTop;
    body.style.width = originalStyles.current.bodyWidth;
    body.style.overflow = originalStyles.current.bodyOverflow;
    body.style.paddingRight = originalStyles.current.bodyPaddingRight;
    html.style.overflow = originalStyles.current.htmlOverflow;

    // Restaurer la position de scroll
    window.scrollTo(0, scrollPosition.current);
  }, []);

  // Effet principal
  useEffect(() => {
    if (isLocked && !isLockedRef.current) {
      lockScroll();
      isLockedRef.current = true;
    } else if (!isLocked && isLockedRef.current) {
      unlockScroll();
      isLockedRef.current = false;
    }
  }, [isLocked, lockScroll, unlockScroll]);

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      if (isLockedRef.current) {
        unlockScroll();
      }
    };
  }, [unlockScroll]);

  return {
    isLocked: isLockedRef.current,
  };
};
