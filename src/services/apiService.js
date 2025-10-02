/**
 * Service API unifié et optimisé
 * Simule un backend simple avec des opérations CRUD basiques
 * Inclut gestion du cache avec expiration, validation et gestion d'erreurs robuste
 */

class ApiService {
  constructor() {
    this.baseUrl = '/data';
    this.cache = new Map();
    this.cacheExpiration = 5 * 60 * 1000; // 5 minutes
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 seconde
  }

  // Méthode générique pour les appels API avec retry et gestion d'erreurs
  async fetchData(endpoint, retryCount = 0) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}.json`);

      if (!response.ok) {
        if (response.status >= 500 && retryCount < this.retryAttempts) {
          console.warn(
            `Tentative ${retryCount + 1}/${this.retryAttempts} échouée pour ${endpoint}`
          );
          await this.delay(this.retryDelay * (retryCount + 1));
          return this.fetchData(endpoint, retryCount + 1);
        }
        throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (retryCount < this.retryAttempts && this.isRetryableError(error)) {
        console.warn(
          `Tentative ${retryCount + 1}/${this.retryAttempts} échouée pour ${endpoint}:`,
          error.message
        );
        await this.delay(this.retryDelay * (retryCount + 1));
        return this.fetchData(endpoint, retryCount + 1);
      }
      console.error(`Erreur définitive pour ${endpoint}:`, error);
      throw new Error(`Impossible de récupérer les données de ${endpoint}: ${error.message}`);
    }
  }

  // Vérifie si une erreur est récupérable
  isRetryableError(error) {
    return (
      error.name === 'TypeError' || // Problème réseau
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError')
    );
  }

  // Utilitaire pour les délais
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // === GESTION DES UTILISATEURS ===

  // Vérifie si le cache est valide
  isCacheValid(key) {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheExpiration;
  }

  // Met en cache avec timestamp
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  // Récupère du cache si valide
  getCache(key) {
    const cached = this.cache.get(key);
    return cached ? cached.data : null;
  }

  async getUsers() {
    if (this.isCacheValid('users')) {
      return this.getCache('users');
    }
    const data = await this.fetchData('users');
    this.setCache('users', data);
    return data;
  }

  // Validation des paramètres
  validateId(id) {
    if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
      throw new Error('ID invalide fourni');
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('Email invalide fourni');
    }
  }

  async getUserById(id) {
    this.validateId(id);
    const data = await this.getUsers();
    const user = data.users.find(user => user.id === id);
    if (!user) {
      throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return user;
  }

  async getUserByEmail(email) {
    this.validateEmail(email);
    const data = await this.getUsers();
    const user = data.users.find(user => user.email === email);
    if (!user) {
      throw new Error(`Utilisateur avec l'email ${email} non trouvé`);
    }
    return user;
  }

  async getStudents() {
    const data = await this.getUsers();
    return data.users.filter(user => user.role === 'student');
  }

  async getTeachers() {
    const data = await this.getUsers();
    return data.users.filter(user => user.role === 'teacher');
  }

  async getDirector() {
    const data = await this.getUsers();
    return data.users.find(user => user.role === 'director');
  }

  // === GESTION DES COURS ===

  async getCourses() {
    if (this.isCacheValid('courses')) {
      return this.getCache('courses');
    }

    // Vérifier s'il y a des données persistées dans localStorage
    const tempCourses = localStorage.getItem('temp_courses');
    if (tempCourses) {
      try {
        const courses = JSON.parse(tempCourses);
        const data = { courses };
        this.setCache('courses', data);
        return data;
      } catch (error) {
        console.warn('Erreur lors de la récupération des cours depuis localStorage:', error);
        // Continuer avec le fetch normal
      }
    }

    const data = await this.fetchData('courses');
    this.setCache('courses', data);
    return data;
  }

  // Nouvelle méthode pour organiser les cours en format de planning
  async getScheduleData() {
    const coursesData = await this.getCourses();
    const courses = coursesData.courses || [];

    // Structure pour organiser les cours par niveau, type et date
    const scheduleData = {
      adult: {
        presentiel: {},
        visio: {},
      },
      child: {
        presentiel: {},
        visio: {},
      },
    };

    courses.forEach(course => {
      // Déterminer le niveau (adult ou child)
      const level = course.level === 'child' ? 'child' : 'adult';

      // Déterminer le type (presentiel ou visio)
      const type = course.type === 'visio' ? 'visio' : 'presentiel';

      // Extraire la date du planning
      const date = course.schedule?.date;

      if (date) {
        // Initialiser la date si elle n'existe pas
        if (!scheduleData[level][type][date]) {
          scheduleData[level][type][date] = [];
        }

        // Mapper les langues françaises vers les clés de traduction
        const languageMapping = {
          Anglais: 'english',
          Espagnol: 'spanish',
          Français: 'french',
          Allemand: 'german',
          Italien: 'italian',
          Turc: 'turkish',
          Arabe: 'arabic',
          Grec: 'greek',
        };

        const languageKey = languageMapping[course.language] || course.language.toLowerCase();

        // Ajouter les clés de traduction et formater les données
        const formattedCourse = {
          ...course,
          languageKey: `languages.${languageKey}`,
          levelKey: `levels.${level}`,
          typeKey: `types.${type}`,
          startTime: course.schedule.time,
          endTime: this.calculateEndTime(course.schedule.time, course.schedule.duration),
          duration: course.schedule.duration,
          date: course.schedule.date,
        };

        scheduleData[level][type][date].push(formattedCourse);
      }
    });

    return scheduleData;
  }

  // Méthode utilitaire pour calculer l'heure de fin (optimisée)
  calculateEndTime(startTime, duration) {
    if (!startTime || !duration) return startTime;

    try {
      const [hours, minutes] = startTime.split(':').map(Number);

      // Mapping optimisé des durées
      const durationMap = {
        '30min': { hours: 0, minutes: 30 },
        '1h': { hours: 1, minutes: 0 },
        '1h30': { hours: 1, minutes: 30 },
        '2h': { hours: 2, minutes: 0 },
        '2h30': { hours: 2, minutes: 30 },
        '3h': { hours: 3, minutes: 0 },
      };

      let durationHours = 0;
      let durationMinutes = 0;

      if (durationMap[duration]) {
        durationHours = durationMap[duration].hours;
        durationMinutes = durationMap[duration].minutes;
      } else {
        // Fallback pour les anciens formats
        const match = duration.match(/(\d+)h(?:(\d+)min)?/);
        if (match) {
          durationHours = parseInt(match[1]);
          durationMinutes = match[2] ? parseInt(match[2]) : 0;
        }
      }

      // Calculer l'heure de fin
      const totalMinutes = minutes + durationMinutes;
      const totalHours = hours + durationHours + Math.floor(totalMinutes / 60);
      const finalMinutes = totalMinutes % 60;

      // Formater l'heure de fin
      return `${totalHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
    } catch (error) {
      console.error("Erreur lors du calcul de l'heure de fin:", error);
      return startTime;
    }
  }

  async getCourseById(id) {
    const data = await this.getCourses();
    return data.courses.find(course => course.id === id);
  }

  async getCoursesByTeacher(teacherId) {
    const data = await this.getCourses();
    return data.courses.filter(course => course.teacherId === teacherId);
  }

  async getAvailableCourses() {
    const data = await this.getCourses();
    return data.courses.filter(
      course => course.status === 'active' && course.enrolledStudents < course.maxStudents
    );
  }

  // === GESTION DES INSCRIPTIONS ===

  async getEnrollments() {
    if (this.isCacheValid('enrollments')) {
      return this.getCache('enrollments');
    }

    // Vérifier s'il y a des données persistées dans localStorage
    const tempEnrollments = localStorage.getItem('temp_enrollments');
    if (tempEnrollments) {
      try {
        const enrollments = JSON.parse(tempEnrollments);
        const data = { enrollments };
        this.setCache('enrollments', data);
        return data;
      } catch (error) {
        console.warn('Erreur lors de la récupération des inscriptions depuis localStorage:', error);
        // Continuer avec le fetch normal
      }
    }

    const data = await this.fetchData('enrollments');
    this.setCache('enrollments', data);
    return data;
  }

  async getEnrollmentsByStudent(studentId) {
    const data = await this.getEnrollments();
    return data.enrollments.filter(enrollment => enrollment.studentId === studentId);
  }

  async getEnrollmentsByCourse(courseId) {
    const data = await this.getEnrollments();
    return data.enrollments.filter(enrollment => enrollment.courseId === courseId);
  }

  async getEnrolledStudents(courseId) {
    const enrollments = await this.getEnrollmentsByCourse(courseId);
    const students = await this.getStudents();

    return enrollments.map(enrollment => {
      const student = students.find(s => s.id === enrollment.studentId);
      return {
        ...student,
        enrollmentDate: enrollment.enrollmentDate,
        enrollmentStatus: enrollment.status,
      };
    });
  }

  // === OPÉRATIONS SIMULÉES ===

  async enrollStudent(studentId, courseId) {
    // Vérifier si l'étudiant est déjà inscrit
    const existingEnrollments = await this.getEnrollmentsByStudent(studentId);
    const alreadyEnrolled = existingEnrollments.find(e => e.courseId === courseId);

    if (alreadyEnrolled) {
      throw new Error("L'étudiant est déjà inscrit à ce cours");
    }

    // Vérifier la disponibilité du cours
    const course = await this.getCourseById(courseId);
    if (course.enrolledStudents >= course.maxStudents) {
      throw new Error('Le cours est complet');
    }

    // Créer la nouvelle inscription
    const newEnrollment = {
      id: Date.now(),
      studentId,
      courseId,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    // Persister l'inscription dans enrollments.json
    await this.persistEnrollment(newEnrollment);

    // Mettre à jour le nombre d'inscrits dans courses.json
    await this.updateCourseEnrollment(courseId, 1);

    // Invalider le cache
    this.cache.delete('enrollments');
    this.cache.delete('courses');

    return { success: true, enrollment: newEnrollment };
  }

  // Méthode pour persister une inscription
  async persistEnrollment(newEnrollment) {
    try {
      // Récupérer les inscriptions actuelles
      const enrollmentsData = await this.getEnrollments();
      const enrollments = enrollmentsData.enrollments || [];

      // Ajouter la nouvelle inscription
      enrollments.push(newEnrollment);

      // Persister dans localStorage
      localStorage.setItem('temp_enrollments', JSON.stringify(enrollments));

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Méthode pour mettre à jour le nombre d'inscrits d'un cours
  async updateCourseEnrollment(courseId, increment) {
    try {
      // Récupérer les cours actuels
      const coursesData = await this.getCourses();
      const courses = coursesData.courses || [];

      // Trouver et mettre à jour le cours
      const courseIndex = courses.findIndex(c => c.id === courseId);
      if (courseIndex !== -1) {
        courses[courseIndex].enrolledStudents += increment;

        // Persister dans localStorage
        localStorage.setItem('temp_courses', JSON.stringify(courses));
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async unenrollStudent(studentId, courseId) {
    // Simuler la désinscription
    this.cache.delete('enrollments');

    return { success: true };
  }

  // === STATISTIQUES ===

  async getDashboardStats() {
    const [users, courses, enrollments] = await Promise.all([
      this.getUsers(),
      this.getCourses(),
      this.getEnrollments(),
    ]);

    const students = users.users.filter(u => u.role === 'student');
    const teachers = users.users.filter(u => u.role === 'teacher');
    const activeCourses = courses.courses.filter(c => c.status === 'active');

    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalCourses: activeCourses.length,
      totalEnrollments: enrollments.enrollments.length,
      coursesWithSpots: activeCourses.filter(c => c.enrolledStudents < c.maxStudents).length,
    };
  }

  // === UTILITAIRES ===

  clearCache() {
    this.cache.clear();
    console.log('Cache vidé');
  }

  clearCacheFor(key) {
    this.cache.delete(key);
    console.log(`Cache vidé pour la clé: ${key}`);
  }

  // Obtenir les statistiques du cache
  getCacheStats() {
    const stats = {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
      memoryUsage: this.estimateCacheMemoryUsage(),
    };
    return stats;
  }

  // Estimer l'utilisation mémoire du cache
  estimateCacheMemoryUsage() {
    let totalSize = 0;
    for (const [key, value] of this.cache) {
      totalSize += JSON.stringify({ key, value }).length;
    }
    return `${(totalSize / 1024).toFixed(2)} KB`;
  }

  // Nettoyer le cache expiré
  cleanExpiredCache() {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, value] of this.cache) {
      if (now - value.timestamp > this.cacheExpiration) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`${cleanedCount} entrées de cache expirées nettoyées`);
    }

    return cleanedCount;
  }
}

// Instance singleton
const apiService = new ApiService();
export default apiService;
