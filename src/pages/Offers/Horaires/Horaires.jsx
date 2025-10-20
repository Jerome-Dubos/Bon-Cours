import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaCheck, FaPhone } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/UI/Buttons';
import { useErrorHandler, usePerformance } from '../../../hooks';
import './Horaires.css';

const Horaires = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Handler pour navigation vers contact
  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Horaires page initialization', () => {
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
      <div className='horaires-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='horaires'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='horaires-container'>
        <h1>Des horaires pensés pour votre rythme – avec la flexibilité que vous méritez</h1>

        <div className='horaires-content'>
          <p className='horaires-intro'>
            Chez Bon Cours, nous comprenons que votre temps est précieux. C'est pourquoi nous avons
            conçu un planning de base qui respecte les contraintes des journées de travail et des
            emplois du temps scolaires, afin de faciliter l'intégration des cours dans votre
            quotidien.
          </p>

          <p className='horaires-flexibility'>
            Mais parce que chaque situation est unique, nous avons fait le choix de la flexibilité :
          </p>

          <div className='horaires-features'>
            <p>
              Nos horaires peuvent être ajustés en fonction de vos disponibilités et de celles de
              nos intervenants.
            </p>
            <p>
              Que vous soyez salarié, parent, étudiant ou en transition, notre priorité est de vous
              proposer des horaires qui vous permettent de progresser à votre rythme.
            </p>
          </div>

          <div className='horaires-practice'>
            <h2>
              <FaCheck />
              En pratique :
            </h2>
            <ul>
              <li>
                Des plages horaires variées en matinée, après-midi ou soirée, du lundi au dimanche
                inclus
              </li>
              <li>Possibilité de cours en présentiel ou à distance</li>
              <li>Groupes réduits ou cours individuels selon vos préférences</li>
              <li>
                Ajustements possibles en cas de changement de planning personnel ou professionnel
              </li>
            </ul>
          </div>

          <div className='horaires-cta'>
            <p>
              Pour en savoir plus ou discuter de vos disponibilités, contactez-nous pour nous faire
              part de vos besoins : nous vous proposerons une solution sur mesure.
            </p>
            <Button
              variant='primary'
              size='large'
              icon={FaPhone}
              iconPosition='left'
              onClick={handleContactClick}
              className='horaires-cta-button'
            >
              Contactez-nous maintenant
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Horaires;
