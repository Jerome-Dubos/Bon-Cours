import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './NiveauxParcours.css';

const NiveauxParcours = () => {
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
        <h1>Niveaux & Parcours</h1>

        <div className='niveaux-intro'>
          <p>
            Nous proposons des cours de langues adaptés à tous les profils, du grand débutant au
            locuteur confirmé. Nos programmes suivent les niveaux du Cadre Européen Commun de
            Référence pour les Langues (CECRL), une norme internationale qui permet d'évaluer
            précisément les compétences linguistiques.
          </p>
        </div>

        <div className='niveaux-grid'>
          <motion.div
            className='niveau-card'
            data-level='A0'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className='niveau-header'>
              <span className='niveau-code'>A0</span>
              <h3>Débutant absolu</h3>
            </div>
            <p>
              Ce niveau s'adresse aux personnes qui n'ont jamais étudié la langue. Vous apprendrez
              les bases essentielles : l'alphabet, les salutations, les chiffres, les expressions
              courantes et la prononciation.
            </p>
          </motion.div>

          <motion.div
            className='niveau-card'
            data-level='A1'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className='niveau-header'>
              <span className='niveau-code'>A1</span>
              <h3>Niveau introductif ou découverte</h3>
            </div>
            <p>
              Vous pouvez comprendre et utiliser des expressions simples du quotidien. Ce niveau
              permet de vous présenter, de poser des questions basiques et de répondre sur des
              sujets familiers.
            </p>
          </motion.div>

          <motion.div
            className='niveau-card'
            data-level='A2'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className='niveau-header'>
              <span className='niveau-code'>A2</span>
              <h3>Niveau intermédiaire ou usuel</h3>
            </div>
            <p>
              À ce stade, vous pouvez interagir dans des situations simples de la vie courante
              (faire des courses, commander au restaurant, parler de votre famille ou de votre
              travail).
            </p>
          </motion.div>

          <motion.div
            className='niveau-card'
            data-level='B1'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className='niveau-header'>
              <span className='niveau-code'>B1</span>
              <h3>Niveau seuil</h3>
            </div>
            <p>
              Vous êtes capable de vous débrouiller dans la plupart des situations rencontrées lors
              d'un voyage. Vous pouvez exprimer vos opinions, raconter des événements, et comprendre
              les points essentiels d'une conversation claire.
            </p>
          </motion.div>

          <motion.div
            className='niveau-card'
            data-level='B2'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className='niveau-header'>
              <span className='niveau-code'>B2</span>
              <h3>Niveau avancé ou indépendant</h3>
            </div>
            <p>
              Vous pouvez comprendre des textes complexes, suivre une discussion technique, exprimer
              vos idées de façon claire et détaillée, et débattre avec un bon degré d'aisance et de
              spontanéité.
            </p>
          </motion.div>

          <motion.div
            className='niveau-card'
            data-level='C1'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className='niveau-header'>
              <span className='niveau-code'>C1</span>
              <h3>Niveau autonome</h3>
            </div>
            <p>
              Vous comprenez des textes longs et exigeants, même implicites. Vous vous exprimez de
              façon fluide, nuancée et efficace dans un contexte social, académique ou
              professionnel.
            </p>
          </motion.div>

          <motion.div
            className='niveau-card'
            data-level='C2'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className='niveau-header'>
              <span className='niveau-code'>C2</span>
              <h3>Niveau maîtrise</h3>
            </div>
            <p>
              Ce niveau correspond à une aisance comparable à celle d'un locuteur natif. Vous
              comprenez sans effort pratiquement tout ce que vous lisez ou entendez et vous vous
              exprimez spontanément, très précisément, même sur des sujets complexes.
            </p>
          </motion.div>
        </div>

        <motion.div
          className='niveaux-conclusion'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>
            Quel que soit votre niveau de départ, notre objectif est de vous aider à progresser
            efficacement et avec confiance.
          </p>
          <p>
            N'hésitez pas à nous contacter pour une évaluation gratuite afin de déterminer votre
            niveau actuel et vous orienter vers le cours le plus adapté.
          </p>
          <Link to='/contact' className='cta-button'>
            Évaluation gratuite
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NiveauxParcours;
