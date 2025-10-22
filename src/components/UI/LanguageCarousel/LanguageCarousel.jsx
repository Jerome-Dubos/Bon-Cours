import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import './LanguageCarousel.css';

const LanguageCarousel = ({
  languages = [],
  speed = 40,
  direction = 'left',
  className = '',
  onLanguageClick = null,
}) => {
  // Configuration par défaut des langues si aucune n'est fournie
  const defaultLanguages = useMemo(
    () => [
      {
        id: 'french',
        name: 'Français',
        flag: '/assets/images/flags/france.webp',
        alt: 'Drapeau français',
      },
      {
        id: 'english',
        name: 'Anglais',
        flag: '/assets/images/flags/royaume-uni.webp',
        alt: 'Drapeau britannique',
      },
      {
        id: 'german',
        name: 'Allemand',
        flag: '/assets/images/flags/allemagne.webp',
        alt: 'Drapeau allemand',
      },
      {
        id: 'spanish',
        name: 'Espagnol',
        flag: '/assets/images/flags/espagne.webp',
        alt: 'Drapeau espagnol',
      },
      {
        id: 'portuguese',
        name: 'Portugais',
        flag: '/assets/images/flags/le-portugal.webp',
        alt: 'Drapeau portugais',
      },
      {
        id: 'italian',
        name: 'Italien',
        flag: '/assets/images/flags/italie.webp',
        alt: 'Drapeau italien',
      },
      {
        id: 'turkish',
        name: 'Turc',
        flag: '/assets/images/flags/turquie.webp',
        alt: 'Drapeau turc',
      },
      {
        id: 'arabic',
        name: 'Arabe',
        flag: '/assets/images/flags/arabie-saoudite.webp',
        alt: 'Drapeau arabe',
      },
      {
        id: 'persian',
        name: 'Persan',
        flag: '/assets/images/flags/Iran.webp',
        alt: 'Drapeau iranien',
      },
      {
        id: 'chinese',
        name: 'Mandarin',
        flag: '/assets/images/flags/chine.webp',
        alt: 'Drapeau chinois',
      },
      {
        id: 'japanese',
        name: 'Japonais',
        flag: '/assets/images/flags/japon.webp',
        alt: 'Drapeau japonais',
      },
    ],
    []
  );

  const languagesToUse = languages.length > 0 ? languages : defaultLanguages;

  // Dupliquer les langues pour l'effet infini
  const duplicatedLanguages = [...languagesToUse, ...languagesToUse];

  const handleLanguageClick = language => {
    if (onLanguageClick) {
      onLanguageClick(language);
    }
  };

  const carouselStyle = {
    '--carousel-speed': `${speed}s`,
    '--carousel-direction': direction === 'right' ? 'reverse' : 'normal',
  };

  return (
    <div className={`language-carousel ${className}`} style={carouselStyle}>
      <div className='language-carousel__container'>
        <div className='language-carousel__track'>
          {duplicatedLanguages.map((language, index) => (
            <div
              key={`${language.id}-${index}`}
              className='language-carousel__item'
              onClick={() => handleLanguageClick(language)}
              role={onLanguageClick ? 'button' : undefined}
              tabIndex={onLanguageClick ? 0 : undefined}
            >
              <div className={`language-carousel__flag flag-${language.id}`}>
                <img
                  src={language.flag}
                  alt={language.alt || `Drapeau ${language.name}`}
                  loading='lazy'
                />
              </div>
              <span className='language-carousel__name'>{language.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

LanguageCarousel.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  onLanguageClick: PropTypes.func,
};

export default LanguageCarousel;
