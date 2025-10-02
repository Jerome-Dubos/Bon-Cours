import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { useTranslation } from 'react-i18next'; // Désactivé pour utiliser les textes en dur
import { FaBook, FaBullseye, FaGlobe, FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../UI/Buttons';
import './FeaturesSection.css';

const FeaturesSection = () => {
  // const { t } = useTranslation(); // Désactivé pour utiliser les textes en dur
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const languages = useMemo(
    () => [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'Anglais', flag: '🇬🇧' },
      { code: 'de', name: 'Allemand', flag: '🇩🇪' },
      { code: 'es', name: 'Espagnol', flag: '🇪🇸' },
      { code: 'tr', name: 'Turc', flag: '🇹🇷' },
      { code: 'ar', name: 'Arabe', flag: '🇸🇦' },
      { code: 'other', name: 'Autres langues', icon: <FaGlobe /> },
      { code: 'school', name: 'Soutien scolaire', icon: <FaGraduationCap /> },
    ],
    []
  );

  const handleLanguageClick = useCallback(
    languageCode => {
      if (languageCode === 'school') {
        // Naviguer vers l'onglet enfants
        navigate('/courses');
        // Optionnel: ajouter un paramètre URL pour ouvrir directement l'onglet enfants
        setTimeout(() => {
          const childrenButton = document.querySelector('[data-filter="child"]');
          if (childrenButton) {
            childrenButton.click();
          }
        }, 100);
      } else {
        navigate('/courses');
      }
    },
    [navigate]
  );

  const handleTestClick = useCallback(() => {
    navigate('/test');
  }, [navigate]);

  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  const renderLanguageIcons = useCallback(
    (suffix = '') => {
      return languages.map(language => (
        <button
          key={`${language.code}${suffix}`}
          className='language-icon'
          onClick={() => handleLanguageClick(language.code)}
          title={language.name}
          type='button'
        >
          {language.flag || language.icon}
        </button>
      ));
    },
    [languages, handleLanguageClick]
  );

  return (
    <section className='features-section'>
      <div className='features-container'>
        {/* Section Langues */}
        <div className='language-section'>
          <div className='section-header'>
            <h2 className='section-title'>Choisissez votre langue</h2>
            <p className='section-subtitle'>
              Découvrez nos cours de langues adaptés à tous les niveaux
            </p>
          </div>

          <div className='languages-grid'>
            {isMobile ? (
              <div className='languages-scroll-container'>
                {renderLanguageIcons('-1')}
                {renderLanguageIcons('-2')}
              </div>
            ) : (
              renderLanguageIcons()
            )}
          </div>
        </div>

        {/* Section École */}
        <div className='school-section'>
          <div className='section-header'>
            <div className='school-icon'>
              <FaGraduationCap />
            </div>
            <h2 className='section-title'>Soutien scolaire</h2>
            <p className='section-subtitle'>Accompagnement personnalisé pour réussir vos études</p>
          </div>

          <div className='school-content'>
            <div className='school-features'>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaBook />
                </div>
                <h3>Matières principales</h3>
                <p>Mathématiques, Français, Histoire-Géo, Sciences</p>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaBullseye />
                </div>
                <h3>Objectifs personnalisés</h3>
                <p>Programmes adaptés à votre niveau et vos objectifs</p>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaTrophy />
                </div>
                <h3>Professeurs qualifiés</h3>
                <p>Équipe pédagogique expérimentée et bienveillante</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Actions */}
        <div className='actions-section'>
          <div className='actions-container'>
            <PrimaryButton
              size='large'
              onClick={handleTestClick}
              className='action-button test-button'
            >
              Testez votre niveau
            </PrimaryButton>

            <PrimaryButton
              size='large'
              onClick={handleContactClick}
              className='action-button test-button'
            >
              Être contacté
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
