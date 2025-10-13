import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaBullseye, FaClock, FaUserGraduate, FaUsers } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './Examens.css';

const Examens = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Définir les onglets disponibles
  const tabs = [
    {
      id: 'certifications',
      label: 'Certifications',
      content: (
        <div className='certifications-content'>
          <p className='certifications-intro'>
            Même si notre organisme ne délivre pas directement de certifications linguistiques, nos
            formateurs expérimentés vous accompagnent dans la préparation aux principaux examens
            officiels, reconnus au niveau national et international. Nos formateurs vous offrent un
            suivi personnalisé, des ressources adaptées et des conseils méthodologiques pour
            maximiser vos chances de réussite.
          </p>

          <p className='certifications-methods'>
            Que ce soit en cours individuels ou en petits groupes, nos programmes sont adaptés à
            votre niveau et à l'examen ciblé. Nos formateurs vous aideront à :
          </p>

          <ul className='certifications-list'>
            <li>
              Consolider les compétences évaluées (compréhension orale, écrite, expression orale et
              écrite)
            </li>
            <li>Vous familiariser avec le format et les exigences de l'examen</li>
            <li>Gagner en confiance grâce à des simulations et des exercices types</li>
          </ul>

          <div className='certifications-note'>
            <p>
              <strong>Remarque :</strong> l'inscription à ces examens se fait directement auprès des
              centres agréés. Nous vous guidons dans les démarches si besoin.
            </p>
          </div>

          <div className='certifications-cta'>
            <p>
              Contactez-nous dès maintenant pour définir un programme de préparation adapté à vos
              besoins, à votre niveau et à votre échéance.
            </p>
            <Link to='/contact' className='cta-button'>
              Nous contacter
            </Link>
          </div>

          <div className='certifications-exams'>
            <h3>Certifications que vous pouvez préparer avec nous :</h3>

            <div className='certifications-grid'>
              {/* Français */}
              <div className='certification-card'>
                <div className='certification-header'>
                  <div className='certification-flag'>🇫🇷</div>
                  <h4>Français</h4>
                </div>
                <div className='certification-list'>
                  <div className='certification-item'>
                    <span className='certification-name'>DELF / DALF</span>
                    <span className='certification-desc'>
                      Diplôme d'Études / Approfondi de Langue Française
                    </span>
                  </div>
                  <div className='certification-item'>
                    <span className='certification-name'>TCF</span>
                    <span className='certification-desc'>Test de Connaissance du Français</span>
                  </div>
                  <div className='certification-item'>
                    <span className='certification-name'>TEF</span>
                    <span className='certification-desc'>Test d'Évaluation de Français</span>
                  </div>
                </div>
              </div>

              {/* Anglais */}
              <div className='certification-card'>
                <div className='certification-header'>
                  <div className='certification-flag'>🇬🇧</div>
                  <h4>Anglais</h4>
                </div>
                <div className='certification-list'>
                  <div className='certification-item'>
                    <span className='certification-name'>TOEIC</span>
                    <span className='certification-desc'>
                      Test of English for International Communication
                    </span>
                  </div>
                  <div className='certification-item'>
                    <span className='certification-name'>TOEFL</span>
                    <span className='certification-desc'>
                      Test of English as a Foreign Language
                    </span>
                  </div>
                  <div className='certification-item'>
                    <span className='certification-name'>IELTS</span>
                    <span className='certification-desc'>
                      International English Language Testing System
                    </span>
                  </div>
                  <div className='certification-item'>
                    <span className='certification-name'>Cambridge English</span>
                    <span className='certification-desc'>First, Advanced, Proficiency</span>
                  </div>
                </div>
              </div>

              {/* Autres langues */}
              <div className='certification-card'>
                <div className='certification-header'>
                  <div className='certification-flag'>🌍</div>
                  <h4>Autres langues</h4>
                </div>
                <div className='certification-list'>
                  <div className='certification-item'>
                    <span className='certification-name'>Goethe-Zertifikat</span>
                    <span className='certification-desc'>Allemand</span>
                  </div>
                  <div className='certification-item'>
                    <span className='certification-name'>DELE</span>
                    <span className='certification-desc'>Espagnol</span>
                  </div>
                  <div className='certification-item'>
                    <span className='certification-name'>PLIDA / CILS</span>
                    <span className='certification-desc'>Italien</span>
                  </div>
                  <div className='certification-item'>
                    <span className='certification-name'>HSK</span>
                    <span className='certification-desc'>Mandarin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      title: 'Préparation aux Certifications',
    },
    {
      id: 'naturalisation',
      label: 'Naturalisation',
      content: (
        <div className='naturalisation-content'>
          <div className='naturalisation-intro'>
            <h3>Vous souhaitez devenir citoyen français ?</h3>
            <p>
              Notre centre vous accompagne dans la préparation à l'entretien individuel de
              naturalisation, une étape-clé du processus d'acquisition de la nationalité française.
            </p>
          </div>

          <div className='naturalisation-accompaniment'>
            <h4>Un accompagnement personnalisé</h4>
            <p>
              L'entretien de naturalisation évalue non seulement votre niveau de français, mais
              aussi votre connaissance des valeurs de la République et de la culture française. Nos
              formateurs vous aident à vous préparer sereinement en travaillant sur les points
              essentiels :
            </p>
            <ul className='naturalisation-points'>
              <li>
                <strong>Amélioration de l'expression orale :</strong> parler de soi, de son
                parcours, de ses motivations, etc.
              </li>
              <li>
                <strong>Révision des éléments civiques :</strong> droits et devoirs du citoyen,
                institutions françaises, symboles de la République...
              </li>
              <li>
                <strong>Entraînement à l'entretien :</strong> simulations dans les conditions
                réelles, questions types, conseils pratiques.
              </li>
            </ul>
          </div>

          <div className='naturalisation-target'>
            <h4>Pour qui ?</h4>
            <p>
              Ce programme s'adresse à toute personne ayant déposé ou souhaitant déposer une demande
              de naturalisation par décret ou par mariage, et souhaitant se préparer sérieusement à
              l'entretien réalisé par un agent de la préfecture.
            </p>
          </div>

          <div className='naturalisation-formula'>
            <h4>Formule souple</h4>
            <div className='formula-features'>
              <div className='formula-item'>
                <FaUserGraduate className='formula-icon' />
                <span>Cours individuels personnalisés selon vos besoins et votre niveau</span>
              </div>
              <div className='formula-item'>
                <FaUsers className='formula-icon' />
                <span>
                  Ateliers collectifs pour s'entraîner à l'oral et partager les expériences
                </span>
              </div>
              <div className='formula-item'>
                <FaClock className='formula-icon' />
                <span>Horaires flexibles en présentiel ou à distance</span>
              </div>
              <div className='formula-item'>
                <FaBullseye className='formula-icon' />
                <span>
                  Notre objectif : vous aider à aborder l'entretien avec confiance et sérénité.
                </span>
              </div>
            </div>
          </div>

          <div className='naturalisation-cta'>
            <p>Contactez-nous pour un premier échange et un programme adapté à votre situation.</p>
            <Link to='/contact' className='cta-button'>
              Nous contacter
            </Link>
          </div>
        </div>
      ),
      title: 'Préparation Naturalisation',
    },
  ];

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('certifications', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Examens page initialization', () => {
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
      <div className='examens-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='examens'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='examens-container'>
        <h1>Examens</h1>

        <p className='intro-text'>
          Chez Bon Cours, nous vous accompagnons dans la préparation d'un examen ou de votre
          entretien de naturalisation.
        </p>

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>
    </motion.div>
  );
};

export default Examens;
