import React, { useEffect, useMemo, useState } from 'react';
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

  const teamMembers = useMemo(
    () => [
      {
        id: 0,
        name: 'Florence',
        translationKey: 'florence',
        photo: encodeURI('/assets/images/team/Florence.webp'),
        languages: ['Français'],
      },
      {
        id: 1,
        name: 'Olivia',
        translationKey: 'olivia',
        photo: encodeURI('/assets/images/team/Olivia.webp'),
        languages: ['Français'],
      },
      {
        id: 2,
        name: 'Noémie',
        translationKey: 'noemie',
        photo: encodeURI('/assets/images/team/Noemie.webp'),
        languages: ['Français', 'Anglais'],
      },
      {
        id: 3,
        name: 'Melissa',
        translationKey: 'melissa',
        photo: encodeURI('/assets/images/team/Melissa.webp'),
        languages: ['Anglais'],
      },
      {
        id: 4,
        name: 'Diana',
        translationKey: 'diana',
        photo: encodeURI('/assets/images/team/Diana.webp'),
        imagePosition: 'center 20%',
        languages: ['Espagnol'],
      },
      {
        id: 5,
        name: 'Domenico',
        translationKey: 'domenico',
        photo: encodeURI('/assets/images/team/Domenico.webp'),
        languages: ['Italien'],
      },
      {
        id: 6,
        name: 'Daiane',
        translationKey: 'daiane',
        photo: encodeURI('/assets/images/team/Daiane.webp'),
        languages: ['Portugais', 'Anglais', 'Espagnol'],
      },
      {
        id: 7,
        name: 'Gizem',
        translationKey: 'gizem',
        photo: encodeURI('/assets/images/team/Gizem.webp'),
        languages: ['Turc'],
      },
      {
        id: 8,
        name: 'Mariia',
        translationKey: 'mariia',
        photo: encodeURI('/assets/images/team/Mariia.webp'),
        languages: ['Russe', 'Anglais', 'Mandarin'],
      },
      {
        id: 9,
        name: 'Qin',
        translationKey: 'qin',
        photo: encodeURI('/assets/images/team/Qin.webp'),
        languages: ['Chinois'],
      },
      {
        id: 10,
        name: 'Aya',
        translationKey: 'aya',
        photo: encodeURI('/assets/images/team/Aya.webp'),
        languages: ['Japonais'],
      },
      {
        id: 12,
        name: 'Célia',
        translationKey: 'celia',
        photo: encodeURI('/assets/images/team/Celia.webp'),
        languages: [],
      },
      {
        id: 13,
        name: 'Malou',
        translationKey: 'malou',
        photo: encodeURI('/assets/images/team/Malou.webp'),
        languages: [],
      },
      {
        id: 11,
        name: 'Maryse',
        translationKey: 'maryse',
        photo: encodeURI('/assets/images/team/Maryse.webp'),
        languages: ['Français', 'Anglais'],
      },
      {
        id: 14,
        name: 'Matthieu',
        translationKey: 'matthieu',
        photo: encodeURI('/assets/images/team/homere.webp'),
        languages: [],
      },
      {
        id: 15,
        name: 'Léon',
        translationKey: 'leon',
        photo: encodeURI('/assets/images/team/homere.webp'),
        languages: [],
      },
      {
        id: 16,
        name: 'Mattéo',
        translationKey: 'matteo',
        photo: encodeURI('/assets/images/team/homere.webp'),
        languages: [],
      },
    ],
    []
  );

  const handleCardClick = member => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // Enrichir les membres avec leurs traductions
  const enrichedMembers = useMemo(() => {
    return teamMembers.map(member => ({
      ...member,
      role: t(`qui_sommes_nous.team_members.${member.translationKey}.role`),
      description: t(`qui_sommes_nous.team_members.${member.translationKey}.description`),
    }));
  }, [teamMembers, t]);

  // Afficher toutes les cartes
  const displayedMembers = enrichedMembers;

  return (
    <div className='team-section team-section--flat'>
      <div className='team-section__header'>
        <h2 className='team-section__title'>{t('qui_sommes_nous.team_title')}</h2>
        <p className='team-section__subtitle'>{t('qui_sommes_nous.team_subtitle')}</p>
      </div>

      <div className='team-section__content'>
        <div className='team-section__grid'>
          {displayedMembers.map((member, index) => (
            <div
              key={member.id}
              className={`team-section__card ${isVisible ? 'team-section__card--visible' : ''}`}
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
                        <p>{member.description.substring(0, 60)}...</p>
                      </div>
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
          </>
        )}
      </LargeModal>
    </div>
  );
};

export default TeamSection;
