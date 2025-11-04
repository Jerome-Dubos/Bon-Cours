import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaComments, FaEnvelope, FaPaperPlane, FaUser } from 'react-icons/fa';
import { sendInaugurationRegistration } from '../../services';
import { ErrorNotification, SuccessNotification } from '../UI/Notifications';
import './InaugurationForm.css';

const InaugurationForm = ({ onSuccess, onError }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: '',
  });

  // Initialiser le message par défaut au chargement
  useEffect(() => {
    const defaultMessage = t('inauguration.form.defaultMessage');
    setFormData(prev => ({
      ...prev,
      message: prev.message || defaultMessage,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotifications, setSuccessNotifications] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'nom':
        if (!value.trim()) {
          error = t('inauguration.form.errors.nomRequired');
        }
        break;
      case 'prenom':
        if (!value.trim()) {
          error = t('inauguration.form.errors.prenomRequired');
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = t('inauguration.form.errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = t('inauguration.form.errors.emailInvalid');
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = t('inauguration.form.errors.messageRequired');
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleInputBlur = (field, value) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      formData.nom.trim() &&
      formData.prenom.trim() &&
      formData.email.trim() &&
      formData.message.trim() &&
      !errors.nom &&
      !errors.prenom &&
      !errors.email &&
      !errors.message
    );
  };

  // Fonction pour ajouter une notification
  const addNotification = (type, message) => {
    const newNotification = {
      id: nextNotificationId,
      message,
    };

    if (type === 'success') {
      setSuccessNotifications(prev => [...prev, newNotification]);
    } else if (type === 'error') {
      setErrorNotifications(prev => [...prev, newNotification]);
    }

    setNextNotificationId(prev => prev + 1);
  };

  // Fonction pour supprimer une notification
  const removeSuccessNotification = id => {
    setSuccessNotifications(prev => prev.filter(n => n.id !== id));
  };

  const removeErrorNotification = id => {
    setErrorNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Marquer tous les champs comme touchés
    setTouched({
      nom: true,
      prenom: true,
      email: true,
      message: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Envoyer l'email via EmailJS
      const result = await sendInaugurationRegistration({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        message: formData.message, // Le remplacement de [Votre nom] se fait dans le service
      });

      if (result.success) {
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          message: t('inauguration.form.defaultMessage'),
        });
        setErrors({});
        setTouched({});

        // Notifier le parent du succès (notification gérée au niveau parent)
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error(result.error || "Erreur lors de l'envoi de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      const errorMessage = error.message || t('inauguration.form.errors.genericError');

      // Notifier le parent de l'erreur (notification gérée au niveau parent)
      if (onError) {
        onError(errorMessage);
      } else {
        // Fallback sur les notifications locales si onError n'est pas fourni
        addNotification('error', errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='inauguration-form' onSubmit={handleSubmit}>
      <div className='inauguration-form-field'>
        <label className='inauguration-form-label'>
          <FaUser className='inauguration-form-icon' />
          {t('inauguration.form.fields.nom')}
        </label>
        <input
          type='text'
          className={`inauguration-form-input ${errors.nom && touched.nom ? 'inauguration-form-error' : ''}`}
          placeholder={t('inauguration.form.placeholders.nom')}
          value={formData.nom}
          onChange={e => handleInputChange('nom', e.target.value)}
          onBlur={e => handleInputBlur('nom', e.target.value)}
        />
        {errors.nom && touched.nom && (
          <span className='inauguration-form-error-message'>{errors.nom}</span>
        )}
      </div>

      <div className='inauguration-form-field'>
        <label className='inauguration-form-label'>
          <FaUser className='inauguration-form-icon' />
          {t('inauguration.form.fields.prenom')}
        </label>
        <input
          type='text'
          className={`inauguration-form-input ${errors.prenom && touched.prenom ? 'inauguration-form-error' : ''}`}
          placeholder={t('inauguration.form.placeholders.prenom')}
          value={formData.prenom}
          onChange={e => handleInputChange('prenom', e.target.value)}
          onBlur={e => handleInputBlur('prenom', e.target.value)}
        />
        {errors.prenom && touched.prenom && (
          <span className='inauguration-form-error-message'>{errors.prenom}</span>
        )}
      </div>

      <div className='inauguration-form-field'>
        <label className='inauguration-form-label'>
          <FaEnvelope className='inauguration-form-icon' />
          {t('inauguration.form.fields.email')}
        </label>
        <input
          type='email'
          className={`inauguration-form-input ${errors.email && touched.email ? 'inauguration-form-error' : ''}`}
          placeholder={t('inauguration.form.placeholders.email')}
          value={formData.email}
          onChange={e => handleInputChange('email', e.target.value)}
          onBlur={e => handleInputBlur('email', e.target.value)}
        />
        {errors.email && touched.email && (
          <span className='inauguration-form-error-message'>{errors.email}</span>
        )}
      </div>

      <div className='inauguration-form-field'>
        <label className='inauguration-form-label'>
          <FaComments className='inauguration-form-icon' />
          {t('inauguration.form.fields.message')}
        </label>
        <textarea
          className={`inauguration-form-textarea ${errors.message && touched.message ? 'inauguration-form-error' : ''}`}
          placeholder={t('inauguration.form.placeholders.message')}
          value={formData.message}
          onChange={e => handleInputChange('message', e.target.value)}
          onBlur={e => handleInputBlur('message', e.target.value)}
          rows='8'
        />
        {errors.message && touched.message && (
          <span className='inauguration-form-error-message'>{errors.message}</span>
        )}
      </div>

      <div className='inauguration-form-actions'>
        <button
          type='submit'
          className={`inauguration-form-submit ${isSubmitting ? 'inauguration-form-loading' : ''}`}
          disabled={isSubmitting || !isFormValid()}
        >
          {isSubmitting ? (
            <>
              <div className='inauguration-form-loading-spinner'></div>
              {t('inauguration.form.submitting')}
            </>
          ) : (
            <>
              <FaPaperPlane className='inauguration-form-submit-icon' />
              {t('inauguration.form.submit')}
            </>
          )}
        </button>
      </div>

      {/* Notifications */}
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
    </form>
  );
};

export default InaugurationForm;
