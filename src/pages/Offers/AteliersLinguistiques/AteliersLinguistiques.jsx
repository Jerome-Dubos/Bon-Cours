import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { IoReload } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './AteliersLinguistiques.css';

const AteliersLinguistiques = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageVariants, setImageVariants] = useState({});
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Fonction pour basculer entre les images
  const toggleImageVariant = atelierId => {
    setImageVariants(prev => ({
      ...prev,
      [atelierId]: !prev[atelierId],
    }));
  };

  // Définir les onglets disponibles
  const tabs = [
    {
      id: 'langue-orale',
      label: 'Langue orale',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src={
                imageVariants['langue-orale']
                  ? '/assets/images/ateliers/oral-2.webp'
                  : '/assets/images/ateliers/langue-orale.webp'
              }
              alt='Atelier Langue Orale'
              className='atelier-image'
            />
            <button
              className='image-switcher-btn'
              onClick={() => toggleImageVariant('langue-orale')}
              title="Changer d'image"
            >
              <IoReload size={20} />
            </button>
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Si vous maîtrisez déjà les bases et souhaitez aller plus loin pour gagner en{' '}
              <strong>fluidité</strong> et en <strong>confiance</strong> pour vous exprimer aussi
              bien en langue cible que dans votre propre langue, cet atelier est fait pour vous ! À
              travers des échanges vivants autour de thèmes d'actualité, vous perfectionnerez votre{' '}
              <strong>prononciation</strong>, votre <strong>intonation</strong> et votre{' '}
              <strong>expression orale</strong>. Chaque séance offre un cadre bienveillant et
              exigeant à la fois, propice à l'écoute, à la précision et au plaisir de la langue.
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'langue-ecrite',
      label: 'Langue écrite',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src={
                imageVariants['langue-ecrite']
                  ? '/assets/images/ateliers/langue-ecrite-2.webp'
                  : '/assets/images/ateliers/langue-ecrite.webp'
              }
              alt='Atelier Langue Écrite'
              className='atelier-image'
            />
            <button
              className='image-switcher-btn'
              onClick={() => toggleImageVariant('langue-ecrite')}
              title="Changer d'image"
            >
              <IoReload size={20} />
            </button>
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Ces ateliers s'adressent à celles et ceux qui ont atteint un niveau A2 et souhaitent
              perfectionner leur expression écrite, du{' '}
              <strong>message du quotidien au document professionnel</strong>. Vous y apprendrez à{' '}
              <strong>rédiger avec clarté, élégance et précision</strong>, tout en développant un
              style personnel et adapté à chaque situation.
              <br />
              <br />
              <strong>Au programme :</strong>
              <br />
              - Rédaction de courriels et lettres formels ou informels
              <br />
              - Élaboration de CV et lettres de motivation
              <br />
              - Préparation aux examens de langue avec un accompagnement sur mesure
              <br />
              <br />
              Chaque séance allie méthode, créativité et exigence linguistique, pour vous permettre
              d'écrire de façon naturelle et maîtrisée.
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'cuisine',
      label: 'Cuisine',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src={
                imageVariants['cuisine']
                  ? '/assets/images/ateliers/cuisine-2.webp'
                  : '/assets/images/ateliers/cuisine.webp'
              }
              alt='Atelier Cuisine'
              className='atelier-image'
            />
            <button
              className='image-switcher-btn'
              onClick={() => toggleImageVariant('cuisine')}
              title="Changer d'image"
            >
              <IoReload size={20} />
            </button>
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Venez découvrir les langues autrement, autour des <strong>saveurs</strong> et des{' '}
              <strong>gestes de la cuisine</strong>. Ces ateliers vous permettent de pratiquer la
              langue dans un cadre <strong>détendu et convivial</strong>, tout en explorant{' '}
              <strong>recettes et traditions culinaires</strong>.
              <br />
              <br />
              Chaque séance vous permet de :
              <br />- Découvrir le <strong>vocabulaire et les expressions</strong> liés à la cuisine
              et à la gastronomie ;
              <br />- Pratiquer le français à l'oral dans des{' '}
              <strong>situations concrètes et motivantes</strong> ;
              <br />- Partager des moments de <strong>convivialité et de découverte</strong> avec
              d'autres apprenants.
              <br />
              <br />
              Un moyen <strong>ludique et immersif</strong> de faire du français une langue vivante
              tout en explorant la <strong>richesse culinaire française et internationale</strong>.
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sport',
      label: 'Sport',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src={
                imageVariants['sport']
                  ? '/assets/images/ateliers/sport-2.webp'
                  : '/assets/images/ateliers/sport.webp'
              }
              alt='Atelier Sport'
              className='atelier-image'
            />
            <button
              className='image-switcher-btn'
              onClick={() => toggleImageVariant('sport')}
              title="Changer d'image"
            >
              <IoReload size={20} />
            </button>
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Bougez, échangez et pratiquez les langues dans un cadre{' '}
              <strong>dynamique et convivial</strong> ! Ces ateliers combinent{' '}
              <strong>activité physique et apprentissage linguistique</strong> pour progresser tout
              en prenant plaisir à se dépenser.
              <br />
              <br />
              Chaque séance vous permet de :
              <br />- Découvrir le <strong>vocabulaire et les expressions</strong> liés au sport et
              à la santé ;
              <br />- Pratiquer le français à l'oral dans des{' '}
              <strong>situations concrètes et motivantes</strong> ;
              <br />- Partager des moments d'<strong>effort et de convivialité</strong> avec
              d'autres apprenants.
              <br />
              <br />
              Un moyen <strong>ludique et immersif</strong> de faire du français une langue vivante
              tout en prenant soin de votre corps.
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'jeux',
      label: 'Jeux',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src={
                imageVariants['jeux']
                  ? '/assets/images/ateliers/jeux-2.webp'
                  : '/assets/images/ateliers/jeux.webp'
              }
              alt='Atelier Jeux'
              className='atelier-image'
            />
            <button
              className='image-switcher-btn'
              onClick={() => toggleImageVariant('jeux')}
              title="Changer d'image"
            >
              <IoReload size={20} />
            </button>
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Ces ateliers vous permettent de pratiquer la langue en jouant, que ce soit à travers
              des <strong>jeux de société</strong>, des <strong>énigmes</strong> ou des{' '}
              <strong>défis collectifs</strong>.
              <br />
              <br />
              Chaque séance vous offre l'opportunité de :
              <br />- Enrichir votre <strong>vocabulaire et vos expressions</strong> dans des
              situations <strong>amusantes et stimulantes</strong> ;
              <br />- Pratiquer votre <strong>expression orale</strong> dans un contexte{' '}
              <strong>naturel et détendu</strong> ;
              <br />- Partager des moments de <strong>
                rire, de réflexion et de complicité
              </strong>{' '}
              avec d'autres participants.
              <br />
              <br />
              Une manière <strong>originale et immersive</strong> d'apprendre une langue tout en
              s'amusant et en stimulant sa curiosité !
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'cinema',
      label: 'Cinéma',
      content: (
        <div className='atelier-content'>
          <div className='atelier-image-container'>
            <img
              src={
                imageVariants['cinema']
                  ? '/assets/images/ateliers/cinema-2.webp'
                  : '/assets/images/ateliers/cinema.webp'
              }
              alt='Atelier Cinéma'
              className='atelier-image'
            />
            <button
              className='image-switcher-btn'
              onClick={() => toggleImageVariant('cinema')}
              title="Changer d'image"
            >
              <IoReload size={20} />
            </button>
          </div>
          <div className='atelier-text-content'>
            <p className='atelier-description'>
              Plongez dans l'univers des <strong>films, des séries et des émissions télé</strong>{' '}
              pour apprendre les langues autrement. Chaque séance est une{' '}
              <strong>expérience immersive</strong> : vous regardez, écoutez, analysez... et
              surtout, vous parlez !
              <br />
              <br />
              Entre <strong>extraits captivants et discussions animées</strong>, vous découvrirez
              les <strong>expressions courantes</strong>, affinerez votre{' '}
              <strong>compréhension</strong> et développerez votre <strong>aisance à l'oral</strong>
              . Les échanges permettent de partager{' '}
              <strong>impressions, interprétations et points de vue</strong>, tout en explorant la
              culture sous un angle <strong>original, vivant et concret</strong>.
            </p>
            <div className='cta-section'>
              <Link to='/contact' className='cta-button'>
                S'inscrire à l'atelier
              </Link>
            </div>
          </div>
        </div>
      ),
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
            Chez Bon Cours, nous sommes convaincus que des activités immersives vous aident à
            progresser. C'est pourquoi nous proposons des ateliers ciblés et variés tous les mois.
            L'ensemble de nos ateliers se déclinent dans toutes nos langues disponibles, toujours en
            petits groupes de 6 maximum, du lundi au dimanche sous réserve de disponibilité de nos
            intervenant.e.s. Inscrivez-vous à notre lettre d'information pour connaître les
            prochaines dates de nos ateliers!
          </p>

          <div className='price-card'>
            <div className='price-content'>
              <p className='price-label'>Tarif unique</p>
              <p className='price-value'>30 €/ atelier</p>
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
