import React, { useState } from 'react';
import {
  FaBicycle,
  FaBus,
  FaCar,
  FaClock,
  FaDirections,
  FaMapMarkerAlt,
  FaTrain,
} from 'react-icons/fa';
import { SuccessNotification } from '../UI/Notifications';
import './ContactInfo.css';

const ContactInfo = () => {
  const [successNotifications, setSuccessNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);

  const horaires = [
    { jour: 'Lundi', heures: '8h - 20h' },
    { jour: 'Mardi', heures: '8h - 20h' },
    { jour: 'Mercredi', heures: '8h - 20h' },
    { jour: 'Jeudi', heures: '8h - 20h' },
    { jour: 'Vendredi', heures: '8h - 20h' },
    { jour: 'Samedi', heures: '8h - 20h' },
    { jour: 'Dimanche', heures: '8h - 20h' },
  ];

  const contactInfo = {
    adresse: '36 quai Mullenheim, 67000 Strasbourg',
  };

  // Détermination du jour actif
  const joursFR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
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

  // Fonction pour ajouter une notification
  const addNotification = message => {
    const newNotification = {
      id: nextNotificationId,
      message,
    };
    setSuccessNotifications(prev => [...prev, newNotification]);
    setNextNotificationId(prev => prev + 1);
  };

  // Fonction pour supprimer une notification
  const removeSuccessNotification = id => {
    setSuccessNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleCopyAddress = () => {
    copyToClipboard(contactInfo.adresse);
    addNotification('Adresse copiée !');
  };

  const handleCopyHours = () => {
    const hoursText = horaires.map(h => `${h.jour}: ${h.heures}`).join('\n');
    copyToClipboard(hoursText);
    addNotification('Horaires copiés !');
  };

  return (
    <div className='contact-info-container'>
      <div className='contact-info-content'>
        <div className='contact-hero-section'>
          <div className='contact-hero-header'>
            <h2 className='contact-hero-title'>Où nous trouver</h2>
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
                      <span>Obtenir l'itinéraire</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section d'accès compacte */}
              <div className='access-compact-section'>
                <h3 className='access-compact-title'>Comment venir ?</h3>
                <div className='access-compact-methods'>
                  <div className='access-compact-method'>
                    <div className='access-compact-icon'>
                      <FaTrain size={14} />
                    </div>
                    <div className='access-compact-content'>
                      <h4>Tram</h4>
                      <p>A & D - Gallia</p>
                    </div>
                  </div>
                  <div className='access-compact-method'>
                    <div className='access-compact-icon'>
                      <FaBus size={14} />
                    </div>
                    <div className='access-compact-content'>
                      <h4>Bus</h4>
                      <p>10 & 30</p>
                    </div>
                  </div>
                  <div className='access-compact-method'>
                    <div className='access-compact-icon'>
                      <FaCar size={14} />
                    </div>
                    <div className='access-compact-content'>
                      <h4>Voiture</h4>
                      <p>Parking proche</p>
                    </div>
                  </div>
                  <div className='access-compact-method'>
                    <div className='access-compact-icon'>
                      <FaBicycle size={14} />
                    </div>
                    <div className='access-compact-content'>
                      <h4>Vélo</h4>
                      <p>Vélhop 2min</p>
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
                    <h3 className='info-hero-label'>Adresse</h3>
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
                      <h3 className='info-hero-label'>Horaires d'ouverture</h3>
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

      {/* Notifications centralisées */}
      {successNotifications.length > 0 && (
        <SuccessNotification
          notifications={successNotifications}
          onRemove={removeSuccessNotification}
          autoClose={true}
          autoCloseDelay={3000}
          showCloseButton={false}
        />
      )}
    </div>
  );
};

export default ContactInfo;
