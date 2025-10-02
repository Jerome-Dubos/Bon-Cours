import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPaperPlane,
  FaSignInAlt,
  FaTimes,
  FaUserGraduate,
  FaUserTie,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ErrorNotification,
  SuccessNotification,
} from '../../../../../../components/UI/Notifications';
import { useAuth } from '../../../../../../context/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading: authLoading } = useAuth();
  const { t } = useTranslation();

  // Récupérer la page d'origine depuis l'état de navigation
  const from = location.state?.from?.pathname || '/dashboard';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotifications, setSuccessNotifications] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);

  // Nettoyer la classe modal-open au démontage du composant
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  // Fonction pour supprimer une notification de succès
  const removeSuccessNotification = id => {
    setSuccessNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Fonction pour supprimer une notification d'erreur
  const removeErrorNotification = id => {
    setErrorNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Vérifier si le formulaire est valide pour activer le bouton
  const isFormValid = () => {
    // Champs obligatoires
    if (!formData.email.trim() || !formData.password.trim()) {
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation basique
    if (!formData.email.trim() || !formData.password.trim()) {
      addNotification('error', t('forms.login.notifications.error_fields'));
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        addNotification('success', t('forms.login.notifications.success'));
        navigate(from, { replace: true });
        return true;
      } else {
        throw new Error('Identifiants incorrects');
      }
    } catch (error) {
      addNotification('error', t('forms.login.notifications.error_credentials'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour la connexion demo
  const handleDemoLogin = async role => {
    setIsSubmitting(true);

    try {
      let email, password;

      switch (role) {
        case 'student':
          email = 'marie.dupont@email.com';
          password = 'demo';
          break;
        case 'teacher':
          email = 'jean@demo.com';
          password = 'demo';
          break;
        case 'director':
          email = 'isabelle@demo.com';
          password = 'demo';
          break;
        default:
          email = 'marie.dupont@email.com';
          password = 'demo';
      }

      const success = await login(email, password);

      if (success) {
        const roleText = t(`forms.login.roles.${role}`);
        addNotification('success', t('forms.login.notifications.demo_success', { role: roleText }));
        navigate(from, { replace: true });
        return true;
      } else {
        throw new Error('Erreur de connexion demo');
      }
    } catch (error) {
      addNotification('error', t('forms.login.notifications.demo_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fonction pour ouvrir le modal de mot de passe oublié
  const handleForgotPasswordClick = e => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
    setForgotPasswordEmail(formData.email); // Pré-remplir avec l'email du formulaire
    document.body.classList.add('modal-open'); // Verrouiller le scroll
  };

  // Fonction pour fermer le modal
  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail('');
    setIsSendingReset(false);
    document.body.classList.remove('modal-open'); // Déverrouiller le scroll
  };

  // Validation email pour le mot de passe oublié
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction pour envoyer l'email de réinitialisation
  const handleForgotPasswordSubmit = async e => {
    e.preventDefault();

    if (!forgotPasswordEmail.trim()) {
      addNotification('error', t('forms.login.notifications.email_required'));
      return;
    }

    if (!validateEmail(forgotPasswordEmail)) {
      addNotification('error', t('forms.login.notifications.email_invalid'));
      return;
    }

    setIsSendingReset(true);

    try {
      // Simulation d'envoi d'email (remplacer par l'API réelle)
      await new Promise(resolve => setTimeout(resolve, 2000));

      addNotification('success', t('forms.login.notifications.reset_success'));

      closeForgotPasswordModal();
    } catch (error) {
      addNotification('error', t('forms.login.notifications.reset_error'));
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='login-header'>
          <div className='login-logo'>
            <img src='/beige-paysage.svg' alt='Bon Cours Logo' className='login-logo-img' />
          </div>
          <h2 className='login-title'>{t('forms.login.title')}</h2>
          <p className='login-subtitle'>{t('forms.login.subtitle')}</p>
        </div>

        <div className='login-fields'>
          {/* Email */}
          <div className='login-field'>
            <label className='login-label'>
              <FaEnvelope className='login-icon' />
              {t('forms.login.fields.email')}
            </label>
            <input
              type='text'
              className='login-input'
              placeholder={t('forms.login.placeholders.email')}
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              disabled={authLoading || isSubmitting}
            />
          </div>

          {/* Mot de passe */}
          <div className='login-field'>
            <label className='login-label'>
              <FaLock className='login-icon' />
              {t('forms.login.fields.password')}
            </label>
            <div className='login-password-container'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='login-input login-password-input'
                placeholder={t('forms.login.placeholders.password')}
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                disabled={authLoading || isSubmitting}
              />
              <button
                type='button'
                className='login-password-toggle'
                onClick={togglePasswordVisibility}
                disabled={authLoading || isSubmitting}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? (
                  <FaEyeSlash className='login-password-icon' />
                ) : (
                  <FaEye className='login-password-icon' />
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className='login-options'>
            <label className='login-checkbox-container'>
              <input
                type='checkbox'
                checked={formData.rememberMe}
                onChange={e => handleInputChange('rememberMe', e.target.checked)}
                className='login-checkbox'
                disabled={authLoading || isSubmitting}
              />
              <span className='login-checkbox-label'>{t('forms.login.options.remember_me')}</span>
            </label>
            <button
              type='button'
              className='login-forgot-link'
              onClick={handleForgotPasswordClick}
              disabled={authLoading || isSubmitting}
            >
              {t('forms.login.options.forgot_password')}
            </button>
          </div>

          {/* Bouton de connexion */}
          <div className='login-actions'>
            <button
              type='submit'
              className={`login-submit-button ${isSubmitting ? 'login-loading' : ''}`}
              disabled={isSubmitting || !isFormValid() || authLoading}
            >
              {isSubmitting ? (
                <>
                  <div className='login-loading-spinner'></div>
                  {t('forms.login.buttons.loading')}
                </>
              ) : (
                <>
                  <FaSignInAlt className='login-submit-icon' />
                  {t('forms.login.buttons.submit')}
                </>
              )}
            </button>
          </div>

          {/* Boutons de connexion demo */}
          <div className='login-demo-section'>
            <div className='login-demo-divider'>
              <span className='login-demo-divider-text'>{t('forms.login.demo.title')}</span>
            </div>

            <div className='login-demo-buttons'>
              <button
                type='button'
                className='login-demo-btn login-demo-student'
                onClick={() => handleDemoLogin('student')}
                disabled={authLoading || isSubmitting}
                title='Marie Dupont - Étudiante en anglais et espagnol'
              >
                <FaUserGraduate className='login-demo-icon' />
                <div className='login-demo-content'>
                  <span className='login-demo-title'>{t('forms.login.demo.student.title')}</span>
                  <span className='login-demo-subtitle'>
                    {t('forms.login.demo.student.subtitle')}
                  </span>
                </div>
              </button>

              <button
                type='button'
                className='login-demo-btn login-demo-teacher'
                onClick={() => handleDemoLogin('teacher')}
                disabled={authLoading || isSubmitting}
                title="Jean Martin - Professeur d'anglais"
              >
                <FaChalkboardTeacher className='login-demo-icon' />
                <div className='login-demo-content'>
                  <span className='login-demo-title'>{t('forms.login.demo.teacher.title')}</span>
                  <span className='login-demo-subtitle'>
                    {t('forms.login.demo.teacher.subtitle')}
                  </span>
                </div>
              </button>

              <button
                type='button'
                className='login-demo-btn login-demo-director'
                onClick={() => handleDemoLogin('director')}
                disabled={authLoading || isSubmitting}
                title="Florence Bigdeli - Directrice de l'école"
              >
                <FaUserTie className='login-demo-icon' />
                <div className='login-demo-content'>
                  <span className='login-demo-title'>{t('forms.login.demo.director.title')}</span>
                  <span className='login-demo-subtitle'>
                    {t('forms.login.demo.director.subtitle')}
                  </span>
                </div>
              </button>
            </div>

            <div className='login-demo-info'>
              <p className='login-demo-info-text'>
                <strong>{t('forms.login.demo.password')}</strong>{' '}
                {t('forms.login.demo.password_value')}
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* Modal mot de passe oublié */}
      {showForgotPasswordModal && (
        <div className='modal-overlay forgot-password-overlay' onClick={closeForgotPasswordModal}>
          <div className='modal-body forgot-password-modal' onClick={e => e.stopPropagation()}>
            <div className='forgot-password-header'>
              <h3 className='forgot-password-title'>
                <FaLock className='forgot-password-icon' />
                {t('forms.login.forgot_password.title')}
              </h3>
              <button
                type='button'
                className='forgot-password-close'
                onClick={closeForgotPasswordModal}
                disabled={isSendingReset}
              >
                <FaTimes />
              </button>
            </div>

            <div className='forgot-password-content'>
              <p className='forgot-password-description'>
                {t('forms.login.forgot_password.description')}
              </p>

              <form onSubmit={handleForgotPasswordSubmit} className='forgot-password-form'>
                <div className='forgot-password-field'>
                  <label className='forgot-password-label'>
                    <FaEnvelope className='forgot-password-field-icon' />
                    {t('forms.login.forgot_password.field')}
                  </label>
                  <input
                    type='email'
                    className='forgot-password-input'
                    placeholder={t('forms.login.forgot_password.placeholder')}
                    value={forgotPasswordEmail}
                    onChange={e => setForgotPasswordEmail(e.target.value)}
                    disabled={isSendingReset}
                    autoFocus
                  />
                </div>

                <div className='forgot-password-actions'>
                  <button
                    type='button'
                    className='forgot-password-cancel'
                    onClick={closeForgotPasswordModal}
                    disabled={isSendingReset}
                  >
                    {t('forms.login.forgot_password.buttons.cancel')}
                  </button>
                  <button
                    type='submit'
                    className={`forgot-password-submit ${isSendingReset ? 'loading' : ''}`}
                    disabled={isSendingReset || !forgotPasswordEmail.trim()}
                  >
                    {isSendingReset ? (
                      <>
                        <div className='forgot-password-spinner'></div>
                        {t('forms.login.forgot_password.buttons.loading')}
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className='forgot-password-submit-icon' />
                        {t('forms.login.forgot_password.buttons.submit')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Notifications de succès */}
      {successNotifications.length > 0 && (
        <SuccessNotification
          notifications={successNotifications}
          onRemove={removeSuccessNotification}
          autoClose={true}
          autoCloseDelay={4000}
          position='top-right'
          className='notification-compact'
        />
      )}

      {/* Notifications d'erreur */}
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
