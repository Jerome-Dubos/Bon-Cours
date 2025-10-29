import React, { useState } from 'react';
import { FaClock, FaDirections, FaMapMarkerAlt } from 'react-icons/fa';
import { MdDirectionsBus, MdDirectionsCar, MdPedalBike, MdTram } from 'react-icons/md';
import { InfoNotification } from '../UI/Notifications';
import './ContactInfo.css';

const ContactInfo = () => {
  const [infoNotifications, setInfoNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);

  const horaires = [
    { jour: 'Lundi', heures: '8h - 20h', ouvert: true },
    { jour: 'Mardi', heures: '8h - 20h', ouvert: true },
    { jour: 'Mercredi', heures: '8h - 20h', ouvert: true },
    { jour: 'Jeudi', heures: '8h - 20h', ouvert: true },
    { jour: 'Vendredi', heures: '8h - 20h', ouvert: true },
    { jour: 'Samedi', heures: '8h - 20h', ouvert: true },
    { jour: 'Dimanche', heures: '8h - 20h', ouvert: true },
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
    setInfoNotifications(prev => [...prev, newNotification]);
    setNextNotificationId(prev => prev + 1);
  };

  // Fonction pour supprimer une notification
  const removeInfoNotification = id => {
    setInfoNotifications(prev => prev.filter(n => n.id !== id));
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

  const transportMethods = [
    {
      icon: MdTram,
      title: 'Tram',
      description: 'Ligne B - Arrêt Lycée Kleber',
    },
    {
      icon: MdDirectionsBus,
      title: 'Bus',
      description: 'Ligne 2 - Arrêt Bethesda\nLigne C6, 30 et 72 - Arrêt Orangerie',
    },
    {
      icon: MdDirectionsCar,
      title: 'Voiture',
      description: 'Places payantes à proximité',
    },
    {
      icon: MdPedalBike,
      title: 'Vélo',
      description: "Stationnement au pied de l'immeuble",
    },
  ];

  return (
    <div className='contact-info-container'>
      <div className='contact-info-content'>
        {/* Section "Où nous trouver" */}
        <div className='where-to-find-section'>
          <div className='where-to-find-header'>
            <h2 className='where-to-find-title'>Où nous trouver</h2>
          </div>

          <div className='where-to-find-grid'>
            {/* Colonne gauche : Carte (60%) */}
            <div className='map-column'>
              <div className='map-container' onClick={handleGetDirections}>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2650.425282370964!2d7.760963315661839!3d48.58523297926313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c84e0e2e2e2b%3A0x2e2e2e2e2e2e2e2e!2s36%20Quai%20Mullenheim%2C%2067000%20Strasbourg!5e0!3m2!1sfr!2sfr!4v1710000000000!5m2!1sfr!2sfr'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen=''
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='Localisation Bon Cours Strasbourg'
                  className='map-iframe'
                />
              </div>
            </div>

            {/* Colonne droite : Informations pratiques (40%) */}
            <div className='info-column'>
              {/* Bloc Adresse */}
              <div className='info-block address-block'>
                <div className='info-block-header'>
                  <div className='info-block-icon'>
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <h3 className='info-block-title'>Adresse</h3>
                </div>
                <p className='info-block-content'>{contactInfo.adresse}</p>
                <button
                  className='directions-button'
                  onClick={handleGetDirections}
                  aria-label="Obtenir l'itinéraire vers notre adresse"
                >
                  <FaDirections size={16} />
                  <span>Obtenir l'itinéraire</span>
                </button>
              </div>

              {/* Bloc Horaires */}
              <div className='info-block hours-block'>
                <div className='info-block-header'>
                  <div className='info-block-icon'>
                    <FaClock size={20} />
                  </div>
                  <h3 className='info-block-title'>Horaires d'ouverture</h3>
                </div>
                <div className='hours-list'>
                  {horaires.map((horaire, index) => (
                    <div
                      key={index}
                      className={`hours-item${horaire.jour === todayName ? ' active' : ''}`}
                      aria-current={horaire.jour === todayName ? 'date' : undefined}
                    >
                      <span className='hours-day'>{horaire.jour}</span>
                      <span className={`hours-time ${!horaire.ouvert ? 'closed' : ''}`}>
                        {horaire.heures}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section "Comment venir" */}
        <div className='how-to-come-section'>
          <div className='how-to-come-header'>
            <h2 className='how-to-come-title'>Comment venir</h2>
          </div>
          <div className='transport-grid'>
            {transportMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className='transport-card'>
                  <div className='transport-icon'>
                    <IconComponent size={24} />
                  </div>
                  <h3 className='transport-title'>{method.title}</h3>
                  <p className='transport-description'>{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notifications centralisées */}
      {infoNotifications.length > 0 && (
        <InfoNotification
          notifications={infoNotifications}
          onRemove={removeInfoNotification}
          autoClose={true}
          autoCloseDelay={3000}
          showCloseButton={false}
        />
      )}
    </div>
  );
};

export default ContactInfo;
