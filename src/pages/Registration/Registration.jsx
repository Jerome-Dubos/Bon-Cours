import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../hooks';
import './Registration.css';

const Registration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Registration page initialization', () => {
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
      <div className='registration-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='registration'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='registration-container'>
        <h1>Inscription</h1>

        <div className='registration-content'>
          <div className='registration-section'>
            <h2>Rejoignez Bon Cours</h2>
            <p>
              Inscrivez-vous à nos cours de langues et découvrez une méthode d'apprentissage adaptée
              à vos besoins. Que vous soyez débutant ou avancé, nous avons le programme qu'il vous
              faut.
            </p>

            <div className='registration-info'>
              <h3>Comment s'inscrire ?</h3>
              <ul>
                <li>
                  <strong>Évaluation gratuite :</strong> Test de niveau personnalisé
                </li>
                <li>
                  <strong>Choix du programme :</strong> Cours adaptés à vos objectifs
                </li>
                <li>
                  <strong>Inscription en ligne :</strong> Processus simple et sécurisé
                </li>
                <li>
                  <strong>Début des cours :</strong> Intégration immédiate
                </li>
              </ul>
            </div>

            <div className='registration-cta'>
              <h3>Prêt à commencer ?</h3>
              <p>Contactez-nous pour votre évaluation gratuite</p>
              <a href='/contact' className='contact-button'>
                Demander un rendez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Registration;
