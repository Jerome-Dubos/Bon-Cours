import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Notifications.css';

const Notification = memo(
  ({
    notifications = [],
    onRemove,
    position = 'top-right',
    autoClose = true,
    autoCloseDelay = 4000,
    className = '',
    maxNotifications = 5,
    showCloseButton = true,
    ...props
  }) => {
    const timeoutRefs = useRef(new Map());

    // Classes CSS simplifiées
    const containerClasses = useMemo(() => {
      const baseClasses = ['notification-container'];
      const positionClass = `notification-container--${position}`;
      return [...baseClasses, positionClass, className].filter(Boolean).join(' ');
    }, [position, className]);

    // Gestionnaire de suppression
    const handleRemove = useCallback(
      notificationId => {
        const timeoutId = timeoutRefs.current.get(notificationId);
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutRefs.current.delete(notificationId);
        }
        onRemove?.(notificationId);
      },
      [onRemove]
    );

    // Gestion de l'auto-close
    useEffect(() => {
      if (!autoClose || notifications.length === 0) return;

      // Nettoyer les anciens timeouts
      timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutRefs.current.clear();

      // Créer de nouveaux timeouts
      notifications.forEach(notification => {
        if (notification.autoClose !== false) {
          const timeoutId = setTimeout(() => {
            handleRemove(notification.id);
          }, notification.autoCloseDelay || autoCloseDelay);

          timeoutRefs.current.set(notification.id, timeoutId);
        }
      });

      return () => {
        timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
        timeoutRefs.current.clear();
      };
    }, [notifications, autoClose, autoCloseDelay, handleRemove]);

    // Limiter le nombre de notifications
    const limitedNotifications = useMemo(() => {
      return notifications.slice(0, maxNotifications);
    }, [notifications, maxNotifications]);

    // Animations simplifiées
    const animationVariants = useMemo(() => {
      const isTop = position.includes('top');
      const isRight = position.includes('right');
      const isLeft = position.includes('left');

      return {
        initial: {
          opacity: 0,
          scale: 0.9,
          y: isTop ? -20 : 20,
          x: isRight ? 20 : isLeft ? -20 : 0,
        },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.9,
          y: isTop ? -10 : 10,
          x: isRight ? 10 : isLeft ? -10 : 0,
          transition: {
            duration: 0.2,
          },
        },
      };
    }, [position]);

    // Contenu des notifications
    const notificationContent = (
      <div className={containerClasses} {...props}>
        <AnimatePresence mode='popLayout'>
          {limitedNotifications.map(notification => {
            const notificationClasses = [
              'notification',
              `notification--${notification.type || 'info'}`,
              notification.className,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <motion.div
                key={notification.id}
                className={notificationClasses}
                variants={animationVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                layout
              >
                <div className='notification__content'>
                  {notification.icon && (
                    <div className='notification__icon'>{notification.icon}</div>
                  )}

                  <div className='notification__body'>
                    {notification.title && (
                      <div className='notification__title'>{notification.title}</div>
                    )}
                    <div className='notification__message'>{notification.message}</div>
                  </div>

                  {showCloseButton && notification.showCloseButton !== false && (
                    <button
                      type='button'
                      className='notification__close'
                      onClick={() => handleRemove(notification.id)}
                      aria-label='Fermer la notification'
                    >
                      <span aria-hidden='true'>×</span>
                    </button>
                  )}
                </div>

                {notification.action && (
                  <div className='notification__actions'>
                    <button
                      type='button'
                      className='notification__action'
                      onClick={e => {
                        notification.action.onClick?.(notification.id, e);
                        if (notification.action.closeOnClick !== false) {
                          handleRemove(notification.id);
                        }
                      }}
                    >
                      {notification.action.label}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );

    // Portal simplifié
    if (typeof document !== 'undefined') {
      let notificationRoot = document.getElementById('notification-root');
      if (!notificationRoot) {
        notificationRoot = document.createElement('div');
        notificationRoot.id = 'notification-root';
        notificationRoot.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 10000;
          overflow: visible;
          margin: 0;
          padding: 0;
        `;
        document.body.appendChild(notificationRoot);
      }
      return createPortal(notificationContent, notificationRoot);
    }

    return notificationContent;
  }
);

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      message: PropTypes.string.isRequired,
      title: PropTypes.string,
      type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
      icon: PropTypes.node,
      action: PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        closeOnClick: PropTypes.bool,
      }),
      showCloseButton: PropTypes.bool,
      autoClose: PropTypes.bool,
      autoCloseDelay: PropTypes.number,
      className: PropTypes.string,
    })
  ),
  onRemove: PropTypes.func.isRequired,
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
  showCloseButton: PropTypes.bool,
};

Notification.displayName = 'Notification';

export default Notification;
