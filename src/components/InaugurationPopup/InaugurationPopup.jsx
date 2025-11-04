import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBell, FaCalendarAlt } from 'react-icons/fa';
import Modal from '../UI/Modales/src/components/Modals';
import { ErrorNotification, SuccessNotification } from '../UI/Notifications';
import InaugurationForm from './InaugurationForm';
import './InaugurationPopup.css';

const InaugurationPopup = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successNotifications, setSuccessNotifications] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);

  // Clés localStorage
  const STORAGE_KEYS = {
    IS_REGISTERED: 'boncours_inauguration_registered',
    POPUP_CLOSED: 'boncours_inauguration_popup_closed',
  };

  useEffect(() => {
    // Vérifier si l'utilisateur s'est déjà inscrit
    const isRegistered = localStorage.getItem(STORAGE_KEYS.IS_REGISTERED) === 'true';

    if (isRegistered) {
      // Si inscrit, ne jamais afficher
      setShowPopup(false);
      return;
    }

    // Réinitialiser le flag de fermeture à chaque rechargement
    // La popup se réaffichera à chaque rechargement (sauf si l'utilisateur est inscrit)
    localStorage.removeItem(STORAGE_KEYS.POPUP_CLOSED);

    // Afficher la popup
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    // Marquer que la popup a été fermée (sera réinitialisé au prochain rechargement)
    localStorage.setItem(STORAGE_KEYS.POPUP_CLOSED, 'true');
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSuccess = () => {
    // Marquer l'utilisateur comme inscrit
    localStorage.setItem(STORAGE_KEYS.IS_REGISTERED, 'true');

    // Supprimer le flag de fermeture (plus nécessaire puisque l'utilisateur est inscrit)
    localStorage.removeItem(STORAGE_KEYS.POPUP_CLOSED);

    // Ajouter une notification de succès au niveau parent
    const successMessage = t('inauguration.notifications.success');
    const newNotification = {
      id: nextNotificationId,
      message: successMessage,
    };
    setSuccessNotifications(prev => [...prev, newNotification]);
    setNextNotificationId(prev => prev + 1);

    // Fermer la modale et la popup (ne plus jamais afficher)
    handleCloseModal();
    setShowPopup(false);
  };

  const handleFormError = errorMessage => {
    // Ajouter une notification d'erreur au niveau parent
    const newNotification = {
      id: nextNotificationId,
      message: errorMessage,
    };
    setErrorNotifications(prev => [...prev, newNotification]);
    setNextNotificationId(prev => prev + 1);
  };

  const removeSuccessNotification = id => {
    setSuccessNotifications(prev => prev.filter(n => n.id !== id));
  };

  const removeErrorNotification = id => {
    setErrorNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Vérifier si on peut afficher le bouton discret (popup fermée mais pas inscrit)
  const canShowReopenButton = () => {
    const isRegistered = localStorage.getItem(STORAGE_KEYS.IS_REGISTERED) === 'true';
    return !isRegistered && !showPopup;
  };

  const handleReopenPopup = () => {
    setShowPopup(true);
    // Retirer le flag de fermeture pour permettre l'affichage
    localStorage.removeItem(STORAGE_KEYS.POPUP_CLOSED);
  };

  return (
    <>
      {/* Bouton discret pour rouvrir la popup */}
      {canShowReopenButton() && (
        <button
          className='inauguration-reopen-button'
          onClick={handleReopenPopup}
          aria-label={t('inauguration.popup.reopenLabel')}
          title={t('inauguration.popup.reopenTitle')}
        >
          <FaBell />
        </button>
      )}

      {/* Popup principale */}
      {showPopup && (
        <div className='inauguration-popup'>
          <button
            className='inauguration-popup-close'
            onClick={handleClosePopup}
            aria-label={t('inauguration.popup.closeLabel')}
          >
            ×
          </button>

          <div className='inauguration-popup-content'>
            <div className='inauguration-popup-icon-wrapper'>
              <FaCalendarAlt className='inauguration-popup-icon' />
            </div>

            <div className='inauguration-popup-header'>
              <h3 className='inauguration-popup-title'>{t('inauguration.popup.title')}</h3>
              <p className='inauguration-popup-subtitle'>{t('inauguration.popup.subtitle')}</p>
            </div>

            <div className='inauguration-popup-date-wrapper'>
              <FaCalendarAlt className='inauguration-popup-date-icon' />
              <p className='inauguration-popup-date'>{t('inauguration.popup.date')}</p>
            </div>

            <p className='inauguration-popup-description'>{t('inauguration.popup.description')}</p>

            <button className='inauguration-popup-button' onClick={handleOpenModal}>
              {t('inauguration.popup.button')}
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={t('inauguration.modal.title')}
        size='medium'
        showCloseButton={true}
        closeOnOverlayClick={true}
        closeOnEscape={true}
      >
        <InaugurationForm onSuccess={handleFormSuccess} onError={handleFormError} />
      </Modal>

      {/* Notifications au niveau parent pour qu'elles restent visibles après fermeture de la modale */}
      {successNotifications.length > 0 && (
        <SuccessNotification
          notifications={successNotifications}
          onRemove={removeSuccessNotification}
          autoClose={true}
          autoCloseDelay={4000}
          showCloseButton={false}
        />
      )}

      {errorNotifications.length > 0 && (
        <ErrorNotification
          notifications={errorNotifications}
          onRemove={removeErrorNotification}
          autoClose={true}
          autoCloseDelay={5000}
          showCloseButton={false}
        />
      )}
    </>
  );
};

export default InaugurationPopup;
