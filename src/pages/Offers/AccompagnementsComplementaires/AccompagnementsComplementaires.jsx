import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FaBook,
  FaBriefcase,
  FaBullseye,
  FaClipboardList,
  FaCompass,
  FaFileAlt,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { Button } from '../../../components/UI/Buttons';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './AccompagnementsComplementaires.css';

const AccompagnementsComplementaires = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Handler pour navigation vers contact
  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  // Définir les onglets disponibles avec traductions
  const tabs = useMemo(
    () => [
      {
        id: 'administratif',
        label: t('nav.submenus.administratif'),
        content: (
          <div>
            <p>{t('accompagnements_complementaires.administratif.intro')}</p>
            <p>{t('accompagnements_complementaires.administratif.intro2')}</p>

            <div className='tab-section'>
              <h4>
                <FaFileAlt />
                {t('accompagnements_complementaires.administratif.section1_title')}
              </h4>
              <ul>
                <li>{t('accompagnements_complementaires.administratif.section1_item1')}</li>
                <li>{t('accompagnements_complementaires.administratif.section1_item2')}</li>
                <li>{t('accompagnements_complementaires.administratif.section1_item3')}</li>
                <li>{t('accompagnements_complementaires.administratif.section1_item4')}</li>
                <li>{t('accompagnements_complementaires.administratif.section1_item5')}</li>
                <li>{t('accompagnements_complementaires.administratif.section1_item6')}</li>
                <li>{t('accompagnements_complementaires.administratif.section1_item7')}</li>
              </ul>
            </div>

            <div className='tab-section'>
              <h4>
                <FaBriefcase />
                {t('accompagnements_complementaires.administratif.section2_title')}
              </h4>
              <ul>
                <li>{t('accompagnements_complementaires.administratif.section2_item1')}</li>
                <li>{t('accompagnements_complementaires.administratif.section2_item2')}</li>
                <li>{t('accompagnements_complementaires.administratif.section2_item3')}</li>
                <li>{t('accompagnements_complementaires.administratif.section2_item4')}</li>
                <li>{t('accompagnements_complementaires.administratif.section2_item5')}</li>
                <li>{t('accompagnements_complementaires.administratif.section2_item6')}</li>
              </ul>
            </div>

            <div className='tab-section'>
              <h4>
                <FaClipboardList />
                {t('accompagnements_complementaires.administratif.section3_title')}
              </h4>
              <ul>
                <li>{t('accompagnements_complementaires.administratif.section3_item1')}</li>
                <li>{t('accompagnements_complementaires.administratif.section3_item2')}</li>
                <li>{t('accompagnements_complementaires.administratif.section3_item3')}</li>
                <li>{t('accompagnements_complementaires.administratif.section3_item4')}</li>
                <li>{t('accompagnements_complementaires.administratif.section3_item5')}</li>
              </ul>
            </div>

            <div className='cta-container'>
              <p className='cta-text'>{t('accompagnements_complementaires.administratif.cta_text')}</p>
              <Button
                variant='primary'
                size='large'
                onClick={handleContactClick}
                className='cta-button cta-button-large'
              >
                {t('accompagnements_complementaires.administratif.cta')}
              </Button>
            </div>
          </div>
        ),
        title: t('accompagnements_complementaires.administratif.title'),
      },
      {
        id: 'scolarite',
        label: t('nav.submenus.scolarite'),
        content: (
          <div>
            <p>{t('accompagnements_complementaires.scolarite.intro')}</p>
            <p>{t('accompagnements_complementaires.scolarite.intro2')}</p>

            <div className='tab-section'>
              <h4>
                <FaBook />
                {t('accompagnements_complementaires.scolarite.section1_title')}
              </h4>
              <ul>
                <li>{t('accompagnements_complementaires.scolarite.section1_item1')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section1_item2')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section1_item3')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section1_item4')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section1_item5')}</li>
              </ul>
            </div>

            <div className='tab-section'>
              <h4>
                <FaBullseye />
                {t('accompagnements_complementaires.scolarite.section2_title')}
              </h4>
              <ul>
                <li>{t('accompagnements_complementaires.scolarite.section2_item1')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section2_item2')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section2_item3')}</li>
              </ul>
            </div>

            <div className='tab-section'>
              <h4>
                <FaCompass />
                {t('accompagnements_complementaires.scolarite.section3_title')}
              </h4>
              <ul>
                <li>{t('accompagnements_complementaires.scolarite.section3_item1')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section3_item2')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section3_item3')}</li>
                <li>{t('accompagnements_complementaires.scolarite.section3_item4')}</li>
              </ul>
            </div>

            <div className='cta-container'>
              <p className='cta-text'>{t('accompagnements_complementaires.scolarite.cta_text')}</p>
              <Button
                variant='primary'
                size='large'
                onClick={handleContactClick}
                className='cta-button cta-button-large'
              >
                {t('accompagnements_complementaires.scolarite.cta')}
              </Button>
            </div>
          </div>
        ),
        title: t('accompagnements_complementaires.scolarite.title'),
      },
    ],
    [t, handleContactClick]
  );

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('administratif', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Accompagnements Complémentaires page initialization', () => {
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
      <div className='accompagnements-complementaires-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='accompagnements-complementaires'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='accompagnements-complementaires-container'>
        <h1>{t('accompagnements_complementaires.title')}</h1>

        <div className='intro-text'>
          <p className='intro-main-text'>{t('accompagnements_complementaires.intro_main')}</p>
          <p className='intro-subtitle'>{t('accompagnements_complementaires.intro_subtitle')}</p>
          <div className='intro-features'>
            <p>{t('accompagnements_complementaires.intro_written')}</p>
            <p>{t('accompagnements_complementaires.intro_oral')}</p>
            <p>{t('accompagnements_complementaires.intro_presential')}</p>
          </div>
        </div>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default AccompagnementsComplementaires;
