import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(1);
  const [currentSlide3, setCurrentSlide3] = useState(2);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);

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

  // Références pour éviter les conflits de slides
  const currentSlide2Ref = useRef(currentSlide2);
  const currentSlide3Ref = useRef(currentSlide3);
  const currentSlide1Ref = useRef(currentSlide1);

  // Mise à jour des refs quand les états changent
  currentSlide2Ref.current = currentSlide2;
  currentSlide3Ref.current = currentSlide3;
  currentSlide1Ref.current = currentSlide1;

  // Auto-play avec transition douce pour chaque carousel
  useEffect(() => {
    const duration1 = 6000; // 6 secondes
    const duration2 = 7000; // 7 secondes
    const duration3 = 8000; // 8 secondes

    // Barres de progression
    const progressInterval1 = setInterval(() => {
      setProgress1(prev => {
        const increment = (100 / duration1) * 50; // Update toutes les 50ms
        const newProgress = prev + increment;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 50);

    const progressInterval2 = setInterval(() => {
      setProgress2(prev => {
        const increment = (100 / duration2) * 50;
        const newProgress = prev + increment;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 50);

    const progressInterval3 = setInterval(() => {
      setProgress3(prev => {
        const increment = (100 / duration3) * 50;
        const newProgress = prev + increment;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 50);

    // Changement des slides
    const interval1 = setInterval(() => {
      setCurrentSlide1(prev => {
        let nextSlide = (prev + 1) % slides.length;
        // Éviter de confliter avec les autres carousels
        while (nextSlide === currentSlide2Ref.current || nextSlide === currentSlide3Ref.current) {
          nextSlide = (nextSlide + 1) % slides.length;
        }
        return nextSlide;
      });
      setProgress1(0); // Reset progress bar
    }, duration1);

    const interval2 = setInterval(() => {
      setCurrentSlide2(prev => {
        let nextSlide = (prev + 1) % slides.length;
        // Éviter de confliter avec les autres carousels
        while (nextSlide === currentSlide1Ref.current || nextSlide === currentSlide3Ref.current) {
          nextSlide = (nextSlide + 1) % slides.length;
        }
        return nextSlide;
      });
      setProgress2(0); // Reset progress bar
    }, duration2);

    const interval3 = setInterval(() => {
      setCurrentSlide3(prev => {
        let nextSlide = (prev + 1) % slides.length;
        // Éviter de confliter avec les autres carousels
        while (nextSlide === currentSlide1Ref.current || nextSlide === currentSlide2Ref.current) {
          nextSlide = (nextSlide + 1) % slides.length;
        }
        return nextSlide;
      });
      setProgress3(0); // Reset progress bar
    }, duration3);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(progressInterval1);
      clearInterval(progressInterval2);
      clearInterval(progressInterval3);
    };
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
  const Carousel = useCallback(({ currentSlide, carouselClass, slideData, progress }) => {
    const IconComponent = slideData.icon;

    return (
      <div className={`hero-carousel ${carouselClass}`}>
        <AnimatePresence mode='wait'>
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
                duration: 0.8,
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
                className='progress-fill'
                style={{
                  width: `${progress}%`,
                  transition: 'width 0.1s linear',
                }}
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
        <h1>MAÎTRISEZ LES LANGUES • EXCELLENCE SCOLAIRE</h1>

        <div className='carousel-container'>
          <div className='carousel-main'>
            <Carousel
              currentSlide={currentSlide1}
              carouselClass='carousel-large'
              slideData={slideData}
              progress={progress1}
            />
          </div>

          <div className='carousel-side'>
            <Carousel
              currentSlide={currentSlide2}
              carouselClass='carousel-small'
              slideData={slideData2}
              progress={progress2}
            />
            <Carousel
              currentSlide={currentSlide3}
              carouselClass='carousel-small'
              slideData={slideData3}
              progress={progress3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
