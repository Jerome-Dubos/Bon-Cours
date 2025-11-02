import React, { useCallback, useEffect, useState } from 'react';
import { FaBook, FaBullseye, FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../UI/Buttons';
import LanguageCarousel from '../UI/LanguageCarousel';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const { t } = useTranslation();
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

  const handleLanguageClick = useCallback(
    language => {
      // Navigation vers la page des cours avec la langue sélectionnée
      navigate(`/offres/langues?langue=${language.id}`);
    },
    [navigate]
  );

  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  return (
    <section className='features-section'>
      <div className='features-container'>
        {/* Section Langues */}
        <div className='language-section'>
          <div className='section-header'>
            <h2 className='section-title'>{t('home.features.languages.title')}</h2>
            <p className='section-subtitle'>
              {t('home.features.languages.subtitle')}
            </p>
          </div>

          <LanguageCarousel
            speed={isMobile ? 30 : 40}
            direction='left'
            onLanguageClick={handleLanguageClick}
            className='features-language-carousel'
          />
        </div>

        {/* Section École */}
        <div className='school-section'>
          <div className='section-header'>
            <div className='school-icon'>
              <FaGraduationCap />
            </div>
            <h2 className='section-title'>{t('home.features.school.title')}</h2>
            <p className='section-subtitle'>
              {t('home.features.school.subtitle')}
            </p>
          </div>

          <div className='school-content'>
            <div className='school-features'>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaBook />
                </div>
                <h3>{t('home.features.school.subjects.title')}</h3>
                <p>{t('home.features.school.subjects.description')}</p>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaBullseye />
                </div>
                <h3>{t('home.features.school.objectives.title')}</h3>
                <p>{t('home.features.school.objectives.description')}</p>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaTrophy />
                </div>
                <h3>{t('home.features.school.teachers.title')}</h3>
                <p>{t('home.features.school.teachers.description')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Actions */}
        <div className='actions-section'>
          <div className='actions-container'>
            <PrimaryButton
              size='large'
              onClick={handleContactClick}
              className='action-button contact-button'
            >
              {t('home.features.actions.contact')}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
