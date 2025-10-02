/**
 * Point d'entrée centralisé pour toute l'application
 * Optimisé pour des imports simples et une meilleure organisation
 */

// === PAGES ===
export * from './pages';

// === COMPOSANTS ===
export * from './components';

// === SERVICES ===
export * from './services';

// === HOOKS ===
export * from './hooks';

// === CONTEXT ===
export { AuthProvider } from './context/AuthContext';

// === UTILITAIRES ===
export { default as ScrollToTop } from './components/utils/ScrollToTop';
