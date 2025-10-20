import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  IoChevronBackOutline,
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoDesktopOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoStopwatchOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { Button } from '../Buttons';
import { ContactForm as ContactFormComponent } from '../Forms';
import { Loader } from '../Loaders';
import { LargeModal } from '../Modales';
import './ScheduleSection.css';

// Fonction de traduction française optimisée avec cache
const frenchTranslator = (() => {
  const translations = {
    'languages.spanish': 'Espagnol',
    'languages.english': 'Anglais',
    'languages.german': 'Allemand',
    'languages.french': 'Français',
    'languages.italian': 'Italien',
    'languages.portuguese': 'Portugais',
    'languages.dutch': 'Néerlandais',
    'languages.turkish': 'Turc',
    'languages.arabic': 'Arabe',
    'languages.chinese': 'Chinois',
    'languages.japanese': 'Japonais',
    'languages.russian': 'Russe',
    'languages.polish': 'Polonais',
    'languages.czech': 'Tchèque',
    'languages.hungarian': 'Hongrois',
    'languages.romanian': 'Roumain',
    'languages.bulgarian': 'Bulgare',
    'languages.croatian': 'Croate',
    'languages.serbian': 'Serbe',
    'languages.slovak': 'Slovaque',
    'languages.slovenian': 'Slovène',
    'languages.estonian': 'Estonien',
    'languages.latvian': 'Letton',
    'languages.lithuanian': 'Lituanien',
    'languages.finnish': 'Finnois',
    'languages.swedish': 'Suédois',
    'languages.norwegian': 'Norvégien',
    'languages.danish': 'Danois',
    'languages.icelandic': 'Islandais',
    'languages.greek': 'Grec',
    'languages.hebrew': 'Hébreu',
    'languages.hindi': 'Hindi',
    'languages.korean': 'Coréen',
    'languages.thai': 'Thaï',
    'languages.vietnamese': 'Vietnamien',
    'languages.indonesian': 'Indonésien',
    'languages.malay': 'Malais',
    'languages.filipino': 'Filipino',
    'languages.swahili': 'Swahili',
    'languages.amharic': 'Amharique',
    'languages.yoruba': 'Yoruba',
    'languages.zulu': 'Zoulou',
    'languages.afrikaans': 'Afrikaans',
    'languages.urdu': 'Ourdou',
    'languages.bengali': 'Bengali',
    'languages.tamil': 'Tamoul',
    'languages.telugu': 'Télougou',
    'languages.marathi': 'Marathi',
    'languages.gujarati': 'Gujarati',
    'languages.punjabi': 'Pendjabi',
    'languages.kannada': 'Kannada',
    'languages.malayalam': 'Malayalam',
    'languages.odia': 'Odia',
    'languages.assamese': 'Assamais',
    'languages.kashmiri': 'Cachemiri',
    'languages.nepali': 'Népalais',
    'languages.sinhala': 'Cingalais',
    'languages.burmese': 'Birman',
    'languages.khmer': 'Khmer',
    'languages.lao': 'Lao',
    'languages.mongolian': 'Mongol',
    'languages.tibetan': 'Tibétain',
    'languages.uzbek': 'Ouzbek',
    'languages.kazakh': 'Kazakh',
    'languages.kyrgyz': 'Kirghiz',
    'languages.tajik': 'Tadjik',
    'languages.turkmen': 'Turkmène',
    'languages.afghan': 'Afghan',
    'languages.persian': 'Persan',
    'languages.dari': 'Dari',
    'languages.pashto': 'Pachto',
    'languages.balochi': 'Baloutchi',
    'languages.sindhi': 'Sindhi',
    'languages.saraiki': 'Saraiki',
    'languages.brahui': 'Brahui',
    'languages.hazara': 'Hazara',
    'languages.aimaq': 'Aimaq',
    'languages.nuristani': 'Nuristani',
    'languages.pashayi': 'Pashayi',
    'languages.waigali': 'Waigali',
    'languages.ashkun': 'Ashkun',
    'languages.kamkata': 'Kamkata',
    'languages.vasi': 'Vasi',
    'languages.tregami': 'Tregami',
    'languages.kalasha': 'Kalasha',
    'languages.khowar': 'Khowar',
    'languages.shina': 'Shina',
    'languages.balti': 'Balti',
    'languages.burushaski': 'Burushaski',
    'languages.wakhi': 'Wakhi',
    'languages.yidgha': 'Yidgha',
    'languages.munji': 'Munji',
    'languages.ishkashimi': 'Ishkashimi',
    'languages.sanglechi': 'Sanglechi',
    'languages.zebaki': 'Zebaki',
    'languages.sarikoli': 'Sarikoli',
    'languages.yagnobi': 'Yagnobi',
    'languages.levels.adult': 'Adulte',
    'languages.levels.child': 'Enfant',
    'LEVELS.ADULT': 'Adulte',
    'LEVELS.CHILD': 'Enfant',
    'levels.adult': 'Adulte',
    'levels.child': 'Enfant',
    'types.presentiel': 'Présentiel',
    'types.visio': 'Visioconférence',
    'TYPES.PRESENTIEL': 'Présentiel',
    'TYPES.VISIO': 'Visioconférence',
  };

  return key => translations[key] || key;
})();

// Fonction de traduction des données de planning
const translateScheduleData = (data, translator) => {
  if (!data) return {};

  const translated = {};

  Object.keys(data).forEach(level => {
    translated[level] = {};
    Object.keys(data[level] || {}).forEach(type => {
      translated[level][type] = {};
      Object.keys(data[level][type] || {}).forEach(day => {
        translated[level][type][day] = (data[level][type][day] || []).map(course => ({
          ...course,
          language: translator(course.languageKey) || course.language,
          level: translator(course.levelKey) || course.level,
          type: translator(course.typeKey) || course.type,
        }));
      });
    });
  });

  return translated;
};

// Fonction de soumission personnalisée pour le formulaire d'intérêt
const handleInterestSubmit = async (data, course, onClose, onSubmit) => {
  try {
    if (onSubmit) {
      const result = await onSubmit(data, course);
      if (result.success) {
        onClose();
        return true;
      } else {
        throw new Error(result.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } else {
      // Comportement par défaut si aucune fonction de soumission n'est fournie
      console.log('Données du formulaire:', data);
      console.log('Cours sélectionné:', course);
      onClose();
      return true;
    }
  } catch (error) {
    throw error;
  }
};

const ScheduleSection = ({
  title = 'Planning des cours',
  description = 'Découvrez nos cours disponibles en présentiel et en visioconférence',
  coursesData = {},
  loading = false,
  error = null,
  onInterestSubmit = null,
  onCourseClick = null,
  coursesPerPage = 3,
  showEmptyMessage = true,
  emptyMessage = {
    title: 'Nouvelle session en préparation',
    text: 'Nous préparons actuellement notre nouvelle session de cours qui débutera en octobre. Notre équipe pédagogique met en place un programme enrichi avec de nouveaux créneaux horaires pour mieux répondre à vos besoins.',
    features: [
      { icon: <IoPersonOutline />, text: 'Cours adultes et enfants' },
      { icon: <IoDesktopOutline />, text: 'Présentiel et visioconférence' },
      { icon: <IoTimeOutline />, text: 'Horaires flexibles' },
    ],
  },
  className = '',
  startDate = '2024-01-15',
  weekDays = 7,
  levelTabs = [
    {
      id: 'adult',
      label: 'Cours adulte',
      icon: <IoPersonOutline />,
      description: 'Pour les adultes',
    },
    {
      id: 'child',
      label: 'Cours enfant',
      icon: <IoPeopleOutline />,
      description: 'Pour les enfants',
    },
  ],
  typeTabs = [
    {
      id: 'presentiel',
      label: 'Présentiel',
      icon: <IoSchoolOutline />,
      description: 'En salle de classe',
    },
    {
      id: 'visio',
      label: 'Visioconférence',
      icon: <IoDesktopOutline />,
      description: 'En ligne depuis chez vous',
    },
  ],
  translator = frenchTranslator,
  ...props
}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLevel, setActiveLevel] = useState(levelTabs[0]?.id || 'adult');
  const [activeType, setActiveType] = useState(typeTabs[0]?.id || 'presentiel');
  const [selectedDay, setSelectedDay] = useState(null);
  const [translatedCoursesData, setTranslatedCoursesData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isClosing, setIsClosing] = useState(false);

  // Traduction des données
  useEffect(() => {
    if (coursesData && Object.keys(coursesData).length > 0) {
      const translated = translateScheduleData(coursesData, translator);
      setTranslatedCoursesData(translated);
    }
  }, [coursesData, translator]);

  // Génération des jours de la semaine
  const getWeekDays = useMemo(() => {
    const week = [];
    const start = new Date(startDate);
    for (let i = 0; i < weekDays; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  }, [startDate, weekDays]);

  const formatDate = useCallback(date => {
    return date.toISOString().split('T')[0];
  }, []);

  const handleInterest = useCallback(
    (course, event) => {
      event?.preventDefault();
      event?.stopPropagation();

      const currentScrollY = window.scrollY;
      setSelectedCourse(course);

      requestAnimationFrame(() => {
        window.scrollTo(0, currentScrollY);
        const firstInput = document.querySelector('input, textarea');
        if (firstInput) {
          firstInput.blur();
        }
      });

      if (onCourseClick) {
        onCourseClick(course);
      }
    },
    [onCourseClick]
  );

  const handleDayClick = useCallback(
    dateStr => {
      if (selectedDay === dateStr) {
        setIsClosing(true);
        setTimeout(() => {
          setSelectedDay(null);
          setCurrentPage(1);
          setIsClosing(false);
        }, 250);
      } else {
        setSelectedDay(dateStr);
        setCurrentPage(1);
        setIsClosing(false);
      }
    },
    [selectedDay]
  );

  const handleLevelChange = useCallback(level => {
    setActiveLevel(level);
    setSelectedDay(null);
  }, []);

  const handleTypeChange = useCallback(type => {
    setActiveType(type);
    setSelectedDay(null);
  }, []);

  // Cours actuels
  const currentCourses = useMemo(
    () => translatedCoursesData?.[activeLevel]?.[activeType] || {},
    [translatedCoursesData, activeLevel, activeType]
  );

  // Vérification si des cours existent
  const hasAnyCourses = useMemo(() => {
    if (!translatedCoursesData) return false;

    const levels = Object.keys(translatedCoursesData);
    for (const level of levels) {
      const types = Object.keys(translatedCoursesData[level] || {});
      for (const type of types) {
        const courses = translatedCoursesData[level][type] || {};
        const days = Object.keys(courses);
        for (const day of days) {
          if (courses[day] && courses[day].length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }, [translatedCoursesData]);

  const isEmpty = !hasAnyCourses;

  // Pagination
  const getCurrentPageCourses = useMemo(() => {
    if (!selectedDay || !currentCourses[selectedDay]) return [];

    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    return currentCourses[selectedDay].slice(startIndex, endIndex);
  }, [selectedDay, currentCourses, currentPage, coursesPerPage]);

  const totalPages = useMemo(
    () =>
      selectedDay && currentCourses[selectedDay]
        ? Math.ceil(currentCourses[selectedDay].length / coursesPerPage)
        : 0,
    [selectedDay, currentCourses, coursesPerPage]
  );

  const handlePageChange = useCallback(newPage => {
    setCurrentPage(newPage);
  }, []);

  // Affichage pendant le chargement
  if (loading) {
    return (
      <section className={`schedule-section ${className}`} {...props}>
        <div className='schedule-container'>
          <div className='schedule-header'>
            <div className='schedule-header__content'>
              <h2>{title}</h2>
              <p className='schedule-description'>Chargement en cours...</p>
            </div>
          </div>
          <Loader
            size='default'
            variant='rotating-squares'
            color='default'
            message='Chargement du planning...'
          />
        </div>
      </section>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <section className={`schedule-section ${className}`} {...props}>
        <div className='schedule-container'>
          <div className='schedule-header'>
            <div className='schedule-header__content'>
              <h2>{title}</h2>
              <div className='error-message'>
                <p>Erreur lors du chargement des données :</p>
                <span className='error-details'>{error}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`schedule-section ${className}`} {...props}>
      <div className='schedule-container'>
        {/* En-tête */}
        <div className='schedule-header'>
          <div className='schedule-header__content'>
            <h2>{title}</h2>
            {!isEmpty && (
              <div className='schedule-subtitle-container'>
                <p className='schedule-description'>{description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Filtres - masqués si aucun cours disponible */}
        {!isEmpty && (
          <div className='course-filters-container'>
            <div className='course-level-selector'>
              {levelTabs.map(tab => (
                <Button
                  key={tab.id}
                  variant={activeLevel === tab.id ? 'primary' : 'outline'}
                  className={`course-level-btn ${
                    activeLevel === tab.id ? 'course-level-btn--active' : ''
                  }`}
                  onClick={() => handleLevelChange(tab.id)}
                  aria-pressed={activeLevel === tab.id}
                  aria-label={`${tab.label} - ${tab.description}`}
                >
                  <div className='course-level-btn__icon' aria-hidden='true'>
                    {tab.icon}
                  </div>
                  <div className='course-level-btn__content'>
                    <span className='course-level-btn__title'>{tab.label}</span>
                    <span className='course-level-btn__subtitle'>{tab.description}</span>
                  </div>
                </Button>
              ))}
            </div>

            <div className='course-filters-separator'></div>

            <div className='course-type-selector'>
              {typeTabs.map(tab => (
                <Button
                  key={tab.id}
                  variant={activeType === tab.id ? 'primary' : 'outline'}
                  className={`course-type-btn ${
                    activeType === tab.id ? 'course-type-btn--active' : ''
                  }`}
                  onClick={() => handleTypeChange(tab.id)}
                  aria-pressed={activeType === tab.id}
                  aria-label={`${tab.label} - ${tab.description}`}
                >
                  <div className='course-type-btn__icon' aria-hidden='true'>
                    {tab.icon}
                  </div>
                  <div className='course-type-btn__content'>
                    <span className='course-type-btn__title'>{tab.label}</span>
                    <span className='course-type-btn__subtitle'>{tab.description}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Planning ou message d'information */}
        {isEmpty ? (
          showEmptyMessage ? (
            <div className='empty-schedule-info'>
              <div className='empty-schedule-icon'>
                <IoSchoolOutline />
              </div>
              <h3 className='empty-schedule-title'>{emptyMessage.title}</h3>
              <p className='empty-schedule-text'>{emptyMessage.text}</p>
              <div className='empty-schedule-features'>
                {emptyMessage.features.map((feature, index) => (
                  <div key={index} className='empty-feature'>
                    {feature.icon}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ) : (
          <div className='weekly-schedule'>
            <div className='weekdays-row'>
              {getWeekDays.map(day => {
                const dateStr = formatDate(day);
                const dayEvents = currentCourses[dateStr] || [];
                const hasEvents = dayEvents.length > 0;
                const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                const isSelected = selectedDay === dateStr;

                return (
                  <div
                    key={dateStr}
                    className={`weekday-item ${hasEvents ? 'has-events' : ''} ${
                      isWeekend ? 'weekend' : ''
                    } ${isSelected ? 'selected' : ''}`}
                  >
                    <Button
                      variant='outline'
                      className='weekday-button'
                      onClick={() => hasEvents && handleDayClick(dateStr)}
                      disabled={!hasEvents}
                      aria-label={`${day.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                      })} ${day.toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                      })} - ${
                        hasEvents
                          ? `${dayEvents.length} cours disponible${dayEvents.length > 1 ? 's' : ''}`
                          : 'Aucun cours'
                      }`}
                      aria-expanded={isSelected}
                      aria-controls={`courses-${dateStr}`}
                    >
                      <div className='weekday-info'>
                        <div className='weekday-name'>
                          {day.toLocaleDateString('fr-FR', {
                            weekday: 'short',
                          })}
                        </div>
                        <div className='weekday-date'>
                          {day.toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                          })}
                        </div>
                      </div>

                      {hasEvents && (
                        <div className='events-badge' aria-label={`${dayEvents.length} cours`}>
                          {dayEvents.length}
                        </div>
                      )}

                      {hasEvents && (
                        <div
                          className={`day-indicator ${isSelected ? 'selected' : ''}`}
                          aria-hidden='true'
                        >
                          <IoChevronDownOutline />
                        </div>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section des cours sélectionnés */}
        {selectedDay && currentCourses[selectedDay] && (
          <div className={`selected-day-courses ${isClosing ? 'closing' : ''}`}>
            <div className='selected-day-courses__header'>
              <h3 className='selected-day-courses__title'>
                {(() => {
                  const selectedDate = new Date(selectedDay);
                  return selectedDate.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                  });
                })()}
              </h3>
              <div className='selected-day-courses__stats'>
                <span className='courses-count'>
                  {currentCourses[selectedDay].length} cours disponible
                  {currentCourses[selectedDay].length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className='selected-day-courses__list'>
              {getCurrentPageCourses.map(course => (
                <div key={course.id} className='course-item'>
                  <div className='course-item__header'>
                    <h5 className='course-item__language'>{course.language}</h5>
                    <span
                      className={`course-item__level ${
                        course.levelKey === 'levels.adult' ? 'adult' : 'child'
                      }`}
                    >
                      {course.level}
                    </span>
                  </div>

                  <div className='course-item__details'>
                    <div className='course-item__time'>
                      <IoTimeOutline />
                      <span>
                        {course.startTime} - {course.endTime}
                      </span>
                    </div>
                    <div className='course-item__duration'>
                      <IoStopwatchOutline />
                      <span>{course.duration}</span>
                    </div>
                    <div className='course-item__capacity'>
                      <IoPeopleOutline />
                      <span>
                        {course.enrolledStudents}/{course.maxStudents} places
                      </span>
                    </div>
                  </div>

                  <Button
                    variant='primary'
                    className={`course-item__button ${
                      course.enrolledStudents >= course.maxStudents ? 'disabled' : ''
                    }`}
                    onClick={e => handleInterest(course, e)}
                    disabled={course.enrolledStudents >= course.maxStudents}
                    aria-label={
                      course.enrolledStudents >= course.maxStudents
                        ? 'Cours complet'
                        : `S'inscrire au cours de ${course.language}`
                    }
                  >
                    {course.enrolledStudents >= course.maxStudents ? 'Complet' : "Je m'inscris"}
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='courses-pagination'>
                <div className='pagination-info'>
                  <span>
                    Page {currentPage} sur {totalPages} • {currentCourses[selectedDay]?.length}{' '}
                    cours au total
                  </span>
                </div>
                <div className='pagination-controls'>
                  <Button
                    variant='outline'
                    className='pagination-btn'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label='Page précédente'
                  >
                    <IoChevronBackOutline />
                  </Button>

                  <div className='pagination-numbers'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'primary' : 'outline'}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                        aria-label={`Page ${page}`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant='outline'
                    className='pagination-btn'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label='Page suivante'
                  >
                    <IoChevronForwardOutline />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modale d'intérêt */}
      {selectedCourse && (
        <LargeModal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={`${selectedCourse.language} - Niveau ${selectedCourse.level}`}
        >
          <div className='modal-course-info'>
            <div className='modal-details'>
              <span className='modal-detail'>
                <IoTimeOutline />
                {selectedCourse.startTime} - {selectedCourse.endTime} ({selectedCourse.duration})
              </span>
              <span className='modal-detail'>
                <IoPeopleOutline />
                {selectedCourse.enrolledStudents}/{selectedCourse.maxStudents} places disponibles
              </span>
            </div>
          </div>

          <ContactFormComponent
            onSubmit={data =>
              handleInterestSubmit(
                data,
                selectedCourse,
                () => setSelectedCourse(null),
                onInterestSubmit
              )
            }
            submitText='Envoyer le message'
            loadingText='Envoi en cours...'
            variant='modal'
            showJoursHoraires={false}
            showConditionalFields={false}
          />
        </LargeModal>
      )}
    </section>
  );
};

ScheduleSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  coursesData: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onInterestSubmit: PropTypes.func,
  onCourseClick: PropTypes.func,
  coursesPerPage: PropTypes.number,
  showEmptyMessage: PropTypes.bool,
  emptyMessage: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.node,
        text: PropTypes.string,
      })
    ),
  }),
  className: PropTypes.string,
  startDate: PropTypes.string,
  weekDays: PropTypes.number,
  levelTabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  typeTabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  translator: PropTypes.func,
};

export default ScheduleSection;
