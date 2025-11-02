import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IoChevronBack, IoChevronForward, IoStar, IoStarOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import apiService from '../../services/apiService';
import { Button } from '../UI/Buttons';
import './TestimonialsSection.css';

const TestimonialsSection = ({ isMobile = false }) => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  // Mapping pour traduire les langues
  const translateLanguage = useCallback(
    language => {
      const mappings = {
        'Anglais': t('languages.english'),
        'Français': t('languages.french'),
        'Soutien scolaire': t('languages.school_support'),
      };
      return mappings[language] || language;
    },
    [t]
  );

  // Mapping pour traduire les types de cours
  const translateCourseType = useCallback(
    courseType => {
      const mappings = {
        'Cours intensif professionnel': t('course_types.intensive'),
        'FLE (enfants)': t('course_types.fle_children'),
        'Suivi scolaire (enfant)': t('course_types.school_support_child'),
        'Suivi scolaire (enfants)': t('course_types.school_support_children'),
        'Cours adulte': t('course_types.adult'),
      };
      return mappings[courseType] || courseType;
    },
    [t]
  );

  // Charger les témoignages
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await apiService.fetchData('testimonials');
        setTestimonials(data.testimonials);
        setFilteredTestimonials(data.testimonials);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Initialiser la langue sélectionnée
  useEffect(() => {
    if (selectedLanguage === null && t) {
      setSelectedLanguage(t('home.testimonials.all'));
    }
  }, [selectedLanguage, t]);

  // Langues disponibles
  const languages = useMemo(
    () => [t('home.testimonials.all'), ...new Set(testimonials.map(testimonial => testimonial.language))],
    [testimonials, t]
  );

  // Filtrer par langue
  const handleLanguageFilter = useCallback(
    language => {
      setSelectedLanguage(language);
      if (language === t('home.testimonials.all')) {
        setFilteredTestimonials(testimonials);
      } else {
        setFilteredTestimonials(testimonials.filter(testimonial => testimonial.language === language));
      }
      setCurrentIndex(0);
    },
    [testimonials, t]
  );

  // Navigation
  const nextTestimonial = useCallback(() => {
    setCurrentIndex(prev => (prev === filteredTestimonials.length - 1 ? 0 : prev + 1));
  }, [filteredTestimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  }, [filteredTestimonials.length]);

  const goToTestimonial = useCallback(index => {
    setCurrentIndex(index);
  }, []);

  // Gestion tactile
  const handleTouchStart = useCallback(
    e => {
      if (!isMobile) return;
      setTouchStart(e.targetTouches[0].clientX);
    },
    [isMobile]
  );

  const handleTouchMove = useCallback(
    e => {
      if (!isMobile) return;
      setTouchEnd(e.targetTouches[0].clientX);
    },
    [isMobile]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isMobile || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [isMobile, touchStart, touchEnd, nextTestimonial, prevTestimonial]);

  // Auto-play
  useEffect(() => {
    if (filteredTestimonials.length <= 1 || isMobile) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(timer);
  }, [filteredTestimonials.length, currentIndex, isMobile, nextTestimonial]);

  // Rendu des étoiles
  const renderStars = useCallback(
    rating => {
      const starSize = isMobile ? 18 : 20;
      return Array.from({ length: 5 }, (_, index) => (
        <span key={index} className='testimonial-star'>
          {index < rating ? <IoStar size={starSize} /> : <IoStarOutline size={starSize} />}
        </span>
      ));
    },
    [isMobile]
  );

  // États de chargement
  if (isLoading) {
    return (
      <section className='testimonials' id='testimonials'>
        <div className='testimonials-loading'>
          <div className='loading-spinner'></div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className='testimonials' id='testimonials'>
        <div className='testimonials-loading'>
          <div className='loading-spinner'></div>
          <p>{t('home.testimonials.loading')}</p>
        </div>
      </section>
    );
  }

  if (filteredTestimonials.length === 0) {
    return (
      <section className='testimonials' id='testimonials'>
        <div className='testimonials-empty'>
          <h2>{t('home.testimonials_title')}</h2>
          <p>{t('home.testimonials.empty')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='testimonials' id='testimonials'>
      <div className='testimonials-container'>
        {/* Titre */}
        <h2>{t('home.testimonials_title')}</h2>

        {/* Filtres */}
        <div className='testimonials-filters'>
          {languages.map(language => {
            const isTranslatedAll = language === t('home.testimonials.all');
            const displayText = isTranslatedAll ? language : translateLanguage(language);
            return (
              <Button
                key={language}
                variant={selectedLanguage === language ? 'primary' : 'outline'}
                className={`filter-btn ${selectedLanguage === language ? 'active' : ''}`}
                onClick={() => handleLanguageFilter(language)}
              >
                {displayText}
              </Button>
            );
          })}
        </div>

        {/* Carousel */}
        <div
          className='testimonials-carousel'
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Boutons de navigation */}
          {filteredTestimonials.length > 1 && !isMobile && (
            <>
              <Button
                variant='outline'
                className='carousel-nav prev'
                onClick={prevTestimonial}
                aria-label='Témoignage précédent'
              >
                <IoChevronBack size={24} />
              </Button>
              <Button
                variant='outline'
                className='carousel-nav next'
                onClick={nextTestimonial}
                aria-label='Témoignage suivant'
              >
                <IoChevronForward size={24} />
              </Button>
            </>
          )}

          {/* Carte témoignage */}
          <div className='testimonial-card'>
            <div className='testimonial-header'>
              <div className='testimonial-info'>
                <h3 className='testimonial-name'>{filteredTestimonials[currentIndex]?.name}</h3>
                <p className='testimonial-course'>
                  {translateLanguage(filteredTestimonials[currentIndex]?.language)} -{' '}
                  {translateCourseType(filteredTestimonials[currentIndex]?.courseType)}
                </p>
              </div>
              <div className='testimonial-rating'>
                {renderStars(filteredTestimonials[currentIndex]?.rating)}
              </div>
            </div>

            <blockquote className='testimonial-text'>
              "{t(`testimonials_texts.${filteredTestimonials[currentIndex]?.id}`) || filteredTestimonials[currentIndex]?.text}"
            </blockquote>
          </div>
        </div>

        {/* Indicateurs de pagination */}
        {filteredTestimonials.length > 1 && (
          <div className='testimonial-indicators'>
            {filteredTestimonials.map((_, index) => (
              <Button
                key={index}
                variant={index === currentIndex ? 'primary' : 'outline'}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Aller au témoignage ${index + 1}`}
              >
                <span className='sr-only'>Témoignage {index + 1}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
