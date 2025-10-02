import { useCallback, useState } from 'react';

/**
 * Hook personnalisé pour gérer l'état des modales
 * @param {string[]} modalTypes - Types de modales à gérer
 * @returns {Object} État et fonctions pour gérer les modales
 */
const useModalState = (modalTypes = []) => {
  const [modalStates, setModalStates] = useState(() => {
    const initialState = {};
    modalTypes.forEach(type => {
      initialState[type] = false;
    });
    return initialState;
  });

  const openModal = useCallback(modalType => {
    setModalStates(prev => ({
      ...prev,
      [modalType]: true,
    }));
  }, []);

  const closeModal = useCallback(modalType => {
    setModalStates(prev => ({
      ...prev,
      [modalType]: false,
    }));
  }, []);

  const toggleModal = useCallback(modalType => {
    setModalStates(prev => ({
      ...prev,
      [modalType]: !prev[modalType],
    }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModalStates(prev => {
      const newState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      return newState;
    });
  }, []);

  return {
    modalStates,
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,
  };
};

export default useModalState;
