import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FaBook,
  FaBriefcase,
  FaBullseye,
  FaClipboardList,
  FaCompass,
  FaFileAlt,
  FaPhone,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { Button } from '../../../components/UI/Buttons';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './AccompagnementsComplementaires.css';

const AccompagnementsComplementaires = () => {
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

  // Définir les onglets disponibles
  const tabs = [
    {
      id: 'administratif',
      label: 'Administratif',
      content: (
        <div>
          <p>
            S'installer en France est une belle aventure, mais elle peut aussi être complexe. Chez
            Bon Cours, notre objectif est de vous aider à vous installer sereinement, en vous
            guidant dans toutes les démarches essentielles à votre vie en France.
          </p>
          <p>Voici ce que nous pouvons faire pour vous :</p>

          <div className='tab-section'>
            <h4>
              <FaFileAlt />
              Démarches à l'arrivée en France
            </h4>
            <ul>
              <li>Aide à l'obtention ou au renouvellement du visa ou titre de séjour</li>
              <li>Aide à l'ouverture d'un compte bancaire</li>
              <li>Aide à la souscription à une assurance santé (CPAM, mutuelle)</li>
              <li>Aide à la recherche de logement (documentation, vocabulaire, lettres types)</li>
              <li>Rédaction ou relecture des lettres administratives</li>
              <li>Aide à l'inscription auprès des services publics (CAF, impôts, etc.)</li>
              <li>
                Traduction ou explication de documents officiels (uniquement pour vous aider à les
                comprendre, il ne s'agit pas d'un service de traduction de vos documents)
              </li>
            </ul>
          </div>

          <div className='tab-section'>
            <h4>
              <FaBriefcase />
              Vie quotidienne et intégration
            </h4>
            <ul>
              <li>Aide à l'obtention d'un numéro de sécurité sociale</li>
              <li>Conseils et assistance pour l'abonnement téléphonique, internet, transports</li>
              <li>Aide pour inscrire les enfants à l'école ou à la crèche</li>
              <li>Aide à l'obtention de la carte Vitale</li>
              <li>Informations sur les droits et devoirs des étrangers en France</li>
              <li>Préparation aux rendez-vous en préfecture</li>
            </ul>
          </div>

          <div className='tab-section'>
            <h4>
              <FaClipboardList />
              Démarches administratives continues
            </h4>
            <ul>
              <li>Aide au renouvellement du titre de séjour</li>
              <li>Préparation à la demande de naturalisation</li>
              <li>Rédaction de courriers administratifs (CAF, préfecture, assurances, etc.)</li>
              <li>Aide à la déclaration d'impôts</li>
              <li>
                Conseils en cas de changement de situation (mariage, déménagement, changement
                d'école, etc.)
              </li>
            </ul>
          </div>

          <div className='cta-container'>
            <p className='cta-text'>Vous avez des questions ? Besoin d'aide pour vos démarches ?</p>
            <Button
              variant='primary'
              size='large'
              icon={FaPhone}
              iconPosition='left'
              onClick={handleContactClick}
              className='cta-button cta-button-large'
            >
              Contactez-nous maintenant
            </Button>
          </div>
        </div>
      ),
      title: 'Accompagnement Administratif',
    },
    {
      id: 'scolarite',
      label: 'Scolarité',
      content: (
        <div>
          <p>
            Apprendre le français, c'est bien plus que suivre des cours : c'est aussi comprendre
            comment progresser, s'organiser, s'orienter, et réussir. C'est pourquoi nous proposons
            un accompagnement scolaire personnalisé, inclus dans nos offres de cours.
          </p>
          <p>
            Nous vous aidons à tirer le meilleur de votre apprentissage, à votre rythme et selon vos
            objectifs.
          </p>

          <div className='tab-section'>
            <h4>
              <FaBook />
              Suivi pédagogique personnalisé
            </h4>
            <ul>
              <li>Évaluation régulière du niveau et des progrès</li>
              <li>Conseils méthodologiques pour apprendre plus efficacement</li>
              <li>Aide à la gestion du temps et de l'organisation des révisions</li>
              <li>Suivi des devoirs et travaux donnés en cours</li>
              <li>
                Mise à disposition de ressources complémentaires adaptées (exercices, vidéos,
                podcasts, etc.)
              </li>
            </ul>
          </div>

          <div className='tab-section'>
            <h4>
              <FaBullseye />
              Aide à la préparation des examens
            </h4>
            <ul>
              <li>Entraînement à l'oral et à l'écrit avec corrections personnalisées</li>
              <li>Simulation d'épreuves pour se mettre en condition réelle</li>
              <li>Conseils pour bien gérer le stress et réussir son examen</li>
            </ul>
          </div>

          <div className='tab-section'>
            <h4>
              <FaCompass />
              Orientation et projet personnel
            </h4>
            <ul>
              <li>
                Écoute et accompagnement dans votre projet d'études ou professionnel en France
              </li>
              <li>
                Aide à l'inscription dans un établissement (université, lycée, formation pro…)
              </li>
              <li>Rédaction ou correction de CV et lettres de motivation</li>
              <li>Préparation à des entretiens (écoles, employeurs, stages)</li>
            </ul>
          </div>

          <div className='cta-container'>
            <p className='cta-text'>
              Vous avez des objectifs particuliers ? N'hésitez pas à nous en parler : notre équipe
              est là pour vous conseiller et vous guider.
            </p>
            <Button
              variant='primary'
              size='large'
              icon={FaPhone}
              iconPosition='left'
              onClick={handleContactClick}
              className='cta-button cta-button-large'
            >
              Contactez-nous maintenant
            </Button>
          </div>
        </div>
      ),
      title: 'Accompagnement Scolarité',
    },
    {
      id: 'traduction',
      label: 'Traduction',
      content:
        'Services de traduction professionnelle pour vos documents officiels, académiques ou personnels. Traduction certifiée et assermentée disponible.',
      title: 'Services de Traduction',
    },
  ];

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('administratif', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Accompagnements Complémentaires page initialization', () => {
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
      <div className='accompagnements-complementaires-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='accompagnements-complementaires'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='accompagnements-complementaires-container'>
        <h1>Accompagnements Complémentaires</h1>

        <div className='intro-text'>
          <p className='intro-main-text'>
            En vous inscrivant à nos cours, bénéficiez d'un accompagnement illimité et gratuit lors
            de vos différentes démarches en France. Notre accompagnement s'adapte à vos besoins et à
            votre niveau de français.
          </p>
          <p className='intro-subtitle'>Nous proposons une aide :</p>
          <div className='intro-features'>
            <p>
              <strong>À l'écrit</strong> : nous vous aidons à rédiger vos courriers, remplir vos
              formulaires administratifs, envoyer des e-mails officiels ou constituer vos dossiers
              (préfecture, CAF, sécurité sociale, etc.).
            </p>
            <p>
              <strong>À l'oral</strong> : nous vous préparons aux rendez-vous administratifs grâce à
              des simulations, explications simples, et conseils pour bien vous exprimer.
            </p>
            <p>
              <strong>En présentiel</strong> : si nécessaire, un membre de notre équipe peut vous
              accompagner physiquement à certains rendez-vous importants (préfecture, banque,
              assurance, médecin, école…) pour vous aider à comprendre, traduire ou simplement vous
              soutenir.
            </p>
          </div>
        </div>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default AccompagnementsComplementaires;
