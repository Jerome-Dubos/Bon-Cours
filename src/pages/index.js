/**
 * Point d'entrée centralisé pour les pages
 * Optimisé pour des imports simples et une meilleure organisation
 */

// === PAGES PRINCIPALES ===
export { default as Error } from './Error/Error';
export { default as Home } from './Home/Home';

// === PAGES CONTENU ===
export { default as Contact } from './Contact/Contact';
export { default as Method } from './Method/Method';
export { default as Offers } from './Offers/Offers';
export { default as QuiSommesNous } from './QuiSommesNous/QuiSommesNous';

// === REEXPORT DES HOOKS ===
export * from '../hooks';
