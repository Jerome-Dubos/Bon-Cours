import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import LanguageCarousel from '../../../components/UI/LanguageCarousel';
import { FormModal } from '../../../components/UI/Modales';
import { ErrorNotification, SuccessNotification } from '../../../components/UI/Notifications';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './AteliersLinguistiques.css';

const AteliersLinguistiques = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [newsletterData, setNewsletterData] = useState({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Validation email
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Gestion des notifications
  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);

    // Auto-suppression après 5 secondes
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Validation en temps réel de l'email
  useEffect(() => {
    setIsEmailValid(validateEmail(newsletterData.email));
  }, [newsletterData.email]);

  // Gestion du changement d'email en temps réel
  const handleEmailInputChange = e => {
    const email = e.target.value;
    setNewsletterData({ email });
  };

  // Gestion de la newsletter
  const handleNewsletterSubmit = async formData => {
    try {
      // Mettre à jour newsletterData avec les données du formulaire
      setNewsletterData(formData);

      // Validation de l'email (double vérification)
      if (!formData.email || !validateEmail(formData.email)) {
        addNotification('error', 'Veuillez saisir une adresse email valide');
        return;
      }

      setIsSubmitting(true);

      // Simulation d'un appel API avec délai
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Newsletter subscription:', formData);

      // Ici, vous pourriez ajouter l'appel à votre API de newsletter
      // await newsletterService.subscribe(formData.email);

      // Notification de succès
      addNotification('success', 'Inscription à la newsletter réussie !');

      // Fermer la modale
      setIsNewsletterModalOpen(false);

      // Réinitialiser le formulaire
      setNewsletterData({ email: '' });
      setIsEmailValid(false);
    } catch (error) {
      addNotification('error', "Erreur lors de l'inscription. Veuillez réessayer.");
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
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
              src='/assets/images/ateliers/oral-2.webp'
              alt='Atelier Langue Orale'
              className='atelier-image'
            />
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
              src='/assets/images/ateliers/langue-ecrite-2.webp'
              alt='Atelier Langue Écrite'
              className='atelier-image'
            />
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
              src='/assets/images/ateliers/cuisine-2.webp'
              alt='Atelier Cuisine'
              className='atelier-image'
            />
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
              src='/assets/images/ateliers/sport-2.webp'
              alt='Atelier Sport'
              className='atelier-image'
            />
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
              src='/assets/images/ateliers/jeux-2.webp'
              alt='Atelier Jeux'
              className='atelier-image'
            />
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
              src='/assets/images/ateliers/cinema-2.webp'
              alt='Atelier Cinéma'
              className='atelier-image'
            />
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
            intervenant.e.s.{' '}
            <button
              className='newsletter-link'
              onClick={() => setIsNewsletterModalOpen(true)}
              type='button'
            >
              Inscrivez-vous à notre lettre d'information
            </button>{' '}
            pour connaître les prochaines dates de nos ateliers!
          </p>

          <div className='price-card'>
            <div className='price-content'>
              <p className='price-label'>Tarif unique</p>
              <p className='price-value'>30 €/ atelier</p>
            </div>
          </div>
        </div>

        {/* Carousel des langues enseignées */}
        <LanguageCarousel speed={50} direction='left' className='ateliers-language-carousel' />

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>

      {/* Modale de newsletter */}
      <FormModal
        isOpen={isNewsletterModalOpen}
        onClose={() => {
          setIsNewsletterModalOpen(false);
          setNewsletterData({ email: '' });
          setIsEmailValid(false);
        }}
        onSubmit={handleNewsletterSubmit}
        title='Inscrivez-vous à notre newsletter'
        submitText={isSubmitting ? 'Inscription...' : "S'inscrire"}
        cancelText='Annuler'
        initialData={newsletterData}
        submitDisabled={isSubmitting || !isEmailValid}
        fields={[]}
        className='newsletter-modal'
      >
        <div className='newsletter-modal-content'>
          <p className='newsletter-description'>
            Recevez les dernières informations sur nos ateliers linguistiques, les nouvelles dates
            et les événements spéciaux.
          </p>

          <div className='newsletter-form-group'>
            <label htmlFor='newsletter-email' className='newsletter-label'>
              Adresse email *
            </label>
            <input
              type='email'
              id='newsletter-email'
              value={newsletterData.email}
              onChange={handleEmailInputChange}
              placeholder='votre@email.com'
              className='newsletter-input'
              disabled={isSubmitting}
              required
            />
          </div>

          <div className='newsletter-privacy'>
            <p>
              En vous inscrivant, vous acceptez de recevoir nos communications. Vous pouvez vous
              désinscrire à tout moment.
            </p>
          </div>
        </div>
      </FormModal>

      {/* Notifications */}
      {notifications.some(n => n.type === 'success') && (
        <SuccessNotification
          notifications={notifications.filter(n => n.type === 'success')}
          onRemove={removeNotification}
          autoClose={true}
          autoCloseDelay={5000}
          position='top-right'
        />
      )}
      {notifications.some(n => n.type === 'error') && (
        <ErrorNotification
          notifications={notifications.filter(n => n.type === 'error')}
          onRemove={removeNotification}
          autoClose={true}
          autoCloseDelay={5000}
          position='top-right'
        />
      )}
    </motion.div>
  );
};

export default AteliersLinguistiques;
