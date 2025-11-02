import React, { useEffect, useMemo, useState } from 'react';
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
        id: 11,
        name: 'Célia',
        translationKey: 'celia',
        photo: encodeURI('/assets/images/team/Celia.webp'),
        languages: [],
      },
      {
        id: 12,
        name: 'Malou',
        translationKey: 'malou',
        photo: encodeURI('/assets/images/team/Malou.webp'),
        languages: [],
      },
      {
        id: 13,
        name: 'Matthieu',
        translationKey: 'matthieu',
        photo: encodeURI('/assets/images/team/homere.webp'),
        languages: [],
      },
      {
        id: 14,
        name: 'Léon',
        translationKey: 'leon',
        photo: encodeURI('/assets/images/team/homere.webp'),
        languages: [],
      },
      {
        id: 15,
        name: 'Mattéo',
        translationKey: 'matteo',
        photo: encodeURI('/assets/images/team/homere.webp'),
        languages: [],
      },
      {
        id: 16,
        name: 'Maryse',
        translationKey: 'maryse',
        photo: encodeURI('/assets/images/team/Maryse.webp'),
        languages: ['Français', 'Anglais'],
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

  // Calculs de pagination
  const totalPages = Math.ceil(enrichedMembers.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentMembers = enrichedMembers.slice(startIndex, endIndex);
  const displayedMembers = isFlatLayout ? enrichedMembers : currentMembers;

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
        <h2 className='team-section__title'>{t('qui_sommes_nous.team_title')}</h2>
        <p className='team-section__subtitle'>{t('qui_sommes_nous.team_subtitle')}</p>
        <div className='team-section__toolbar'>
          <Button
            variant='outline'
            size='medium'
            onClick={() => setIsFlatLayout(v => !v)}
            aria-pressed={isFlatLayout}
          >
            {isFlatLayout ? t('qui_sommes_nous.team_show_pages') : t('qui_sommes_nous.team_show_all')}
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
                      <span>{t('qui_sommes_nous.team_click_more')}</span>
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
              {t('qui_sommes_nous.team_previous')}
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
              {t('qui_sommes_nous.team_next')}
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
              {t('qui_sommes_nous.team_display_info')} {startIndex + 1} {t('qui_sommes_nous.team_display_from')} {Math.min(endIndex, enrichedMembers.length)} {t('qui_sommes_nous.team_display_of')} {enrichedMembers.length} {t('qui_sommes_nous.team_display_members')}
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
