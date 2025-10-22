import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LargeModal } from '../UI/Modales';
import './TeamSection.css';

const TeamSection = () => {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
      name: 'Marie Dubos',
      role: 'Directrice',
      photo:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      description:
        "Fondatrice et directrice de Bon Cours, passionnée par l'enseignement et les langues. Avec plus de 10 ans d'expérience dans le domaine de l'éducation linguistique, Marie a développé une approche pédagogique unique qui privilégie la pratique et l'immersion. Son expertise couvre le management pédagogique, la formation continue des enseignants et le développement stratégique de l'école. Elle accompagne chaque année plus de 500 étudiants dans leur apprentissage des langues, favorisant leur progression grâce à une méthode éprouvée et des cours personnalisés.",
      expertise: ['Management pédagogique', 'Formation continue', "Développement de l'école"],
      stats: { experience: '10+', students: '500+', languages: '4' },
      languages: ['Français', 'Anglais', 'Persan', 'Espagnol'],
    },
    {
      id: 1,
      name: 'James Mitchell',
      role: 'Anglais',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description:
        "Enseignant expérimenté spécialisé dans l'anglais commercial et académique. Avec plus de 8 ans d'expérience, il accompagne nos étudiants dans leur maîtrise de l'anglais pour les affaires, la préparation aux examens internationaux et la conversation quotidienne. Sa méthode privilégie l'immersion et la pratique orale pour garantir une progression rapide et durable.",
      expertise: ['Anglais des affaires', 'Préparation aux examens', 'Conversation'],
      stats: { experience: '8+', students: '300+', languages: '3' },
      languages: ['Anglais', 'Français', 'Allemand'],
    },
    {
      id: 2,
      name: 'Carmen Rodriguez',
      role: 'Espagnol',
      photo:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description:
        "Native espagnole avec une grande expérience dans l'enseignement. Elle partage sa passion pour la culture hispanique et la langue espagnole à travers des cours dynamiques qui combinent conversation, grammaire et découverte culturelle. Sa pédagogie adaptative permet à chaque étudiant de progresser selon son rythme tout en découvrant la richesse du monde hispanophone.",
      expertise: ['Espagnol conversationnel', 'Grammaire espagnole', 'Culture hispanique'],
      stats: { experience: '6+', students: '250+', languages: '3' },
      languages: ['Espagnol', 'Français', 'Anglais'],
    },
    {
      id: 3,
      name: 'Sophie Martin',
      role: 'Français',
      photo:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description:
        "Spécialiste du français langue étrangère et du soutien scolaire. Avec plus de 12 ans d'expérience, elle accompagne les étudiants internationaux dans l'apprentissage du français et aide les élèves francophones à consolider leurs acquis. Ses cours couvrent tous les aspects de la langue : grammaire, littérature, expression orale et écrite.",
      expertise: ['FLE', 'Soutien scolaire', 'Littérature française'],
      stats: { experience: '12+', students: '400+', languages: '3' },
      languages: ['Français', 'Anglais', 'Espagnol'],
    },
    {
      id: 4,
      name: 'Klaus Weber',
      role: 'Allemand',
      photo:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      description:
        "Enseignant multilingue spécialisé dans l'allemand moderne. Il maîtrise parfaitement les spécificités de la langue allemande et accompagne ses étudiants dans la préparation aux examens TestDaF et dans l'allemand des affaires. Sa connaissance approfondie de la culture germanique enrichit ses cours d'une dimension culturelle essentielle à l'apprentissage.",
      expertise: ['Allemand moderne', 'TestDaF', 'Allemand des affaires'],
      stats: { experience: '7+', students: '180+', languages: '4' },
      languages: ['Allemand', 'Français', 'Anglais', 'Italien'],
    },
    {
      id: 5,
      name: 'Giulia Romano',
      role: 'Italien',
      photo:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      description:
        "Native italienne passionnée par l'enseignement de sa langue maternelle. Avec une approche communicative et culturelle, elle fait découvrir la beauté de l'italien à travers la littérature, l'art et la gastronomie. Ses cours dynamiques combinent grammaire, conversation et découverte de la culture italienne pour un apprentissage complet et enrichissant.",
      expertise: ['Italien conversationnel', 'Culture italienne', 'Littérature italienne'],
      stats: { experience: '9+', students: '220+', languages: '4' },
      languages: ['Italien', 'Français', 'Anglais', 'Espagnol'],
    },
    {
      id: 6,
      name: 'Pedro Silva',
      role: 'Portugais',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      description:
        "Spécialiste du portugais brésilien et européen, il accompagne les étudiants dans l'apprentissage de cette langue riche et mélodieuse. Son expertise couvre aussi bien le portugais des affaires que la préparation aux examens officiels. Sa méthode privilégie l'oral et la compréhension culturelle pour une maîtrise authentique de la langue.",
      expertise: ['Portugais des affaires', 'Préparation aux examens', 'Culture lusophone'],
      stats: { experience: '5+', students: '150+', languages: '3' },
      languages: ['Portugais', 'Français', 'Anglais'],
    },
    {
      id: 7,
      name: 'Li Wei',
      role: 'Chinois',
      photo:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      description:
        "Enseignante native chinoise spécialisée dans l'enseignement du mandarin. Elle maîtrise parfaitement les techniques d'apprentissage des caractères chinois et accompagne ses étudiants dans la découverte de cette langue fascinante. Sa pédagogie adaptée aux francophones permet une progression naturelle dans l'écriture, la lecture et la conversation.",
      expertise: ['Mandarin', 'Caractères chinois', 'Culture chinoise'],
      stats: { experience: '8+', students: '120+', languages: '3' },
      languages: ['Chinois', 'Français', 'Anglais'],
    },
    {
      id: 8,
      name: 'Yuki Tanaka',
      role: 'Japonais',
      photo:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
      description:
        'Spécialiste du japonais avec une approche méthodique et progressive. Il enseigne les hiragana, katakana et kanji de manière structurée, tout en intégrant la culture japonaise dans ses cours. Sa patience et son expertise permettent aux étudiants de maîtriser cette langue complexe avec confiance et plaisir.',
      expertise: ['Japonais moderne', 'Écriture japonaise', 'Culture japonaise'],
      stats: { experience: '6+', students: '100+', languages: '3' },
      languages: ['Japonais', 'Français', 'Anglais'],
    },
    {
      id: 9,
      name: 'Elena Petrov',
      role: 'Russe',
      photo:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
      description:
        "Native russe avec une grande expérience dans l'enseignement du russe langue étrangère. Elle accompagne les étudiants dans l'apprentissage de l'alphabet cyrillique et de la grammaire russe complexe. Sa méthode progressive et ses explications claires rendent accessible cette langue slave fascinante.",
      expertise: ['Russe moderne', 'Alphabet cyrillique', 'Culture russe'],
      stats: { experience: '7+', students: '90+', languages: '4' },
      languages: ['Russe', 'Français', 'Anglais', 'Allemand'],
    },
    {
      id: 10,
      name: 'Ahmed Al-Rashid',
      role: 'Arabe',
      photo:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
      description:
        "Spécialiste de l'arabe moderne standard et des dialectes. Il enseigne l'arabe littéraire tout en introduisant les spécificités culturelles et linguistiques du monde arabe. Sa méthode équilibre l'écrit et l'oral pour une maîtrise complète de cette langue sémitique riche et expressive.",
      expertise: ['Arabe moderne', 'Dialectes arabes', 'Culture arabe'],
      stats: { experience: '10+', students: '110+', languages: '3' },
      languages: ['Arabe', 'Français', 'Anglais'],
    },
    {
      id: 11,
      name: 'Min-jung Kim',
      role: 'Coréen',
      photo:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description:
        "Enseignante coréenne passionnée par le partage de sa culture et de sa langue. Elle enseigne le hangeul (alphabet coréen) et accompagne les étudiants dans la découverte de cette langue asiatique moderne. Sa pédagogie adaptée aux francophones facilite l'apprentissage de la grammaire coréenne et de la prononciation.",
      expertise: ['Coréen moderne', 'Hangeul', 'Culture coréenne'],
      stats: { experience: '4+', students: '80+', languages: '3' },
      languages: ['Coréen', 'Français', 'Anglais'],
    },
    {
      id: 12,
      name: 'Reza Hosseini',
      role: 'Persan',
      photo:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description:
        "Spécialiste du persan (farsi) avec une connaissance approfondie de la littérature et de la culture persane. Il enseigne cette langue indo-européenne avec passion, en intégrant la poésie et les traditions persanes dans ses cours. Sa méthode progressive permet aux étudiants d'appréhender cette langue millénaire avec facilité.",
      expertise: ['Persan moderne', 'Littérature persane', 'Culture persane'],
      stats: { experience: '11+', students: '70+', languages: '4' },
      languages: ['Persan', 'Français', 'Anglais', 'Arabe'],
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
    const totalCards = currentMembers.length;
    const cardsPerRow = 3;
    const row = Math.floor(index / cardsPerRow);
    const cardsInThisRow = Math.min(cardsPerRow, totalCards - row * cardsPerRow);
    const isLastCardInRow = (index + 1) % cardsPerRow === 0 || index === totalCards - 1;

    // Si c'est la dernière carte de la ligne et qu'elle est seule
    return isLastCardInRow && cardsInThisRow === 1;
  };

  return (
    <div className='team-section'>
      <div className='team-section__header'>
        <h2 className='team-section__title'>Notre équipe</h2>
        <p className='team-section__subtitle'>Découvrez les experts qui vous accompagnent</p>
      </div>

      <div className='team-section__content'>
        <div className='team-section__grid'>
          {currentMembers.map((member, index) => (
            <div
              key={member.id}
              className={`team-section__card ${
                isCardAlone(index) ? 'team-section__card--alone' : ''
              } ${isVisible ? 'team-section__card--visible' : ''}`}
              onClick={() => handleCardClick(member)}
            >
              <div className='team-section__card-image'>
                <img src={member.photo} alt={member.name} loading='lazy' />

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
        {totalPages > 1 && (
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
        <div className='team-section__pagination-info'>
          <span>
            Affichage de {startIndex + 1} à {Math.min(endIndex, teamMembers.length)} sur{' '}
            {teamMembers.length} membres
          </span>
        </div>
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

            <div className='team-section__modal-sections'>
              <div className='team-section__modal-section'>
                <h4>Langues</h4>
                <div className='team-section__languages-list'>
                  {selectedMember.languages.map((language, langIndex) => (
                    <span key={langIndex} className='team-section__language-tag'>
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </LargeModal>
    </div>
  );
};

export default TeamSection;
