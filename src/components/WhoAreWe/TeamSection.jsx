import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LargeModal } from '../UI/Modales';
import './TeamSection.css';

const TeamSection = () => {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

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
      name: "Professeur d'Anglais",
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
      name: "Professeur d'Espagnol",
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
      name: 'Professeur de Français',
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
      name: "Professeur d'Allemand",
      role: 'Allemand',
      photo:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      description:
        "Enseignant multilingue spécialisé dans l'allemand moderne. Il maîtrise parfaitement les spécificités de la langue allemande et accompagne ses étudiants dans la préparation aux examens TestDaF et dans l'allemand des affaires. Sa connaissance approfondie de la culture germanique enrichit ses cours d'une dimension culturelle essentielle à l'apprentissage.",
      expertise: ['Allemand moderne', 'TestDaF', 'Allemand des affaires'],
      stats: { experience: '7+', students: '180+', languages: '4' },
      languages: ['Allemand', 'Français', 'Anglais', 'Italien'],
    },
  ];

  const handleCardClick = member => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // Fonction pour déterminer si une carte est seule sur sa ligne
  const isCardAlone = index => {
    const totalCards = teamMembers.length;
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
          {teamMembers.map((member, index) => (
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
