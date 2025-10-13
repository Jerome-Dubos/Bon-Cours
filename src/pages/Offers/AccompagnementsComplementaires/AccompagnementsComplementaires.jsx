import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './AccompagnementsComplementaires.css';

const AccompagnementsComplementaires = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Définir les onglets disponibles
  const tabs = [
    {
      id: 'administratif',
      label: 'Administratif',
      content:
        'Nous vous accompagnons dans vos démarches administratives : constitution de dossiers, aide à la rédaction de courriers officiels, compréhension des procédures administratives françaises.',
      title: 'Accompagnement Administratif',
    },
    {
      id: 'scolarite',
      label: 'Scolarité',
      content:
        'Orientation scolaire, choix de filières, préparation aux concours, aide à la rédaction de CV et lettres de motivation. Nous vous guidons dans votre parcours éducatif.',
      title: 'Accompagnement Scolarité',
    },
    {
      id: 'traduction',
      label: 'Traduction',
      content:
        'Services de traduction professionnelle pour vos documents officiels, académiques ou personnels. Traduction certifiée et assermentée disponible.',
      title: 'Services de Traduction',
    },
  ];

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('administratif', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Accompagnements Complémentaires page initialization', () => {
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
      <div className='accompagnements-complementaires-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='accompagnements-complementaires'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='accompagnements-complementaires-container'>
        <h1>Accompagnements Complémentaires</h1>

        <p className='intro-text'>
          En vous inscrivant à nos cours, bénéficiez d'un accompagnement illimité et gratuit lors de
          vos différentes démarches en France : communication avec diverses administrations par
          écrit ou à l'oral (accompagnement au rendez-vous) et traductions possibles en anglais
        </p>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default AccompagnementsComplementaires;
