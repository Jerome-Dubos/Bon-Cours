import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './AteliersLinguistiques.css';

const AteliersLinguistiques = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Définir les onglets disponibles
  const tabs = [
    {
      id: 'langue-orale',
      label: 'Langue orale',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src='/assets/images/ateliers/langue-orale.webp'
              alt='Atelier Langue Orale'
              className='atelier-image'
            />
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Atelier de conversation sur des thématiques variées, toujours en petits groupes
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
      title: 'Ateliers Langue Orale',
    },
    {
      id: 'langue-ecrite',
      label: 'Langue écrite',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src='/assets/images/ateliers/langue-ecrite.webp'
              alt='Atelier Langue Écrite'
              className='atelier-image'
            />
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Atelier d'écriture sur diverses thématique: rédaction de courriers ou de mails formels
              et informels, préparation de CV et de lettre de motivation, préparation aux examens de
              langue
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
      title: 'Ateliers Langue Écrite',
    },
    {
      id: 'cuisine',
      label: 'Cuisine',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src='/assets/images/ateliers/cuisine.webp'
              alt='Atelier Cuisine'
              className='atelier-image'
            />
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Apprenez la langue de votre choix en cuisinant des recettes variées avec dégustation
              sur place ou possibilité d'emporter une portion.
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
      title: 'Ateliers Cuisine',
    },
    {
      id: 'sport',
      label: 'Sport',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src='/assets/images/ateliers/sport.webp'
              alt='Atelier Sport'
              className='atelier-image'
            />
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Apprenez le français, l'anglais ou l'allemand en pratiquant une activité sportive avec
              l'un de nos coachs spécialisés!
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
      title: 'Ateliers Sport',
    },
    {
      id: 'jeux',
      label: 'Jeux',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src='/assets/images/ateliers/jeux.webp'
              alt='Atelier Jeux'
              className='atelier-image'
            />
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Apprenez la langue de votre choix dans un cadre informel comme une soirée entre amis à
              l'aide de jeux variés et de corrections linguistiques en fin d'atelier.
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
      title: 'Ateliers Jeux',
    },
    {
      id: 'cinema',
      label: 'Cinéma',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src='/assets/images/ateliers/cinema.webp'
              alt='Atelier Cinéma'
              className='atelier-image'
            />
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Venez visionner des films, séries ou émissions télévisées pour renforcer votre niveau
              dans la langue de votre choix en présence de l'un.e de nos formateurs qui sera à votre
              disposition pour toutes vos questions !
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
      title: 'Ateliers Cinéma',
    },
  ];

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('langue-orale', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Ateliers Linguistiques page initialization', () => {
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
      <div className='ateliers-linguistiques-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='ateliers-linguistiques'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='ateliers-linguistiques-container'>
        <h1>Ateliers Linguistiques</h1>

        <div className='intro-section'>
          <p className='intro-text'>
            Chez Bon Cours, Nous sommes convaincus que des activités immersives vous aident à
            progresser. C'est pourquoi nous proposons des ateliers ciblés et variés tous les mois.
            Inscrivez-vous à notre lettre d'information pour connaître les prochaines dates de nos
            ateliers!
          </p>

          <div className='price-card'>
            <div className='price-content'>
              <p className='price-label'>Tarif unique</p>
              <p className='price-value'>60 €/ atelier de 2h</p>
            </div>
          </div>
        </div>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default AteliersLinguistiques;
