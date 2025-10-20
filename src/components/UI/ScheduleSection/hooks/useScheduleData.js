import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Hook personnalisé pour gérer les données de planning
 * @param {Object} coursesData - Données des cours
 * @param {Function} translator - Fonction de traduction
 * @returns {Object} État et fonctions pour gérer les données
 */
export const useScheduleData = (coursesData = {}, translator = null) => {
  const [translatedCoursesData, setTranslatedCoursesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction de traduction des données
  const translateScheduleData = useCallback((data, translatorFn) => {
    if (!data || !translatorFn) return data;

    const translated = {};

    Object.keys(data).forEach(level => {
      translated[level] = {};
      Object.keys(data[level] || {}).forEach(type => {
        translated[level][type] = {};
        Object.keys(data[level][type] || {}).forEach(day => {
          translated[level][type][day] = (data[level][type][day] || []).map(course => ({
            ...course,
            language: translatorFn(course.languageKey) || course.language,
            level: translatorFn(course.levelKey) || course.level,
            type: translatorFn(course.typeKey) || course.type,
          }));
        });
      });
    });

    return translated;
  }, []);

  // Traduction des données quand elles changent
  useEffect(() => {
    if (coursesData && Object.keys(coursesData).length > 0 && translator) {
      try {
        setLoading(true);
        setError(null);
        const translated = translateScheduleData(coursesData, translator);
        setTranslatedCoursesData(translated);
      } catch (err) {
        setError(err.message);
        setTranslatedCoursesData(coursesData);
      } finally {
        setLoading(false);
      }
    } else {
      setTranslatedCoursesData(coursesData);
    }
  }, [coursesData, translator, translateScheduleData]);

  // Vérification si des cours existent
  const hasAnyCourses = useMemo(() => {
    if (!translatedCoursesData) return false;

    const levels = Object.keys(translatedCoursesData);
    for (const level of levels) {
      const types = Object.keys(translatedCoursesData[level] || {});
      for (const type of types) {
        const courses = translatedCoursesData[level][type] || {};
        const days = Object.keys(courses);
        for (const day of days) {
          if (courses[day] && courses[day].length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }, [translatedCoursesData]);

  // Obtenir les cours pour un niveau et type donnés
  const getCoursesForLevelAndType = useCallback(
    (level, type) => {
      return translatedCoursesData?.[level]?.[type] || {};
    },
    [translatedCoursesData]
  );

  // Obtenir les cours pour un jour donné
  const getCoursesForDay = useCallback(
    (level, type, day) => {
      return translatedCoursesData?.[level]?.[type]?.[day] || [];
    },
    [translatedCoursesData]
  );

  // Statistiques des cours
  const getCoursesStats = useMemo(() => {
    if (!translatedCoursesData) return { totalCourses: 0, totalDays: 0, levels: {} };

    let totalCourses = 0;
    let totalDays = 0;
    const levels = {};

    Object.keys(translatedCoursesData).forEach(level => {
      levels[level] = { totalCourses: 0, totalDays: 0, types: {} };

      Object.keys(translatedCoursesData[level] || {}).forEach(type => {
        levels[level].types[type] = { totalCourses: 0, totalDays: 0 };

        Object.keys(translatedCoursesData[level][type] || {}).forEach(day => {
          const dayCourses = translatedCoursesData[level][type][day] || [];
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
  }, [translatedCoursesData]);

  return {
    translatedCoursesData,
    loading,
    error,
    hasAnyCourses,
    getCoursesForLevelAndType,
    getCoursesForDay,
    getCoursesStats,
    setError,
    setLoading,
  };
};
