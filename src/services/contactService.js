/**
 * Service de contact optimisé avec EmailJS
 * Gère les formulaires de contact et les demandes d'intérêt
 * Inclut validation, gestion d'erreurs et performance améliorée
 */
import {
  sendContactMessage as sendContactEmail,
  sendInterestRequest as sendInterestEmail,
} from './contactEmailService';

class ContactService {
  constructor() {
    this.contacts = [];
    this.interestRequests = [];
    this.storageKey = {
      contacts: 'contactRequests',
      interests: 'interestRequests',
    };
    this.loadFromStorage();
  }

  // Charger les données depuis localStorage (optimisé)
  loadFromStorage() {
    try {
      const contactsData = localStorage.getItem(this.storageKey.contacts);
      if (contactsData) {
        this.contacts = JSON.parse(contactsData);
      }

      const interestData = localStorage.getItem(this.storageKey.interests);
      if (interestData) {
        this.interestRequests = JSON.parse(interestData);
      }
    } catch (error) {
      // Réinitialiser avec des tableaux vides
      this.contacts = [];
      this.interestRequests = [];
    }
  }

  // Sauvegarder les données dans localStorage (optimisé)
  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey.contacts, JSON.stringify(this.contacts));
      localStorage.setItem(this.storageKey.interests, JSON.stringify(this.interestRequests));
    } catch (error) {
      throw new Error('Impossible de sauvegarder les données de contact');
    }
  }

  // Validation des données de formulaire
  validateContactForm(formData) {
    const requiredFields = ['prenom', 'nom', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());

    if (missingFields.length > 0) {
      throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error("Format d'email invalide");
    }

    // Validation téléphone (optionnel mais si fourni)
    if (formData.telephone && !/^[\d\s\+\-\(\)]+$/.test(formData.telephone)) {
      throw new Error('Format de téléphone invalide');
    }

    return true;
  }

  // Validation des données de cours
  validateCourseData(courseData) {
    if (!courseData || !courseData.id) {
      throw new Error('Données de cours invalides');
    }
    return true;
  }

  // Envoyer un message de contact (optimisé)
  async sendContactMessage(formData) {
    try {
      // Validation des données
      this.validateContactForm(formData);

      // Créer l'objet de contact
      const contactRequest = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        ipAddress: '127.0.0.1', // Simulation
        source: 'contact_form',
      };

      // Ajouter à la liste locale
      this.contacts.push(contactRequest);
      this.saveToStorage();

      // Envoyer l'email via EmailJS
      const emailResult = await sendContactEmail(formData);

      if (emailResult.success) {
        // Mettre à jour le statut
        contactRequest.status = 'sent';
        contactRequest.emailSent = true;
        contactRequest.emailSimulated = emailResult.simulated || false;
        this.saveToStorage();

        return {
          success: true,
          message: emailResult.simulated
            ? 'Votre message a été préparé avec succès. (Mode simulation)'
            : 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
          requestId: contactRequest.id,
          simulated: emailResult.simulated,
        };
      } else {
        throw new Error(
          emailResult.error || "Erreur lors de l'envoi du message. Veuillez réessayer."
        );
      }
    } catch (error) {
      throw error;
    }
  }

  // Envoyer une demande d'intérêt pour un cours (optimisé)
  async sendInterestRequest(formData, courseData) {
    try {
      // Validation des données
      this.validateContactForm(formData);
      this.validateCourseData(courseData);

      // Créer l'objet de demande d'intérêt
      const interestRequest = {
        id: Date.now(),
        ...formData,
        course: {
          id: courseData.id,
          language: courseData.language,
          level: courseData.level,
          startTime: courseData.startTime,
          endTime: courseData.endTime,
          date: courseData.date,
          duration: courseData.duration,
          maxStudents: courseData.maxStudents,
          enrolledStudents: courseData.enrolledStudents,
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        ipAddress: '127.0.0.1', // Simulation
        source: 'course_interest',
      };

      // Ajouter à la liste locale
      this.interestRequests.push(interestRequest);
      this.saveToStorage();

      // Envoyer l'email via EmailJS
      const emailResult = await sendInterestEmail(formData, courseData);

      if (emailResult.success) {
        // Mettre à jour le statut
        interestRequest.status = 'sent';
        interestRequest.emailSent = true;
        interestRequest.emailSimulated = emailResult.simulated || false;
        this.saveToStorage();

        return {
          success: true,
          message: emailResult.simulated
            ? "Votre demande d'intérêt a été préparée avec succès. (Mode simulation)"
            : "Votre demande d'intérêt a été envoyée avec succès. Nous vous contacterons bientôt pour confirmer votre inscription.",
          requestId: interestRequest.id,
          simulated: emailResult.simulated,
        };
      } else {
        throw new Error(
          emailResult.error || "Erreur lors de l'envoi de la demande. Veuillez réessayer."
        );
      }
    } catch (error) {
      throw error;
    }
  }

  // Obtenir toutes les demandes de contact (optimisé)
  async getContactRequests() {
    try {
      return {
        success: true,
        data: this.contacts,
        total: this.contacts.length,
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtenir toutes les demandes d'intérêt (optimisé)
  async getInterestRequests() {
    try {
      return {
        success: true,
        data: this.interestRequests,
        total: this.interestRequests.length,
      };
    } catch (error) {
      throw error;
    }
  }

  // Marquer une demande comme traitée (optimisé)
  async markRequestAsProcessed(requestId, requestType = 'contact') {
    try {
      if (requestType === 'contact') {
        const contact = this.contacts.find(c => c.id === requestId);
        if (contact) {
          contact.status = 'processed';
          contact.processedAt = new Date().toISOString();
        } else {
          throw new Error('Demande de contact non trouvée');
        }
      } else if (requestType === 'interest') {
        const interest = this.interestRequests.find(i => i.id === requestId);
        if (interest) {
          interest.status = 'processed';
          interest.processedAt = new Date().toISOString();
        } else {
          throw new Error("Demande d'intérêt non trouvée");
        }
      } else {
        throw new Error('Type de demande invalide');
      }

      this.saveToStorage();

      return {
        success: true,
        message: 'Demande marquée comme traitée',
      };
    } catch (error) {
      throw error;
    }
  }

  // Supprimer une demande (optimisé)
  async deleteRequest(requestId, requestType = 'contact') {
    try {
      if (requestType === 'contact') {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(c => c.id !== requestId);
        if (this.contacts.length === initialLength) {
          throw new Error('Demande de contact non trouvée');
        }
      } else if (requestType === 'interest') {
        const initialLength = this.interestRequests.length;
        this.interestRequests = this.interestRequests.filter(i => i.id !== requestId);
        if (this.interestRequests.length === initialLength) {
          throw new Error("Demande d'intérêt non trouvée");
        }
      } else {
        throw new Error('Type de demande invalide');
      }

      this.saveToStorage();

      return {
        success: true,
        message: 'Demande supprimée avec succès',
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtenir les statistiques des demandes
  async getRequestStats() {
    try {
      const contactStats = {
        total: this.contacts.length,
        pending: this.contacts.filter(c => c.status === 'pending').length,
        processed: this.contacts.filter(c => c.status === 'processed').length,
      };

      const interestStats = {
        total: this.interestRequests.length,
        pending: this.interestRequests.filter(i => i.status === 'pending').length,
        processed: this.interestRequests.filter(i => i.status === 'processed').length,
      };

      return {
        success: true,
        contact: contactStats,
        interest: interestStats,
        total: contactStats.total + interestStats.total,
      };
    } catch (error) {
      throw error;
    }
  }

  // Rechercher dans les demandes (optimisé)
  async searchRequests(query, requestType = 'all') {
    try {
      if (!query || query.trim().length < 2) {
        throw new Error('La recherche doit contenir au moins 2 caractères');
      }

      const searchTerm = query.toLowerCase().trim();
      let results = [];

      if (requestType === 'all' || requestType === 'contact') {
        const contactResults = this.contacts.filter(
          contact =>
            contact.name?.toLowerCase().includes(searchTerm) ||
            contact.email?.toLowerCase().includes(searchTerm) ||
            contact.message?.toLowerCase().includes(searchTerm)
        );
        results.push(...contactResults.map(r => ({ ...r, type: 'contact' })));
      }

      if (requestType === 'all' || requestType === 'interest') {
        const interestResults = this.interestRequests.filter(
          interest =>
            interest.name?.toLowerCase().includes(searchTerm) ||
            interest.email?.toLowerCase().includes(searchTerm) ||
            interest.message?.toLowerCase().includes(searchTerm) ||
            interest.course?.language?.toLowerCase().includes(searchTerm)
        );
        results.push(...interestResults.map(r => ({ ...r, type: 'interest' })));
      }

      return {
        success: true,
        data: results,
        total: results.length,
        query: searchTerm,
        type: requestType,
      };
    } catch (error) {
      throw error;
    }
  }
}

// Instance singleton
const contactService = new ContactService();

export default contactService;
