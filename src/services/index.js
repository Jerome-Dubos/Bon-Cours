/**
 * Point d'entrée centralisé pour tous les services
 * Optimisé pour des imports simples et une meilleure organisation
 */

// === SERVICES PRINCIPAUX ===
export { default as apiService } from './apiService';
export { default as contactService } from './contactService';

// === SERVICES EMAIL ===
export {
  cleanOldEmailRecords,
  getEmailStats,
  initializeEmailJS,
  sendContactMessage,
  sendInterestRequest,
  sendInaugurationRegistration,
} from './contactEmailService';
