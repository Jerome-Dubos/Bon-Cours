import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/UI/Buttons';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './Horaires.css';

const Horaires = () => {
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

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Horaires page initialization', () => {
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
      <div className='horaires-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='horaires'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='horaires-container'>
        <h1>{t('horaires.title')}</h1>

        <div className='horaires-content'>
          <p className='horaires-intro'>{t('horaires.intro')}</p>

          <p className='horaires-flexibility'>{t('horaires.flexibility')}</p>

          <div className='horaires-features'>
            <p>{t('horaires.features.p1')}</p>
            <p>{t('horaires.features.p2')}</p>
          </div>

          <div className='horaires-practice'>
            <h2>
              <FaCheck />
              {t('horaires.practice.title')}
            </h2>
            <ul>
              <li>{t('horaires.practice.item1')}</li>
              <li>{t('horaires.practice.item2')}</li>
              <li>{t('horaires.practice.item3')}</li>
              <li>{t('horaires.practice.item4')}</li>
            </ul>
          </div>

          <div className='horaires-cta'>
            <p>{t('horaires.cta.text')}</p>
            <Button
              variant='primary'
              size='large'
              onClick={handleContactClick}
              className='horaires-cta-button'
            >
              {t('horaires.cta.button')}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Horaires;
