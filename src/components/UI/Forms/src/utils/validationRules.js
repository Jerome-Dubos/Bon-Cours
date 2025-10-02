// Regex patterns
export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  NAME: /^[\p{L}\s'-]{2,50}$/u,
  MESSAGE: /^[\s\S]{10,1000}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  PHONE: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
};

// Messages d'erreur par défaut
export const ERROR_MESSAGES = {
  REQUIRED: 'Ce champ est requis',
  EMAIL_INVALID: 'Veuillez entrer un email valide',
  IDENTIFIER_INVALID: "Veuillez entrer un email valide ou un nom d'utilisateur (2-30 caractères)",
  NAME_INVALID: 'Le nom doit contenir entre 2 et 50 caractères (lettres et espaces uniquement)',
  MESSAGE_TOO_SHORT: 'Le message doit contenir au moins 10 caractères',
  MESSAGE_TOO_LONG: 'Le message ne peut pas dépasser 1000 caractères',
  PASSWORD_WEAK: 'Le mot de passe ne respecte pas les critères de sécurité',
  PHONE_INVALID: 'Veuillez entrer un numéro de téléphone valide',
  PHONE_INCOMPLETE: 'Numéro incomplet',
  PHONE_FORMAT: 'Format invalide. Exemple : 06 12 34 56 78',
};

// Règles de validation réutilisables
export const createRequiredRule =
  (message = ERROR_MESSAGES.REQUIRED) =>
  value =>
    !value || !value.trim() ? message : '';

export const createEmailRule =
  (message = ERROR_MESSAGES.EMAIL_INVALID) =>
  value =>
    value && !PATTERNS.EMAIL.test(value.trim()) ? message : '';

export const createNameRule =
  (message = ERROR_MESSAGES.NAME_INVALID) =>
  value =>
    value && !PATTERNS.NAME.test(value.trim()) ? message : '';

export const createMessageRule =
  (
    minLength = 10,
    maxLength = 1000,
    tooShortMessage = ERROR_MESSAGES.MESSAGE_TOO_SHORT,
    tooLongMessage = ERROR_MESSAGES.MESSAGE_TOO_LONG
  ) =>
  value => {
    if (!value) return '';
    if (value.length < minLength) return tooShortMessage;
    if (value.length > maxLength) return tooLongMessage;
    return '';
  };

export const createPasswordRule =
  (message = ERROR_MESSAGES.PASSWORD_WEAK) =>
  value =>
    value && !PATTERNS.PASSWORD.test(value) ? message : '';

export const createPhoneRule =
  (
    requiredMessage = ERROR_MESSAGES.REQUIRED,
    incompleteMessage = ERROR_MESSAGES.PHONE_INCOMPLETE,
    formatMessage = ERROR_MESSAGES.PHONE_FORMAT
  ) =>
  value => {
    if (!value || !value.trim()) return requiredMessage;

    // Validation simple avec regex française
    const cleanValue = value.replace(/\s/g, '');
    if (!PATTERNS.PHONE.test(cleanValue)) {
      const numbers = value.replace(/\D/g, '');
      if (numbers.length > 0 && numbers.length !== 10) {
        return incompleteMessage;
      }
      return formatMessage;
    }

    return '';
  };

// Règles de validation conditionnelles
export const createConditionalRequiredRule =
  (condition, message = ERROR_MESSAGES.REQUIRED) =>
  (value, formData) => {
    if (condition(formData) && (!value || !value.trim())) {
      return message;
    }
    return '';
  };

export const createConditionalPhoneRule = condition => (value, formData) => {
  if (condition(formData)) {
    return createPhoneRule()(value);
  }
  return '';
};

// Règles de validation pour les créneaux horaires
export const createTimeSlotsRule =
  (message = 'Veuillez sélectionner au moins un créneau horaire') =>
  (value, formData) => {
    if (formData.preferenceContact === 'telephone') {
      if (!value || value.length === 0) {
        return message;
      }
    }
    return '';
  };

export const createDaysRule =
  (message = 'Veuillez sélectionner au moins un jour') =>
  (value, formData) => {
    if (formData.preferenceContact === 'telephone') {
      if (!value || value.length === 0) {
        return message;
      }
    }
    return '';
  };

// Règles de validation personnalisées
export const createCustomRule = (validator, message) => value => {
  if (!validator(value)) {
    return message;
  }
  return '';
};

// Règles de validation avec dépendances
export const createDependentRule =
  (validator, dependencies = []) =>
  (value, formData) => {
    const dependentValues = dependencies.map(dep => formData[dep]);
    return validator(value, ...dependentValues);
  };

// Règles de validation pour les mots de passe qui doivent correspondre
export const createPasswordMatchRule =
  (passwordField, message = 'Les mots de passe ne correspondent pas') =>
  (value, formData) => {
    if (value && formData[passwordField] && value !== formData[passwordField]) {
      return message;
    }
    return '';
  };

// Nouvelle règle pour identifier (email ou pseudo)
export const createIdentifierRule =
  (message = ERROR_MESSAGES.IDENTIFIER_INVALID) =>
  value => {
    if (!value || !value.trim()) return ERROR_MESSAGES.REQUIRED;

    const trimmedValue = value.trim();

    // Accepter les emails valides
    if (PATTERNS.EMAIL.test(trimmedValue)) {
      return '';
    }

    // Accepter les pseudos (2-30 caractères, lettres, chiffres, tirets, underscores, points)
    const usernamePattern = /^[a-zA-Z0-9._-]{2,30}$/;
    if (usernamePattern.test(trimmedValue)) {
      return '';
    }

    return message;
  };

// Règles de validation pour les URLs
export const createUrlRule =
  (message = 'Veuillez entrer une URL valide') =>
  value => {
    if (!value) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return message;
    }
  };

// Règles de validation pour les nombres
export const createNumberRule = (min, max) => value => {
  if (!value) return '';
  const num = parseFloat(value);
  if (isNaN(num)) return 'Veuillez entrer un nombre valide';
  if (min !== undefined && num < min) return `La valeur doit être au moins ${min}`;
  if (max !== undefined && num > max) return `La valeur ne peut pas dépasser ${max}`;
  return '';
};

// Règles de validation pour les dates
export const createDateRule = (minDate, maxDate) => value => {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return 'Veuillez entrer une date valide';
  if (minDate && date < new Date(minDate)) return `La date doit être après ${minDate}`;
  if (maxDate && date > new Date(maxDate)) return `La date doit être avant ${maxDate}`;
  return '';
};

// Règles de validation pour les fichiers
export const createFileRule = (maxSize, allowedTypes) => value => {
  if (!value) return '';
  if (maxSize && value.size > maxSize)
    return `Le fichier ne peut pas dépasser ${maxSize / 1024 / 1024}MB`;
  if (allowedTypes && !allowedTypes.includes(value.type)) return `Type de fichier non autorisé`;
  return '';
};
