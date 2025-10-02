import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../hooks';
import './Contact.css';

const Contact = () => {
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
    startMeasurement('Contact page initialization');

    const timer = setTimeout(() => {
      setIsLoading(false);
      endMeasurement('Contact page initialization');
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
      <div className='contact-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='contact'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='contact-container'>
        <h1>Contact</h1>
        <p>Page en construction...</p>
      </div>
    </motion.div>
  );
};

export default Contact;
