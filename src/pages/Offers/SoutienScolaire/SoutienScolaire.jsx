import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './SoutienScolaire.css';

const SoutienScolaire = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Définir les onglets disponibles
  const tabs = [
    {
      id: 'primaire',
      label: 'Primaire',
      content: (
        <div className='primaire-content'>
          <div className='offers-grid'>
            <div className='offer-card'>
              <h3>Cours individuels</h3>
              <div className='card-content'>
                <p>À l'institut ou à domicile</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>40 €/h</div>
            </div>
            <div className='offer-card'>
              <h3>Cours en petits groupes</h3>
              <div className='card-content'>
                <p>4 élèves</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>20 €/h</div>
            </div>
            <div className='offer-card'>
              <h3>Stage intensif en petits groupes</h3>
              <div className='card-content'>
                <p>4 élèves</p>
                <p>15h/semaine</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>300 €/stage</div>
            </div>
          </div>
          <div className='cta-section'>
            <Link to='/contact' className='cta-button'>
              Inscrire mon enfant
            </Link>
          </div>
        </div>
      ),
      title: 'Soutien Scolaire Primaire',
    },
    {
      id: 'college',
      label: 'Collège',
      content: (
        <div className='college-content'>
          <div className='offers-grid'>
            <div className='offer-card'>
              <h3>Cours individuels</h3>
              <div className='card-content'>
                <p>À l'institut ou à domicile</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>40 €/h</div>
            </div>
            <div className='offer-card'>
              <h3>Cours en petits groupes</h3>
              <div className='card-content'>
                <p>4 élèves</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>20 €/h</div>
            </div>
            <div className='offer-card'>
              <h3>Stage intensif en petits groupes</h3>
              <div className='card-content'>
                <p>4 élèves</p>
                <p>15h/semaine</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>300 €/stage</div>
            </div>
          </div>
          <div className='cta-section'>
            <Link to='/contact' className='cta-button'>
              Inscrire mon enfant
            </Link>
          </div>
        </div>
      ),
      title: 'Soutien Scolaire Collège',
    },
    {
      id: 'lycee',
      label: 'Lycée',
      content: (
        <div className='lycee-content'>
          <div className='offers-grid'>
            <div className='offer-card'>
              <h3>Cours individuels</h3>
              <div className='card-content'>
                <p>À l'institut ou à domicile</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>40 €/h</div>
            </div>
            <div className='offer-card'>
              <h3>Cours en petits groupes</h3>
              <div className='card-content'>
                <p>4 élèves</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>20 €/h</div>
            </div>
            <div className='offer-card'>
              <h3>Stage intensif en petits groupes</h3>
              <div className='card-content'>
                <p>4 élèves</p>
                <p>15h/semaine</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>300 €/stage</div>
            </div>
          </div>
          <div className='cta-section'>
            <Link to='/contact' className='cta-button'>
              Inscrire mon enfant
            </Link>
          </div>
        </div>
      ),
      title: 'Soutien Scolaire Lycée',
    },
  ];

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('primaire', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Soutien Scolaire page initialization', () => {
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
      <div className='soutien-scolaire-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='soutien-scolaire'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='soutien-scolaire-container'>
        <h1>Soutien Scolaire</h1>

        <p className='intro-text'>
          Offrez des bases solides et stimulez la confiance en soi de votre enfant grâce à nos
          intervenant.e.s expérimenté.e.s
        </p>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default SoutienScolaire;
