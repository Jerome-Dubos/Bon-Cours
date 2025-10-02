/**
 * Point d'entrée centralisé pour tous les hooks personnalisés
 * Version 3.0 - Optimisée et simplifiée
 *
 * @version 3.0.0
 * @author Bon Cours Team
 */

// === HOOKS DE PERFORMANCE ===
export { useDebounce, default as useDebounceDefault } from './useDebounce';
export { usePerformance, default as usePerformanceDefault } from './usePerformance';

// === HOOKS DE GESTION D'ERREURS ===
export { useErrorHandler, default as useErrorHandlerDefault } from './useErrorHandler';

// === HOOKS DE SCROLL ===
export { useScrollLock } from './useScrollLock';
export { default as useScrollThreshold } from './useScrollThreshold';

// === HOOKS DE TEXTES ===
export { useTexts, default as useTextsDefault } from './useTexts';
