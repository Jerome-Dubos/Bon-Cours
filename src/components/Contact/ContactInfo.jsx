import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaBicycle,
  FaBus,
  FaCar,
  FaClock,
  FaDirections,
  FaMapMarkerAlt,
  FaTrain,
} from 'react-icons/fa';
import './ContactInfo.css';

const ContactInfo = () => {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isHiding, setIsHiding] = useState(false);

  const horaires = [
    { jour: t('contact.hours.monday'), heures: t('contact.hours.time_range') },
    { jour: t('contact.hours.tuesday'), heures: t('contact.hours.time_range') },
    {
      jour: t('contact.hours.wednesday'),
      heures: t('contact.hours.time_range'),
    },
    {
      jour: t('contact.hours.thursday'),
      heures: t('contact.hours.time_range'),
    },
    { jour: t('contact.hours.friday'), heures: t('contact.hours.time_range') },
    {
      jour: t('contact.hours.saturday'),
      heures: t('contact.hours.time_range'),
    },
    { jour: t('contact.hours.sunday'), heures: t('contact.hours.time_range') },
  ];

  const contactInfo = {
    adresse: '36 quai Mullenheim, 67000 Strasbourg',
  };

  // Détermination du jour actif
  const joursFR = [
    t('contact.hours.sunday'),
    t('contact.hours.monday'),
    t('contact.hours.tuesday'),
    t('contact.hours.wednesday'),
    t('contact.hours.thursday'),
    t('contact.hours.friday'),
    t('contact.hours.saturday'),
  ];
  const today = new Date();
  const todayName = joursFR[today.getDay()];

  const handleGetDirections = () => {
    const address = encodeURIComponent(contactInfo.adresse);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Erreur de copie
    }
  };

  const showLocalNotification = message => {
    setNotificationMessage(message);
    setShowNotification(true);
    setIsHiding(false);

    // Commencer l'animation de disparition après 2.5 secondes
    setTimeout(() => {
      setIsHiding(true);
      // Supprimer complètement après l'animation
      setTimeout(() => {
        setShowNotification(false);
        setIsHiding(false);
      }, 300);
    }, 2500);
  };

  const handleCopyAddress = () => {
    copyToClipboard(contactInfo.adresse);
    showLocalNotification(t('contact.info.notifications.address_copied'));
  };

  const handleCopyHours = () => {
    const hoursText = horaires.map(h => `${h.jour}: ${h.heures}`).join('\n');
    copyToClipboard(hoursText);
    showLocalNotification(t('contact.info.notifications.hours_copied'));
  };

  return (
    <div className='contact-info-container'>
      {/* Notification locale discrète */}
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#333',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '500',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            maxWidth: '200px',
            animation: isHiding ? 'slideOutRight 0.3s ease-in' : 'slideInRight 0.3s ease-out',
          }}
        >
          {notificationMessage}
        </div>
      )}
      <div className='contact-info-content'>
        <div className='contact-hero-section'>
          <div className='contact-hero-header'>
            <h2 className='contact-hero-title'>{t('contact.info.title')}</h2>
            <p className='contact-hero-subtitle'>{t('contact.info.subtitle')}</p>
          </div>

          <div className='contact-hero-grid'>
            {/* Colonne gauche : Carte + Accès */}
            <div className='left-column'>
              {/* Carte en vedette */}
              <div className='map-hero-section'>
                <div className='map-hero-container'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2650.425282370964!2d7.760963315661839!3d48.58523297926313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c84e0e2e2e2b%3A0x2e2e2e2e2e2e2e2e!2s36%20Quai%20Mullenheim%2C%2067000%20Strasbourg!5e0!3m2!1sfr!2sfr!4v1710000000000!5m2!1sfr!2sfr'
                    width='100%'
                    height='450'
                    style={{ border: 0 }}
                    allowFullScreen=''
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    title='Localisation Bon Cours Strasbourg'
                    className='map-hero-iframe'
                  />
                  <div className='map-hero-overlay'>
                    <button className='directions-hero-button' onClick={handleGetDirections}>
                      <FaDirections size={18} />
                      <span>{t('contact.info.get_directions')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section d'accès compacte */}
              <div className='access-compact-section'>
                <h3 className='access-compact-title'>{t('contact.info.access_title')}</h3>
                <div className='access-compact-methods'>
                  <div className='access-compact-method'>
                    <div className='access-compact-icon'>
                      <FaTrain size={14} />
                    </div>
                    <div className='access-compact-content'>
                      <h4>{t('contact.info.transport.tram')}</h4>
                      <p>{t('contact.info.transport.tram_info')}</p>
                    </div>
                  </div>
                  <div className='access-compact-method'>
                    <div className='access-compact-icon'>
                      <FaBus size={14} />
                    </div>
                    <div className='access-compact-content'>
                      <h4>{t('contact.info.transport.bus')}</h4>
                      <p>{t('contact.info.transport.bus_info')}</p>
                    </div>
                  </div>
                  <div className='access-compact-method'>
                    <div className='access-compact-icon'>
                      <FaCar size={14} />
                    </div>
                    <div className='access-compact-content'>
                      <h4>{t('contact.info.transport.car')}</h4>
                      <p>{t('contact.info.transport.car_info')}</p>
                    </div>
                  </div>
                  <div className='access-compact-method'>
                    <div className='access-compact-icon'>
                      <FaBicycle size={14} />
                    </div>
                    <div className='access-compact-content'>
                      <h4>{t('contact.info.transport.bike')}</h4>
                      <p>{t('contact.info.transport.bike_info')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite : Informations */}
            <div className='right-column'>
              <div className='info-hero-card'>
                <div className='info-hero-item'>
                  <div
                    className='info-hero-icon'
                    onClick={handleCopyAddress}
                    title="Cliquer pour copier l'adresse"
                  >
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div className='info-hero-content'>
                    <h3 className='info-hero-label'>{t('contact.info.address_title')}</h3>
                    <p className='info-hero-text'>{contactInfo.adresse}</p>
                  </div>
                </div>

                <div className='info-hero-item'>
                  <div className='info-hero-content'>
                    <div className='info-hero-header'>
                      <div
                        className='info-hero-icon'
                        onClick={handleCopyHours}
                        title='Cliquer pour copier les horaires'
                      >
                        <FaClock size={24} />
                      </div>
                      <h3 className='info-hero-label'>{t('contact.info.hours_title')}</h3>
                    </div>
                    <div className='hours-hero-list'>
                      {horaires.map((horaire, index) => (
                        <div
                          key={index}
                          className={`hours-hero-item${
                            horaire.jour === todayName ? ' active' : ''
                          }`}
                        >
                          <span className='hours-hero-day'>{horaire.jour}</span>
                          <span className='hours-hero-time'>{horaire.heures}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
