import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FeaturesSection, HeroSection, TestimonialsSection } from '../../components';
import { Loader } from '../../components/UI';
import { useDebounce, usePerformance } from '../../hooks';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  // Détection responsive optimisée avec debounce
  const checkScreenSize = useCallback(() => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      setIsMobile(newIsMobile);
    }
  }, [isMobile]);

  // Debounce optimisé
  const debouncedCheckScreenSize = useDebounce(checkScreenSize, 100);

  useEffect(() => {
    // Mesure des performances
    measurePerformance('Home component initialization', () => {
      // Détection initiale
      checkScreenSize();
      setIsLoading(false);
    });

    // Event listener optimisé
    window.addEventListener('resize', debouncedCheckScreenSize);

    return () => {
      window.removeEventListener('resize', debouncedCheckScreenSize);
    };
  }, [checkScreenSize, debouncedCheckScreenSize, measurePerformance]);

  // Gestion optimisée des classes CSS
  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  // Gestion des redirections optimisée
  useEffect(() => {
    const isFromRedirect = sessionStorage.getItem('fromRedirect');
    if (isFromRedirect) {
      setIsRedirecting(true);
      sessionStorage.removeItem('fromRedirect');
      // Utiliser requestAnimationFrame pour une meilleure performance
      requestAnimationFrame(() => {
        setTimeout(() => setIsRedirecting(false), 50);
      });
    }
  }, [location]);

  // Mémorisation des animations optimisées
  const pageVariants = useMemo(
    () => ({
      initial: { opacity: isRedirecting ? 1 : 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }),
    [isRedirecting]
  );

  const pageTransition = useMemo(() => {
    return {
      ...animationConfig,
      duration: isRedirecting ? 0 : prefersReducedMotion ? 0.1 : animationConfig.duration,
    };
  }, [isRedirecting, animationConfig, prefersReducedMotion]);

  // Optimisation des props passées aux composants
  const mobileProps = useMemo(
    () => ({
      isMobile,
      isLowEndDevice,
      prefersReducedMotion,
    }),
    [isMobile, isLowEndDevice, prefersReducedMotion]
  );

  // Gestion d'erreur pour le chargement
  if (isLoading) {
    return (
      <Loader
        size='default'
        variant='rotating-squares'
        color='default'
        message={t('home.loading')}
      />
    );
  }

  return (
    <motion.div
      className='home'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <HeroSection />
      <FeaturesSection {...mobileProps} />
      <TestimonialsSection {...mobileProps} />
    </motion.div>
  );
};

export default Home;
