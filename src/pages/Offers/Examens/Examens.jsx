import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaBullseye, FaClock, FaUserGraduate, FaUsers } from 'react-icons/fa';
import { IoGlobeOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './Examens.css';

const Examens = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Définir les onglets disponibles avec traductions
  const tabs = useMemo(
    () => [
      {
        id: 'certifications',
        label: t('nav.submenus.certifications'),
        content: (
          <div className='certifications-content'>
            <p className='certifications-intro'>{t('examens.certifications.intro')}</p>

            <p className='certifications-methods'>{t('examens.certifications.methods')}</p>

            <ul className='certifications-list'>
              <li>{t('examens.certifications.item1')}</li>
              <li>{t('examens.certifications.item2')}</li>
              <li>{t('examens.certifications.item3')}</li>
            </ul>

            <div className='certifications-note'>
              <p>
                <strong>{t('examens.certifications.note')}</strong>{' '}
                {t('examens.certifications.note_text')}
              </p>
            </div>

            <div className='certifications-cta'>
              <p>{t('examens.certifications.cta')}</p>
              <Link to='/contact' className='cta-button'>
                {t('examens.certifications.button')}
              </Link>
            </div>

            <div className='certifications-exams'>
              <h3>{t('examens.certifications.section_title')}</h3>

              <div className='certifications-grid'>
                {/* Français */}
                <div className='certification-card'>
                  <div className='certification-header'>
                    <div className='certification-flag'>
                      <img src='/assets/images/flags/france.webp' alt={t('carousel.flags.french')} />
                    </div>
                    <h4>{t('languages.french')}</h4>
                  </div>
                  <div className='certification-list'>
                    <div className='certification-item'>
                      <span className='certification-name'>DELF / DALF</span>
                      <span className='certification-desc'>
                        Diplôme d'Études / Approfondi de Langue Française
                      </span>
                    </div>
                    <div className='certification-item'>
                      <span className='certification-name'>TCF</span>
                      <span className='certification-desc'>Test de Connaissance du Français</span>
                    </div>
                    <div className='certification-item'>
                      <span className='certification-name'>TEF</span>
                      <span className='certification-desc'>Test d'Évaluation de Français</span>
                    </div>
                  </div>
                </div>

                {/* Anglais */}
                <div className='certification-card'>
                  <div className='certification-header'>
                    <div className='certification-flag'>
                      <img src='/assets/images/flags/royaume-uni.webp' alt={t('carousel.flags.english')} />
                    </div>
                    <h4>{t('languages.english')}</h4>
                  </div>
                  <div className='certification-list'>
                    <div className='certification-item'>
                      <span className='certification-name'>TOEIC</span>
                      <span className='certification-desc'>
                        Test of English for International Communication
                      </span>
                    </div>
                    <div className='certification-item'>
                      <span className='certification-name'>TOEFL</span>
                      <span className='certification-desc'>
                        Test of English as a Foreign Language
                      </span>
                    </div>
                    <div className='certification-item'>
                      <span className='certification-name'>IELTS</span>
                      <span className='certification-desc'>
                        International English Language Testing System
                      </span>
                    </div>
                    <div className='certification-item'>
                      <span className='certification-name'>Cambridge English</span>
                      <span className='certification-desc'>First, Advanced, Proficiency</span>
                    </div>
                  </div>
                </div>

                {/* Autres langues */}
                <div className='certification-card'>
                  <div className='certification-header'>
                    <div className='certification-flag'>
                      <IoGlobeOutline size={32} />
                    </div>
                    <h4>Autres langues</h4>
                  </div>
                  <div className='certification-list'>
                    <div className='certification-item'>
                      <span className='certification-name'>Goethe-Zertifikat</span>
                      <span className='certification-desc'>{t('languages.german')}</span>
                    </div>
                    <div className='certification-item'>
                      <span className='certification-name'>DELE</span>
                      <span className='certification-desc'>{t('languages.spanish')}</span>
                    </div>
                    <div className='certification-item'>
                      <span className='certification-name'>PLIDA / CILS</span>
                      <span className='certification-desc'>{t('languages.italian')}</span>
                    </div>
                    <div className='certification-item'>
                      <span className='certification-name'>HSK</span>
                      <span className='certification-desc'>{t('languages.chinese')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        title: t('examens.certifications.title'),
      },
      {
        id: 'naturalisation',
        label: t('nav.submenus.naturalisation'),
        content: (
          <div className='naturalisation-content'>
            <div className='naturalisation-intro'>
              <h3>{t('examens.naturalisation.intro_title')}</h3>
              <p>{t('examens.naturalisation.intro')}</p>
            </div>

            <div className='naturalisation-accompaniment'>
              <h4>{t('examens.naturalisation.accompaniment_title')}</h4>
              <p>{t('examens.naturalisation.accompaniment')}</p>
              <ul className='naturalisation-points'>
                <li>
                  <strong>{t('examens.naturalisation.item1')}</strong>{' '}
                  {t('examens.naturalisation.item1_text')}
                </li>
                <li>
                  <strong>{t('examens.naturalisation.item2')}</strong>{' '}
                  {t('examens.naturalisation.item2_text')}
                </li>
                <li>
                  <strong>{t('examens.naturalisation.item3')}</strong>{' '}
                  {t('examens.naturalisation.item3_text')}
                </li>
              </ul>
            </div>

            <div className='naturalisation-target'>
              <h4>{t('examens.naturalisation.target_title')}</h4>
              <p>{t('examens.naturalisation.target')}</p>
            </div>

            <div className='naturalisation-formula'>
              <h4>{t('examens.naturalisation.formula_title')}</h4>
              <div className='formula-features'>
                <div className='formula-item'>
                  <FaUserGraduate className='formula-icon' />
                  <span>{t('examens.naturalisation.formula1')}</span>
                </div>
                <div className='formula-item'>
                  <FaUsers className='formula-icon' />
                  <span>{t('examens.naturalisation.formula2')}</span>
                </div>
                <div className='formula-item'>
                  <FaClock className='formula-icon' />
                  <span>{t('examens.naturalisation.formula3')}</span>
                </div>
                <div className='formula-item'>
                  <FaBullseye className='formula-icon' />
                  <span>{t('examens.naturalisation.formula4')}</span>
                </div>
              </div>
            </div>

            <div className='naturalisation-cta'>
              <p>{t('examens.naturalisation.cta')}</p>
              <Link to='/contact' className='cta-button'>
                {t('examens.naturalisation.button')}
              </Link>
            </div>
          </div>
        ),
        title: t('examens.naturalisation.title'),
      },
    ],
    [t]
  );

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('certifications', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Examens page initialization', () => {
      // Initialisation simple
    });

    setIsLoading(false);
  }, [measurePerformance]);

  // Animations optimisées
  const pageVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    }),
    []
  );

  const pageTransition = useMemo(() => {
    return {
      ...animationConfig,
      duration: prefersReducedMotion ? 0.1 : animationConfig.duration,
    };
  }, [animationConfig, prefersReducedMotion]);

  if (isLoading) {
    return (
      <div className='examens-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='examens'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='examens-container'>
        <h1>{t('examens.title')}</h1>

        <p className='intro-text'>{t('examens.intro')}</p>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default Examens;
