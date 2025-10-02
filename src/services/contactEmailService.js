// Service d'envoi d'emails optimisé pour le formulaire de contact avec EmailJS
import emailjs from '@emailjs/browser';
import {
  EMAILJS_CONFIG,
  isEmailJSConfigured,
  showConfigurationInstructions,
} from '../config/emailConfig';

// Configuration des templates
const EMAIL_TEMPLATES = {
  CONTACT: EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
  INTEREST: EMAILJS_CONFIG.TEMPLATE_ID_CONTACT, // Même template, données différentes
};

// Configuration des délais
const EMAIL_DELAYS = {
  SIMULATION: 2000,
  RETRY: 1000,
  MAX_RETRIES: 3,
};

/**
 * Envoie un email via EmailJS avec retry et gestion d'erreurs optimisée
 */
const sendEmailViaEmailJS = async (templateId, templateParams, retryCount = 0) => {
  try {
    // Vérifier si EmailJS est configuré
    if (!isEmailJSConfigured()) {
      console.warn('⚠️ EmailJS non configuré - Mode simulation activé');
      showConfigurationInstructions();

      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, EMAIL_DELAYS.SIMULATION));

      // Créer un faux email pour le test
      const fakeEmail = {
        to: EMAILJS_CONFIG.CONTACT_EMAIL,
        from: templateParams.user_email,
        subject: `Nouveau message de contact - ${templateParams.user_name}`,
        content: templateParams.user_message,
        timestamp: new Date().toISOString(),
      };

      console.log('📨 Email de contact simulé créé:', fakeEmail);

      return {
        success: true,
        data: { status: 'simulated', email: fakeEmail },
        simulated: true,
      };
    }

    // Envoi réel via EmailJS avec retry
    console.log(`📤 Envoi réel via EmailJS... (tentative ${retryCount + 1})`);
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      templateId,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('✅ Email de contact envoyé avec succès:', response);
    return { success: true, data: response, simulated: false };
  } catch (error) {
    console.error(`❌ Erreur EmailJS (tentative ${retryCount + 1}):`, error);

    // Retry pour les erreurs réseau
    if (retryCount < EMAIL_DELAYS.MAX_RETRIES && isRetryableError(error)) {
      console.warn(`🔄 Retry dans ${EMAIL_DELAYS.RETRY}ms...`);
      await new Promise(resolve => setTimeout(resolve, EMAIL_DELAYS.RETRY));
      return sendEmailViaEmailJS(templateId, templateParams, retryCount + 1);
    }

    return {
      success: false,
      error: error.message,
      retryCount: retryCount + 1,
    };
  }
};

/**
 * Vérifie si une erreur est récupérable
 */
const isRetryableError = error => {
  const retryableErrors = [
    'Network Error',
    'Failed to fetch',
    'timeout',
    'ECONNRESET',
    'ENOTFOUND',
  ];

  return retryableErrors.some(retryableError =>
    error.message.toLowerCase().includes(retryableError.toLowerCase())
  );
};

/**
 * Envoie un message de contact (optimisé)
 */
export const sendContactMessage = async formData => {
  try {
    console.log('📧 Préparation email de contact...');

    // Validation des données
    if (!formData.prenom || !formData.nom || !formData.email || !formData.message) {
      throw new Error('Données de formulaire incomplètes');
    }

    // Préparer les données pour le template
    const templateParams = {
      to_email: EMAILJS_CONFIG.CONTACT_EMAIL,
      user_name: `${formData.prenom} ${formData.nom}`,
      user_email: formData.email,
      user_phone: formData.telephone || 'Non renseigné',
      user_message: formData.message,
      preference_contact: formData.preferenceContact || 'Non spécifié',
      jours_preferes: formData.jours?.length > 0 ? formData.jours.join(', ') : 'Non spécifié',
      horaires_preferes:
        formData.horaires?.length > 0 ? formData.horaires.join(', ') : 'Non spécifié',
      contact_date: new Date().toLocaleString('fr-FR'),
      school_name: EMAILJS_CONFIG.SCHOOL_NAME,
    };

    console.log('📨 Paramètres email de contact:', templateParams);

    const result = await sendEmailViaEmailJS(EMAIL_TEMPLATES.CONTACT, templateParams);

    // Enregistrer dans localStorage pour le suivi
    if (result.success) {
      const emailRecord = {
        id: Date.now(),
        to: EMAILJS_CONFIG.CONTACT_EMAIL,
        from: formData.email,
        type: 'contact_message',
        timestamp: new Date().toISOString(),
        status: 'sent',
        template: 'contact_message',
        simulated: result.simulated || false,
        user_name: `${formData.prenom} ${formData.nom}`,
        retryCount: result.retryCount || 0,
      };

      saveEmailRecord(emailRecord);
      console.log('💾 Email de contact enregistré dans localStorage');
    }

    return result;
  } catch (error) {
    console.error("💥 Erreur lors de l'envoi du message de contact:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Fonction utilitaire pour sauvegarder un enregistrement d'email
 */
const saveEmailRecord = emailRecord => {
  try {
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    sentEmails.push(emailRecord);
    localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'enregistrement email:", error);
  }
};

/**
 * Envoie une demande d'intérêt pour un cours (optimisé)
 */
export const sendInterestRequest = async (formData, courseData) => {
  try {
    console.log("📧 Préparation email d'intérêt...");

    // Validation des données
    if (!formData.prenom || !formData.nom || !formData.email || !formData.message) {
      throw new Error('Données de formulaire incomplètes');
    }

    if (!courseData || !courseData.id) {
      throw new Error('Données de cours invalides');
    }

    const templateParams = {
      to_email: EMAILJS_CONFIG.CONTACT_EMAIL,
      user_name: `${formData.prenom} ${formData.nom}`,
      user_email: formData.email,
      user_phone: formData.telephone || 'Non renseigné',
      user_message: formData.message,
      course_language: courseData.language || 'Non spécifié',
      course_level: courseData.level || 'Non spécifié',
      course_name: courseData.name || 'Non spécifié',
      preference_contact: formData.preferenceContact || 'Non spécifié',
      jours_preferes: formData.jours?.length > 0 ? formData.jours.join(', ') : 'Non spécifié',
      horaires_preferes:
        formData.horaires?.length > 0 ? formData.horaires.join(', ') : 'Non spécifié',
      contact_date: new Date().toLocaleString('fr-FR'),
      school_name: EMAILJS_CONFIG.SCHOOL_NAME,
    };

    console.log("📨 Paramètres email d'intérêt:", templateParams);

    const result = await sendEmailViaEmailJS(EMAIL_TEMPLATES.INTEREST, templateParams);

    // Enregistrer dans localStorage pour le suivi
    if (result.success) {
      const emailRecord = {
        id: Date.now(),
        to: EMAILJS_CONFIG.CONTACT_EMAIL,
        from: formData.email,
        type: 'interest_request',
        timestamp: new Date().toISOString(),
        status: 'sent',
        template: 'interest_request',
        simulated: result.simulated || false,
        user_name: `${formData.prenom} ${formData.nom}`,
        course: courseData,
        retryCount: result.retryCount || 0,
      };

      saveEmailRecord(emailRecord);
      console.log("💾 Email d'intérêt enregistré dans localStorage");
    }

    return result;
  } catch (error) {
    console.error("💥 Erreur lors de l'envoi de la demande d'intérêt:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Initialise EmailJS (optimisé)
 */
export const initializeEmailJS = () => {
  if (isEmailJSConfigured()) {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS initialisé avec la clé publique');
      return true;
    } catch (error) {
      console.error("❌ Erreur lors de l'initialisation d'EmailJS:", error);
      return false;
    }
  } else {
    console.warn('⚠️ EmailJS non configuré - Mode simulation');
    return false;
  }
};

/**
 * Obtient les statistiques des emails envoyés
 */
export const getEmailStats = () => {
  try {
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    const stats = {
      total: sentEmails.length,
      contact: sentEmails.filter(e => e.type === 'contact_message').length,
      interest: sentEmails.filter(e => e.type === 'interest_request').length,
      simulated: sentEmails.filter(e => e.simulated).length,
      real: sentEmails.filter(e => !e.simulated).length,
      lastSent: sentEmails.length > 0 ? sentEmails[sentEmails.length - 1].timestamp : null,
    };
    return stats;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques email:', error);
    return { total: 0, contact: 0, interest: 0, simulated: 0, real: 0, lastSent: null };
  }
};

/**
 * Nettoie les anciens enregistrements d'emails (plus de 30 jours)
 */
export const cleanOldEmailRecords = () => {
  try {
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const filteredEmails = sentEmails.filter(email => {
      const emailDate = new Date(email.timestamp);
      return emailDate > thirtyDaysAgo;
    });

    if (filteredEmails.length !== sentEmails.length) {
      localStorage.setItem('sentEmails', JSON.stringify(filteredEmails));
      console.log(
        `${sentEmails.length - filteredEmails.length} anciens enregistrements d'emails supprimés`
      );
    }

    return filteredEmails.length;
  } catch (error) {
    console.error('Erreur lors du nettoyage des enregistrements email:', error);
    return 0;
  }
};
