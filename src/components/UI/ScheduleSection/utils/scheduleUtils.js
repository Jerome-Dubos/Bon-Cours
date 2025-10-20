/**
 * Utilitaires pour la gestion des données de planning
 */

/**
 * Génère les jours de la semaine à partir d'une date de début
 * @param {string} startDate - Date de début (format ISO)
 * @param {number} weekDays - Nombre de jours à générer
 * @returns {Array<Date>} Tableau des jours
 */
export const generateWeekDays = (startDate = '2024-01-15', weekDays = 7) => {
  const week = [];
  const start = new Date(startDate);

  for (let i = 0; i < weekDays; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    week.push(day);
  }

  return week;
};

/**
 * Formate une date au format ISO (YYYY-MM-DD)
 * @param {Date} date - Date à formater
 * @returns {string} Date formatée
 */
export const formatDate = date => {
  return date.toISOString().split('T')[0];
};

/**
 * Formate une date pour l'affichage français
 * @param {Date} date - Date à formater
 * @param {Object} options - Options de formatage
 * @returns {string} Date formatée
 */
export const formatDateForDisplay = (date, options = {}) => {
  const defaultOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return date.toLocaleDateString('fr-FR', { ...defaultOptions, ...options });
};

/**
 * Vérifie si une date est un week-end
 * @param {Date} date - Date à vérifier
 * @returns {boolean} True si c'est un week-end
 */
export const isWeekend = date => {
  const day = date.getDay();
  return day === 0 || day === 6; // Dimanche ou Samedi
};

/**
 * Obtient le nom du jour en français
 * @param {Date} date - Date
 * @param {string} format - Format ('long', 'short', 'narrow')
 * @returns {string} Nom du jour
 */
export const getDayName = (date, format = 'short') => {
  return date.toLocaleDateString('fr-FR', { weekday: format });
};

/**
 * Calcule les statistiques des cours
 * @param {Object} coursesData - Données des cours
 * @returns {Object} Statistiques
 */
export const calculateCoursesStats = (coursesData = {}) => {
  let totalCourses = 0;
  let totalDays = 0;
  const levels = {};

  Object.keys(coursesData).forEach(level => {
    levels[level] = { totalCourses: 0, totalDays: 0, types: {} };

    Object.keys(coursesData[level] || {}).forEach(type => {
      levels[level].types[type] = { totalCourses: 0, totalDays: 0 };

      Object.keys(coursesData[level][type] || {}).forEach(day => {
        const dayCourses = coursesData[level][type][day] || [];
        if (dayCourses.length > 0) {
          totalCourses += dayCourses.length;
          totalDays += 1;
          levels[level].totalCourses += dayCourses.length;
          levels[level].totalDays += 1;
          levels[level].types[type].totalCourses += dayCourses.length;
          levels[level].types[type].totalDays += 1;
        }
      });
    });
  });

  return { totalCourses, totalDays, levels };
};

/**
 * Filtre les cours par critères
 * @param {Array} courses - Liste des cours
 * @param {Object} filters - Critères de filtrage
 * @returns {Array} Cours filtrés
 */
export const filterCourses = (courses = [], filters = {}) => {
  return courses.filter(course => {
    if (filters.language && course.language !== filters.language) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.type && course.type !== filters.type) return false;
    if (filters.available && course.enrolledStudents >= course.maxStudents) return false;
    if (filters.timeRange) {
      const courseTime = course.startTime;
      const [start, end] = filters.timeRange;
      if (courseTime < start || courseTime > end) return false;
    }
    return true;
  });
};

/**
 * Trie les cours par critère
 * @param {Array} courses - Liste des cours
 * @param {string} sortBy - Critère de tri ('time', 'language', 'level')
 * @param {string} order - Ordre ('asc', 'desc')
 * @returns {Array} Cours triés
 */
export const sortCourses = (courses = [], sortBy = 'time', order = 'asc') => {
  const sorted = [...courses].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'time':
        comparison = a.startTime.localeCompare(b.startTime);
        break;
      case 'language':
        comparison = a.language.localeCompare(b.language);
        break;
      case 'level':
        comparison = a.level.localeCompare(b.level);
        break;
      case 'capacity':
        comparison = a.maxStudents - a.enrolledStudents - (b.maxStudents - b.enrolledStudents);
        break;
      default:
        comparison = 0;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return sorted;
};

/**
 * Pagine une liste de cours
 * @param {Array} courses - Liste des cours
 * @param {number} page - Page actuelle (1-indexed)
 * @param {number} perPage - Nombre d'éléments par page
 * @returns {Object} Données paginées
 */
export const paginateCourses = (courses = [], page = 1, perPage = 3) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const totalPages = Math.ceil(courses.length / perPage);

  return {
    courses: courses.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages,
      totalCourses: courses.length,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, courses.length),
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
};

/**
 * Valide les données d'un cours
 * @param {Object} course - Données du cours
 * @returns {Object} Résultat de validation
 */
export const validateCourse = (course = {}) => {
  const errors = [];

  if (!course.language) errors.push('La langue est requise');
  if (!course.level) errors.push('Le niveau est requis');
  if (!course.startTime) errors.push("L'heure de début est requise");
  if (!course.endTime) errors.push("L'heure de fin est requise");
  if (!course.duration) errors.push('La durée est requise');
  if (course.maxStudents <= 0) errors.push("Le nombre maximum d'étudiants doit être positif");
  if (course.enrolledStudents < 0)
    errors.push("Le nombre d'étudiants inscrits ne peut pas être négatif");
  if (course.enrolledStudents > course.maxStudents)
    errors.push("Le nombre d'étudiants inscrits ne peut pas dépasser le maximum");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Crée un message d'erreur formaté
 * @param {string} message - Message d'erreur
 * @param {Object} details - Détails supplémentaires
 * @returns {Object} Message d'erreur formaté
 */
export const createErrorMessage = (message, details = {}) => {
  return {
    message,
    details,
    timestamp: new Date().toISOString(),
    type: 'error',
  };
};

/**
 * Crée un message de succès formaté
 * @param {string} message - Message de succès
 * @param {Object} data - Données supplémentaires
 * @returns {Object} Message de succès formaté
 */
export const createSuccessMessage = (message, data = {}) => {
  return {
    message,
    data,
    timestamp: new Date().toISOString(),
    type: 'success',
  };
};
