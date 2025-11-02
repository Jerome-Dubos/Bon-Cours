import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FaArrowRight,
  FaCertificate,
  FaChalkboardTeacher,
  FaClock,
  FaGraduationCap,
  FaUsers,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const SLIDE_DURATION = 6000;
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(1);
  const [currentSlide3, setCurrentSlide3] = useState(2);

  const slides = [
    {
      id: 0,
      title: t('home.hero_carousel.slide1.title'),
      subtitle: t('home.hero_carousel.slide1.subtitle'),
      image: '/assets/images/carousel/carousel-1.webp',
      ctaText: t('home.hero_carousel.slide1.cta'),
      ctaAction: () => navigate('/offres/langues?tab=enfants-ados'),
      icon: FaGraduationCap,
    },
    {
      id: 1,
      title: t('home.hero_carousel.slide2.title'),
      subtitle: t('home.hero_carousel.slide2.subtitle'),
      image: '/assets/images/carousel/carousel-2.webp',
      ctaText: t('home.hero_carousel.slide2.cta'),
      ctaAction: () => navigate('/methode/approche-actionnelle'),
      icon: FaChalkboardTeacher,
    },
    {
      id: 2,
      title: t('home.hero_carousel.slide3.title'),
      subtitle: t('home.hero_carousel.slide3.subtitle'),
      image: '/assets/images/carousel/carousel-3.webp',
      ctaText: t('home.hero_carousel.slide3.cta'),
      ctaAction: () => navigate('/offres/horaires'),
      icon: FaClock,
    },
    {
      id: 3,
      title: t('home.hero_carousel.slide4.title'),
      subtitle: t('home.hero_carousel.slide4.subtitle'),
      image: '/assets/images/carousel/carousel-4.webp',
      ctaText: t('home.hero_carousel.slide4.cta'),
      ctaAction: () => navigate('/contact'),
      icon: FaCertificate,
    },
    {
      id: 4,
      title: t('home.hero_carousel.slide5.title'),
      subtitle: t('home.hero_carousel.slide5.subtitle'),
      image: '/assets/images/carousel/carousel-5.webp',
      ctaText: t('home.hero_carousel.slide5.cta'),
      ctaAction: () => navigate('/qui-sommes-nous'),
      icon: FaUsers,
    },
  ];
  // Mémoriser les slides avec la fonction t
  const slidesMemo = useMemo(() => slides, [t]);

  // Auto-play: un seul timer pour les trois carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide1(prev => (prev + 1) % slidesMemo.length);
      setCurrentSlide2(prev => (prev + 1) % slidesMemo.length);
      setCurrentSlide3(prev => (prev + 1) % slidesMemo.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [slidesMemo.length]);

  // Mémoriser les données de slide pour éviter les re-renders
  const slideData = useMemo(
    () => ({
      image: slidesMemo[currentSlide1].image,
      icon: slidesMemo[currentSlide1].icon,
      title: slidesMemo[currentSlide1].title,
      subtitle: slidesMemo[currentSlide1].subtitle,
      ctaText: slidesMemo[currentSlide1].ctaText,
      ctaAction: slidesMemo[currentSlide1].ctaAction,
    }),
    [currentSlide1, slidesMemo]
  );

  const slideData2 = useMemo(
    () => ({
      image: slidesMemo[currentSlide2].image,
      icon: slidesMemo[currentSlide2].icon,
      title: slidesMemo[currentSlide2].title,
      subtitle: slidesMemo[currentSlide2].subtitle,
      ctaText: slidesMemo[currentSlide2].ctaText,
      ctaAction: slidesMemo[currentSlide2].ctaAction,
    }),
    [currentSlide2, slidesMemo]
  );

  const slideData3 = useMemo(
    () => ({
      image: slidesMemo[currentSlide3].image,
      icon: slidesMemo[currentSlide3].icon,
      title: slidesMemo[currentSlide3].title,
      subtitle: slidesMemo[currentSlide3].subtitle,
      ctaText: slidesMemo[currentSlide3].ctaText,
      ctaAction: slidesMemo[currentSlide3].ctaAction,
    }),
    [currentSlide3, slidesMemo]
  );

  // Composant Carousel optimisé avec transition smooth
  const Carousel = useCallback(({ currentSlide, carouselClass, slideData, progressDuration }) => {
    const IconComponent = slideData.icon;

    return (
      <div className={`hero-carousel ${carouselClass}`}>
        <AnimatePresence>
          <motion.div
            key={`${carouselClass}-${currentSlide}`}
            className='carousel-slide'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
            style={{
              backgroundImage: `url(${slideData.image})`,
            }}
          >
            <div className='slide-overlay'></div>

            <motion.div
              className='slide-content-wrapper'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: 'easeOut',
              }}
            >
              <div className='slide-header-section'>
                <div className='slide-icon-container'>
                  {IconComponent && <IconComponent className='slide-icon' />}
                </div>
                <div className='slide-text-section'>
                  <h2 className='slide-title'>{slideData.title}</h2>
                  <p className='slide-subtitle'>{slideData.subtitle}</p>
                </div>
              </div>

              <div className='slide-footer-section'>
                <button className='slide-cta-button' onClick={slideData.ctaAction}>
                  {slideData.ctaText}
                  <FaArrowRight className='cta-arrow' />
                </button>
              </div>
            </motion.div>

            {/* Barre de progression */}
            <div className='carousel-progress-bar'>
              <div
                key={currentSlide}
                className='progress-fill'
                style={{ '--progress-duration': `${progressDuration}ms` }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }, []);

  return (
    <section className='hero' id='home'>
      <div className='hero-content'>
        <h1>{t('home.hero_title')}</h1>

        <div className='carousel-container'>
          <div className='carousel-main'>
            <Carousel
              currentSlide={currentSlide1}
              carouselClass='carousel-large'
              slideData={slideData}
              progressDuration={SLIDE_DURATION}
            />
          </div>

          <div className='carousel-side'>
            <Carousel
              currentSlide={currentSlide2}
              carouselClass='carousel-small'
              slideData={slideData2}
              progressDuration={SLIDE_DURATION}
            />
            <Carousel
              currentSlide={currentSlide3}
              carouselClass='carousel-small'
              slideData={slideData3}
              progressDuration={SLIDE_DURATION}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
