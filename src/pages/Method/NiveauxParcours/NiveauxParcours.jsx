import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './NiveauxParcours.css';

const NiveauxParcours = () => {
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
    measurePerformance('Niveaux & Parcours page initialization', () => {
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
      <div className='niveaux-parcours-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  const levels = [
    {
      code: 'a0',
      level: 'A0',
      title: t('niveaux_parcours.a0.title'),
      description: t('niveaux_parcours.a0.description'),
    },
    {
      code: 'a1',
      level: 'A1',
      title: t('niveaux_parcours.a1.title'),
      description: t('niveaux_parcours.a1.description'),
    },
    {
      code: 'a2',
      level: 'A2',
      title: t('niveaux_parcours.a2.title'),
      description: t('niveaux_parcours.a2.description'),
    },
    {
      code: 'b1',
      level: 'B1',
      title: t('niveaux_parcours.b1.title'),
      description: t('niveaux_parcours.b1.description'),
    },
    {
      code: 'b2',
      level: 'B2',
      title: t('niveaux_parcours.b2.title'),
      description: t('niveaux_parcours.b2.description'),
    },
    {
      code: 'c1',
      level: 'C1',
      title: t('niveaux_parcours.c1.title'),
      description: t('niveaux_parcours.c1.description'),
    },
    {
      code: 'c2',
      level: 'C2',
      title: t('niveaux_parcours.c2.title'),
      description: t('niveaux_parcours.c2.description'),
    },
  ];

  return (
    <motion.div
      className='niveaux-parcours'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='niveaux-parcours-container'>
        <h1>{t('niveaux_parcours.title')}</h1>

        <div className='niveaux-intro'>
          <p>{t('niveaux_parcours.intro')}</p>
        </div>

        <div className='niveaux-grid'>
          {levels.map((level, index) => (
            <motion.div
              key={level.code}
              className='niveau-card'
              data-level={level.level}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <div className='niveau-header'>
                <span className='niveau-code'>{level.level}</span>
                <h3>{level.title}</h3>
              </div>
              <p>{level.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className='niveaux-conclusion'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>{t('niveaux_parcours.conclusion.text1')}</p>
          <p>{t('niveaux_parcours.conclusion.text2')}</p>
          <Link to='/contact' className='cta-button'>
            {t('niveaux_parcours.conclusion.button')}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NiveauxParcours;
