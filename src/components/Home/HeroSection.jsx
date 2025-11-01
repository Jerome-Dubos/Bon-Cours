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
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const SLIDE_DURATION = 6000;
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(1);
  const [currentSlide3, setCurrentSlide3] = useState(2);

  const slides = [
    {
      id: 0,
      title: 'Cours et ateliers en petits groupes',
      subtitle:
        'Apprenez la langue de votre choix en groupes de 6 personnes ou renforcez votre niveau scolaire en groupes de 4 élèves',
      image: '/assets/images/carousel/carousel-1.webp',
      ctaText: 'Découvrir nos offres',
      ctaAction: () => navigate('/offres/langues?tab=enfants-ados'),
      icon: FaGraduationCap,
    },
    {
      id: 1,
      title: 'Cours adaptés à vos besoins',
      subtitle:
        "Bénéficiez d'un diagnostic initial, de nos cours personnalisés et de bilans réguliers",
      image: '/assets/images/carousel/carousel-2.webp',
      ctaText: 'Notre méthode',
      ctaAction: () => navigate('/methode/approche-actionnelle'),
      icon: FaChalkboardTeacher,
    },
    {
      id: 2,
      title: 'Horaires flexibles',
      subtitle: "Décidez de l'horaire de votre cours ou de votre atelier",
      image: '/assets/images/carousel/carousel-3.webp',
      ctaText: 'Voir les horaires',
      ctaAction: () => navigate('/offres/horaires'),
      icon: FaClock,
    },
    {
      id: 3,
      title: 'Professeurs qualifiés',
      subtitle:
        'Notre équipe diplômée et expérimentée est à votre service pour vous faire progresser au rythme que vous désirez',
      image: '/assets/images/carousel/carousel-4.webp',
      ctaText: 'Nous contacter',
      ctaAction: () => navigate('/contact'),
      icon: FaCertificate,
    },
    {
      id: 4,
      title: 'Accompagnement illimité',
      subtitle: 'Profitez de notre suivi individuel dans toutes vos démarches',
      image: '/assets/images/carousel/carousel-5.webp',
      ctaText: 'En savoir plus',
      ctaAction: () => navigate('/qui-sommes-nous'),
      icon: FaUsers,
    },
  ];
  // Auto-play: un seul timer pour les trois carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide1(prev => (prev + 1) % slides.length);
      setCurrentSlide2(prev => (prev + 1) % slides.length);
      setCurrentSlide3(prev => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Mémoriser les données de slide pour éviter les re-renders
  const slideData = useMemo(
    () => ({
      image: slides[currentSlide1].image,
      icon: slides[currentSlide1].icon,
      title: slides[currentSlide1].title,
      subtitle: slides[currentSlide1].subtitle,
      ctaText: slides[currentSlide1].ctaText,
      ctaAction: slides[currentSlide1].ctaAction,
    }),
    [currentSlide1]
  );

  const slideData2 = useMemo(
    () => ({
      image: slides[currentSlide2].image,
      icon: slides[currentSlide2].icon,
      title: slides[currentSlide2].title,
      subtitle: slides[currentSlide2].subtitle,
      ctaText: slides[currentSlide2].ctaText,
      ctaAction: slides[currentSlide2].ctaAction,
    }),
    [currentSlide2]
  );

  const slideData3 = useMemo(
    () => ({
      image: slides[currentSlide3].image,
      icon: slides[currentSlide3].icon,
      title: slides[currentSlide3].title,
      subtitle: slides[currentSlide3].subtitle,
      ctaText: slides[currentSlide3].ctaText,
      ctaAction: slides[currentSlide3].ctaAction,
    }),
    [currentSlide3]
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
        <h1>L'excellence sur mesure au cœur de Strasbourg</h1>

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
