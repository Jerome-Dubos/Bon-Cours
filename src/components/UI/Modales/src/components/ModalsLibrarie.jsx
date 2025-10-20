import React, { useEffect, useState } from 'react';
import {
  CancelButton,
  OutlineButton,
  PrimaryButton,
  SecondaryButton,
  SubmitButton,
} from '../../../Buttons';
import {
  ErrorNotification,
  InfoNotification,
  SuccessNotification,
  WarningNotification,
} from '../../../Notifications';
import '../styles/ModalsLibrarie.css';
import Modal from './Modals';

// Modales de base par taille
export const SmallModal = ({ isOpen, onClose, children, title, ...props }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size='small' {...props}>
    {children}
  </Modal>
);

export const MediumModal = ({ isOpen, onClose, children, title, ...props }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size='medium' {...props}>
    {children}
  </Modal>
);

export const LargeModal = ({ isOpen, onClose, children, title, ...props }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size='large' {...props}>
    {children}
  </Modal>
);

export const FullScreenModal = ({ isOpen, onClose, children, title, ...props }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size='fullscreen' {...props}>
    {children}
  </Modal>
);

// Modales spécialisées par type
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  message = 'Êtes-vous sûr de vouloir continuer ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  showNotifications = true,
  ...props
}) => {
  const [notifications, setNotifications] = useState([]);

  const handleConfirm = async () => {
    try {
      if (showNotifications) {
        setNotifications([
          {
            id: Date.now(),
            message: 'Action en cours...',
            type: 'info',
          },
        ]);
      }

      await onConfirm();

      if (showNotifications) {
        setNotifications([
          {
            id: Date.now(),
            message: 'Action confirmée avec succès !',
            type: 'success',
          },
        ]);

        setTimeout(() => {
          onClose();
          setNotifications([]);
        }, 2000);
      }
    } catch (error) {
      if (showNotifications) {
        setNotifications([
          {
            id: Date.now(),
            message: error.message || 'Erreur lors de la confirmation',
            type: 'error',
          },
        ]);
      }
    }
  };

  const removeNotification = id => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size='small'
      showFooter={true}
      className='modal-confirm'
      footerContent={
        <div className='modal-actions'>
          <OutlineButton onClick={onClose}>{cancelText}</OutlineButton>
          <PrimaryButton onClick={handleConfirm}>{confirmText}</PrimaryButton>
        </div>
      }
      {...props}
    >
      {showNotifications && notifications.length > 0 && (
        <div className='modal-notifications'>
          {notifications.some(n => n.type === 'error') && (
            <ErrorNotification
              notifications={notifications.filter(n => n.type === 'error')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={5000}
              position='top-right'
              className='notification-compact'
            />
          )}
          {notifications.some(n => n.type === 'success') && (
            <SuccessNotification
              notifications={notifications.filter(n => n.type === 'success')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={4000}
              position='top-right'
              className='notification-compact'
            />
          )}
          {notifications.some(n => n.type === 'info') && (
            <InfoNotification
              notifications={notifications.filter(n => n.type === 'info')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={5000}
              position='top-right'
              className='notification-compact'
            />
          )}
        </div>
      )}
      <p className='modal-message'>{message}</p>
    </Modal>
  );
};

export const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  title = 'Supprimer',
  message = 'Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élément ?',
  itemName = 'cet élément',
  showNotifications = true,
  ...props
}) => {
  const [notifications, setNotifications] = useState([]);

  const handleDelete = async () => {
    try {
      if (showNotifications) {
        setNotifications([
          {
            id: Date.now(),
            message: 'Suppression en cours...',
            type: 'warning',
          },
        ]);
      }

      await onDelete();

      if (showNotifications) {
        setNotifications([
          {
            id: Date.now(),
            message: `${itemName} a été supprimé avec succès`,
            type: 'success',
          },
        ]);

        setTimeout(() => {
          onClose();
          setNotifications([]);
        }, 2000);
      }
    } catch (error) {
      if (showNotifications) {
        setNotifications([
          {
            id: Date.now(),
            message: error.message || 'Erreur lors de la suppression',
            type: 'error',
          },
        ]);
      }
    }
  };

  const removeNotification = id => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size='small'
      showFooter={true}
      className='modal-delete'
      footerContent={
        <div className='modal-actions'>
          <OutlineButton onClick={onClose}>Annuler</OutlineButton>
          <SecondaryButton onClick={handleDelete}>Supprimer {itemName}</SecondaryButton>
        </div>
      }
      {...props}
    >
      {showNotifications && notifications.length > 0 && (
        <div className='modal-notifications'>
          {notifications.some(n => n.type === 'error') && (
            <ErrorNotification
              notifications={notifications.filter(n => n.type === 'error')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={5000}
              position='top-right'
              className='notification-compact'
            />
          )}
          {notifications.some(n => n.type === 'success') && (
            <SuccessNotification
              notifications={notifications.filter(n => n.type === 'success')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={4000}
              position='top-right'
              className='notification-compact'
            />
          )}
          {notifications.some(n => n.type === 'warning') && (
            <WarningNotification
              notifications={notifications.filter(n => n.type === 'warning')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={5000}
              position='top-right'
              className='notification-compact'
            />
          )}
        </div>
      )}
      <div className='modal-content'>
        <div className='modal-icon modal-icon-danger'>
          <svg
            width='48'
            height='48'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M3 6h18'></path>
            <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
            <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
          </svg>
        </div>
        <p className='modal-message'>{message}</p>
      </div>
    </Modal>
  );
};

export const InfoModal = ({ isOpen, onClose, title = 'Information', message, ...props }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size='small'
    showFooter={true}
    className='modal-info'
    footerContent={
      <div className='modal-actions'>
        <PrimaryButton onClick={onClose}>Compris</PrimaryButton>
      </div>
    }
    {...props}
  >
    <div className='modal-content'>
      <div className='modal-icon modal-icon-info'>
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <circle cx='12' cy='12' r='10'></circle>
          <path d='M12 16v-4'></path>
          <path d='M12 8h.01'></path>
        </svg>
      </div>
      <p className='modal-message'>{message}</p>
    </div>
  </Modal>
);

export const SuccessModal = ({ isOpen, onClose, title = 'Succès', message, ...props }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size='small'
    showFooter={true}
    className='modal-success'
    footerContent={
      <div className='modal-actions'>
        <PrimaryButton onClick={onClose}>Continuer</PrimaryButton>
      </div>
    }
    {...props}
  >
    <div className='modal-content'>
      <div className='modal-icon modal-icon-success'>
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
          <polyline points='22,4 12,14.01 9,11.01'></polyline>
        </svg>
      </div>
      <p className='modal-message'>{message}</p>
    </div>
  </Modal>
);

export const WarningModal = ({ isOpen, onClose, title = 'Attention', message, ...props }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size='small'
    showFooter={true}
    className='modal-warning'
    footerContent={
      <div className='modal-actions'>
        <PrimaryButton onClick={onClose}>Compris</PrimaryButton>
      </div>
    }
    {...props}
  >
    <div className='modal-content'>
      <div className='modal-icon modal-icon-warning'>
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'></path>
          <line x1='12' y1='9' x2='12' y2='13'></line>
          <line x1='12' y1='17' x2='12.01' y2='17'></line>
        </svg>
      </div>
      <p className='modal-message'>{message}</p>
    </div>
  </Modal>
);

export const ErrorModal = ({ isOpen, onClose, title = 'Erreur', message, ...props }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size='small'
    showFooter={true}
    className='modal-error'
    footerContent={
      <div className='modal-actions'>
        <PrimaryButton onClick={onClose}>Fermer</PrimaryButton>
      </div>
    }
    {...props}
  >
    <div className='modal-content'>
      <div className='modal-icon modal-icon-error'>
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <circle cx='12' cy='12' r='10'></circle>
          <line x1='15' y1='9' x2='9' y2='15'></line>
          <line x1='9' y1='9' x2='15' y2='15'></line>
        </svg>
      </div>
      <p className='modal-message'>{message}</p>
    </div>
  </Modal>
);

export const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = 'Formulaire',
  children,
  fields = [],
  initialData = {},
  submitText = 'Soumettre',
  cancelText = 'Annuler',
  showNotifications = true,
  submitDisabled = false,
  className = '',
  ...props
}) => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState(initialData);

  // Mettre à jour formData quand initialData change
  useEffect(() => {
    setFormData(initialData);
  }, [JSON.stringify(initialData)]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (showNotifications) {
        // Ajouter une notification de chargement
        setNotifications([
          {
            id: Date.now(),
            message: 'Traitement en cours...',
            type: 'info',
          },
        ]);
      }

      await onSubmit(formData);

      if (showNotifications) {
        // Remplacer par une notification de succès
        setNotifications([
          {
            id: Date.now(),
            message: 'Formulaire soumis avec succès !',
            type: 'success',
          },
        ]);

        // Fermer automatiquement après 2 secondes
        setTimeout(() => {
          onClose();
          setNotifications([]);
        }, 2000);
      }
    } catch (error) {
      if (showNotifications) {
        setNotifications([
          {
            id: Date.now(),
            message: error.message || 'Une erreur est survenue',
            type: 'error',
          },
        ]);
      }
    }
  };

  const removeNotification = id => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Rendu des champs de formulaire
  const renderField = field => {
    const { name, label, type, options, required, placeholder } = field;
    const value = formData[name] || '';

    switch (type) {
      case 'select':
        return (
          <div key={name} className='form-group'>
            <label htmlFor={name}>
              {label}
              {required && ' *'}
            </label>
            <select
              id={name}
              value={value}
              onChange={e => handleInputChange(name, e.target.value)}
              required={required}
            >
              <option value=''>Sélectionner...</option>
              {Array.isArray(options) &&
                options.map((option, index) => (
                  <option key={index} value={option.value || option}>
                    {option.label || option}
                  </option>
                ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div key={name} className='form-group'>
            <label htmlFor={name}>
              {label}
              {required && ' *'}
            </label>
            <textarea
              id={name}
              value={value}
              onChange={e => handleInputChange(name, e.target.value)}
              required={required}
              placeholder={placeholder}
              rows='3'
            />
          </div>
        );

      case 'number':
        return (
          <div key={name} className='form-group'>
            <label htmlFor={name}>
              {label}
              {required && ' *'}
            </label>
            <input
              id={name}
              type='number'
              value={value}
              onChange={e => handleInputChange(name, e.target.value)}
              required={required}
              placeholder={placeholder}
            />
          </div>
        );

      case 'date':
        return (
          <div key={name} className='form-group'>
            <label htmlFor={name}>
              {label}
              {required && ' *'}
            </label>
            <input
              id={name}
              type='date'
              value={value}
              onChange={e => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );

      case 'time':
        return (
          <div key={name} className='form-group'>
            <label htmlFor={name}>
              {label}
              {required && ' *'}
            </label>
            <input
              id={name}
              type='time'
              value={value}
              onChange={e => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );

      default:
        return (
          <div key={name} className='form-group'>
            <label htmlFor={name}>
              {label}
              {required && ' *'}
            </label>
            <input
              id={name}
              type='text'
              value={value}
              onChange={e => handleInputChange(name, e.target.value)}
              required={required}
              placeholder={placeholder}
            />
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size='medium'
      showFooter={true}
      className={`modal-form ${className}`.trim()}
      footerContent={
        <div className='modal-actions'>
          <CancelButton onClick={onClose}>{cancelText}</CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={submitDisabled}>
            {submitText}
          </SubmitButton>
        </div>
      }
      {...props}
    >
      {showNotifications && notifications.length > 0 && (
        <div className='modal-notifications'>
          {notifications.some(n => n.type === 'error') && (
            <ErrorNotification
              notifications={notifications.filter(n => n.type === 'error')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={5000}
              position='top-right'
              className='notification-compact'
            />
          )}
          {notifications.some(n => n.type === 'success') && (
            <SuccessNotification
              notifications={notifications.filter(n => n.type === 'success')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={4000}
              position='top-right'
              className='notification-compact'
            />
          )}
          {notifications.some(n => n.type === 'warning') && (
            <WarningNotification
              notifications={notifications.filter(n => n.type === 'warning')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={5000}
              position='top-right'
              className='notification-compact'
            />
          )}
          {notifications.some(n => n.type === 'info') && (
            <InfoNotification
              notifications={notifications.filter(n => n.type === 'info')}
              onRemove={removeNotification}
              autoClose={true}
              autoCloseDelay={5000}
              position='top-right'
              className='notification-compact'
            />
          )}
        </div>
      )}

      {fields.length > 0 ? (
        <form onSubmit={handleSubmit} className='form-modal-content'>
          <div className='form-fields'>{fields.map(renderField)}</div>
        </form>
      ) : (
        children
      )}
    </Modal>
  );
};

export const ImageModal = ({ isOpen, onClose, src, alt = 'Image', title, ...props }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size='large'
    className='modal-image'
    {...props}
  >
    <div className='modal-image-container'>
      <img src={src} alt={alt} className='modal-image' />
    </div>
  </Modal>
);

export const VideoModal = ({ isOpen, onClose, src, title, ...props }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size='large'
    className='modal-video'
    {...props}
  >
    <div className='modal-video-container'>
      <video controls className='modal-video'>
        <source src={src} type='video/mp4' />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  </Modal>
);

export const CustomModal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'medium',
  showFooter = false,
  footerContent,
  ...props
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size={size}
    showFooter={showFooter}
    footerContent={footerContent}
    {...props}
  >
    {children}
  </Modal>
);

// Modale avec notifications intégrées
export const NotificationModal = ({
  isOpen,
  onClose,
  title,
  children,
  notifications = [],
  onRemoveNotification,
  showNotifications = true,
  size = 'medium',
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      className='modal-notification'
      {...props}
    >
      {showNotifications && notifications.length > 0 && (
        <div className='modal-notifications'>
          {notifications.some(n => n.type === 'error') && (
            <ErrorNotification
              notifications={notifications.filter(n => n.type === 'error')}
              onRemove={onRemoveNotification}
              autoClose={true}
              autoCloseDelay={5000}
            />
          )}
          {notifications.some(n => n.type === 'success') && (
            <SuccessNotification
              notifications={notifications.filter(n => n.type === 'success')}
              onRemove={onRemoveNotification}
              autoClose={true}
              autoCloseDelay={4000}
            />
          )}
          {notifications.some(n => n.type === 'warning') && (
            <WarningNotification
              notifications={notifications.filter(n => n.type === 'warning')}
              onRemove={onRemoveNotification}
              autoClose={true}
              autoCloseDelay={5000}
            />
          )}
          {notifications.some(n => n.type === 'info') && (
            <InfoNotification
              notifications={notifications.filter(n => n.type === 'info')}
              onRemove={onRemoveNotification}
              autoClose={true}
              autoCloseDelay={5000}
            />
          )}
        </div>
      )}
      {children}
    </Modal>
  );
};

// Export par défaut de la bibliothèque complète
const ModalLibraries = {
  // Composant de base
  Modal,

  // Modales par taille
  SmallModal,
  MediumModal,
  LargeModal,
  FullScreenModal,

  // Modales spécialisées
  ConfirmModal,
  DeleteModal,
  InfoModal,
  SuccessModal,
  WarningModal,
  ErrorModal,
  FormModal,
  ImageModal,
  VideoModal,
  CustomModal,
  NotificationModal,
};

export default ModalLibraries;
