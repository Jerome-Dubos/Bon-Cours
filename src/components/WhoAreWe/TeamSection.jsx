import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LargeModal } from '../UI/Modales';
import { Button } from '../UI/Buttons/src';
import './TeamSection.css';

const TeamSection = () => {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlatLayout, setIsFlatLayout] = useState(false);
  const cardsPerPage = 6;

  // Déclencher l'animation quand le composant devient visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Petit délai pour s'assurer que le composant est monté

    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      id: 0,
      name: 'Florence',
      role: 'Fondatrice & Directrice',
      photo: encodeURI('/assets/images/team/Florence.webp'),
      description:
        "Fondatrice et directrice de Bon Cours, je partage depuis plus de dix ans ma passion pour les langues et l’enseignement avec des enfants, des adolescents et des adultes de profils variés. Ancienne élève allophone arrivée en France à l’âge de 12 ans, j’ai développé une compréhension fine des besoins d’apprentissage et conçois des programmes personnalisés, avec des outils adaptés qui favorisent la progression dans le respect du rythme de chacun·e.",
      languages: ['Français'],
    },
    {
      id: 1,
      name: 'Aya',
      role: 'Japonais',
      photo: encodeURI('/assets/images/team/Aya.webp'),
      description:
        "Native du Japon, j’enseigne le japonais depuis plus de dix ans à des apprenants de tous âges. Passionnée par la transmission de ma langue et de ma culture, je propose des cours dynamiques, bienveillants et adaptés à chacun, pour apprendre le japonais avec plaisir et confiance.",
      languages: ['Japonais'],
    },
    {
      id: 2,
      name: 'Maryse',
      role: 'Français & Anglais / Aide aux devoirs',
      photo: encodeURI('/assets/images/team/Maryse.webp'),
      description:
        "Professeure de français et d'anglais, je propose à l'Institut Bon Cours de l'aide aux devoirs dans toutes les matières aux élèves de primaire, collège et lycée. Ma pédagogie est adaptée aux élèves souffrants de troubles dys. J'accompagne également les élèves dans la préparation du brevet et du bac.",
      languages: ['Français', 'Anglais'],
    },
    {
      id: 3,
      name: 'Qin',
      role: 'Chinois',
      photo: encodeURI('/assets/images/team/Qin.webp'),
      description:
        "Passionnée par la langue et la culture chinoises, j’aime partager ce patrimoine unique avec mes élèves. Diplômée d’un Master 2 en Didactique des Langues à l’Université du Maine, j’enseigne le chinois mandarin à des apprenants de tous âges, en adaptant mes méthodes — académiques, interactives ou ludiques — selon leurs besoins et leurs objectifs.",
      languages: ['Chinois'],
    },
    {
      id: 4,
      name: 'Célia',
      role: 'Coach sportive',
      photo: encodeURI('/assets/images/team/Celia.webp'),
      description:
        'Coach sportive diplômée d’un Master "Entraînement, Sport et Santé", je propose des séances ludiques et variées axées sur le renforcement musculaire et le cardio adaptées à tous les niveaux. J\'accorde une attention particulière à la bonne exécution des mouvements, à la progression et au plaisir de bouger, dans une approche à la fois bienveillante et stimulante.',
      languages: [],
    },
    {
      id: 5,
      name: 'Melissa',
      role: 'Anglais',
      photo: encodeURI('/assets/images/team/Melissa.webp'),
      description:
        "Formatrice native d’anglais britannique (niveau 5 du TOEIC), j'ai plus de 5 ans d’expérience en France auprès d’entreprises, d’universités et d’enfants de 3 à 16 ans. Avec mon parcours d'assistante pédagogique pour enfants à besoins éducatifs particuliers, je m’adapte aux besoins de chacun afin de rendre l’apprentissage agréable. Ma philosophie : aucune question n’est ridicule !",
      languages: ['Anglais'],
    },
    {
      id: 6,
      name: 'Noémie',
      role: 'Français & Anglais',
      photo: encodeURI('/assets/images/team/Noemie.webp'),
      description:
        "Diplômée en FLE et en anglais, j'ai enseigné ces disciplines à divers publics adolescents et adultes en Angleterre et en France, dont plusieurs années au sein de nombreuses facultés et écoles supérieures de l'université de Strasbourg, en présentiel et en ligne, du niveau A1 au C2, affectionnant particulièrement l'approche actionnelle, participative et inclusive.",
      languages: ['Français', 'Anglais'],
    },
    {
      id: 7,
      name: 'Olivia',
      role: 'Français',
      photo: encodeURI('/assets/images/team/Olivia.webp'),
      description:
        "Une langue, c'est comme un jeu de construction. Une fois qu'on en saisit les composants, les créations sont infinies ! Apprendre avec moi, c'est gagner en confiance en s'amusant avec la langue française. Je vous fournirai la boîte à outils qui correspond à vos objectifs personnels pour la langue, le tout dans une atmosphère chaleureuse et de confiance.",
      languages: ['Français'],
    },
    {
      id: 8,
      name: 'Domenico',
      role: 'Italien',
      photo: encodeURI('/assets/images/team/Domenico.webp'),
      description:
        "Enseignant d’italien, j’accompagne mes élèves dans la découverte vivante de la langue et de la culture italiennes à travers des échanges, des activités créatives et des projets collaboratifs. Ma démarche privilégie la communication, l’autonomie et le plaisir d’apprendre. Grâce à des supports variés – musique, vidéos, jeux et outils numériques – je cherche à éveiller la curiosité et à encourager l’expression personnelle.",
      languages: ['Italien'],
    },
    {
      id: 9,
      name: 'Gizem',
      role: 'Turc',
      photo: encodeURI('/assets/images/team/Gizem.webp'),
      description:
        "Envie de découvrir le turc dans une ambiance conviviale, ludique et ouverte sur le monde ? Grâce à mes méthodes adaptées à différents niveaux, j'enseigne cette langue unique à des apprenants de tous âges avec plaisir. Venez rejoindre mes cours !",
      languages: ['Turc'],
    },
    {
      id: 10,
      name: 'Homere',
      role: 'Mathématiques & Physique (Parcours Homère)',
      photo: encodeURI('/assets/images/team/homere.webp'),
      description:
        "Fraîchement diplômé de l'INSA Strasbourg en tant qu'Ingénieur en Génie Civil, je travaille pour Parcours Homère depuis maintenant 2 ans. Mon but est de transmettre les savoirs en Mathématiques et en Physique avec un aspect ludique aux personnes qui en ont besoin, leur proposant ainsi une alternative aux cours plus classiques. Parcours Homère, ce sont des sciences, bien évidemment, mais bien plus encore!",
      languages: [],
    },
    {
      id: 11,
      name: 'Daiane',
      role: 'Portugais, Anglais & Espagnol',
      photo: encodeURI('/assets/images/team/Daiane.webp'),
      description:
        "Enseignante expérimentée et passionnée par les langues vivantes, je suis titulaire de deux Masters 2 en enseignement et en littérature. J’enseigne le portugais, l’anglais et l’espagnol à des publics variés, de tous âges et niveaux, selon leurs objectifs d’apprentissage. J’adopte une pédagogie dynamique et bienveillante qui encourage la communication, la confiance en soi et le plaisir d’apprendre.",
      languages: ['Portugais', 'Anglais', 'Espagnol'],
    },
    {
      id: 12,
      name: 'Mariia',
      role: 'Russe, Anglais & Mandarin',
      photo: encodeURI('/assets/images/team/Mariia.webp'),
      description:
        "Passionnée des langues et de leur transmission, je parle russe, anglais et mandarin, et j’apprends actuellement le français (niveau B1). Ayant vécu à l’étranger depuis 2013, j’accorde une grande importance aux échanges culturels et j’aime rencontrer des personnes du monde entier!",
      languages: ['Russe', 'Anglais', 'Mandarin'],
    },
    {
      id: 13,
      name: 'Malou',
      role: 'Coach sportive & Danse',
      photo: encodeURI('/assets/images/team/Malou.webp'),
      description:
        'Coach sportive, professeure de danse, animatrice et chorégraphe en club, j’ai décidé d’en faire mon métier. Donner du bonheur aux gens en alliant forme, joie et bien-être! À l’écoute du corps et de chacun, mon but est de donner ou redonner confiance à travers le corps.',
      languages: [],
    },
    {
      id: 14,
      name: 'Diana',
      role: 'Espagnol',
      photo: encodeURI('/assets/images/team/Diana.webp'),
      imagePosition: 'center 20%',
      description:
        "J'ai dix ans d'expérience dans l'enseignement de l'espagnol ELE. Ma méthode est pratique et communicative, privilégiant l'expression orale. J'utilise des jeux, des supports variés et des activités dynamiques pour vous immerger rapidement. L'objectif est d'atteindre une aisance réelle tout en s'assurant que le plaisir et l'amusement restent au cœur de votre apprentissage. C'est la clé pour progresser !",
      languages: ['Espagnol'],
    },
    {
      id: 15,
      name: 'Matthieu',
      role: 'Fondateur de Parcours Homère, Professeur de Sciences',
      photo: encodeURI('/assets/images/team/homere.webp'),
      description:
        "Fondateur de Parcours Homère, Professeur de Sciences (Collège et Lycée), j’ai développé une solide expérience de l’enseignement et de l’aide aux devoirs. J’ai acquis la certitude que la transmission des connaissances (du simple vers le complexe) représente bien plus que d’appliquer de simples techniques pédagogiques. Il nous faut également réunir la chaleur humaine, la conviction, l’enthousiasme, qualités sans lesquelles un simple tutoriel suffirait à instruire, mais de manière très incomplète, de nombreux élèves.",
      languages: [],
    },
    {
      id: 16,
      name: 'Léon',
      role: 'Tutorat en sciences (Maths, Physique-Chimie, SI) - Parcours Homère',
      photo: encodeURI('/assets/images/team/homere.webp'),
      description:
        "Je travaille via le parcours Homère pour du tutorat en sciences, plus particulièrement les mathématiques, physique chimie et sciences de l’ingénieur. La méthode de travail est basée sur la transmission des savoirs, en détectant les problèmes sur certaines notions. Ensuite, nous travaillons avec des exercices ciblés sur les points faibles de l'élève/étudiant.",
      languages: [],
    },
  ];

  const handleCardClick = member => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // Calculs de pagination
  const totalPages = Math.ceil(teamMembers.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentMembers = teamMembers.slice(startIndex, endIndex);
  const displayedMembers = isFlatLayout ? teamMembers : currentMembers;

  // Fonctions de navigation
  const goToPage = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fonction pour déterminer si une carte est seule sur sa ligne
  const isCardAlone = index => {
    if (isFlatLayout) return false;
    const totalCards = currentMembers.length;
    const cardsPerRow = 3;
    const row = Math.floor(index / cardsPerRow);
    const cardsInThisRow = Math.min(cardsPerRow, totalCards - row * cardsPerRow);
    const isLastCardInRow = (index + 1) % cardsPerRow === 0 || index === totalCards - 1;

    // Si c'est la dernière carte de la ligne et qu'elle est seule
    return isLastCardInRow && cardsInThisRow === 1;
  };

  return (
    <div className={`team-section ${isFlatLayout ? 'team-section--flat' : ''}`}>
      <div className='team-section__header'>
        <h2 className='team-section__title'>Notre équipe</h2>
        <p className='team-section__subtitle'>Découvrez les experts qui vous accompagnent</p>
        <div className='team-section__toolbar'>
          <Button
            variant='outline'
            size='medium'
            onClick={() => setIsFlatLayout(v => !v)}
            aria-pressed={isFlatLayout}
          >
            {isFlatLayout ? 'Afficher par pages' : 'Afficher tout (5 par ligne)'}
          </Button>
        </div>
      </div>

      <div className='team-section__content'>
        <div className='team-section__grid'>
          {displayedMembers.map((member, index) => (
            <div
              key={member.id}
              className={`team-section__card ${
                isCardAlone(index) ? 'team-section__card--alone' : ''
              } ${isVisible ? 'team-section__card--visible' : ''}`}
              onClick={() => handleCardClick(member)}
            >
              <div className='team-section__card-image'>
                <img
                  src={member.photo}
                  alt={member.name}
                  loading='lazy'
                  style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
                />

                {/* Overlay avec infos au hover */}
                <div className='team-section__card-overlay'>
                  <div className='team-section__overlay-content'>
                    <div className='team-section__overlay-main'>
                      <div className='team-section__overlay-role'>
                        <span className='team-section__role-badge'>{member.role}</span>
                      </div>

                      <div className='team-section__overlay-description'>
                        <p>{member.description.substring(0, 100)}...</p>
                      </div>
                    </div>

                    <div className='team-section__overlay-cta'>
                      <span>Cliquez pour en savoir plus</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge avec le nom en bas */}
              <div className='team-section__card-badge'>
                <h3 className='team-section__card-name'>{member.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Contrôles de pagination */}
        {!isFlatLayout && totalPages > 1 && (
          <div className='team-section__pagination'>
            <button
              className='team-section__pagination-btn team-section__pagination-btn--prev'
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              aria-label='Page précédente'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <polyline points='15,18 9,12 15,6'></polyline>
              </svg>
              Précédent
            </button>

            <div className='team-section__pagination-numbers'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`team-section__pagination-number ${
                    currentPage === page ? 'team-section__pagination-number--active' : ''
                  }`}
                  onClick={() => goToPage(page)}
                  aria-label={`Aller à la page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className='team-section__pagination-btn team-section__pagination-btn--next'
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              aria-label='Page suivante'
            >
              Suivant
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <polyline points='9,18 15,12 9,6'></polyline>
              </svg>
            </button>
          </div>
        )}

        {/* Informations de pagination */}
        {!isFlatLayout && (
          <div className='team-section__pagination-info'>
            <span>
              Affichage de {startIndex + 1} à {Math.min(endIndex, teamMembers.length)} sur {teamMembers.length} membres
            </span>
          </div>
        )}
      </div>

      {/* Modal pour les détails */}
      <LargeModal
        isOpen={!!selectedMember}
        onClose={closeModal}
        title={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
            }}
          >
            <img
              src={selectedMember?.photo}
              alt={selectedMember?.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <span>{selectedMember?.name}</span>
          </div>
        }
      >
        {selectedMember && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <div className='team-section__modal-role'>
                <span className='team-section__role-badge'>{selectedMember.role}</span>
              </div>
            </div>

            <p className='team-section__modal-description'>{selectedMember.description}</p>
          </>
        )}
      </LargeModal>
    </div>
  );
};

export default TeamSection;
