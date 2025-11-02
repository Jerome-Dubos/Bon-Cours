/**
 * Utilitaires optimisés pour la gestion des traductions des données dynamiques
 * Permet de traduire les clés de données stockées dans le JSON/DB avec cache et validation
 * @version 2.0.0
 * @author Bon Cours Team
 */

// Cache pour les traductions déjà effectuées
const translationCache = new Map();
const CACHE_SIZE_LIMIT = 1000;

/**
 * Nettoie le cache des traductions si nécessaire
 * @private
 */
const cleanCache = () => {
  if (translationCache.size > CACHE_SIZE_LIMIT) {
    const entries = Array.from(translationCache.entries());
    const toDelete = entries.slice(0, Math.floor(CACHE_SIZE_LIMIT / 2));
    toDelete.forEach(([key]) => translationCache.delete(key));
  }
};

/**
 * Traduit une clé de données en utilisant la fonction de traduction fournie
 * Optimisé avec cache et validation améliorée
 * @param {string} key - Clé de traduction (ex: "languages.english")
 * @param {Function} t - Fonction de traduction de react-i18next
 * @param {string} fallback - Valeur de fallback si la traduction échoue
 * @returns {string} Texte traduit
 * @example
 * translateDataKey('languages.english', t, 'English')
 */
export const translateDataKey = (key, t, fallback = '') => {
  // Validation des paramètres d'entrée
  if (!key || typeof key !== 'string' || !t || typeof t !== 'function') {
    return fallback;
  }

  // Vérification du cache
  const cacheKey = `${key}_${t.language || 'default'}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const translated = t(key);

    // Validation de la traduction
    const isValidTranslation =
      translated &&
      translated !== key &&
      typeof translated === 'string' &&
      translated.trim().length > 0;

    const result = isValidTranslation ? translated : fallback;

    // Mise en cache
    cleanCache();
    translationCache.set(cacheKey, result);

    return result;
  } catch (error) {
    return fallback;
  }
};

/**
 * Traduit un objet de cours complet avec optimisation
 * @param {Object} course - Objet cours avec des clés de traduction
 * @param {Function} t - Fonction de traduction
 * @returns {Object} Objet cours avec les valeurs traduites
 * @example
 * const translatedCourse = translateCourse(course, t);
 */
export const translateCourse = (course, t) => {
  // Validation des paramètres
  if (!course || typeof course !== 'object' || !t || typeof t !== 'function') {
    return course || {};
  }

  // Optimisation : éviter la création d'un nouvel objet si pas de clés de traduction
  const hasTranslationKeys = course.languageKey || course.levelKey || course.typeKey;
  if (!hasTranslationKeys) {
    return course;
  }

  // Création optimisée de l'objet traduit
  const translatedCourse = { ...course };

  if (course.languageKey) {
    translatedCourse.language = translateDataKey(course.languageKey, t, course.languageKey);
  }

  if (course.levelKey) {
    translatedCourse.level = translateDataKey(course.levelKey, t, course.levelKey);
  }

  if (course.typeKey) {
    translatedCourse.type = translateDataKey(course.typeKey, t, course.typeKey);
  }

  return translatedCourse;
};

/**
 * Traduit une liste de cours avec optimisation des performances
 * @param {Array} courses - Liste des cours
 * @param {Function} t - Fonction de traduction
 * @returns {Array} Liste des cours traduits
 * @example
 * const translatedCourses = translateCourses(courses, t);
 */
export const translateCourses = (courses, t) => {
  // Validation des paramètres
  if (!Array.isArray(courses) || !t || typeof t !== 'function') {
    return courses || [];
  }

  // Optimisation : retourner le tableau vide si pas de cours
  if (courses.length === 0) {
    return courses;
  }

  // Traduction optimisée avec vérification préalable
  return courses.map(course => {
    // Éviter la traduction si le cours n'a pas de clés de traduction
    if (!course || typeof course !== 'object') {
      return course;
    }

    return translateCourse(course, t);
  });
};

/**
 * Traduit les données de planning complètes avec optimisation
 * @param {Object} scheduleData - Données de planning
 * @param {Function} t - Fonction de traduction
 * @returns {Object} Données de planning traduites
 * @example
 * const translatedSchedule = translateScheduleData(scheduleData, t);
 */
export const translateScheduleData = (scheduleData, t) => {
  // Validation des paramètres
  if (!scheduleData || typeof scheduleData !== 'object' || !t || typeof t !== 'function') {
    return scheduleData || {};
  }

  const translated = {};

  // Optimisation : parcours des clés avec vérification de type
  Object.entries(scheduleData).forEach(([levelKey, levelData]) => {
    // Conservation des métadonnées sans traduction
    if (levelKey === 'metadata') {
      translated[levelKey] = levelData;
      return;
    }

    // Validation du niveau
    if (!levelData || typeof levelData !== 'object') {
      translated[levelKey] = levelData;
      return;
    }

    translated[levelKey] = {};

    // Parcours optimisé des types
    Object.entries(levelData).forEach(([typeKey, typeData]) => {
      if (!typeData || typeof typeData !== 'object') {
        translated[levelKey][typeKey] = typeData;
        return;
      }

      translated[levelKey][typeKey] = {};

      // Parcours optimisé des dates
      Object.entries(typeData).forEach(([dateKey, courses]) => {
        if (Array.isArray(courses)) {
          translated[levelKey][typeKey][dateKey] = translateCourses(courses, t);
        } else {
          translated[levelKey][typeKey][dateKey] = courses;
        }
      });
    });
  });

  return translated;
};

/**
 * Valide qu'une clé de traduction existe dans les fichiers de langue
 * Optimisé avec cache et validation améliorée
 * @param {string} key - Clé à valider
 * @param {Object} translations - Objet des traductions
 * @returns {boolean} True si la clé existe
 * @example
 * validateTranslationKey('languages.english', translations)
 */
export const validateTranslationKey = (key, translations) => {
  // Validation des paramètres
  if (!key || typeof key !== 'string' || !translations || typeof translations !== 'object') {
    return false;
  }

  // Optimisation : clé simple sans point
  if (!key.includes('.')) {
    return typeof translations[key] === 'string';
  }

  // Parcours optimisé des clés imbriquées
  const keys = key.split('.');
  let current = translations;

  for (const k of keys) {
    if (!current || typeof current !== 'object' || !(k in current)) {
      return false;
    }
    current = current[k];
  }

  return typeof current === 'string' && current.trim().length > 0;
};

/**
 * Extrait toutes les clés de traduction utilisées dans les données
 * Optimisé avec détection intelligente des clés de traduction
 * @param {Object} data - Données à analyser
 * @returns {Set} Ensemble des clés de traduction
 * @example
 * const keys = extractTranslationKeys(data);
 */
export const extractTranslationKeys = data => {
  // Validation des paramètres
  if (!data || typeof data !== 'object') {
    return new Set();
  }

  const keys = new Set();
  const visited = new WeakSet(); // Éviter les références circulaires

  /**
   * Fonction récursive optimisée pour l'extraction des clés
   * @param {*} obj - Objet à analyser
   * @private
   */
  const extractKeys = obj => {
    // Éviter les références circulaires
    if (visited.has(obj)) return;

    if (obj && typeof obj === 'object') {
      visited.add(obj);
    }

    if (!obj || typeof obj !== 'object') return;

    // Optimisation : parcours direct des valeurs
    Object.values(obj).forEach(value => {
      if (typeof value === 'string' && value.includes('.')) {
        // Détection intelligente des clés de traduction
        // Format attendu : "category.subcategory.key"
        const parts = value.split('.');
        if (parts.length >= 2 && parts.every(part => part.trim().length > 0)) {
          keys.add(value);
        }
      } else if (Array.isArray(value)) {
        value.forEach(item => extractKeys(item));
      } else if (value && typeof value === 'object') {
        extractKeys(value);
      }
    });
  };

  extractKeys(data);
  return keys;
};

/**
 * Nettoie le cache des traductions
 * Utile pour libérer la mémoire ou forcer le rechargement
 * @example
 * clearTranslationCache();
 */
export const clearTranslationCache = () => {
  translationCache.clear();
};

/**
 * Obtient les statistiques du cache de traduction
 * @returns {Object} Statistiques du cache
 * @example
 * const stats = getTranslationCacheStats();
 */
export const getTranslationCacheStats = () => {
  return {
    size: translationCache.size,
    limit: CACHE_SIZE_LIMIT,
    usage: `${((translationCache.size / CACHE_SIZE_LIMIT) * 100).toFixed(1)}%`,
  };
};
