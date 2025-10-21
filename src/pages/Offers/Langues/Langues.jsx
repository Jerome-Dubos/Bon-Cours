import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import LanguageCarousel from '../../../components/UI/LanguageCarousel';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './Langues.css';

const Langues = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Définir les onglets disponibles
  const tabs = [
    {
      id: 'enfants-ados',
      label: 'Enfants & ados',
      content: (
        <div className='enfants-ados-content'>
          <p className='intro-text'>
            L'apprentissage des langues est aujourd'hui un levier considérable dans la réussite
            scolaire et professionnelle. Offrez à votre enfant la chance d'apprendre ou de renforcer
            une langue étrangère ! Notre équipe experte vous accompagne tout au long de
            l'apprentissage et échangera régulièrement avec l'élève et vous pour ajuster les cours
            en cas de besoin.
          </p>
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
      title: 'Cours pour Enfants & Adolescents',
    },
    {
      id: 'adultes',
      label: 'Adultes',
      content: (
        <div className='adultes-content'>
          <p className='intro-text'>
            Besoin d'apprendre ou de renforcer une langue étrangère pour optimiser votre évolution
            professionnelle ? Nos cours sont conçus pour une progression rapide et efficace grâce à
            nos supports adaptés et à nos formateurs experts.
          </p>
          <div className='offers-grid'>
            <div className='offer-card'>
              <h3>Cours individuels</h3>
              <div className='card-content'>
                <p>À l'institut ou à domicile</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>65 €/h</div>
            </div>
            <div className='offer-card'>
              <h3>Cours en petits groupes</h3>
              <div className='card-content'>
                <p>6 apprenants</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>30 €/h</div>
            </div>
            <div className='offer-card'>
              <h3>Ateliers linguistiques</h3>
              <div className='card-content'>
                <p>6 apprenants</p>
                <p>Horaire et durée à définir</p>
                <p>Tous niveaux</p>
              </div>
              <div className='price'>30 €/h</div>
            </div>
          </div>
          <div className='cta-section'>
            <Link to='/contact' className='cta-button'>
              Commencer ma formation
            </Link>
          </div>
        </div>
      ),
      title: 'Formation pour Adultes',
    },
  ];

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('enfants-ados', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Langues page initialization', () => {
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
      <div className='langues-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  // Le hook useTabNavigation gère déjà tout

  return (
    <motion.div
      className='langues'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='langues-container'>
        <h1>Nos cours de langues</h1>

        {/* Drapeaux des langues - Carousel infini */}
        <LanguageCarousel speed={40} direction='left' className='languages-flags-carousel' />

        {/* Texte "pour" */}
        <div className='languages-for'>
          <h2>pour</h2>
        </div>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default Langues;
