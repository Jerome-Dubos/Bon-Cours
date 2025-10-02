import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Button } from '../../../Buttons/src/index';
import '../styles/Notifications.css';
import '../styles/NotificationsLibrarie.css';

/**
 * Composant Notification optimisé avec performances améliorées et gestion d'animations optimisée
 * @version 2.0.0
 * @author Bon Cours Team
 */
const Notification = memo(
  ({
    notifications,
    onRemove,
    variant = 'toast',
    position = 'top-right',
    autoClose = true,
    autoCloseDelay = 4000,
    className = '',
    maxNotifications = 5,
    animationDuration = 300,
    onNotificationAdd,
    onNotificationRemove,
    ...props
  }) => {
    const timeoutRefs = useRef(new Map());
    const notificationRefs = useRef(new Map());

    // Classes CSS mémorisées pour éviter les recalculs
    const positionClass = useMemo(() => `notification-container-${position}`, [position]);
    const variantClass = useMemo(() => `notification-${variant}`, [variant]);
    const classes = useMemo(
      () => `${positionClass} ${variantClass} ${className}`.trim(),
      [positionClass, variantClass, className]
    );

    // Gestionnaire optimisé de suppression de notification
    const handleRemove = useCallback(
      notificationId => {
        // Nettoyer le timeout si il existe
        const timeoutId = timeoutRefs.current.get(notificationId);
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutRefs.current.delete(notificationId);
        }

        // Supprimer la notification
        onRemove(notificationId);
        onNotificationRemove?.(notificationId);
      },
      [onRemove, onNotificationRemove]
    );

    // Gestionnaire optimisé de clic sur l'action
    const handleActionClick = useCallback(
      (action, notificationId) => {
        action.onClick();
        // Optionnel : fermer la notification après l'action
        if (action.closeOnClick !== false) {
          handleRemove(notificationId);
        }
      },
      [handleRemove]
    );

    // Gestion optimisée de l'auto-close
    useEffect(() => {
      if (!autoClose || notifications.length === 0) return;

      // Nettoyer les anciens timeouts
      timeoutRefs.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
      timeoutRefs.current.clear();

      // Créer de nouveaux timeouts pour chaque notification
      notifications.forEach(notification => {
        const timeoutId = setTimeout(() => {
          handleRemove(notification.id);
        }, autoCloseDelay);

        timeoutRefs.current.set(notification.id, timeoutId);
      });

      // Nettoyage au démontage
      return () => {
        timeoutRefs.current.forEach(timeoutId => {
          clearTimeout(timeoutId);
        });
        timeoutRefs.current.clear();
      };
    }, [notifications, autoClose, autoCloseDelay, handleRemove]);

    // Callback d'ajout de notification
    useEffect(() => {
      if (notifications.length > 0) {
        onNotificationAdd?.(notifications);
      }
    }, [notifications, onNotificationAdd]);

    // Limiter le nombre de notifications affichées
    const limitedNotifications = useMemo(() => {
      return notifications.slice(0, maxNotifications);
    }, [notifications, maxNotifications]);

    // Animations optimisées
    const animationVariants = useMemo(
      () => ({
        initial: {
          opacity: 0,
          y: position.includes('top') ? -50 : 50,
          scale: 0.3,
          x: position.includes('right') ? 50 : position.includes('left') ? -50 : 0,
        },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          x: 0,
          transition: {
            duration: animationDuration / 1000,
            ease: 'easeOut',
          },
        },
        exit: {
          opacity: 0,
          scale: 0.5,
          y: position.includes('top') ? -20 : 20,
          x: position.includes('right') ? 20 : position.includes('left') ? -20 : 0,
          transition: {
            duration: 0.2,
            ease: 'easeIn',
          },
        },
      }),
      [position, animationDuration]
    );

    return (
      <div className={classes} {...props}>
        <AnimatePresence mode='popLayout'>
          {limitedNotifications.map(notification => (
            <motion.div
              key={notification.id}
              ref={el => {
                if (el) {
                  notificationRefs.current.set(notification.id, el);
                } else {
                  notificationRefs.current.delete(notification.id);
                }
              }}
              className={`notification ${notification.type}`}
              variants={animationVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              layout
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='notification-content'>
                {notification.icon && <div className='notification-icon'>{notification.icon}</div>}
                <span className='notification-message'>{notification.message}</span>
                {notification.showCloseButton !== false && (
                  <button
                    className='notification-close'
                    onClick={() => handleRemove(notification.id)}
                    aria-label='Fermer la notification'
                  >
                    ×
                  </button>
                )}
              </div>
              {notification.action && (
                <div className='notification-action'>
                  <Button
                    variant='outline'
                    size='small'
                    onClick={() => handleActionClick(notification.action, notification.id)}
                  >
                    {notification.action.label}
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'achievement']).isRequired,
      icon: PropTypes.node,
      action: PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        closeOnClick: PropTypes.bool,
      }),
      showCloseButton: PropTypes.bool,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['toast', 'banner', 'inline']),
  position: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
    'top-center',
    'bottom-center',
  ]),
  autoClose: PropTypes.bool,
  autoCloseDelay: PropTypes.number,
  className: PropTypes.string,
  maxNotifications: PropTypes.number,
  animationDuration: PropTypes.number,
  onNotificationAdd: PropTypes.func,
  onNotificationRemove: PropTypes.func,
};

// Ajout du displayName pour le debugging
Notification.displayName = 'Notification';

export default Notification;
