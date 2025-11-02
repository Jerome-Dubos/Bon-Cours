import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Loader } from '../../components/UI';
import { useErrorHandler, usePerformance } from '../../hooks';
import './Method.css';

const Method = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const {
    isLowEndDevice,
    prefersReducedMotion,
    getAnimationConfig,
    startMeasurement,
    endMeasurement,
  } = usePerformance();

  const { handleError } = useErrorHandler();

  // Initialisation de la page
  useEffect(() => {
    startMeasurement('Method page initialization');

    const timer = setTimeout(() => {
      setIsLoading(false);
      endMeasurement('Method page initialization');
    }, 100);

    return () => clearTimeout(timer);
  }, [startMeasurement, endMeasurement]);

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
    const baseConfig = getAnimationConfig();
    return {
      ...baseConfig,
      duration: prefersReducedMotion ? 0.1 : baseConfig.duration,
    };
  }, [getAnimationConfig, prefersReducedMotion]);

  if (isLoading) {
    return (
      <Loader
        size='default'
        variant='rotating-squares'
        color='default'
        message={t('method.loading')}
      />
    );
  }

  return (
    <motion.div
      className='method'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='method-container'>
        <h1>{t('method.title')}</h1>

        <div className='method-content'>
          <div className='method-intro'>
            <p>{t('method.intro')}</p>
          </div>

          <div className='method-concrete'>
            <h2>{t('method.concrete.title')}</h2>
            <p>{t('method.concrete.text')}</p>
          </div>

          <div className='method-activities'>
            <h2>{t('method.activities.title')}</h2>
            <p>{t('method.activities.text')}</p>
          </div>

          <div className='method-objective'>
            <h2>{t('method.objective.title')}</h2>
            <p>{t('method.objective.text')}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Method;
