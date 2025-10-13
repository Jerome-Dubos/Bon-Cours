import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSignInAlt } from 'react-icons/fa';

import { ErrorNotification, SuccessNotification } from '../../../../../UI/Notifications';
import '../../styles/LoginForm.css';
import {
  createEmailRule,
  createPasswordRule,
  createRequiredRule,
} from '../../utils/validationRules';

const LoginForm = ({
  onSubmit,
  onForgotPassword,
  submitText,
  loadingText,
  className = '',
  showRememberMe = true,
  showForgotPassword = true,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();

  // Utiliser les traductions par défaut si non fournies
  const defaultSubmitText = submitText || t('forms.login.submit');
  const defaultLoadingText = loadingText || t('forms.login.loading');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successNotifications, setSuccessNotifications] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);

  // Fonctions de validation
  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'email':
        error = createRequiredRule()(value) || createEmailRule()(value);
        break;
      case 'password':
        error = createRequiredRule()(value) || createPasswordRule(6)(value);
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

  const validateForm = () => {
    const newErrors = {};

    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validateField('password', formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      return false;
    }

    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    return !emailError && !passwordError;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        const result = await onSubmit({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        });

        if (result) {
          const successMessage = result.simulated
            ? 'Connexion simulée avec succès. (Mode simulation)'
            : t('forms.login.success');

          addNotification('success', successMessage);
          if (onSuccess) onSuccess(formData);

          // Ne pas réinitialiser le formulaire après une connexion réussie
        }
      } else {
        // Comportement par défaut (simulation)
        await new Promise(resolve => setTimeout(resolve, 1500));

        addNotification('success', t('forms.login.success'));

        // Reset du formulaire
        setFormData({
          email: '',
          password: '',
          rememberMe: false,
        });

        setErrors({});
        setTouched({});
      }
    } catch (error) {
      const errorMessage = error.message || t('forms.login.error');
      addNotification('error', errorMessage);
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  return (
    <>
      <form className={`login-form ${className}`} onSubmit={handleSubmit}>
        {/* Email */}
        <div className='login-field'>
          <label className='login-label'>
            <FaEnvelope className='login-icon' />
            {t('forms.login.fields.email')}
          </label>
          <input
            type='email'
            className={`login-input ${errors.email && touched.email ? 'login-error' : ''}`}
            placeholder={t('forms.login.placeholders.email')}
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            onBlur={e => handleInputBlur('email', e.target.value)}
            autoComplete='email'
          />
          {errors.email && touched.email && (
            <span className='login-error-message'>{errors.email}</span>
          )}
        </div>

        {/* Mot de passe */}
        <div className='login-field'>
          <label className='login-label'>
            <FaLock className='login-icon' />
            {t('forms.login.fields.password')}
          </label>
          <div className='login-password-wrapper'>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`login-input ${errors.password && touched.password ? 'login-error' : ''}`}
              placeholder={t('forms.login.placeholders.password')}
              value={formData.password}
              onChange={e => handleInputChange('password', e.target.value)}
              onBlur={e => handleInputBlur('password', e.target.value)}
              autoComplete='current-password'
            />
            <button
              type='button'
              className='login-password-toggle'
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? t('forms.login.hide_password') : t('forms.login.show_password')
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && touched.password && (
            <span className='login-error-message'>{errors.password}</span>
          )}
        </div>

        {/* Options */}
        <div className='login-options'>
          {showRememberMe && (
            <label className='login-checkbox-label'>
              <input
                type='checkbox'
                className='login-checkbox'
                checked={formData.rememberMe}
                onChange={e => handleInputChange('rememberMe', e.target.checked)}
              />
              <span>{t('forms.login.remember_me')}</span>
            </label>
          )}

          {showForgotPassword && (
            <button type='button' className='login-forgot-password' onClick={handleForgotPassword}>
              {t('forms.login.forgot_password')}
            </button>
          )}
        </div>

        {/* Bouton de connexion */}
        <div className='login-actions'>
          <button
            type='submit'
            className={`login-submit-button ${isSubmitting ? 'login-loading' : ''}`}
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? (
              <>
                <div className='login-loading-spinner'></div>
                {defaultLoadingText}
              </>
            ) : (
              <>
                <FaSignInAlt className='login-submit-icon' />
                {defaultSubmitText}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Notifications */}
      {successNotifications.length > 0 && (
        <SuccessNotification
          notifications={successNotifications}
          onRemove={removeSuccessNotification}
          autoClose={true}
          autoCloseDelay={3000}
          position='top-right'
          className='notification-compact'
        />
      )}

      {errorNotifications.length > 0 && (
        <ErrorNotification
          notifications={errorNotifications}
          onRemove={removeErrorNotification}
          autoClose={true}
          autoCloseDelay={5000}
          position='top-right'
          className='notification-compact'
        />
      )}
    </>
  );
};

export default LoginForm;
