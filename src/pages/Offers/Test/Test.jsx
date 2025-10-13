import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './Test.css';

const Test = () => {
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
        <h1>Passez votre test de niveau</h1>

        <div className='test-content'>
          <div className='test-section'>
            <h2>Évaluation de votre niveau</h2>
            <p className='test-intro'>
              Contactez-nous pour demander un rendez-vous avec l'un.e de nos formateurs pour
              déterminer votre niveau et vos besoins.
            </p>

            <div className='test-cta-main'>
              <Link to='/contact' className='contact-button'>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Test;
