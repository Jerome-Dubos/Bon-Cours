import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './TestsNiveau.css';

const TestsNiveau = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Tests de Niveau page initialization', () => {
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
      <div className='tests-niveau-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='tests-niveau'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='tests-niveau-container'>
        <h1>Passez votre test de niveau</h1>

        <div className='tests-niveau-content'>
          <div className='tests-niveau-section'>
            <h2>Évaluation de votre niveau</h2>
            <p className='tests-niveau-intro'>
              Contactez-nous pour demander un rendez-vous avec l'un.e de nos formateurs pour
              déterminer votre niveau et vos besoins.
            </p>

            <div className='tests-niveau-cta-main'>
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

export default TestsNiveau;
