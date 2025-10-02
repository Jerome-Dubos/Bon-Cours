// Export du composant Notification de base
export { default as Notification } from './components/Notifications';

// Export de la bibliothèque complète
export { default as NotificationLibraries } from './components/NotificationsLibrarie';

// Exports individuels des notifications prédéfinies
export {
  AchievementNotification,
  ActionNotification,
  AutoCloseNotification,
  BannerNotification,
  CompactNotification,
  ErrorNotification,
  InfoNotification,
  InlineNotification,
  LargeNotification,
  PersistentNotification,
  SuccessNotification,
  ToastNotification,
  WarningNotification,
} from './components/NotificationsLibrarie';

// Export par défaut de la bibliothèque
export { default } from './components/NotificationsLibrarie';
