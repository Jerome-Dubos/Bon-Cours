import { useCallback, useMemo, useState } from 'react';

/**
 * Hook personnalisé pour gérer la navigation dans le planning
 * @param {Object} currentCourses - Cours actuels
 * @param {number} coursesPerPage - Nombre de cours par page
 * @returns {Object} État et fonctions pour la navigation
 */
export const useScheduleNavigation = (currentCourses = {}, coursesPerPage = 3) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClosing, setIsClosing] = useState(false);

  // Gestion du clic sur un jour
  const handleDayClick = useCallback(
    dateStr => {
      if (selectedDay === dateStr) {
        // Fermeture avec animation
        setIsClosing(true);
        setTimeout(() => {
          setSelectedDay(null);
          setCurrentPage(1);
          setIsClosing(false);
        }, 250);
      } else {
        // Ouverture directe
        setSelectedDay(dateStr);
        setCurrentPage(1);
        setIsClosing(false);
      }
    },
    [selectedDay]
  );

  // Cours de la page actuelle
  const getCurrentPageCourses = useMemo(() => {
    if (!selectedDay || !currentCourses[selectedDay]) return [];

    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    return currentCourses[selectedDay].slice(startIndex, endIndex);
  }, [selectedDay, currentCourses, currentPage, coursesPerPage]);

  // Nombre total de pages
  const totalPages = useMemo(
    () =>
      selectedDay && currentCourses[selectedDay]
        ? Math.ceil(currentCourses[selectedDay].length / coursesPerPage)
        : 0,
    [selectedDay, currentCourses, coursesPerPage]
  );

  // Changement de page
  const handlePageChange = useCallback(newPage => {
    setCurrentPage(newPage);
  }, []);

  // Navigation vers la page précédente
  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  // Navigation vers la page suivante
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  // Fermeture de la sélection
  const closeSelection = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedDay(null);
      setCurrentPage(1);
      setIsClosing(false);
    }, 250);
  }, []);

  // Réinitialisation de la navigation
  const resetNavigation = useCallback(() => {
    setSelectedDay(null);
    setCurrentPage(1);
    setIsClosing(false);
  }, []);

  // Informations de pagination
  const paginationInfo = useMemo(() => {
    if (!selectedDay || !currentCourses[selectedDay]) {
      return { currentPage: 0, totalPages: 0, totalCourses: 0 };
    }

    return {
      currentPage,
      totalPages,
      totalCourses: currentCourses[selectedDay].length,
      startIndex: (currentPage - 1) * coursesPerPage + 1,
      endIndex: Math.min(currentPage * coursesPerPage, currentCourses[selectedDay].length),
    };
  }, [selectedDay, currentCourses, currentPage, totalPages, coursesPerPage]);

  return {
    selectedDay,
    currentPage,
    isClosing,
    getCurrentPageCourses,
    totalPages,
    paginationInfo,
    handleDayClick,
    handlePageChange,
    goToPreviousPage,
    goToNextPage,
    closeSelection,
    resetNavigation,
    setSelectedDay,
    setCurrentPage,
  };
};
