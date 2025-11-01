import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaChevronRight,
  FaEnvelope,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../../hooks';
import { Button } from '../UI/Buttons';
import { FormModal } from '../UI/Modales';
import { ErrorNotification, SuccessNotification } from '../UI/Notifications';
import './Footer.css';
import LegalModal from './Modals/LegalModal';
import PrivacyModal from './Modals/PrivacyModal';
import TermsModal from './Modals/TermsModal';
import useModalState from './hooks/useModalState';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Gestion des modales avec le hook personnalisé
  const { modalStates, toggleModal } = useModalState(['legal', 'privacy', 'terms']);

  // État pour la newsletter
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [newsletterData, setNewsletterData] = useState({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Hook pour la gestion d'erreurs
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
        addNotification('error', 'Veuillez saisir une adresse email valide');
        return;
      }

      setIsSubmitting(true);

      // Simulation d'un appel API avec délai
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Newsletter subscription:', formData);

      // Ici, vous pourriez ajouter l'appel à votre API de newsletter
      // await newsletterService.subscribe(formData.email);

      // Notification de succès
      addNotification('success', "Inscription à la lettre d'information réussie !");

      // Fermer la modale
      setIsNewsletterModalOpen(false);

      // Réinitialiser le formulaire
      setNewsletterData({ email: '' });
      setIsEmailValid(false);
    } catch (error) {
      addNotification(
        'error',
        "Erreur lors de l'inscription à la lettre d'information. Veuillez réessayer."
      );
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonctions optimisées
  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavClick = useCallback(
    path => e => {
      e.preventDefault();
      navigate(path);
    },
    [navigate]
  );

  // Données de navigation optimisées
  const navigationData = {
    offres: [
      { path: '/offres/langues', label: 'Langues' },
      { path: '/offres/soutien-scolaire', label: 'Soutien Scolaire' },
      { path: '/offres/ateliers', label: 'Ateliers' },
      { path: '/offres/examens', label: 'Examens' },
      { path: '/offres/accompagnements', label: 'Accompagnements' },
    ],
    methode: [
      { path: '/methode/approche-actionnelle', label: 'Approche Actionnelle' },
      { path: '/methode/niveaux-parcours', label: 'Niveaux & Parcours' },
      // { path: '/methode/outils-ressources', label: 'Outils & Ressources' }, // Temporairement caché
    ],
    pages: [
      { path: '/', label: 'Accueil' },
      { path: '/qui-sommes-nous', label: 'Qui sommes nous ?' },
      { path: '/contact', label: 'Contact' },
    ],
  };

  return (
    <footer className='footer' role='contentinfo'>
      <div className='footer-content'>
        {/* Section supérieure - 4 colonnes égales */}
        <div className='footer-main'>
          {/* Colonne 1: À propos */}
          <div className='footer-column footer-about'>
            <h3 className='footer-column-title'>À propos</h3>
            <div className='footer-description'>
              <p className='footer-description-text'>{t('footer.description')}</p>
            </div>
            <div className='footer-newsletter'>
              {/*
              <button
                className='footer-newsletter-button'
                onClick={() => setIsNewsletterModalOpen(true)}
                type='button'
                aria-label="S'inscrire à la lettre d'information"
              >
                <FaEnvelope className='newsletter-icon' />
                Lettre d'information
              </button>
              */}
            </div>
            <div className='footer-social'>
              <h4 className='footer-social-title'>Suivez-nous</h4>
              <div className='footer-social-links'>
                <a
                  href='https://facebook.com/boncours'
                  className='footer-social-link'
                  aria-label='Suivez-nous sur Facebook'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaFacebookF />
                </a>
                <a
                  href='https://instagram.com/boncours'
                  className='footer-social-link'
                  aria-label='Suivez-nous sur Instagram'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram />
                </a>
                <a
                  href='https://www.linkedin.com/company/boncours'
                  className='footer-social-link'
                  aria-label='Suivez-nous sur LinkedIn'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Colonne 2: Nos Offres */}
          <div className='footer-column footer-offers'>
            <h3 className='footer-column-title'>Nos Offres</h3>
            <nav className='footer-nav' aria-label='Navigation offres'>
              <ul>
                {navigationData.offres.map(link => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      className='footer-nav-link'
                      onClick={handleNavClick(link.path)}
                    >
                      {link.label}
                      <FaChevronRight className='nav-arrow' aria-hidden='true' />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Colonne 3: Notre Méthode */}
          <div className='footer-column footer-method'>
            <h3 className='footer-column-title'>Notre Méthode</h3>
            <nav className='footer-nav' aria-label='Navigation méthode'>
              <ul>
                {navigationData.methode.map(link => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      className='footer-nav-link'
                      onClick={handleNavClick(link.path)}
                    >
                      {link.label}
                      <FaChevronRight className='nav-arrow' aria-hidden='true' />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Colonne 4: Contact */}
          <div className='footer-column footer-contact'>
            <h3 className='footer-column-title'>Contact</h3>
            <div className='footer-contact-info'>
              <div className='footer-contact-item'>
                <FaPhone className='footer-contact-icon' />
                <a
                  href='tel:+33388520382'
                  className='footer-contact-text'
                  aria-label='Appelez-nous au 03.88.52.03.82'
                >
                  03 88 52 03 82
                </a>
              </div>
              <div className='footer-contact-item'>
                <FaWhatsapp className='footer-contact-icon' />
                <a
                  href='https://wa.me/33679145577'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='footer-contact-text'
                  aria-label='Nous contacter sur WhatsApp'
                >
                  06 79 14 55 77
                </a>
              </div>
              <div className='footer-contact-item'>
                <FaEnvelope className='footer-contact-icon' />
                <a
                  href='mailto:contact@boncours.fr'
                  className='footer-contact-text'
                  aria-label='Nous contacter par email'
                >
                  contact@boncours.fr
                </a>
              </div>
              <div className='footer-contact-item'>
                <FaMapMarkerAlt className='footer-contact-icon' />
                <a
                  href='https://maps.google.com/?q=36+quai+Mullenheim,+67000+Strasbourg'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='footer-contact-text'
                  aria-label='Voir notre adresse sur Google Maps'
                >
                  36 quai Mullenheim
                  <br />
                  67000 Strasbourg
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section inférieure */}
        <div className='footer-bottom'>
          <div className='footer-copyright'>
            <small>
              © {currentYear} Bon Cours. {t('footer.rights')}
            </small>
          </div>
          <nav className='footer-legal' role='navigation' aria-label='Liens légaux'>
            <Button
              variant='text'
              className='footer-legal-link'
              onClick={() => toggleModal('legal')}
              aria-label='Ouvrir les mentions légales'
              type='button'
            >
              Mentions légales
            </Button>
            <Button
              variant='text'
              className='footer-legal-link'
              onClick={() => toggleModal('privacy')}
              aria-label='Ouvrir la politique de confidentialité'
              type='button'
            >
              Politique de confidentialité
            </Button>
            <Button
              variant='text'
              className='footer-legal-link'
              onClick={() => toggleModal('terms')}
              aria-label="Ouvrir les conditions générales d'utilisation"
              type='button'
            >
              CGU
            </Button>
            <a
              href='/assets/REGLEMENT%20INTERIEUR.pdf'
              className='footer-legal-link'
              aria-label='Ouvrir le règlement intérieur (PDF) dans un nouvel onglet'
              target='_blank'
              rel='noopener noreferrer'
            >
              Règlement intérieur
            </a>
          </nav>
        </div>

        {/* Section développeur */}
        <div className='footer-developer'>
          <p>
            Conçu et développé avec <FaHeart className='heart' aria-label='amour' /> à Schiltigheim,
            France.
            <br />
            Une solution{' '}
            <a
              href='https://www.duboswebservices.fr/'
              target='_blank'
              rel='noopener noreferrer'
              className='dubos-link'
              aria-label='Visitez le site de Dubos Web Services (nouvelle fenêtre)'
            >
              DUBOS WEB SERVICES
            </a>
            .
          </p>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <Button
        variant='text'
        className='back-to-top'
        onClick={scrollToTop}
        aria-label='Retour en haut de la page'
        type='button'
      >
        ↑
      </Button>

      {/* Modales */}
      <LegalModal isOpen={modalStates.legal} onClose={() => toggleModal('legal')} />
      <PrivacyModal isOpen={modalStates.privacy} onClose={() => toggleModal('privacy')} />
      <TermsModal isOpen={modalStates.terms} onClose={() => toggleModal('terms')} />

      {/* Modale de newsletter */}
      <FormModal
        isOpen={isNewsletterModalOpen}
        onClose={() => {
          setIsNewsletterModalOpen(false);
          setNewsletterData({ email: '' });
          setIsEmailValid(false);
        }}
        onSubmit={handleNewsletterSubmit}
        title="Inscrivez-vous à notre lettre d'information"
        submitText={isSubmitting ? 'Inscription...' : "S'inscrire"}
        cancelText='Annuler'
        initialData={newsletterData}
        submitDisabled={isSubmitting || !isEmailValid}
        fields={[]}
        className='newsletter-modal'
      >
        <div className='newsletter-modal-content'>
          <p className='newsletter-description'>
            Recevez les dernières informations sur nos ateliers linguistiques, les nouvelles dates
            et les événements spéciaux par lettre d'information.
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
    </footer>
  );
};

export default Footer;
