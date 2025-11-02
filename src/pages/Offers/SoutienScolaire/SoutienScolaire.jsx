import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './SoutienScolaire.css';

const SoutienScolaire = () => {
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
        id: 'primaire',
        label: t('nav.submenus.primaire'),
        content: (
          <div className='primaire-content'>
            <div className='offers-grid'>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.individuels')}</h3>
                <div className='card-content'>
                  <p>{t('langues.common.at_institut')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>40 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.petits_groupes')}</h3>
                <div className='card-content'>
                  <p>4 {t('langues.common.eleves')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>20 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.stage_intensif')}</h3>
                <div className='card-content'>
                  <p>4 {t('langues.common.eleves')}</p>
                  <p>{t('langues.common.heures_semaine')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>200 €{t('langues.common.per_stage')}</div>
              </div>
            </div>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                {t('soutien_scolaire.primaire.cta')}
              </Link>
            </div>
          </div>
        ),
        title: t('soutien_scolaire.primaire.title'),
      },
      {
        id: 'college',
        label: t('nav.submenus.college'),
        content: (
          <div className='college-content'>
            <div className='offers-grid'>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.individuels')}</h3>
                <div className='card-content'>
                  <p>{t('langues.common.at_institut')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>50 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.petits_groupes')}</h3>
                <div className='card-content'>
                  <p>4 {t('langues.common.eleves')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>25 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.stage_intensif')}</h3>
                <div className='card-content'>
                  <p>4 {t('langues.common.eleves')}</p>
                  <p>{t('langues.common.heures_semaine')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>250 €{t('langues.common.per_stage')}</div>
              </div>
            </div>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                {t('soutien_scolaire.college.cta')}
              </Link>
            </div>
          </div>
        ),
        title: (
          <>
            <span>{t('soutien_scolaire.college.title')}</span>
            <span className='partnership-badge'>
              {t('soutien_scolaire.college.partnership')}{' '}
              <a href='https://www.parcours-homere.fr' target='_blank' rel='noopener noreferrer'>
                Parcours Homère
              </a>
            </span>
          </>
        ),
      },
      {
        id: 'lycee',
        label: t('nav.submenus.lycee'),
        content: (
          <div className='lycee-content'>
            <div className='offers-grid'>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.individuels')}</h3>
                <div className='card-content'>
                  <p>{t('langues.common.at_institut')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>60 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.petits_groupes')}</h3>
                <div className='card-content'>
                  <p>4 {t('langues.common.eleves')}</p>
                  <p>{t('langues.common.horaire_duree')}</p>
                  <p>{t('langues.common.tous_niveaux')}</p>
                </div>
                <div className='price'>30 €{t('langues.common.per_hour')}</div>
              </div>
              <div className='offer-card'>
                <h3>{t('soutien_scolaire.courses.stage_intensif')}</h3>
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
                {t('soutien_scolaire.lycee.cta')}
              </Link>
            </div>
          </div>
        ),
        title: (
          <>
            <span>{t('soutien_scolaire.lycee.title')}</span>
            <span className='partnership-badge'>
              {t('soutien_scolaire.lycee.partnership')}{' '}
              <a href='https://www.parcours-homere.fr' target='_blank' rel='noopener noreferrer'>
                Parcours Homère
              </a>
            </span>
          </>
        ),
      },
    ],
    [t]
  );

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('primaire', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Soutien Scolaire page initialization', () => {
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
      <div className='soutien-scolaire-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='soutien-scolaire'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='soutien-scolaire-container'>
        <h1>{t('soutien_scolaire.title')}</h1>

        <p className='intro-text'>
          {t('soutien_scolaire.intro')}{' '}
          <span className='text-peach font-bold'>{t('soutien_scolaire.tax_credit')}</span>
          {t('soutien_scolaire.tax_credit_end')}
        </p>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default SoutienScolaire;
