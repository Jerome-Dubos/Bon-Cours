import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaBullseye, FaHandshake, FaLightbulb, FaRocket } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './ApprocheActionnelle.css';

const ApprocheActionnelle = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Approche Actionnelle page initialization', () => {
      // Vérifier s'il y a un paramètre d'onglet dans l'URL pour pré-sélectionner
      const tabParam = searchParams.get('tab');
      if (tabParam) {
        // Logique pour gérer les onglets si nécessaire
        console.log('Tab parameter:', tabParam);
      }
    });

    setIsLoading(false);
  }, [measurePerformance, searchParams]);

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
      <div className='approche-actionnelle-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='approche-actionnelle'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='approche-actionnelle-container'>
        <h1>{t('approche_actionnelle.title')}</h1>

        <div className='approche-content'>
          <motion.div
            className='approche-intro'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className='intro-header'>
              <div className='intro-icon'>
                <FaRocket />
              </div>
              <h2>{t('approche_actionnelle.our_approach')}</h2>
            </div>
            <p>{t('approche_actionnelle.intro')}</p>
          </motion.div>

          <div className='approche-sections'>
            <motion.div
              className='approche-section'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className='section-icon'>
                <FaLightbulb />
              </div>
              <div className='section-content'>
                <h3>{t('approche_actionnelle.concrete.title')}</h3>
                <p>{t('approche_actionnelle.concrete.text')}</p>
              </div>
            </motion.div>

            <motion.div
              className='approche-section'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className='section-icon'>
                <FaHandshake />
              </div>
              <div className='section-content'>
                <h3>{t('approche_actionnelle.activities.title')}</h3>
                <p>{t('approche_actionnelle.activities.text')}</p>
              </div>
            </motion.div>

            <motion.div
              className='approche-section'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className='section-icon'>
                <FaBullseye />
              </div>
              <div className='section-content'>
                <h3>{t('approche_actionnelle.objective.title')}</h3>
                <p>{t('approche_actionnelle.objective.text')}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className='approche-cta'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3>{t('approche_actionnelle.cta.title')}</h3>
            <p>{t('approche_actionnelle.cta.text')}</p>
            <Link to='/contact' className='cta-button'>
              {t('approche_actionnelle.cta.button')}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApprocheActionnelle;
