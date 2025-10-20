import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  IoDesktopOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { FeaturesSection, HeroSection, TestimonialsSection } from '../../components';
import { Loader, ScheduleSection } from '../../components/UI';
import { useDebounce, useErrorHandler, usePerformance } from '../../hooks';
import apiService from '../../services/apiService';
import './Home.css';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schedulesData, setSchedulesData] = useState({});
  const [schedulesLoading, setSchedulesLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError, executeWithErrorHandling } = useErrorHandler();

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

  // Chargement des données du planning
  useEffect(() => {
    const loadScheduleData = async () => {
      try {
        setSchedulesLoading(true);
        const data = await apiService.getScheduleData();
        setSchedulesData(data);
      } catch (error) {
        handleError(error);
        setSchedulesData({});
      } finally {
        setSchedulesLoading(false);
      }
    };

    loadScheduleData();
  }, [handleError]);

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
        message="Chargement de la page d'accueil..."
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
      <ScheduleSection
        title='Planning des cours'
        description='Découvrez nos cours disponibles en présentiel et en visioconférence'
        coursesData={schedulesData}
        loading={schedulesLoading}
        showEmptyMessage={true}
        emptyMessage={{
          title: 'Aucun cours disponible',
          text: 'Consultez notre planning régulièrement pour découvrir nos prochains cours',
          features: [
            { icon: <IoPersonOutline />, text: 'Cours adultes et enfants' },
            { icon: <IoDesktopOutline />, text: 'Présentiel et visioconférence' },
            { icon: <IoTimeOutline />, text: 'Horaires flexibles' },
          ],
        }}
        startDate='2024-01-15'
        weekDays={7}
        levelTabs={[
          {
            id: 'adult',
            label: 'Adultes',
            icon: <IoPeopleOutline />,
            description: 'Cours pour adultes',
          },
          {
            id: 'child',
            label: 'Enfants',
            icon: <IoSchoolOutline />,
            description: 'Cours pour enfants',
          },
        ]}
        typeTabs={[
          {
            id: 'presentiel',
            label: 'Présentiel',
            icon: <IoHomeOutline />,
            description: 'Cours en présentiel',
          },
          {
            id: 'visio',
            label: 'Visio',
            icon: <IoDesktopOutline />,
            description: 'Cours en visioconférence',
          },
        ]}
        className='home-schedule'
      />
      <TestimonialsSection {...mobileProps} />
    </motion.div>
  );
};

export default Home;
