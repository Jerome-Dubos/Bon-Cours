/**
 * Règles de validation réutilisables pour les formulaires
 */

export const createRequiredRule = (message = 'Ce champ est requis') => {
  return value => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return message;
    }
    return '';
  };
};

export const createEmailRule = (message = 'Veuillez entrer une adresse email valide') => {
  return value => {
    if (!value) return '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return message;
    }
    return '';
  };
};

export const createPhoneRule = (message = 'Veuillez entrer un numéro de téléphone valide') => {
  return value => {
    if (!value) return '';

    // Regex plus flexible pour les numéros internationaux
    // Accepte les formats avec indicatif international + espace + numéro local
    // Exemples: +33 6 12 34 56 78, +1 123 456 7890, +44 1234 567 890
    const phoneRegex = /^\+\d{1,4}\s[\d\s]{7,15}$/;

    // Vérifier que le numéro a au moins 7 chiffres (minimum international)
    const digitsOnly = value.replace(/[^\d]/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return message;
    }

    if (!phoneRegex.test(value)) {
      return message;
    }
    return '';
  };
};

export const createNameRule = (message = 'Veuillez entrer un nom valide (lettres uniquement)') => {
  return value => {
    if (!value) return '';

    // Accepte les lettres, espaces, traits d'union et apostrophes
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!nameRegex.test(value)) {
      return message;
    }
    return '';
  };
};

export const createPasswordRule = (
  minLength = 8,
  message = `Le mot de passe doit contenir au moins ${minLength} caractères`
) => {
  return value => {
    if (!value) return '';

    if (value.length < minLength) {
      return message || `Le mot de passe doit contenir au moins ${minLength} caractères`;
    }
    return '';
  };
};

export const createMessageRule = (
  minLength = 10,
  maxLength = 1000,
  minMessage = `Le message doit contenir au moins ${minLength} caractères`,
  maxMessage = `Le message ne peut pas dépasser ${maxLength} caractères`
) => {
  return value => {
    if (!value) return '';

    if (value.length < minLength) {
      return minMessage || `Le message doit contenir au moins ${minLength} caractères`;
    }

    if (value.length > maxLength) {
      return maxMessage || `Le message ne peut pas dépasser ${maxLength} caractères`;
    }

    return '';
  };
};

export const createMinLengthRule = (minLength, message) => {
  return value => {
    if (!value) return '';

    if (value.length < minLength) {
      return message || `Doit contenir au moins ${minLength} caractères`;
    }
    return '';
  };
};

export const createMaxLengthRule = (maxLength, message) => {
  return value => {
    if (!value) return '';

    if (value.length > maxLength) {
      return message || `Ne peut pas dépasser ${maxLength} caractères`;
    }
    return '';
  };
};

export const createPatternRule = (pattern, message = 'Format invalide') => {
  return value => {
    if (!value) return '';

    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      return message;
    }
    return '';
  };
};

export const createMatchRule = (otherValue, message = 'Les valeurs ne correspondent pas') => {
  return value => {
    if (value !== otherValue) {
      return message;
    }
    return '';
  };
};
