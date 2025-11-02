import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '../../../components/Tabs/Tabs';
import LanguageCarousel from '../../../components/UI/LanguageCarousel';
import { FormModal } from '../../../components/UI/Modales';
import { ErrorNotification, SuccessNotification } from '../../../components/UI/Notifications';
import { useErrorHandler, usePerformance } from '../../../hooks';
import { useTabNavigation } from '../../../hooks/useTabNavigation';
import './AteliersLinguistiques.css';

const AteliersLinguistiques = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [newsletterData, setNewsletterData] = useState({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const location = useLocation();

  // Hooks personnalisés
  const { isLowEndDevice, prefersReducedMotion, animationConfig, measurePerformance } =
    usePerformance();

  const { handleError } = useErrorHandler();

  // Validation email
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Gestion des notifications
  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);

    // Auto-suppression après 5 secondes
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Validation en temps réel de l'email
  useEffect(() => {
    setIsEmailValid(validateEmail(newsletterData.email));
  }, [newsletterData.email]);

  // Gestion du changement d'email en temps réel
  const handleEmailInputChange = e => {
    const email = e.target.value;
    setNewsletterData({ email });
  };

  // Gestion de la newsletter
  const handleNewsletterSubmit = async formData => {
    try {
      // Mettre à jour newsletterData avec les données du formulaire
      setNewsletterData(formData);

      // Validation de l'email (double vérification)
      if (!formData.email || !validateEmail(formData.email)) {
        addNotification('error', t('footer.newsletter.error'));
        return;
      }

      setIsSubmitting(true);

      // Simulation d'un appel API avec délai
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Newsletter subscription:', formData);

      // Ici, vous pourriez ajouter l'appel à votre API de newsletter
      // await newsletterService.subscribe(formData.email);

      // Notification de succès
      addNotification('success', t('footer.newsletter.success'));

      // Fermer la modale
      setIsNewsletterModalOpen(false);

      // Réinitialiser le formulaire
      setNewsletterData({ email: '' });
      setIsEmailValid(false);
    } catch (error) {
      addNotification('error', "Erreur lors de l'inscription. Veuillez réessayer.");
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Définir les onglets disponibles avec traductions
  const tabs = useMemo(
    () => [
      {
        id: 'langue-orale',
        label: t('nav.submenus.langue-orale'),
        content: (
          <div className='atelier-content'>
            <div className='atelier-image-container'>
              <img
                src='/assets/images/ateliers/oral-2.webp'
                alt={t('ateliers_linguistiques.langue_orale.alt')}
                className='atelier-image'
              />
            </div>
            <div className='atelier-text-content'>
              <p className='atelier-description'>{t('ateliers_linguistiques.langue_orale.description')}</p>
              <div className='cta-section'>
                <Link to='/contact' className='cta-button'>
                  {t('ateliers_linguistiques.langue_orale.cta')}
                </Link>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'langue-ecrite',
        label: t('nav.submenus.langue-ecrite'),
        content: (
          <div className='atelier-content'>
            <div className='atelier-image-container'>
              <img
                src='/assets/images/ateliers/langue-ecrite-2.webp'
                alt={t('ateliers_linguistiques.langue_ecrite.alt')}
                className='atelier-image'
              />
            </div>
            <div className='atelier-text-content'>
              <p className='atelier-description'>
                {t('ateliers_linguistiques.langue_ecrite.description')}
                <br />
                <br />
                <strong>{t('ateliers_linguistiques.langue_ecrite.programme')}</strong>
                <br />- {t('ateliers_linguistiques.langue_ecrite.item1')}
                <br />- {t('ateliers_linguistiques.langue_ecrite.item2')}
                <br />- {t('ateliers_linguistiques.langue_ecrite.item3')}
                <br />
                <br />
                {t('ateliers_linguistiques.langue_ecrite.conclusion')}
              </p>
              <div className='cta-section'>
                <Link to='/contact' className='cta-button'>
                  {t('ateliers_linguistiques.langue_ecrite.cta')}
                </Link>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'cuisine',
        label: t('nav.submenus.cuisine'),
        content: (
          <div className='atelier-content'>
            <div className='atelier-image-container'>
              <img
                src='/assets/images/ateliers/cuisine-2.webp'
                alt={t('ateliers_linguistiques.cuisine.alt')}
                className='atelier-image'
              />
            </div>
            <div className='atelier-text-content'>
              <p className='atelier-description'>
                {t('ateliers_linguistiques.cuisine.description')}
                <br />
                <br />
                {t('ateliers_linguistiques.cuisine.intro')}
                <br />- {t('ateliers_linguistiques.cuisine.item1')}
                <br />- {t('ateliers_linguistiques.cuisine.item2')}
                <br />- {t('ateliers_linguistiques.cuisine.item3')}
                <br />
                <br />
                {t('ateliers_linguistiques.cuisine.conclusion')}
              </p>
              <div className='cta-section'>
                <Link to='/contact' className='cta-button'>
                  {t('ateliers_linguistiques.cuisine.cta')}
                </Link>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'sport',
        label: t('nav.submenus.sport'),
        content: (
          <div className='atelier-content'>
            <div className='atelier-image-container'>
              <img
                src='/assets/images/ateliers/sport-2.webp'
                alt={t('ateliers_linguistiques.sport.alt')}
                className='atelier-image'
              />
            </div>
            <div className='atelier-text-content'>
              <p className='atelier-description'>
                {t('ateliers_linguistiques.sport.description')}
                <br />
                <br />
                {t('ateliers_linguistiques.sport.intro')}
                <br />- {t('ateliers_linguistiques.sport.item1')}
                <br />- {t('ateliers_linguistiques.sport.item2')}
                <br />- {t('ateliers_linguistiques.sport.item3')}
                <br />
                <br />
                {t('ateliers_linguistiques.sport.conclusion')}
              </p>
              <div className='cta-section'>
                <Link to='/contact' className='cta-button'>
                  {t('ateliers_linguistiques.sport.cta')}
                </Link>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'jeux',
        label: t('nav.submenus.jeux'),
        content: (
          <div className='atelier-content'>
            <div className='atelier-image-container'>
              <img
                src='/assets/images/ateliers/jeux-2.webp'
                alt={t('ateliers_linguistiques.jeux.alt')}
                className='atelier-image'
              />
            </div>
            <div className='atelier-text-content'>
              <p className='atelier-description'>
                {t('ateliers_linguistiques.jeux.description')}
                <br />
                <br />
                {t('ateliers_linguistiques.jeux.intro')}
                <br />- {t('ateliers_linguistiques.jeux.item1')}
                <br />- {t('ateliers_linguistiques.jeux.item2')}
                <br />- {t('ateliers_linguistiques.jeux.item3')}
                <br />
                <br />
                {t('ateliers_linguistiques.jeux.conclusion')}
              </p>
              <div className='cta-section'>
                <Link to='/contact' className='cta-button'>
                  {t('ateliers_linguistiques.jeux.cta')}
                </Link>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'cinema',
        label: t('nav.submenus.cinema'),
        content: (
          <div className='atelier-content'>
            <div className='atelier-image-container'>
              <img
                src='/assets/images/ateliers/cinema-2.webp'
                alt={t('ateliers_linguistiques.cinema.alt')}
                className='atelier-image'
              />
            </div>
            <div className='atelier-text-content'>
              <p className='atelier-description'>
                {t('ateliers_linguistiques.cinema.description')}
                <br />
                <br />
                {t('ateliers_linguistiques.cinema.intro')}{' '}
                <strong>{t('ateliers_linguistiques.cinema.item1')}</strong>,{' '}
                {t('ateliers_linguistiques.cinema.item2')}{' '}
                <strong>{t('ateliers_linguistiques.cinema.item3')}</strong>
                {t('ateliers_linguistiques.cinema.conclusion')}
              </p>
              <div className='cta-section'>
                <Link to='/contact' className='cta-button'>
                  {t('ateliers_linguistiques.cinema.cta')}
                </Link>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [t]
  );

  // Hook personnalisé pour la navigation par onglets
  const { activeTab, changeTab } = useTabNavigation('langue-orale', tabs);

  // Initialisation de la page
  useEffect(() => {
    measurePerformance('Ateliers Linguistiques page initialization', () => {
      // Initialisation simple
    });

    setIsLoading(false);
  }, [measurePerformance]);

  // Animations optimisées
  const pageVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    }),
    []
  );

  const pageTransition = useMemo(() => {
    return {
      ...animationConfig,
      duration: prefersReducedMotion ? 0.1 : animationConfig.duration,
    };
  }, [animationConfig, prefersReducedMotion]);

  if (isLoading) {
    return (
      <div className='ateliers-linguistiques-loading page-loading'>
        <div className='loading-spinner' />
      </div>
    );
  }

  return (
    <motion.div
      className='ateliers-linguistiques'
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={pageTransition}
    >
      <div className='ateliers-linguistiques-container'>
        <h1>{t('ateliers_linguistiques.title')}</h1>

        <div className='intro-section'>
          <p className='intro-text'>{t('ateliers_linguistiques.intro')}</p>

          <div className='price-card'>
            <div className='price-content'>
              <p className='price-label'>{t('ateliers_linguistiques.price_label')}</p>
              <p className='price-value'>{t('ateliers_linguistiques.price_value')}</p>
            </div>
          </div>
        </div>

        {/* Carousel des langues enseignées */}
        <LanguageCarousel speed={50} direction='left' className='ateliers-language-carousel' />

        {/* Système d'onglets avec animations fluides */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} content={true} />
      </div>

      {/* Modale de newsletter */}
      <FormModal
        isOpen={isNewsletterModalOpen}
        onClose={() => {
          setIsNewsletterModalOpen(false);
          setNewsletterData({ email: '' });
          setIsEmailValid(false);
        }}
        onSubmit={handleNewsletterSubmit}
        title={t('footer.newsletter_title')}
        submitText={isSubmitting ? t('common.loading') : t('footer.newsletter_title')}
        cancelText='Annuler'
        initialData={newsletterData}
        submitDisabled={isSubmitting || !isEmailValid}
        fields={[]}
        className='newsletter-modal'
      >
        <div className='newsletter-modal-content'>
          <p className='newsletter-description'>
            Recevez les dernières informations sur nos ateliers linguistiques, les nouvelles dates et
            les événements spéciaux.
          </p>

          <div className='newsletter-form-group'>
            <label htmlFor='newsletter-email' className='newsletter-label'>
              Adresse email *
            </label>
            <input
              type='email'
              id='newsletter-email'
              value={newsletterData.email}
              onChange={handleEmailInputChange}
              placeholder='votre@email.com'
              className='newsletter-input'
              disabled={isSubmitting}
              required
            />
          </div>

          <div className='newsletter-privacy'>
            <p>
              En vous inscrivant, vous acceptez de recevoir nos communications. Vous pouvez vous
              désinscrire à tout moment.
            </p>
          </div>
        </div>
      </FormModal>

      {/* Notifications */}
      {notifications.some(n => n.type === 'success') && (
        <SuccessNotification
          notifications={notifications.filter(n => n.type === 'success')}
          onRemove={removeNotification}
          autoClose={true}
          autoCloseDelay={5000}
          position='top-right'
        />
      )}
      {notifications.some(n => n.type === 'error') && (
        <ErrorNotification
          notifications={notifications.filter(n => n.type === 'error')}
          onRemove={removeNotification}
          autoClose={true}
          autoCloseDelay={5000}
          position='top-right'
        />
      )}
    </motion.div>
  );
};

export default AteliersLinguistiques;
