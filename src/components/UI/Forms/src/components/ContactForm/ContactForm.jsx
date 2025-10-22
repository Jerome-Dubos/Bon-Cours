import React, { useEffect, useRef, useState } from 'react';
import {
  FaCalendar,
  FaChevronDown,
  FaClock,
  FaComments,
  FaEnvelope,
  FaPaperPlane,
  FaPhone,
  FaUser,
} from 'react-icons/fa';

import { ErrorNotification, SuccessNotification } from '../../../../../UI/Notifications';
import '../../styles/ContactForm.css';
import {
  createEmailRule,
  createMessageRule,
  createNameRule,
  createPhoneRule,
  createRequiredRule,
} from '../../utils/validationRules';

const ContactForm = ({
  onSubmit,
  submitText,
  loadingText,
  className = '',
  variant = 'full', // "full" ou "modal"
  showJoursHoraires = true,
  initialData = {},
  onSuccess,
  onError,
}) => {
  // Textes par défaut en français
  const defaultSubmitText = submitText || 'Envoyer le message';
  const defaultLoadingText = loadingText || 'Envoi en cours...';

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    indicatif: '+33', // Indicateur par défaut pour la France
    message: '',
    jours: [],
    horaires: [],
    preferenceContact: 'email',
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotifications, setSuccessNotifications] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);
  const [showIndicatifs, setShowIndicatifs] = useState(false);
  const phoneSelectorRef = useRef(null);

  // Liste des indicatifs téléphoniques les plus courants (réduite)
  const indicatifsOptions = [
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+49', country: 'Allemagne', flag: '🇩🇪' },
    { code: '+44', country: 'Royaume-Uni', flag: '🇬🇧' },
    { code: '+34', country: 'Espagne', flag: '🇪🇸' },
    { code: '+39', country: 'Italie', flag: '🇮🇹' },
    { code: '+32', country: 'Belgique', flag: '🇧🇪' },
    { code: '+41', country: 'Suisse', flag: '🇨🇭' },
    { code: '+1', country: 'États-Unis/Canada', flag: '🇺🇸' },
    { code: '+90', country: 'Turquie', flag: '🇹🇷' },
    { code: '+7', country: 'Russie', flag: '🇷🇺' },
  ];

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = event => {
      if (phoneSelectorRef.current && !phoneSelectorRef.current.contains(event.target)) {
        setShowIndicatifs(false);
      }
    };

    if (showIndicatifs) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showIndicatifs]);

  // Fonction pour obtenir la longueur maximale selon l'indicatif
  const getMaxLength = indicatif => {
    switch (indicatif) {
      case '+33':
        return 9; // France : 9 chiffres
      case '+49':
        return 11; // Allemagne : 11 chiffres max
      case '+44':
        return 10; // Royaume-Uni : 10 chiffres
      case '+1':
        return 10; // États-Unis/Canada : 10 chiffres
      case '+86':
        return 11; // Chine : 11 chiffres
      case '+81':
        return 11; // Japon : 11 chiffres
      case '+90':
        return 10; // Turquie : 10 chiffres
      case '+966':
        return 9; // Arabie Saoudite : 9 chiffres
      case '+7':
        return 10; // Russie : 10 chiffres
      case '+91':
        return 10; // Inde : 10 chiffres
      case '+32':
        return 9; // Belgique : 9 chiffres
      case '+41':
        return 9; // Suisse : 9 chiffres
      case '+34':
        return 9; // Espagne : 9 chiffres
      case '+39':
        return 10; // Italie : 10 chiffres
      default:
        return 15; // Maximum international
    }
  };

  // Fonction pour formater automatiquement le numéro de téléphone local
  const formatPhoneNumber = (value, indicatif) => {
    // Supprimer tous les caractères non numériques
    let cleanValue = value.replace(/[^\d]/g, '');

    // Limiter la longueur selon le pays
    const maxLength = getMaxLength(indicatif);
    if (cleanValue.length > maxLength) {
      cleanValue = cleanValue.substring(0, maxLength);
    }

    // Retirer les préfixes locaux selon le pays
    switch (indicatif) {
      case '+33': // France : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+49': // Allemagne : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+44': // Royaume-Uni : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+32': // Belgique : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+41': // Suisse : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+34': // Espagne : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+39': // Italie : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+90': // Turquie : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+966': // Arabie Saoudite : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+7': // Russie : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+91': // Inde : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+81': // Japon : retirer le 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
      case '+86': // Chine : pas de préfixe à retirer
        break;
      case '+1': // États-Unis/Canada : pas de préfixe à retirer
        break;
      default:
        // Pour les autres pays, essayer de retirer un 0 initial
        if (cleanValue.startsWith('0')) {
          cleanValue = cleanValue.substring(1);
        }
        break;
    }

    // Appliquer le formatage selon l'indicatif
    switch (indicatif) {
      case '+33': // France (format: 6 12 34 56 78)
        if (cleanValue.length <= 1) return cleanValue;
        if (cleanValue.length <= 3) return `${cleanValue.slice(0, 1)} ${cleanValue.slice(1)}`;
        if (cleanValue.length <= 5)
          return `${cleanValue.slice(0, 1)} ${cleanValue.slice(1, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 7)
          return `${cleanValue.slice(0, 1)} ${cleanValue.slice(1, 3)} ${cleanValue.slice(3, 5)} ${cleanValue.slice(5)}`;
        return `${cleanValue.slice(0, 1)} ${cleanValue.slice(1, 3)} ${cleanValue.slice(3, 5)} ${cleanValue.slice(5, 7)} ${cleanValue.slice(7, 9)}`;

      case '+49': // Allemagne (format: 123 456 789)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;

      case '+44': // Royaume-Uni (format: 1234 567 890)
        if (cleanValue.length <= 4) return cleanValue;
        if (cleanValue.length <= 7) return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4)}`;
        return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4, 7)} ${cleanValue.slice(7)}`;

      case '+1': // États-Unis/Canada (format: 123 456 7890)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;

      case '+86': // Chine (format: 123 4567 8901)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 7) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 7)} ${cleanValue.slice(7)}`;

      case '+81': // Japon (format: 1234 5678 90)
        if (cleanValue.length <= 4) return cleanValue;
        if (cleanValue.length <= 8) return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4)}`;
        return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4, 8)} ${cleanValue.slice(8)}`;

      case '+90': // Turquie (format: 123 456 7890)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;

      case '+966': // Arabie Saoudite (format: 123 456 7890)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;

      case '+7': // Russie (format: 123 456 7890)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;

      case '+91': // Inde (format: 1234 5678 90)
        if (cleanValue.length <= 4) return cleanValue;
        if (cleanValue.length <= 8) return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4)}`;
        return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4, 8)} ${cleanValue.slice(8)}`;

      case '+32': // Belgique (format: 123 456 789)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;

      case '+41': // Suisse (format: 123 456 789)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;

      case '+34': // Espagne (format: 123 456 789)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;

      case '+39': // Italie (format: 123 456 789)
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;

      default:
        // Formatage générique pour les autres pays
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        if (cleanValue.length <= 9)
          return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        return `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)} ${cleanValue.slice(9)}`;
    }
  };

  // Fonction pour obtenir le placeholder selon l'indicatif
  const getPhonePlaceholder = indicatif => {
    switch (indicatif) {
      case '+33':
        return '6 12 34 56 78';
      case '+49':
        return '123 456 789';
      case '+44':
        return '1234 567 890';
      case '+1':
        return '123 456 7890';
      case '+86':
        return '123 4567 8901';
      case '+81':
        return '1234 5678 90';
      case '+90':
        return '123 456 7890';
      case '+966':
        return '123 456 7890';
      case '+7':
        return '123 456 7890';
      case '+91':
        return '1234 5678 90';
      case '+32':
        return '123 456 789';
      case '+41':
        return '123 456 789';
      case '+34':
        return '123 456 789';
      case '+39':
        return '123 456 789';
      default:
        return '123 456 7890';
    }
  };

  const joursOptions = [
    { value: 'lundi', label: 'Lundi' },
    { value: 'mardi', label: 'Mardi' },
    { value: 'mercredi', label: 'Mercredi' },
    { value: 'jeudi', label: 'Jeudi' },
    { value: 'vendredi', label: 'Vendredi' },
    { value: 'samedi', label: 'Samedi' },
    { value: 'dimanche', label: 'Dimanche' },
  ];

  const horairesOptions = [
    {
      value: 'matin',
      label: 'Matin',
      sublabel: '8h-12h',
    },
    {
      value: 'apres-midi',
      label: 'Après-midi',
      sublabel: '12h-18h',
    },
    {
      value: 'soir',
      label: 'Soir',
      sublabel: '18h-21h',
    },
    {
      value: 'flexible',
      label: 'Flexible',
      sublabel: 'Tous créneaux',
    },
  ];

  const preferenceOptions = [
    {
      value: 'email',
      label: 'Par email',
      icon: FaEnvelope,
    },
    {
      value: 'telephone',
      label: 'Par téléphone',
      icon: FaPhone,
    },
  ];

  // Fonctions de validation
  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'nom':
        error = createRequiredRule()(value) || createNameRule()(value);
        break;
      case 'prenom':
        error = createRequiredRule()(value) || createNameRule()(value);
        break;
      case 'email':
        error = createRequiredRule()(value) || createEmailRule()(value);
        break;
      case 'telephone':
        if (formData.preferenceContact === 'telephone') {
          // Validation avec l'indicatif
          const phoneWithIndicatif = `${formData.indicatif} ${value}`;
          error = createRequiredRule()(value) || createPhoneRule()(phoneWithIndicatif);
        }
        break;
      case 'message':
        error = createRequiredRule()(value) || createMessageRule(10, 1000)(value);
        break;
      case 'preferenceContact':
        error = createRequiredRule()(value);
        break;
      case 'jours':
        if (formData.preferenceContact === 'telephone') {
          error = !value || value.length === 0 ? 'Veuillez sélectionner au moins un jour' : '';
        }
        break;
      case 'horaires':
        if (formData.preferenceContact === 'telephone') {
          error =
            !value || value.length === 0 ? 'Veuillez sélectionner au moins un créneau horaire' : '';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    // Formatage automatique pour le numéro de téléphone
    if (field === 'telephone') {
      formattedValue = formatPhoneNumber(value, formData.indicatif);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));

    if (touched[field]) {
      const error = validateField(field, formattedValue);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handlePreferenceChange = value => {
    setFormData(prev => ({ ...prev, preferenceContact: value }));

    if (!touched.preferenceContact) {
      setTouched(prev => ({ ...prev, preferenceContact: true }));
    }

    if (value !== 'telephone') {
      setErrors(prev => ({
        ...prev,
        telephone: '',
        jours: '',
        horaires: '',
      }));
    }

    const error = validateField('preferenceContact', value);
    setErrors(prev => ({ ...prev, preferenceContact: error }));
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

  const handleJoursChange = jour => {
    setFormData(prev => ({
      ...prev,
      jours: prev.jours.includes(jour) ? prev.jours.filter(j => j !== jour) : [...prev.jours, jour],
    }));

    if (!touched.jours) {
      setTouched(prev => ({ ...prev, jours: true }));
    }

    setTimeout(() => {
      const error = validateField(
        'jours',
        formData.jours.includes(jour)
          ? formData.jours.filter(j => j !== jour)
          : [...formData.jours, jour]
      );
      setErrors(prev => ({ ...prev, jours: error }));
    }, 0);
  };

  const handleHorairesChange = horaire => {
    let newHoraires;

    if (horaire === 'flexible') {
      if (formData.horaires.includes('flexible')) {
        newHoraires = formData.horaires.filter(h => h !== 'flexible');
      } else {
        newHoraires = ['flexible'];
      }
    } else {
      if (formData.horaires.includes(horaire)) {
        newHoraires = formData.horaires.filter(h => h !== horaire);
      } else {
        const horairesSansFlexible = formData.horaires.filter(h => h !== 'flexible');
        newHoraires = [...horairesSansFlexible, horaire];

        const creneauxSpecifiques = ['matin', 'apres-midi', 'soir'];
        const creneauxSelectionnes = newHoraires.filter(h => creneauxSpecifiques.includes(h));

        if (creneauxSelectionnes.length === 3) {
          newHoraires = ['flexible'];
        }
      }
    }

    setFormData(prev => ({
      ...prev,
      horaires: newHoraires,
    }));

    if (!touched.horaires) {
      setTouched(prev => ({ ...prev, horaires: true }));
    }

    const error = validateField('horaires', newHoraires);
    setErrors(prev => ({ ...prev, horaires: error }));
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
    if (
      !formData.nom.trim() ||
      !formData.prenom.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return false;
    }

    const requiredFields = ['nom', 'prenom', 'email', 'message'];
    for (const field of requiredFields) {
      const error = validateField(field, formData[field]);
      if (error) return false;
    }

    if (formData.preferenceContact === 'telephone') {
      if (!formData.telephone || formData.jours.length === 0 || formData.horaires.length === 0) {
        return false;
      }

      const phoneError = validateField('telephone', formData.telephone);
      if (phoneError) return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        const result = await onSubmit(formData);
        if (result) {
          const successMessage = result.simulated
            ? 'Votre message a été préparé avec succès. (Mode simulation)'
            : 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';

          addNotification('success', successMessage);
          if (onSuccess) onSuccess(formData);

          if (variant === 'full') {
            setFormData({
              nom: '',
              prenom: '',
              email: '',
              telephone: '',
              indicatif: '+33',
              message: '',
              jours: [],
              horaires: [],
              preferenceContact: 'email',
            });
            setErrors({});
            setTouched({});
          }
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));

        addNotification(
          'success',
          'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
        );

        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          indicatif: '+33',
          message: '',
          jours: [],
          horaires: [],
          preferenceContact: 'email',
        });

        setErrors({});
        setTouched({});
      }
    } catch (error) {
      const errorMessage =
        error.message || "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.";
      addNotification('error', errorMessage);
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className={`contact-form ${className}`} onSubmit={handleSubmit}>
        <div className={`contact-layout ${variant === 'modal' ? 'contact-layout--modal' : ''}`}>
          {/* Colonne gauche */}
          <div className='contact-column-left'>
            {/* Nom et Prénom */}
            <div className='contact-name-group'>
              <div className='contact-field'>
                <label className='contact-label'>
                  <FaUser className='contact-icon' />
                  Nom
                </label>
                <input
                  type='text'
                  className={`contact-input ${errors.nom && touched.nom ? 'contact-error' : ''}`}
                  placeholder='Dupont'
                  value={formData.nom}
                  onChange={e => handleInputChange('nom', e.target.value)}
                  onBlur={e => handleInputBlur('nom', e.target.value)}
                />
                {errors.nom && touched.nom && (
                  <span className='contact-error-message'>{errors.nom}</span>
                )}
              </div>

              <div className='contact-field'>
                <label className='contact-label'>
                  <FaUser className='contact-icon' />
                  Prénom
                </label>
                <input
                  type='text'
                  className={`contact-input ${errors.prenom && touched.prenom ? 'contact-error' : ''}`}
                  placeholder='Jean'
                  value={formData.prenom}
                  onChange={e => handleInputChange('prenom', e.target.value)}
                  onBlur={e => handleInputBlur('prenom', e.target.value)}
                />
                {errors.prenom && touched.prenom && (
                  <span className='contact-error-message'>{errors.prenom}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className='contact-field'>
              <label className='contact-label'>
                <FaEnvelope className='contact-icon' />
                Email
              </label>
              <input
                type='email'
                className={`contact-input ${errors.email && touched.email ? 'contact-error' : ''}`}
                placeholder='jean.dupont@example.com'
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                onBlur={e => handleInputBlur('email', e.target.value)}
              />
              {errors.email && touched.email && (
                <span className='contact-error-message'>{errors.email}</span>
              )}
            </div>

            {/* Téléphone */}
            <div className='contact-field'>
              <label className='contact-label'>
                <FaPhone className='contact-icon' />
                Téléphone
              </label>
              <div className='contact-phone-group'>
                <div className='contact-phone-selector' ref={phoneSelectorRef}>
                  <button
                    type='button'
                    className='contact-phone-indicatif'
                    onClick={() => setShowIndicatifs(!showIndicatifs)}
                  >
                    <span className='contact-phone-flag'>
                      {indicatifsOptions.find(opt => opt.code === formData.indicatif)?.flag}
                    </span>
                    <span className='contact-phone-code'>{formData.indicatif}</span>
                    <FaChevronDown className='contact-phone-chevron' />
                  </button>

                  {showIndicatifs && (
                    <div className='contact-phone-dropdown'>
                      {indicatifsOptions.map(option => (
                        <button
                          key={`${option.code}-${option.country}`}
                          type='button'
                          className='contact-phone-option'
                          onClick={() => {
                            const newIndicatif = option.code;
                            const formattedPhone = formatPhoneNumber(
                              formData.telephone,
                              newIndicatif
                            );
                            setFormData(prev => ({
                              ...prev,
                              indicatif: newIndicatif,
                              telephone: formattedPhone,
                            }));
                            setShowIndicatifs(false);
                          }}
                        >
                          <span className='contact-phone-option-flag'>{option.flag}</span>
                          <span className='contact-phone-option-code'>{option.code}</span>
                          <span className='contact-phone-option-country'>{option.country}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type='tel'
                  className={`contact-input contact-phone-input ${errors.telephone && touched.telephone ? 'contact-error' : ''}`}
                  placeholder={getPhonePlaceholder(formData.indicatif)}
                  value={formData.telephone}
                  maxLength={getMaxLength(formData.indicatif) + 4} // +4 pour les espaces dans le formatage
                  onChange={e => handleInputChange('telephone', e.target.value)}
                  onBlur={e => handleInputBlur('telephone', e.target.value)}
                />
              </div>
              {errors.telephone && touched.telephone && (
                <span className='contact-error-message'>{errors.telephone}</span>
              )}
            </div>

            {/* Préférence de contact */}
            <div className='contact-field'>
              <label className='contact-label'>
                {formData.preferenceContact === 'email' ? (
                  <FaEnvelope className='contact-icon' />
                ) : (
                  <FaPhone className='contact-icon' />
                )}
                Préférence de contact
              </label>
              <div className='contact-radio-group'>
                {preferenceOptions.map(option => (
                  <label
                    key={option.value}
                    className={`contact-radio-option ${
                      formData.preferenceContact === option.value ? 'contact-selected' : ''
                    }`}
                  >
                    <input
                      type='radio'
                      name='preferenceContact'
                      value={option.value}
                      checked={formData.preferenceContact === option.value}
                      onChange={e => handlePreferenceChange(e.target.value)}
                      className='contact-radio'
                    />
                    <div className='contact-radio-content'>
                      {option.icon && <option.icon className='contact-radio-icon' />}
                      <span className='contact-radio-label'>{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className='contact-column-right'>
            {/* Message */}
            <div className='contact-field'>
              <label className='contact-label'>
                <FaComments className='contact-icon' />
                Message
              </label>
              <textarea
                className={`contact-textarea ${errors.message && touched.message ? 'contact-error' : ''}`}
                placeholder='Votre message...'
                value={formData.message}
                onChange={e => handleInputChange('message', e.target.value)}
                onBlur={e => handleInputBlur('message', e.target.value)}
                rows='6'
              />
              {errors.message && touched.message && (
                <span className='contact-error-message'>{errors.message}</span>
              )}
            </div>

            {/* Jours de préférence */}
            {(showJoursHoraires || formData.preferenceContact === 'telephone') && (
              <div
                className={`contact-field contact-field-conditional ${
                  formData.preferenceContact === 'telephone' ? 'show' : ''
                }`}
              >
                <label className='contact-label'>
                  <FaCalendar className='contact-icon' />
                  Jours de disponibilité
                </label>
                <div className='contact-radio-group contact-horizontal'>
                  {joursOptions.map(option => (
                    <label
                      key={option.value}
                      className={`contact-radio-option ${
                        formData.jours.includes(option.value) ? 'contact-selected' : ''
                      }`}
                    >
                      <input
                        type='checkbox'
                        value={option.value}
                        checked={formData.jours.includes(option.value)}
                        onChange={() => handleJoursChange(option.value)}
                        className='contact-radio'
                      />
                      <div className='contact-radio-content'>
                        <span className='contact-radio-label'>{option.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.jours && touched.jours && (
                  <span className='contact-error-message'>{errors.jours}</span>
                )}
              </div>
            )}

            {/* Créneaux horaires */}
            {(showJoursHoraires || formData.preferenceContact === 'telephone') && (
              <div
                className={`contact-field contact-field-conditional ${
                  formData.preferenceContact === 'telephone' ? 'show' : ''
                }`}
              >
                <label className='contact-label'>
                  <FaClock className='contact-icon' />
                  Créneaux horaires
                </label>
                <div className='contact-radio-group contact-horizontal'>
                  {horairesOptions.map(option => (
                    <label
                      key={option.value}
                      className={`contact-radio-option ${
                        formData.horaires.includes(option.value) ? 'contact-selected' : ''
                      }`}
                    >
                      <input
                        type='checkbox'
                        value={option.value}
                        checked={formData.horaires.includes(option.value)}
                        onChange={() => handleHorairesChange(option.value)}
                        className='contact-radio'
                      />
                      <div className='contact-radio-content'>
                        <span className='contact-radio-label'>{option.label}</span>
                        <span className='contact-radio-sublabel'>{option.sublabel}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.horaires && touched.horaires && (
                  <span className='contact-error-message'>{errors.horaires}</span>
                )}
              </div>
            )}

            {/* Bouton d'envoi */}
            <div className='contact-actions'>
              <button
                type='submit'
                className={`contact-submit-button ${isSubmitting ? 'contact-loading' : ''}`}
                disabled={isSubmitting || !isFormValid()}
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
    </>
  );
};

export default ContactForm;
