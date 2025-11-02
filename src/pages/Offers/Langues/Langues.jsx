import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import LanguageCarousel from '../../../components/UI/LanguageCarousel';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './Langues.css';

const Langues = () => {
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
        id: 'enfants-ados',
        label: t('nav.submenus.enfants-ados'),
        content: (
          <div className='enfants-ados-content'>
            <p className='intro-text'>{t('langues.enfants_ados.intro')}</p>
            <div className='offers-grid'>
              <div className='offer-card'>
                <h3>{t('langues.enfants_ados.courses.individuels')}</h3>
                <div className='card-content'>
                  <p>{t('langues.common.at_institut')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>40 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('langues.enfants_ados.courses.petits_groupes')}</h3>
                <div className='card-content'>
                  <p>4 {t('langues.common.eleves')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>20 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('langues.enfants_ados.courses.stage_intensif')}</h3>
                <div className='card-content'>
                  <p>4 {t('langues.common.eleves')}</p>
                  <p>{t('langues.common.heures_semaine')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>300 €{t('langues.common.per_stage')}</div>
              </div>
            </div>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                {t('langues.enfants_ados.cta')}
              </Link>
            </div>
          </div>
        ),
        title: t('langues.enfants_ados.title'),
      },
      {
        id: 'adultes',
        label: t('nav.submenus.adultes'),
        content: (
          <div className='adultes-content'>
            <p className='intro-text'>{t('langues.adultes.intro')}</p>
            <div className='offers-grid'>
              <div className='offer-card'>
                <h3>{t('langues.adultes.courses.individuels')}</h3>
                <div className='card-content'>
                  <p>{t('langues.common.at_institut')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>65 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('langues.adultes.courses.petits_groupes')}</h3>
                <div className='card-content'>
                  <p>6 {t('langues.common.apprenants')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>30 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('langues.adultes.courses.ateliers')}</h3>
                <div className='card-content'>
                  <p>6 {t('langues.common.apprenants')}</p>
                  <p>{t('langues.common.heures_par_atelier')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>30 €{t('langues.common.per_atelier')}</div>
              </div>
            </div>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                {t('langues.adultes.cta')}
              </Link>
            </div>
          </div>
        ),
        title: t('langues.adultes.title'),
      },
    ],
    [t]
  );

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('enfants-ados', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Langues page initialization', () => {
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
      <div className='langues-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  // Le hook useTabNavigation gère déjà tout

  return (
    <motion.div
      className='langues'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='langues-container'>
        <h1>{t('langues.title')}</h1>

        {/* Drapeaux des langues - Carousel infini */}
        <LanguageCarousel speed={40} direction='left' className='languages-flags-carousel' />

        {/* Texte "pour" */}
        <div className='languages-for'>
          <h2>{t('langues.pour')}</h2>
        </div>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default Langues;
