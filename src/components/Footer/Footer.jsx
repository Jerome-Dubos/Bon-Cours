import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaChevronRight,
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
      { path: '/methode/outils-ressources', label: 'Outils & Ressources' },
    ],
    pages: [
      { path: '/', label: 'Accueil' },
      { path: '/qui-sommes-nous', label: 'Qui sommes nous ?' },
      { path: '/contact', label: 'Contact' },
    ],
  };

  // Composants optimisés
  const LogoSection = ({ className = '' }) => (
    <header className={`footer-logo ${className}`}>
      <img
        src='/assets/images/logo/InstitutBonCours_Logo_horizontal_clair.svg'
        alt='Institut Bon Cours - École de langues'
        className='footer-logo-img'
        width='250'
        height='100'
        loading='lazy'
      />
    </header>
  );

  const DescriptionSection = () => (
    <div className='footer-description'>
      <h2 className='footer-tagline'>{t('footer.tagline')}</h2>
      <p className='footer-description-text'>{t('footer.description')}</p>
    </div>
  );

  const SocialSection = () => (
    <div className='footer-social'>
      <h3 id='about-heading'>{t('footer.follow')}</h3>
      <nav className='social-links' role='list' aria-label='Réseaux sociaux'>
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
      </nav>
    </div>
  );

  const ContactSection = () => (
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
            36 quai Mullenheim
            <br />
            67000 Strasbourg
          </a>
        </div>
        <div className='contact-item'>
          <div className='contact-icon' aria-hidden='true'>
            <FaPhone />
          </div>
          <a
            href='tel:+33388510382'
            className='contact-text contact-link'
            aria-label='Appelez-nous au 03.88.51.03.82'
          >
            +33 3 88 51 03 82
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
  );

  const NavigationSection = ({ title, navLabel, id, links }) => (
    <section className='footer-section footer-navigation' aria-labelledby={id}>
      <h3 id={id}>{title}</h3>
      <nav className='footer-nav' aria-label={navLabel}>
        <ul>
          {links.map(link => (
            <li key={link.path}>
              <a href={link.path} className='footer-nav-link' onClick={handleNavClick(link.path)}>
                {link.label}
                <FaChevronRight className='nav-arrow' aria-hidden='true' />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );

  // Composant footer avec navigation
  const FooterWithNavigation = () => (
    <div className='footer-main footer-extended'>
      <section className='footer-section' aria-labelledby='about-heading'>
        <DescriptionSection />
        <SocialSection />
      </section>

      <NavigationSection
        title='Nos Offres'
        navLabel='Navigation offres'
        id='nav-offres-heading'
        links={navigationData.offres}
      />

      <NavigationSection
        title='Notre Méthode'
        navLabel='Navigation méthode'
        id='nav-methode-heading'
        links={navigationData.methode}
      />

      <NavigationSection
        title='Pages'
        navLabel='Navigation pages'
        id='nav-pages-heading'
        links={navigationData.pages}
      />
    </div>
  );

  return (
    <footer className='footer footer-extended' role='contentinfo'>
      <div className='footer-content'>
        {/* Informations de contact centrées */}
        <div className='footer-contact-info-container'>
          <div className='footer-logo-contact-info'>
            <div className='footer-contact-item'>
              <FaPhone className='footer-contact-icon' />
              <a
                href='tel:+33388520382'
                className='footer-contact-text footer-contact-link'
                aria-label='Appelez-nous au 03.88.52.03.82'
              >
                +33 3 88 52 03 82
              </a>
            </div>
            <div className='footer-contact-item'>
              <FaMapMarkerAlt className='footer-contact-icon' />
              <a
                href='https://maps.google.com/?q=36+quai+Mullenheim,+67000+Strasbourg'
                target='_blank'
                rel='noopener noreferrer'
                className='footer-contact-text footer-contact-link'
                aria-label='Voir notre adresse sur Google Maps'
              >
                36 quai Mullenheim, 67000 Strasbourg
              </a>
            </div>
          </div>
        </div>
        <FooterWithNavigation />

        {/* Séparateur */}
        <div className='footer-divider' />

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
    </footer>
  );
};

export default Footer;
