import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './Test.css';

const Test = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Test page initialization', () => {
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
      <div className='test-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='test'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='test-container'>
        <h1>{t('test.title')}</h1>

        <div className='test-content'>
          <div className='test-section'>
            <p className='test-intro'>{t('test.intro')}</p>
          </div>

          <div className='test-section'>
            <h2>{t('test.expert.title')}</h2>
            <p className='test-intro'>{t('test.expert.intro')}</p>
            <div className='test-info'>
              <ul>
                <li>
                  <strong>{t('test.expert.item1')}</strong>
                </li>
                <li>
                  <strong>{t('test.expert.item2')}</strong>
                </li>
                <li>
                  <strong>{t('test.expert.item3')}</strong>
                </li>
                <li>
                  <strong>{t('test.expert.item4')}</strong>
                </li>
              </ul>
            </div>
            <p className='test-intro'>{t('test.expert.conclusion')}</p>
          </div>

          <div className='test-section'>
            <h2>{t('test.service.title')}</h2>
            <p className='test-intro'>{t('test.service.intro')}</p>
            <div className='test-info'>
              <ul>
                <li>
                  <strong>{t('test.service.item1')}</strong>
                </li>
                <li>
                  <strong>{t('test.service.item2')}</strong>
                </li>
                <li>
                  <strong>{t('test.service.item3')}</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className='test-section'>
            <h2>{t('test.reserve.title')}</h2>
            <div className='test-info'>
              <ul>
                <li>1. {t('test.reserve.item1')}</li>
                <li>2. {t('test.reserve.item2')}</li>
                <li>3. {t('test.reserve.item3')}</li>
              </ul>
            </div>
            <p className='test-intro'>{t('test.reserve.conclusion')}</p>

            <div className='test-cta-main'>
              <Link to='/contact' className='contact-button'>
                {t('test.reserve.button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Test;
