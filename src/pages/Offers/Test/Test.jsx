import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './Test.css';

const Test = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Test page initialization', () => {
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
      <div className='test-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='test'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='test-container'>
        <h1>Votre accompagnement linguistique commence par un diagnostic sur mesure</h1>

        <div className='test-content'>
          <div className='test-section'>
            <p className='test-intro'>
              Chez Bon Cours, nous considérons que chaque parcours linguistique est unique. Avant
              toute formation, nous vous proposons un entretien individuel gratuit avec un formateur
              expert, afin d'établir un bilan précis et personnalisé de votre niveau, de vos besoins
              et de vos objectifs.
            </p>
          </div>

          <div className='test-section'>
            <h2>Un entretien privilégié avec un formateur expert</h2>
            <p className='test-intro'>
              Durant cet échange confidentiel, en présentiel ou à distance, votre formateur dédié
              prendra le temps de :
            </p>
            <div className='test-info'>
              <ul>
                <li>
                  <strong>Évaluer votre niveau linguistique actuel</strong> selon le Cadre Européen
                  Commun de Référence (CECRL)
                </li>
                <li>
                  <strong>Comprendre vos objectifs</strong> personnels et professionnels
                </li>
                <li>
                  <strong>Identifier vos forces</strong>, vos axes de progression et vos préférences
                  d'apprentissage
                </li>
                <li>
                  <strong>Vous orienter</strong> vers la stratégie la plus adaptée pour atteindre
                  vos ambitions
                </li>
              </ul>
            </div>
            <p className='test-intro'>
              Chaque diagnostic est conduit avec rigueur, bienveillance et expertise, dans le
              respect de votre rythme et de vos attentes.
            </p>
          </div>

          <div className='test-section'>
            <h2>Un service offert, conçu pour l'excellence</h2>
            <p className='test-intro'>
              Ce diagnostic constitue la première étape de votre réussite.
            </p>
            <div className='test-info'>
              <ul>
                <li>
                  <strong>Gratuit et sans engagement</strong>, il vous offre une vision claire de
                  votre profil linguistique
                </li>
                <li>
                  <strong>Expertise d'un professionnel qualifié</strong>, habitué à accompagner un
                  public exigeant
                </li>
                <li>
                  <strong>Analyse complète et recommandations personnalisées</strong> pour
                  progresser avec méthode et efficacité
                </li>
              </ul>
            </div>
          </div>

          <div className='test-section'>
            <h2>Réservez votre diagnostic personnalisé</h2>
            <div className='test-info'>
              <ul>
                <li>1. Cliquez sur le bouton ci-dessous</li>
                <li>2. Choisissez le créneau qui vous convient le mieux</li>
                <li>3. Recevez votre confirmation et les informations de rendez-vous</li>
              </ul>
            </div>
            <p className='test-intro'>
              Parce que la maîtrise d'une langue ouvre de nouvelles perspectives, commencez votre
              parcours avec l'accompagnement qu'il mérite.
            </p>

            <div className='test-cta-main'>
              <Link to='/contact' className='contact-button'>
                Réserver mon diagnostic personnalisé
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Test;
