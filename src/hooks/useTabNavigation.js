/**
 * Hook personnalisé pour la navigation par onglets
 * Gère la synchronisation URL ↔ Onglet de manière stable et fluide
 *
 * @param {string} defaultTab - Onglet par défaut
 * @param {Array} tabs - Liste des onglets disponibles
 * @returns {Object} - État et fonctions pour la navigation
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useTabNavigation = (defaultTab, tabs) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isInitialized = useRef(false);
  const transitionTimeout = useRef(null);

  // Fonction pour obtenir le paramètre tab de l'URL
  const getTabFromURL = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tab');
  }, []);

  // Fonction pour mettre à jour l'URL
  const updateURL = useCallback(
    tabId => {
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set('tab', tabId);
      const newUrl = `${location.pathname}?${newSearchParams.toString()}`;
      window.history.pushState({}, '', newUrl);
    },
    [location.pathname]
  );

  // Fonction pour changer d'onglet
  const changeTab = useCallback(
    tabId => {
      if (activeTab === tabId) return;

      // Mettre à jour l'état immédiatement
      setActiveTab(tabId);

      // Mettre à jour l'URL
      updateURL(tabId);
    },
    [activeTab, updateURL]
  );

  // Initialisation
  useEffect(() => {
    const tabParam = getTabFromURL();
    if (tabParam && tabs.some(tab => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
    isInitialized.current = true;
  }, [getTabFromURL, tabs]);

  // Écouter les changements d'URL (bouton retour, navigation)
  useEffect(() => {
    const handlePopState = () => {
      const tabParam = getTabFromURL();
      if (tabParam && tabs.some(tab => tab.id === tabParam)) {
        setActiveTab(tabParam);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, [getTabFromURL, tabs]);

  // Synchroniser avec les changements d'URL (pour la navigation depuis navbar)
  useEffect(() => {
    if (!isInitialized.current) return;

    const tabParam = getTabFromURL();
    if (tabParam && tabs.some(tab => tab.id === tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [location.search, getTabFromURL, tabs, activeTab]);

  // Nettoyage
  useEffect(() => {
    return () => {
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, []);

  return {
    activeTab,
    changeTab,
    isActive: tabId => activeTab === tabId,
  };
};

export default useTabNavigation;
