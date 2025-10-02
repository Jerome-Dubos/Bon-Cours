import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaEnvelope,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from '../UI/Buttons';
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

  // Fonction optimisée pour naviguer vers la page contact
  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  // Fonction pour retourner en haut de page
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className='footer' role='contentinfo'>
      <div className='footer-content'>
        <div className='footer-main'>
          {/* Section À propos */}
          <section className='footer-section' aria-labelledby='about-heading'>
            <div className='footer-logo'>
              <img
                src='/beige-paysage.svg'
                alt='Logo Bon Cours'
                className='footer-logo-img'
                width='120'
                height='40'
                loading='lazy'
              />
              <div className='footer-logo-text'>
                <p>{t('footer.tagline')}</p>
              </div>
            </div>
            <p>{t('footer.description')}</p>
            <div className='footer-social'>
              <h3 id='about-heading'>{t('footer.follow')}</h3>
              <div className='social-links' role='list'>
                <a
                  href='https://facebook.com/boncours'
                  className='social-link'
                  aria-label='Suivez-nous sur Facebook'
                  target='_blank'
                  rel='noopener noreferrer'
                  role='listitem'
                >
                  <FaFacebookF aria-hidden='true' />
                </a>
                <a
                  href='https://instagram.com/boncours'
                  className='social-link'
                  aria-label='Suivez-nous sur Instagram'
                  target='_blank'
                  rel='noopener noreferrer'
                  role='listitem'
                >
                  <FaInstagram aria-hidden='true' />
                </a>
              </div>
            </div>
          </section>

          {/* Section Contact */}
          <section className='footer-section footer-contact' aria-labelledby='contact-heading'>
            <h3 id='contact-heading'>{t('footer.contact')}</h3>
            <address className='contact-info'>
              <div className='contact-item'>
                <div className='contact-icon' aria-hidden='true'>
                  <FaMapMarkerAlt />
                </div>
                <a
                  href='https://maps.google.com/?q=36+quai+Mullenheim,+67000+Strasbourg'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='contact-text contact-link'
                  aria-label='Voir notre adresse sur Google Maps'
                >
                  36 quai Mullenheim, 67000 Strasbourg
                </a>
              </div>
              <div className='contact-item'>
                <div className='contact-icon' aria-hidden='true'>
                  <FaPhone />
                </div>
                <a
                  href='tel:+33123456789'
                  className='contact-text contact-link'
                  aria-label='Appelez-nous au 01 23 45 67 89'
                >
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className='contact-item'>
                <div className='contact-icon' aria-hidden='true'>
                  <FaEnvelope />
                </div>
                <button
                  className='footer-contact-button'
                  onClick={handleContactClick}
                  type='button'
                  aria-label='Nous contacter par email'
                >
                  Nous contacter
                </button>
              </div>
            </address>
          </section>
        </div>

        {/* Séparateur */}
        <div className='footer-divider'></div>

        {/* Bas du footer */}
        <div className='footer-bottom'>
          <div className='footer-copyright'>
            <small>
              © {currentYear} Bon Cours. {t('footer.rights')}
            </small>
          </div>
          <nav className='footer-links' role='navigation' aria-label='Liens légaux'>
            <Button
              variant='text'
              className='footer-link-button'
              onClick={() => toggleModal('legal')}
              aria-label='Ouvrir les mentions légales'
              type='button'
            >
              Mentions légales
            </Button>
            <Button
              variant='text'
              className='footer-link-button'
              onClick={() => toggleModal('privacy')}
              aria-label='Ouvrir la politique de confidentialité'
              type='button'
            >
              Politique de confidentialité
            </Button>
            <Button
              variant='text'
              className='footer-link-button'
              onClick={() => toggleModal('terms')}
              aria-label="Ouvrir les conditions générales d'utilisation"
              type='button'
            >
              CGU
            </Button>
          </nav>
        </div>

        {/* Ligne développeur */}
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
    </footer>
  );
};

export default Footer;
