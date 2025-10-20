import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCertificate,
  FaChalkboardTeacher,
  FaClock,
  FaGraduationCap,
  FaUsers,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = [
    {
      id: 0,
      title: 'Cours et Ateliers en Petits Groupes',
      subtitle:
        'Apprenez la langue de votre choix en groupes de 6 personnes ou renforcez votre niveau scolaire en groupes de 4 élèves',
      image: '/assets/images/carousel/carousel-1.webp',
      ctaText: 'Découvrir nos offres',
      ctaAction: () => navigate('/offres/langues?tab=enfants-ados'),
      icon: FaGraduationCap,
    },
    {
      id: 1,
      title: 'Cours Adaptés à Vos Besoins',
      subtitle:
        "Bénéficiez d'un diagnostic initial, de nos cours personnalisés et de bilans réguliers",
      image: '/assets/images/carousel/carousel-2.webp',
      ctaText: 'Notre méthode',
      ctaAction: () => navigate('/methode/approche-actionnelle'),
      icon: FaChalkboardTeacher,
    },
    {
      id: 2,
      title: 'Horaires Flexibles',
      subtitle: "Décidez de l'horaire de votre cours ou de votre atelier",
      image: '/assets/images/carousel/carousel-3.webp',
      ctaText: 'Voir les horaires',
      ctaAction: () => navigate('/offres/horaires'),
      icon: FaClock,
    },
    {
      id: 3,
      title: 'Professeurs Qualifiés',
      subtitle:
        'Notre équipe diplômée et expérimentée est à votre service pour vous faire progresser au rythme que vous désirez',
      image: '/assets/images/carousel/carousel-4.webp',
      ctaText: 'Nous contacter',
      ctaAction: () => navigate('/contact'),
      icon: FaCertificate,
    },
    {
      id: 4,
      title: 'Accompagnement Illimité',
      subtitle: 'Profitez de notre suivi individuel dans toutes vos démarches',
      image: '/assets/images/carousel/carousel-5.webp',
      ctaText: "S'inscrire",
      ctaAction: () => navigate('/inscription'),
      icon: FaUsers,
    },
  ];

  // Auto-play
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length, currentSlide]);

  const goToPrevious = useCallback(() => {
    setSlideDirection('prev');
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setSlideDirection('next');
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
      if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPrevious, goToNext]);

  const handleTouchStart = e => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = e => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = e => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;

    if (isLeftSwipe) {
      setSlideDirection('next');
      goToNext();
    }
    if (isRightSwipe) {
      setSlideDirection('prev');
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const slideVariants = {
    enter: direction => ({
      x: direction === 'next' ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: direction => ({
      x: direction === 'next' ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section className='hero' id='home'>
      <div className='hero-content'>
        <h1>MAÎTRISEZ LES LANGUES • EXCELLENCE SCOLAIRE</h1>

        <div className='carousel-container'>
          <button
            className='carousel-arrow carousel-arrow-left'
            onClick={goToPrevious}
            aria-label='Slide précédent'
          >
            <FaArrowLeft />
          </button>

          <div
            className='hero-carousel'
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode='wait' custom={slideDirection}>
              <motion.div
                key={currentSlide}
                className='carousel-slide'
                custom={slideDirection}
                variants={slideVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className='slide-content'>
                  <div className='slide-image-container'>
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      className='slide-image'
                      loading={currentSlide === 0 ? 'eager' : 'lazy'}
                    />
                    <div className='slide-image-overlay'></div>
                  </div>

                  <div className='slide-text-container'>
                    <div className='slide-icon'>
                      {slides[currentSlide].icon &&
                        (() => {
                          const Icon = slides[currentSlide].icon;
                          return <Icon />;
                        })()}
                    </div>
                    <h2 className='slide-title'>{slides[currentSlide].title}</h2>
                    <h3 className='slide-subtitle'>{slides[currentSlide].subtitle}</h3>
                    <button className='slide-cta' onClick={slides[currentSlide].ctaAction}>
                      {slides[currentSlide].ctaText}
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className='carousel-progress-bar'>
              <div
                className='progress-fill'
                style={{
                  width: `${(currentSlide / (slides.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          <button
            className='carousel-arrow carousel-arrow-right'
            onClick={goToNext}
            aria-label='Slide suivant'
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
