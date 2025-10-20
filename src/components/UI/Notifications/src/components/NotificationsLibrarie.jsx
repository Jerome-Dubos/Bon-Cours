import React from 'react';
import Notification from './Notifications';

/**
 * Bibliothèque de composants de notifications - Version 3.0.0
 * Composants pré-configurés pour différents types et variantes de notifications
 */

// Composants par type de notification
export const InfoNotification = ({
  notifications = [],
  onRemove,
  position = 'top-right',
  className = '',
  ...props
}) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'info' }))}
    onRemove={onRemove}
    position={position}
    className={className}
    {...props}
  />
);

export const SuccessNotification = ({
  notifications = [],
  onRemove,
  position = 'top-right',
  className = '',
  ...props
}) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'success' }))}
    onRemove={onRemove}
    position={position}
    className={className}
    {...props}
  />
);

export const ErrorNotification = ({
  notifications = [],
  onRemove,
  position = 'top-right',
  className = '',
  ...props
}) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'error' }))}
    onRemove={onRemove}
    position={position}
    className={className}
    {...props}
  />
);

export const WarningNotification = ({
  notifications = [],
  onRemove,
  position = 'top-right',
  className = '',
  ...props
}) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'warning' }))}
    onRemove={onRemove}
    position={position}
    className={className}
    {...props}
  />
);

// Objet de la bibliothèque pour compatibilité - Types essentiels uniquement
const NotificationLibraries = {
  // Notifications par type - Seulement les 4 types essentiels
  InfoNotification,
  SuccessNotification,
  ErrorNotification,
  WarningNotification,

  // Composant de base
  Notification,
};

export default NotificationLibraries;
