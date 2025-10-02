import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant optimisé pour remonter en haut de page lors du changement de route
 * Inclut la gestion des erreurs, la prévention des appels inutiles et l'accessibilité
 * @version 2.0.0
 * @author Bon Cours Team
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);
  const scrollTimeoutRef = useRef(null);

  /**
   * Fonction optimisée pour le scroll vers le haut
   * Inclut la gestion des erreurs et les options de scroll fluide
   * @private
   */
  const scrollToTop = useCallback(() => {
    try {
      // Vérification de la disponibilité de l'API
      if (typeof window === 'undefined' || !window.scrollTo) {
        console.warn('ScrollToTop: window.scrollTo non disponible');
        return;
      }

      // Nettoyage du timeout précédent
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Scroll immédiat pour les navigateurs modernes
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      // Fallback pour les navigateurs plus anciens
      scrollTimeoutRef.current = setTimeout(() => {
        try {
          window.scrollTo(0, 0);
        } catch (error) {
          console.warn('ScrollToTop: Erreur lors du scroll de fallback:', error);
        }
      }, 100);
    } catch (error) {
      console.warn('ScrollToTop: Erreur lors du scroll:', error);

      // Fallback d'urgence
      try {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch (fallbackError) {
        console.warn('ScrollToTop: Erreur lors du fallback:', fallbackError);
      }
    }
  }, []);

  /**
   * Effect pour gérer le scroll lors du changement de route
   */
  useEffect(() => {
    // Éviter le scroll si on est déjà sur la même page
    if (previousPathname.current === pathname) {
      return;
    }

    // Mise à jour de la référence
    previousPathname.current = pathname;

    // Délai pour s'assurer que le DOM est mis à jour
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 0);

    // Nettoyage
    return () => {
      clearTimeout(timeoutId);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [pathname, scrollToTop]);

  /**
   * Nettoyage lors du démontage du composant
   */
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Composant invisible
  return null;
};

export default ScrollToTop;
