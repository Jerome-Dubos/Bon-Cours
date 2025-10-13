import React from 'react';
import './Loader.css';
import './LoadingSpinner.css';

const Loader = ({
  size = 'default',
  message = 'Chargement...',
  fullScreen = true,
  className = '',
  variant = 'dots', // Collection complète de variants
  type = 'component', // 'component', 'page', 'image', 'section'
  color = 'default', // Variantes de couleur
}) => {
  const sizeClass = `loader--${size}`;
  const fullScreenClass = fullScreen ? 'loader--fullscreen' : '';
  const variantClass = `loader--${variant}`;
  const colorClass = `loader--${color}`;

  const renderLoader = () => {
    // Loaders avec éléments multiples
    if (variant === 'dots') {
      return (
        <div className={`loader ${variantClass} ${sizeClass} ${colorClass}`}>
          <div className='loader__dot'></div>
          <div className='loader__dot'></div>
          <div className='loader__dot'></div>
        </div>
      );
    }

    if (variant === 'wave') {
      return (
        <div className={`loader ${variantClass} ${sizeClass} ${colorClass}`}>
          <div className='loader__bar'></div>
          <div className='loader__bar'></div>
          <div className='loader__bar'></div>
          <div className='loader__bar'></div>
          <div className='loader__bar'></div>
        </div>
      );
    }

    if (variant === 'bounce') {
      return (
        <div className={`loader-bounce ${sizeClass} ${colorClass}`}>
          <div className='loader-bounce__dot'></div>
          <div className='loader-bounce__dot'></div>
          <div className='loader-bounce__dot'></div>
        </div>
      );
    }

    if (variant === 'squares') {
      return (
        <div className={`loader-squares ${sizeClass} ${colorClass}`}>
          <div className='loader-squares__square'></div>
          <div className='loader-squares__square'></div>
          <div className='loader-squares__square'></div>
        </div>
      );
    }

    if (variant === 'hearts') {
      return (
        <div className={`loader-hearts ${sizeClass} ${colorClass}`}>
          <div className='loader-hearts__heart'></div>
          <div className='loader-hearts__heart'></div>
          <div className='loader-hearts__heart'></div>
        </div>
      );
    }

    if (variant === 'rotating-squares') {
      return (
        <div className={`loader-rotating-squares ${sizeClass} ${colorClass}`}>
          <div className='loader-rotating-squares__square'></div>
          <div className='loader-rotating-squares__square'></div>
          <div className='loader-rotating-squares__square'></div>
          <div className='loader-rotating-squares__square'></div>
        </div>
      );
    }

    if (variant === 'gears') {
      return (
        <div className={`loader-gears ${sizeClass} ${colorClass}`}>
          <div className='loader-gears__gear'></div>
          <div className='loader-gears__gear'></div>
        </div>
      );
    }

    if (variant === 'dna') {
      return (
        <div className={`loader-dna ${sizeClass} ${colorClass}`}>
          <div className='loader-dna__helix'></div>
          <div className='loader-dna__helix'></div>
        </div>
      );
    }

    if (variant === 'orbit') {
      return (
        <div className={`loader-orbit ${sizeClass} ${colorClass}`}>
          <div className='loader-orbit__planet'></div>
          <div className='loader-orbit__planet'></div>
        </div>
      );
    }

    if (variant === 'ripple') {
      return (
        <div className={`loader-ripple ${sizeClass} ${colorClass}`}>
          <div className='loader-ripple__ring'></div>
          <div className='loader-ripple__ring'></div>
        </div>
      );
    }

    if (variant === 'particle') {
      return (
        <div className={`loader-particle ${sizeClass} ${colorClass}`}>
          <div className='loader-particle__dot'></div>
          <div className='loader-particle__dot'></div>
          <div className='loader-particle__dot'></div>
          <div className='loader-particle__dot'></div>
          <div className='loader-particle__dot'></div>
        </div>
      );
    }

    // Loaders simples (pas d'éléments enfants)
    if (variant === 'pulse') {
      return <div className={`loader-pulse ${sizeClass} ${colorClass}`}></div>;
    }

    if (variant === 'morphing') {
      return <div className={`loader-morphing ${sizeClass} ${colorClass}`}></div>;
    }

    if (variant === 'glitch') {
      return <div className={`loader-glitch ${sizeClass} ${colorClass}`}></div>;
    }

    if (variant === 'neon') {
      return <div className={`loader-neon ${sizeClass} ${colorClass}`}></div>;
    }

    if (variant === 'minimalist') {
      return <div className={`loader-minimalist ${sizeClass} ${colorClass}`}></div>;
    }

    // Loaders spécialisés par type
    if (type === 'page') {
      return <div className={`loader-page`}></div>;
    }

    if (type === 'image') {
      return <div className={`loader-image`}></div>;
    }

    if (type === 'section') {
      return (
        <div className={`loader-section-container`}>
          <div className={`loader-section`}></div>
        </div>
      );
    }

    // Loader classique par défaut (spinner)
    return (
      <div className={`loader loader--spinner ${sizeClass}`}>
        <div className='loader__outer'></div>
        <div className='loader__inner'></div>
        <div className='loader__center'></div>
      </div>
    );
  };

  return (
    <div className={`loader-container ${fullScreenClass} ${className}`}>
      {renderLoader()}
      {message && <p className='loader__message'>{message}</p>}
    </div>
  );
};

export default Loader;
