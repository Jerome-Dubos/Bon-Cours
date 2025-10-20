import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaBook, FaBullseye, FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../UI/Buttons';
import LanguageCarousel from '../UI/LanguageCarousel';
import './FeaturesSection.css';

const FeaturesSection = () => {
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

  // Configuration des langues pour le carousel
  const languages = useMemo(
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
    ],
    []
  );

  const handleLanguageClick = useCallback(
    language => {
      // Navigation vers la page des cours avec la langue sélectionnée
      navigate(`/offres/langues?langue=${language.id}`);
    },
    [navigate]
  );

  const handleTestClick = useCallback(() => {
    navigate('/test');
  }, [navigate]);

  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

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

          <LanguageCarousel
            languages={languages}
            speed={isMobile ? 30 : 40}
            direction='left'
            pauseOnHover={true}
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
              className='action-button contact-button'
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
