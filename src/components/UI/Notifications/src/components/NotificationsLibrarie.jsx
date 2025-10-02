import React from 'react';
import '../styles/NotificationsLibrarie.css';
import Notification from './Notifications';

// Notifications par type
export const InfoNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'info' }))}
    onRemove={onRemove}
    {...props}
  />
);

export const SuccessNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'success' }))}
    onRemove={onRemove}
    {...props}
  />
);

export const ErrorNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'error' }))}
    onRemove={onRemove}
    {...props}
  />
);

export const WarningNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'warning' }))}
    onRemove={onRemove}
    {...props}
  />
);

export const AchievementNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification
    notifications={notifications.map(n => ({ ...n, type: 'achievement' }))}
    onRemove={onRemove}
    {...props}
  />
);

// Notifications par variante
export const ToastNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification notifications={notifications} onRemove={onRemove} variant='toast' {...props} />
);

export const BannerNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification notifications={notifications} onRemove={onRemove} variant='banner' {...props} />
);

export const InlineNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification notifications={notifications} onRemove={onRemove} variant='inline' {...props} />
);

// Notifications par taille
export const CompactNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification
    notifications={notifications}
    onRemove={onRemove}
    className='notification-compact'
    {...props}
  />
);

export const LargeNotification = ({ notifications = [], onRemove, ...props }) => (
  <Notification
    notifications={notifications}
    onRemove={onRemove}
    className='notification-large'
    {...props}
  />
);

// Notifications avec comportements spécifiques
export const AutoCloseNotification = ({
  notifications,
  onRemove,
  autoCloseDelay = 4000,
  ...props
}) => (
  <Notification
    notifications={notifications}
    onRemove={onRemove}
    autoClose={true}
    autoCloseDelay={autoCloseDelay}
    {...props}
  />
);

export const PersistentNotification = ({ notifications, onRemove, ...props }) => (
  <Notification
    notifications={notifications}
    onRemove={onRemove}
    autoClose={false}
    showCloseButton={true}
    {...props}
  />
);

export const ActionNotification = ({
  notifications,
  onRemove,
  actionLabel = 'Action',
  onAction,
  ...props
}) => {
  const notificationsWithAction = notifications.map(notification => ({
    ...notification,
    action: {
      label: actionLabel,
      onClick: onAction || (() => {}),
    },
  }));

  return <Notification notifications={notificationsWithAction} onRemove={onRemove} {...props} />;
};

// Composant principal de la bibliothèque
const NotificationLibraries = {
  // Notifications par type
  InfoNotification,
  SuccessNotification,
  ErrorNotification,
  WarningNotification,
  AchievementNotification,

  // Notifications par variante
  ToastNotification,
  BannerNotification,
  InlineNotification,

  // Notifications par taille
  CompactNotification,
  LargeNotification,

  // Notifications avec comportements
  AutoCloseNotification,
  PersistentNotification,
  ActionNotification,

  // Composant de base pour personnalisation avancée
  Notification,
};

export default NotificationLibraries;
