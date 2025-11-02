import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './OutilsRessources.css';

const OutilsRessources = () => {
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
    measurePerformance('Outils & Ressources page initialization', () => {
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
      <div className='outils-ressources-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='outils-ressources'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='outils-ressources-container'>
        <h1>{t('outils_ressources.title')}</h1>

        <div className='outils-ressources-intro'>
          <p>{t('outils_ressources.intro')}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OutilsRessources;
