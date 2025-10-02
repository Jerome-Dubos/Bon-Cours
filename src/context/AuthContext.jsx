import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useErrorHandler } from '../hooks';

// Créer le contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

// Constantes pour la gestion du localStorage
const STORAGE_KEYS = {
  USER: 'boncours_user',
  TOKEN: 'boncours_token',
  REFRESH_TOKEN: 'boncours_refresh_token',
};

// Provider du contexte d'authentification optimisé
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Intégration avec useErrorHandler
  const { handleError, clearError } = useErrorHandler();

  // Fonction optimisée pour charger les données utilisateur
  const loadUserFromStorage = useCallback(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Validation basique des données utilisateur
        if (userData && userData.id && userData.email) {
          setUser(userData);
          return true;
        } else {
          // Données corrompues, nettoyer le localStorage
          localStorage.removeItem(STORAGE_KEYS.USER);
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        }
      }
      return false;
    } catch (error) {
      handleError(error, 'CLIENT', 'Chargement des données utilisateur');
      // Nettoyer le localStorage en cas d'erreur
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      return false;
    }
  }, [handleError]);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        clearError();

        const userLoaded = loadUserFromStorage();
        if (!userLoaded) {
          setUser(null);
        }
      } catch (error) {
        handleError(error, 'CLIENT', "Vérification de l'authentification");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [loadUserFromStorage, handleError, clearError]);

  // Fonction de connexion optimisée
  const login = useCallback(
    async (email, password) => {
      try {
        setIsLoading(true);
        clearError();

        // Validation basique des données
        if (!email || !password) {
          throw new Error('Email et mot de passe requis');
        }

        if (!email.includes('@')) {
          throw new Error("Format d'email invalide");
        }

        // Simulation d'une API de connexion
        // Dans un vrai projet, vous feriez un appel API ici
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulation d'une connexion réussie
        const userData = {
          id: Date.now(), // ID unique basé sur le timestamp
          email,
          name: email.split('@')[0],
          role: 'user',
          loginTime: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
        };

        // Sauvegarder les données utilisateur
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        localStorage.setItem(STORAGE_KEYS.TOKEN, 'mock_token_' + Date.now());

        setUser(userData);
        setError(null);

        return { success: true, user: userData };
      } catch (error) {
        handleError(error, 'CLIENT', 'Connexion utilisateur');
        setError(error.message);
        return { success: false, error: error.message };
      } finally {
        setIsLoading(false);
      }
    },
    [handleError, clearError]
  );

  // Fonction de déconnexion optimisée
  const logout = useCallback(() => {
    try {
      setUser(null);
      setError(null);

      // Nettoyer tous les données d'authentification
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

      clearError();
    } catch (error) {
      handleError(error, 'CLIENT', 'Déconnexion utilisateur');
    }
  }, [handleError, clearError]);

  // Fonction de réinitialisation de mot de passe optimisée
  const resetPassword = useCallback(
    async email => {
      try {
        setIsLoading(true);
        clearError();

        // Validation de l'email
        if (!email || !email.includes('@')) {
          throw new Error("Format d'email invalide");
        }

        // Simulation d'un envoi d'email de réinitialisation
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log(`Email de réinitialisation envoyé à: ${email}`);
        return { success: true };
      } catch (error) {
        handleError(error, 'CLIENT', 'Réinitialisation de mot de passe');
        setError(error.message);
        return { success: false, error: error.message };
      } finally {
        setIsLoading(false);
      }
    },
    [handleError, clearError]
  );

  // Vérifier si l'utilisateur est connecté (memoized)
  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  // Vérifier si l'utilisateur a un rôle spécifique (memoized)
  const hasRole = useCallback(
    role => {
      return user?.role === role;
    },
    [user]
  );

  // Fonction pour mettre à jour l'activité utilisateur
  const updateUserActivity = useCallback(() => {
    if (user) {
      const updatedUser = {
        ...user,
        lastActivity: new Date().toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    }
  }, [user]);

  // Fonction pour nettoyer les erreurs
  const clearAuthError = useCallback(() => {
    setError(null);
    clearError();
  }, [clearError]);

  // Valeur du contexte memoized pour éviter les re-renders inutiles
  const value = useMemo(
    () => ({
      // État
      user,
      isLoading,
      error,

      // Actions
      login,
      logout,
      resetPassword,
      clearAuthError,
      updateUserActivity,

      // Utilitaires
      isAuthenticated,
      hasRole,
    }),
    [
      user,
      isLoading,
      error,
      login,
      logout,
      resetPassword,
      clearAuthError,
      updateUserActivity,
      isAuthenticated,
      hasRole,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
