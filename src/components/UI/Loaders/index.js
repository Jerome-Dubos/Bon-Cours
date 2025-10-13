// Export principal du composant Loader
export { default as Loader, default } from './src/components/Loader';

// Export des variants disponibles pour l'autocomplétion
export const LOADER_VARIANTS = {
  // Loaders animés
  DOTS: 'dots',
  WAVE: 'wave',
  BOUNCE: 'bounce',
  SQUARES: 'squares',
  HEARTS: 'hearts',
  ROTATING_SQUARES: 'rotating-squares',
  GEARS: 'gears',
  DNA: 'dna',
  ORBIT: 'orbit',
  RIPPLE: 'ripple',
  PARTICLE: 'particle',

  // Loaders simples
  PULSE: 'pulse',
  MORPHING: 'morphing',
  GLITCH: 'glitch',
  NEON: 'neon',
  MINIMALIST: 'minimalist',

  // Loaders spécialisés
  PAGE: 'page',
  IMAGE: 'image',
  SECTION: 'section',
};

// Export des tailles disponibles
export const LOADER_SIZES = {
  SMALL: 'small',
  DEFAULT: 'default',
  LARGE: 'large',
  XLARGE: 'xlarge',
};

// Export des couleurs disponibles
export const LOADER_COLORS = {
  BLUE: 'blue',
  GREEN: 'green',
  ORANGE: 'orange',
  RED: 'red',
  DEFAULT: 'default',
};

// Export des types disponibles
export const LOADER_TYPES = {
  COMPONENT: 'component',
  PAGE: 'page',
  IMAGE: 'image',
  SECTION: 'section',
};
