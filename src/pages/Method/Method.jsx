import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from '../../components/UI';
import { useErrorHandler, usePerformance } from '../../hooks';
import './Method.css';

const Method = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const {
    isLowEndDevice,
    prefersReducedMotion,
    getAnimationConfig,
    startMeasurement,
    endMeasurement,
  } = usePerformance();

  const { handleError } = useErrorHandler();

  // Initialisation de la page
  useEffect(() => {
    startMeasurement('Method page initialization');

    const timer = setTimeout(() => {
      setIsLoading(false);
      endMeasurement('Method page initialization');
    }, 100);

    return () => clearTimeout(timer);
  }, [startMeasurement, endMeasurement]);

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
    const baseConfig = getAnimationConfig();
    return {
      ...baseConfig,
      duration: prefersReducedMotion ? 0.1 : baseConfig.duration,
    };
  }, [getAnimationConfig, prefersReducedMotion]);

  if (isLoading) {
    return (
      <Loader
        size='default'
        variant='rotating-squares'
        color='default'
        message='Chargement de la méthode...'
      />
    );
  }

  return (
    <motion.div
      className='method'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='method-container'>
        <h1>Notre Méthode</h1>

        <div className='method-content'>
          <div className='method-intro'>
            <p>
              Dans notre centre de langues, nous utilisons l'approche actionnelle, une méthode
              moderne et motivante qui place l'apprenant au cœur de son apprentissage. L'idée est
              simple : apprendre une langue, ce n'est pas seulement mémoriser des règles, c'est
              surtout savoir l'utiliser dans la vie de tous les jours.
            </p>
          </div>

          <div className='method-concrete'>
            <h2>Concrètement, cela signifie que...</h2>
            <p>
              les cours sont organisés autour de tâches et de projets concrets : écrire un e-mail
              professionnel, préparer un voyage, consulter un médecin ou donner des indications pour
              la livraison de repas à domicile. Ces mises en situation permettent de pratiquer la
              langue de façon naturelle, comme on le ferait dans un vrai contexte.
            </p>
          </div>

          <div className='method-activities'>
            <h2>Les activités favorisent l'échange et la confiance en soi</h2>
            <p>
              On apprend en communiquant, en testant, en s'impliquant, plutôt qu'en restant
              spectateur.
            </p>
          </div>

          <div className='method-objective'>
            <h2>Notre objectif</h2>
            <p>
              est que chacun reparte non seulement avec des connaissances linguistiques solides,
              mais aussi avec la capacité de communiquer efficacement et avec plaisir dans la langue
              cible.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Method;
