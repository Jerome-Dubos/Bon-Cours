import React, { useCallback, useEffect, useState } from 'react';
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
            <h2 className='section-title'>Choisissez votre langue</h2>
            <p className='section-subtitle'>
              Découvrez nos cours de langues adaptés à tous les niveaux
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
            <h2 className='section-title'>Soutien scolaire</h2>
            <p className='section-subtitle'>
              Accompagnement personnalisé pour atteindre vos objectifs
            </p>
          </div>

          <div className='school-content'>
            <div className='school-features'>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaBook />
                </div>
                <h3>Pour tous les niveaux</h3>
                <p>Primaire, Collège, Lycée</p>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaBullseye />
                </div>
                <h3>Diagnostic offert</h3>
                <p>Pour optimiser votre progression</p>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>
                  <FaTrophy />
                </div>
                <h3>Équipe experte</h3>
                <p>Intervenants pédagogues et bienveillants</p>
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
              Contactez-nous
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
