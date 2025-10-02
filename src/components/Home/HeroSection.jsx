/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next'; // Désactivé pour utiliser les textes en dur
import {
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
  FaCertificate,
  FaChalkboardTeacher,
  FaClock,
  FaGlobe,
  FaGraduationCap,
  FaUsers,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import heroBackground from '../../assets/images/BG-HeroSection.webp';
import { Button } from '../UI/Buttons';
import { OptimizedImage } from '../UI/OptimizedImage';
import './HeroSection.css';

const HeroSection = () => {
  // const { t } = useTranslation(); // Désactivé pour utiliser les textes en dur
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next'); // "next" ou "prev"
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Détection mobile optimisée avec debounce
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Configuration des slides avec dimensions optimisées
  const slides = useMemo(
    () => [
      {
        id: 0,
        title: 'Cours et Ateliers en Petits Groupes',
        subtitle:
          'Apprenez la langue de votre choix en groupes de 6 personnes ou renforcez votre niveau scolaire en groupes de 4 élèves',
        description: '',
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=75',
        ctaText: 'Découvrir nos cours',
        ctaAction: () => navigate('/courses'),
        icon: FaGraduationCap,
        color: 'var(--secondary-gold)',
        width: 800,
        height: 600,
      },
      {
        id: 1,
        title: 'Cours Adaptés à Vos Besoins',
        subtitle:
          "Bénéficiez d'un diagnostic initial, de nos cours personnalisés et de bilans réguliers",
        description: '',
        image:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=75',
        ctaText: 'En savoir plus',
        ctaAction: () => navigate('/about'),
        icon: FaChalkboardTeacher,
        color: 'var(--secondary-gold)',
        width: 800,
        height: 600,
      },
      {
        id: 2,
        title: 'Horaires Flexibles',
        subtitle: "Décidez de l'horaire de votre cours ou de votre atelier",
        description: '',
        image:
          'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=75',
        ctaText: 'Voir les horaires',
        ctaAction: () => navigate('/courses'),
        icon: FaClock,
        color: 'var(--secondary-gold)',
        width: 800,
        height: 600,
      },
      {
        id: 3,
        title: 'Professeurs Qualifiés',
        subtitle:
          'Notre équipe diplômée et expérimentée est à votre service pour vous faire progresser au rythme que vous désirez',
        description: '',
        image:
          'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=75',
        ctaText: 'Découvrir notre équipe',
        ctaAction: () => navigate('/about'),
        icon: FaCertificate,
        color: 'var(--secondary-gold)',
        width: 800,
        height: 600,
      },
      {
        id: 4,
        title: 'Accompagnement Illimité',
        subtitle: 'Profitez de notre suivi individuel dans toutes vos démarches',
        description: '',
        image:
          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=75',
        ctaText: 'Nous contacter',
        ctaAction: () => navigate('/contact'),
        icon: FaUsers,
        color: 'var(--secondary-gold)',
        width: 800,
        height: 600,
      },
    ],
    [navigate]
  );

  // Préchargement optimisé des images du carousel
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Précharger immédiatement la première image
        const firstImage = new Image();
        await new Promise((resolve, reject) => {
          firstImage.onload = resolve;
          firstImage.onerror = reject;
          firstImage.src = slides[0]?.image;
        });

        setImagesLoaded(true);

        // Précharger les autres images en arrière-plan sans bloquer
        slides.slice(1).forEach((slide, index) => {
          setTimeout(() => {
            const img = new Image();
            img.src = slide.image;
          }, index * 200); // Délai réduit pour un chargement plus rapide
        });
      } catch (error) {
        console.warn('Erreur lors du préchargement des images:', error);
        setImagesLoaded(true); // Continuer même en cas d'erreur
      }
    };

    if (slides.length > 0) {
      preloadImages();
    }
  }, [slides]);

  // Auto-play global avec pause au hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    autoPlayRef.current = interval;
    return () => clearInterval(interval);
  }, [isPaused, slides.length, currentSlide]);

  // Navigation au clavier (seulement sur desktop)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyPress = e => {
      if (e.key === 'ArrowLeft') {
        setSlideDirection('prev');
        goToPrevious();
      }
      if (e.key === 'ArrowRight') {
        setSlideDirection('next');
        goToNext();
      }
      if (e.key === ' ') {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isMobile]);

  // Gestion du hover optimisée avec useCallback
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsPaused(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) setIsPaused(false);
  }, [isMobile]);

  // Gestion tactile améliorée pour éviter le blocage
  const handleTouchStart = e => {
    if (isMobile) {
      // Sur mobile, ne pas bloquer l'auto-play
      setTouchStart(e.targetTouches[0].clientX);
      setTouchEnd(null);
    } else {
      // Sur desktop, pause au hover
      setIsPaused(true);
    }
  };

  const handleTouchMove = e => {
    if (isMobile) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

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
    } else {
      // Sur desktop, reprendre l'auto-play
      setIsPaused(false);
    }
  };

  // Navigation manuelle optimisée avec useCallback
  const goToSlide = useCallback(
    index => {
      const direction = index > currentSlide ? 'next' : 'prev';
      setSlideDirection(direction);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  const goToPrevious = useCallback(() => {
    setSlideDirection('prev');
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setSlideDirection('next');
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const togglePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  // Navigation tactile améliorée (mobile)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [lastTap, setLastTap] = useState(0);

  // Double-tap pour pause/play (seulement sur desktop)
  const handleDoubleTap = () => {
    if (isMobile) return;

    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      togglePause();
    }
    setLastTap(now);
  };

  // Animations basées sur la direction
  const slideVariants = {
    enter: direction => ({
      x: direction === 'next' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: direction => ({
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
    }),
  };

  // Vérifier si on vient d'une redirection
  const isFromRedirect = sessionStorage.getItem('fromRedirect');
  const [disableAnimations, setDisableAnimations] = useState(false);

  // Désactiver les animations si on vient d'une redirection
  useEffect(() => {
    if (isFromRedirect) {
      setDisableAnimations(true);
      // Réactiver les animations après un délai
      const timer = setTimeout(() => {
        setDisableAnimations(false);
        sessionStorage.removeItem('fromRedirect');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isFromRedirect]);

  return (
    <section className={`hero ${disableAnimations ? 'no-animations' : ''}`} id='home'>
      {/* Image de fond Strasbourg */}
      <div className='hero-background-image'>
        <img
          src={heroBackground}
          alt='Hero background'
          className='hero-background-img'
          width='1920'
          height='1080'
          loading='eager'
        />
      </div>

      {/* Éléments décoratifs */}
      <div className='floating-elements'>
        <motion.div
          className='floating-decoration decoration-1'
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <FaGlobe />
        </motion.div>
        <motion.div
          className='floating-decoration decoration-2'
          animate={{
            y: [0, -15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <FaGraduationCap />
        </motion.div>
        <motion.div
          className='floating-decoration decoration-3'
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        >
          <FaBookOpen />
        </motion.div>
      </div>

      {/* Étoiles scintillantes optimisées (réduites de 10 à 5) */}
      <div className='stars-container'>
        <motion.div
          className='star star-1'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0,
          }}
        />
        <motion.div
          className='star star-2'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className='star star-3'
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className='star star-4'
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
        <motion.div
          className='star star-5'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
      </div>

      {/* Particules flottantes subtiles */}
      <div className='floating-particles'>
        <div className='particle'></div>
        <div className='particle'></div>
        <div className='particle'></div>
        <div className='particle'></div>
        <div className='particle'></div>
        <div className='particle'></div>
      </div>

      <div className='hero-content'>
        {/* Titre principal */}
        <h1>
          MAÎTRISEZ LES LANGUES • EXCELLENCE SCOLAIRE <span className='typed-text'></span>
        </h1>

        {/* Carousel avec conteneur pour flèches externes */}
        <div className='carousel-container'>
          {/* Flèches de navigation externes (desktop) */}
          {!isMobile && (
            <>
              <button
                className='carousel-arrow carousel-arrow-left carousel-arrow-external'
                onClick={goToPrevious}
                aria-label='Slide précédent'
              >
                <FaArrowLeft />
              </button>
              <button
                className='carousel-arrow carousel-arrow-right carousel-arrow-external'
                onClick={goToNext}
                aria-label='Slide suivant'
              >
                <FaArrowRight />
              </button>
            </>
          )}

          <div
            className={`hero-carousel ${isMobile ? 'mobile-story-mode' : ''}`}
            ref={carouselRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleDoubleTap}
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
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className='slide-content'>
                  {/* Image de gauche */}
                  <div className='slide-image-container'>
                    <div className='slide-image-wrapper'>
                      <OptimizedImage
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        width={slides[currentSlide].width}
                        height={slides[currentSlide].height}
                        className='slide-image'
                        priority={currentSlide === 0} // Prioriser la première image
                      />
                      <div className='slide-image-overlay'></div>
                    </div>
                  </div>

                  {/* Contenu de droite */}
                  <div className='slide-text-container'>
                    <motion.div
                      className='slide-icon'
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, ease: 'backOut' }}
                    >
                      {React.createElement(slides[currentSlide].icon, {
                        style: { color: slides[currentSlide].color },
                      })}
                    </motion.div>
                    <motion.h2
                      className='slide-title'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h2>
                    <motion.h3
                      className='slide-subtitle'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {slides[currentSlide].subtitle}
                    </motion.h3>
                    <motion.p
                      className='slide-description'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {slides[currentSlide].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Button
                        variant='primary'
                        className='slide-cta'
                        onClick={slides[currentSlide].ctaAction}
                      >
                        {slides[currentSlide].ctaText}
                        <FaArrowRight />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Barre de progression */}
            <div className='carousel-progress-bar'>
              <div
                className='progress-fill'
                style={{
                  width: `${(currentSlide / (slides.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
