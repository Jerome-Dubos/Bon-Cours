import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaComments, FaEnvelope, FaPaperPlane, FaUser } from 'react-icons/fa';

import './ContactForm.css';

/**
 * Version simplifiée du ContactForm pour tester les imports
 * @version 2.0.0
 * @author Bon Cours Team
 */
const ContactForm = memo(
  ({
    onSubmit,
    submitText,
    loadingText,
    className = '',
    variant = 'full',
    showJoursHoraires = true,
    initialData = {},
    onSuccess,
    onError,
  }) => {
    const { t } = useTranslation();

    const defaultSubmitText = submitText || t('forms.contact.submit');
    const defaultLoadingText = loadingText || t('forms.contact.loading');

    const [formData, setFormData] = useState({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      message: '',
      jours: [],
      horaires: [],
      preferenceContact: 'email',
      ...initialData,
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = useCallback((field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSubmit = useCallback(
      async e => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
          if (onSubmit) {
            await onSubmit(formData);
          }
          if (onSuccess) onSuccess(formData);
        } catch (error) {
          if (onError) onError(error);
        } finally {
          setIsSubmitting(false);
        }
      },
      [formData, onSubmit, onSuccess, onError]
    );

    return (
      <form className={`contact-form ${className}`} onSubmit={handleSubmit}>
        <div className={`contact-layout ${variant === 'modal' ? 'contact-layout--modal' : ''}`}>
          <div className='contact-column-left'>
            <div className='contact-field'>
              <label className='contact-label'>
                <FaUser className='contact-icon' />
                {t('forms.contact.fields.nom')}
              </label>
              <input
                type='text'
                className='contact-input'
                placeholder={t('forms.contact.placeholders.nom')}
                value={formData.nom}
                onChange={e => handleInputChange('nom', e.target.value)}
              />
            </div>

            <div className='contact-field'>
              <label className='contact-label'>
                <FaUser className='contact-icon' />
                {t('forms.contact.fields.prenom')}
              </label>
              <input
                type='text'
                className='contact-input'
                placeholder={t('forms.contact.placeholders.prenom')}
                value={formData.prenom}
                onChange={e => handleInputChange('prenom', e.target.value)}
              />
            </div>

            <div className='contact-field'>
              <label className='contact-label'>
                <FaEnvelope className='contact-icon' />
                {t('forms.contact.fields.email')}
              </label>
              <input
                type='email'
                className='contact-input'
                placeholder={t('forms.contact.placeholders.email')}
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className='contact-column-right'>
            <div className='contact-field'>
              <label className='contact-label'>
                <FaComments className='contact-icon' />
                {t('forms.contact.fields.message')}
              </label>
              <textarea
                className='contact-textarea'
                placeholder={t('forms.contact.placeholders.message')}
                value={formData.message}
                onChange={e => handleInputChange('message', e.target.value)}
                rows='6'
              />
            </div>

            <div className='contact-actions'>
              <button
                type='submit'
                className={`contact-submit-button ${isSubmitting ? 'contact-loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className='contact-loading-spinner'></div>
                    {defaultLoadingText}
                  </>
                ) : (
                  <>
                    <FaPaperPlane className='contact-submit-icon' />
                    {defaultSubmitText}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

ContactForm.displayName = 'ContactForm';

export default ContactForm;
