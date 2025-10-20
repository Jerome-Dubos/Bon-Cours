import { useCallback, useState } from 'react';

/**
 * Hook personnalisé pour gérer les filtres du planning
 * @param {Array} levelTabs - Onglets de niveau disponibles
 * @param {Array} typeTabs - Onglets de type disponibles
 * @returns {Object} État et fonctions pour gérer les filtres
 */
export const useScheduleFilters = (levelTabs = [], typeTabs = []) => {
  const [activeLevel, setActiveLevel] = useState(levelTabs[0]?.id || 'adult');
  const [activeType, setActiveType] = useState(typeTabs[0]?.id || 'presentiel');

  // Changement de niveau
  const handleLevelChange = useCallback(level => {
    setActiveLevel(level);
  }, []);

  // Changement de type
  const handleTypeChange = useCallback(type => {
    setActiveType(type);
  }, []);

  // Réinitialisation des filtres
  const resetFilters = useCallback(() => {
    setActiveLevel(levelTabs[0]?.id || 'adult');
    setActiveType(typeTabs[0]?.id || 'presentiel');
  }, [levelTabs, typeTabs]);

  // Vérification si un filtre est actif
  const isLevelActive = useCallback(
    level => {
      return activeLevel === level;
    },
    [activeLevel]
  );

  const isTypeActive = useCallback(
    type => {
      return activeType === type;
    },
    [activeType]
  );

  // Obtenir l'onglet actif
  const getActiveLevelTab = useCallback(() => {
    return levelTabs.find(tab => tab.id === activeLevel) || levelTabs[0];
  }, [levelTabs, activeLevel]);

  const getActiveTypeTab = useCallback(() => {
    return typeTabs.find(tab => tab.id === activeType) || typeTabs[0];
  }, [typeTabs, activeType]);

  // Configuration des filtres
  const filtersConfig = {
    level: {
      active: activeLevel,
      tabs: levelTabs,
      onChange: handleLevelChange,
      isActive: isLevelActive,
      getActive: getActiveLevelTab,
    },
    type: {
      active: activeType,
      tabs: typeTabs,
      onChange: handleTypeChange,
      isActive: isTypeActive,
      getActive: getActiveTypeTab,
    },
  };

  return {
    activeLevel,
    activeType,
    handleLevelChange,
    handleTypeChange,
    resetFilters,
    isLevelActive,
    isTypeActive,
    getActiveLevelTab,
    getActiveTypeTab,
    filtersConfig,
  };
};
