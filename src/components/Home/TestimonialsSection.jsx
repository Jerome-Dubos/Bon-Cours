import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IoChevronBack, IoChevronForward, IoStar, IoStarOutline } from 'react-icons/io5';
import apiService from '../../services/apiService';
import { Button } from '../UI/Buttons';
import './TestimonialsSection.css';

const TestimonialsSection = ({ isMobile = false }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('Toutes');
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

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

  // Langues disponibles
  const languages = useMemo(
    () => ['Toutes', ...new Set(testimonials.map(t => t.language))],
    [testimonials]
  );

  // Filtrer par langue
  const handleLanguageFilter = useCallback(
    language => {
      setSelectedLanguage(language);
      if (language === 'Toutes') {
        setFilteredTestimonials(testimonials);
      } else {
        setFilteredTestimonials(testimonials.filter(t => t.language === language));
      }
      setCurrentIndex(0);
    },
    [testimonials]
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
          <p>Chargement des témoignages...</p>
        </div>
      </section>
    );
  }

  if (filteredTestimonials.length === 0) {
    return (
      <section className='testimonials' id='testimonials'>
        <div className='testimonials-empty'>
          <h2>Témoignages de nos apprenants</h2>
          <p>Aucun témoignage disponible pour cette langue.</p>
        </div>
      </section>
    );
  }

  return (
    <section className='testimonials' id='testimonials'>
      <div className='testimonials-container'>
        {/* Titre */}
        <h2>Témoignages de nos apprenants</h2>

        {/* Filtres */}
        <div className='testimonials-filters'>
          {languages.map(language => (
            <Button
              key={language}
              variant={selectedLanguage === language ? 'primary' : 'outline'}
              className={`filter-btn ${selectedLanguage === language ? 'active' : ''}`}
              onClick={() => handleLanguageFilter(language)}
            >
              {language}
            </Button>
          ))}
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
                  {filteredTestimonials[currentIndex]?.language} -{' '}
                  {filteredTestimonials[currentIndex]?.courseType}
                </p>
              </div>
              <div className='testimonial-rating'>
                {renderStars(filteredTestimonials[currentIndex]?.rating)}
              </div>
            </div>

            <blockquote className='testimonial-text'>
              "{filteredTestimonials[currentIndex]?.text}"
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
