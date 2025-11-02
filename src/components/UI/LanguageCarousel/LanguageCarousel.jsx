import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './LanguageCarousel.css';

const LanguageCarousel = ({
  languages = [],
  speed = 40,
  direction = 'left',
  className = '',
  onLanguageClick = null,
}) => {
  const { t } = useTranslation();

  // Configuration par défaut des langues si aucune n'est fournie
  const defaultLanguages = useMemo(
    () => [
      {
        id: 'french',
        name: t('languages.french'),
        flag: '/assets/images/flags/france.webp',
        alt: t('carousel.flags.french'),
      },
      {
        id: 'english',
        name: t('languages.english'),
        flag: '/assets/images/flags/royaume-uni.webp',
        alt: t('carousel.flags.english'),
      },
      {
        id: 'german',
        name: t('languages.german'),
        flag: '/assets/images/flags/allemagne.webp',
        alt: t('carousel.flags.german'),
      },
      {
        id: 'spanish',
        name: t('languages.spanish'),
        flag: '/assets/images/flags/espagne.webp',
        alt: t('carousel.flags.spanish'),
      },
      {
        id: 'portuguese',
        name: t('languages.portuguese'),
        flag: '/assets/images/flags/le-portugal.webp',
        alt: t('carousel.flags.portuguese'),
      },
      {
        id: 'italian',
        name: t('languages.italian'),
        flag: '/assets/images/flags/italie.webp',
        alt: t('carousel.flags.italian'),
      },
      {
        id: 'turkish',
        name: t('languages.turkish'),
        flag: '/assets/images/flags/turquie.webp',
        alt: t('carousel.flags.turkish'),
      },
      {
        id: 'russian',
        name: t('languages.russian'),
        flag: '/assets/images/flags/russie.webp',
        alt: t('carousel.flags.russian'),
      },
      {
        id: 'persian',
        name: t('languages.persian'),
        flag: '/assets/images/flags/Iran.webp',
        alt: t('carousel.flags.persian'),
      },
      {
        id: 'chinese',
        name: t('languages.chinese'),
        flag: '/assets/images/flags/chine.webp',
        alt: t('carousel.flags.chinese'),
      },
      {
        id: 'japanese',
        name: t('languages.japanese'),
        flag: '/assets/images/flags/japon.webp',
        alt: t('carousel.flags.japanese'),
      },
    ],
    [t]
  );

  const languagesToUse = languages.length > 0 ? languages : defaultLanguages;
  const navigate = useNavigate();

  // Dupliquer les langues pour l'effet infini
  const duplicatedLanguages = [...languagesToUse, ...languagesToUse];

  const handleLanguageClick = language => {
    // Si un callback est fourni, le laisser gérer la navigation
    if (onLanguageClick) {
      onLanguageClick(language);
    } else {
      // Sinon, rediriger vers la page des langues sans paramètre
      navigate('/offres/langues', { replace: true });
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
