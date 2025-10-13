/**
 * Point d'entrée centralisé pour tous les composants
 * Optimisé pour des imports simples et une meilleure organisation
 * @version 2.0.0
 * @author Bon Cours Team
 */

// === COMPOSANTS DE NAVIGATION ===
export { default as Footer } from './Footer/Footer';
export { default as Navbar } from './Navbar/Navbar';

// === COMPOSANTS HOME ===
export { default as FeaturesSection } from './Home/FeaturesSection';
export { default as HeroSection } from './Home/HeroSection';
export { default as ScheduleSection } from './Home/ScheduleSection';
export { default as TestimonialsSection } from './Home/TestimonialsSection';

// === COMPOSANTS UI ===
export { Loader } from './UI/Loaders';
export { OptimizedImage } from './UI/OptimizedImage';

// === COMPOSANTS BUTTONS ===
export { Button, ButtonLibraries } from './UI/Buttons/src/index';

// === COMPOSANTS FORMS ===
export { ContactForm, LoginForm } from './UI/Forms/src/index';

// === COMPOSANTS MODALES ===
export { Modal, ModalLibraries } from './UI/Modales/src/index';

// === COMPOSANTS NOTIFICATIONS ===
export { Notification, NotificationLibraries } from './UI/Notifications/src/index';

// === COMPOSANTS UTILITAIRES ===
export { default as ScrollToTop } from './utils/ScrollToTop';

// === UTILITAIRES DE TRADUCTION ===
export {
  clearTranslationCache,
  extractTranslationKeys,
  getTranslationCacheStats,
  translateCourse,
  translateCourses,
  translateDataKey,
  translateScheduleData,
  validateTranslationKey,
} from './utils/translationUtils';
