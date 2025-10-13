import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaBullseye, FaHandshake, FaLightbulb, FaRocket } from 'react-icons/fa';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './ApprocheActionnelle.css';

const ApprocheActionnelle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Approche Actionnelle page initialization', () => {
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
      <div className='approche-actionnelle-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='approche-actionnelle'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='approche-actionnelle-container'>
        <h1>Approche Actionnelle</h1>

        <div className='approche-content'>
          <motion.div
            className='approche-intro'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className='intro-header'>
              <div className='intro-icon'>
                <FaRocket />
              </div>
              <h2>Notre Approche</h2>
            </div>
            <p>
              Dans notre centre de langues, nous utilisons l'approche actionnelle, une méthode
              moderne et motivante qui place l'apprenant au cœur de son apprentissage. L'idée est
              simple : apprendre une langue, ce n'est pas seulement mémoriser des règles, c'est
              surtout savoir l'utiliser dans la vie de tous les jours.
            </p>
          </motion.div>

          <div className='approche-sections'>
            <motion.div
              className='approche-section'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className='section-icon'>
                <FaLightbulb />
              </div>
              <div className='section-content'>
                <h3>Concrètement, cela signifie que...</h3>
                <p>
                  les cours sont organisés autour de tâches et de projets concrets : écrire un
                  e-mail professionnel, préparer un voyage, consulter un médecin ou donner des
                  indications pour la livraison de repas à domicile. Ces mises en situation
                  permettent de pratiquer la langue de façon naturelle, comme on le ferait dans un
                  vrai contexte.
                </p>
              </div>
            </motion.div>

            <motion.div
              className='approche-section'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className='section-icon'>
                <FaHandshake />
              </div>
              <div className='section-content'>
                <h3>Les activités favorisent l'échange et la confiance en soi</h3>
                <p>
                  On apprend en communiquant, en testant, en s'impliquant, plutôt qu'en restant
                  spectateur.
                </p>
              </div>
            </motion.div>

            <motion.div
              className='approche-section'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className='section-icon'>
                <FaBullseye />
              </div>
              <div className='section-content'>
                <h3>Notre objectif</h3>
                <p>
                  est que chacun reparte non seulement avec des connaissances linguistiques solides,
                  mais aussi avec la capacité de communiquer efficacement et avec plaisir dans la
                  langue cible.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className='approche-cta'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3>Prêt à découvrir notre approche ?</h3>
            <p>Contactez-nous pour en savoir plus sur nos cours et notre méthode pédagogique.</p>
            <Link to='/contact' className='cta-button'>
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApprocheActionnelle;
