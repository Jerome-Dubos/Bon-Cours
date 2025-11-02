import React, { useMemo, useState } from 'react';
import { FaClock, FaDirections, FaMapMarkerAlt } from 'react-icons/fa';
import { MdDirectionsBus, MdDirectionsCar, MdPedalBike, MdTram } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { InfoNotification } from '../UI/Notifications';
import './ContactInfo.css';

const ContactInfo = () => {
  const { t } = useTranslation();
  const [infoNotifications, setInfoNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);

  const horaires = useMemo(
    () => [
      { jour: t('contact.days.monday'), heures: '8h - 20h', ouvert: true },
      { jour: t('contact.days.tuesday'), heures: '8h - 20h', ouvert: true },
      { jour: t('contact.days.wednesday'), heures: '8h - 20h', ouvert: true },
      { jour: t('contact.days.thursday'), heures: '8h - 20h', ouvert: true },
      { jour: t('contact.days.friday'), heures: '8h - 20h', ouvert: true },
      { jour: t('contact.days.saturday'), heures: '8h - 20h', ouvert: true },
      { jour: t('contact.days.sunday'), heures: '8h - 20h', ouvert: true },
    ],
    [t]
  );

  const contactInfo = useMemo(
    () => ({
      adresse: t('contact.address'),
    }),
    [t]
  );

  // Détermination du jour actif
  const joursFR = useMemo(
    () => [
      t('contact.days.sunday'),
      t('contact.days.monday'),
      t('contact.days.tuesday'),
      t('contact.days.wednesday'),
      t('contact.days.thursday'),
      t('contact.days.friday'),
      t('contact.days.saturday'),
    ],
    [t]
  );
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
    addNotification(t('contact.address_copied'));
  };

  const handleCopyHours = () => {
    const hoursText = horaires.map(h => `${h.jour}: ${h.heures}`).join('\n');
    copyToClipboard(hoursText);
    addNotification(t('contact.hours_copied'));
  };

  const transportMethods = useMemo(
    () => [
      {
        icon: MdTram,
        title: t('contact.transport.tram.title'),
        description: t('contact.transport.tram.description'),
      },
      {
        icon: MdDirectionsBus,
        title: t('contact.transport.bus.title'),
        description: t('contact.transport.bus.description'),
      },
      {
        icon: MdDirectionsCar,
        title: t('contact.transport.car.title'),
        description: t('contact.transport.car.description'),
      },
      {
        icon: MdPedalBike,
        title: t('contact.transport.bike.title'),
        description: t('contact.transport.bike.description'),
      },
    ],
    [t]
  );

  return (
    <div className='contact-info-container'>
      <div className='contact-info-content'>
        {/* Section "Où nous trouver" */}
        <div className='where-to-find-section'>
          <div className='where-to-find-header'>
            <h2 className='where-to-find-title'>{t('contact.where_to_find')}</h2>
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
                  title={t('contact.map_title')}
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
                  <h3 className='info-block-title'>{t('contact.address_title')}</h3>
                </div>
                <p className='info-block-content'>{contactInfo.adresse}</p>
                <button
                  className='directions-button'
                  onClick={handleGetDirections}
                  aria-label="Obtenir l'itinéraire vers notre adresse"
                >
                  <FaDirections size={16} />
                  <span>{t('contact.get_directions')}</span>
                </button>
              </div>

              {/* Bloc Horaires */}
              <div className='info-block hours-block'>
                <div className='info-block-header'>
                  <div className='info-block-icon'>
                    <FaClock size={20} />
                  </div>
                  <h3 className='info-block-title'>{t('contact.hours_title')}</h3>
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
            <h2 className='how-to-come-title'>{t('contact.how_to_come')}</h2>
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
