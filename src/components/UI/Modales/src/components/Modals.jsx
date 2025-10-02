import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useScrollLock } from '../../../../../hooks/useScrollLock';
import '../styles/Modals.css';

/**
 * Composant Modal optimisé avec performances améliorées et gestion d'événements optimisée
 * @version 2.0.0
 * @author Bon Cours Team
 */
const Modal = memo(
  ({
    isOpen,
    onClose,
    children,
    title,
    size = 'medium',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    className = '',
    overlayClassName = '',
    headerClassName = '',
    bodyClassName = '',
    footerClassName = '',
    showFooter = false,
    footerContent,
    animationDuration = 300,
    onOpen,
    onCloseComplete,
    ...props
  }) => {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    // Utiliser le hook pour bloquer le scroll
    useScrollLock(isOpen);

    // Gestion optimisée du focus et de l'accessibilité
    useEffect(() => {
      if (isOpen) {
        // Sauvegarder l'élément actif
        previousActiveElement.current = document.activeElement;

        // Focus sur la modale
        if (modalRef.current) {
          modalRef.current.focus();
        }

        // Callback d'ouverture
        onOpen?.();
      } else {
        // Restaurer le focus
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }

        // Callback de fermeture
        onCloseComplete?.();
      }
    }, [isOpen, onOpen, onCloseComplete]);

    // Gestion optimisée du z-index de la navbar
    useEffect(() => {
      const navbar = document.querySelector('.navbar');
      if (isOpen && navbar) {
        navbar.style.zIndex = '1';
        navbar.style.position = 'relative';
      }

      return () => {
        if (navbar) {
          navbar.style.zIndex = '';
          navbar.style.position = '';
        }
      };
    }, [isOpen]);

    // Gestionnaire optimisé de la touche Escape
    const handleEscape = useCallback(
      event => {
        if (event.key === 'Escape' && closeOnEscape && isOpen) {
          onClose();
        }
      },
      [closeOnEscape, isOpen, onClose]
    );

    // Gestion optimisée de la touche Escape
    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, handleEscape]);

    // Gestionnaire optimisé du clic sur l'overlay
    const handleOverlayClick = useCallback(
      event => {
        if (event.target === event.currentTarget && closeOnOverlayClick) {
          onClose();
        }
      },
      [closeOnOverlayClick, onClose]
    );

    // Gestionnaire optimisé de la fermeture
    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    // Classes CSS mémorisées pour éviter les recalculs
    const modalClasses = useMemo(
      () => `modal modal-${size} ${className}`.trim(),
      [size, className]
    );

    const overlayClasses = useMemo(
      () => `modal-overlay ${overlayClassName}`.trim(),
      [overlayClassName]
    );

    const headerClasses = useMemo(
      () => `modal-header ${headerClassName}`.trim(),
      [headerClassName]
    );

    const bodyClasses = useMemo(() => `modal-body ${bodyClassName}`.trim(), [bodyClassName]);

    const footerClasses = useMemo(
      () => `modal-footer ${footerClassName}`.trim(),
      [footerClassName]
    );

    // Styles d'animation optimisés
    const overlayStyle = useMemo(
      () => ({
        animationDuration: `${animationDuration}ms`,
      }),
      [animationDuration]
    );

    if (!isOpen) return null;

    return (
      <div className={overlayClasses} onClick={handleOverlayClick} style={overlayStyle} {...props}>
        <div
          ref={modalRef}
          className={modalClasses}
          role='dialog'
          aria-modal='true'
          aria-labelledby={title ? 'modal-title' : undefined}
          tabIndex={-1}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={headerClasses}>
              {title && (
                <h2 id='modal-title' className='modal-title'>
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type='button'
                  className='modal-close'
                  onClick={handleClose}
                  aria-label='Fermer la modale'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    aria-hidden='true'
                  >
                    <line x1='18' y1='6' x2='6' y2='18'></line>
                    <line x1='6' y1='6' x2='18' y2='18'></line>
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={bodyClasses}>{children || null}</div>

          {/* Footer */}
          {showFooter && <div className={footerClasses}>{footerContent}</div>}
        </div>
      </div>
    );
  }
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fullscreen']),
  showCloseButton: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  showFooter: PropTypes.bool,
  footerContent: PropTypes.node,
  animationDuration: PropTypes.number,
  onOpen: PropTypes.func,
  onCloseComplete: PropTypes.func,
};

// Ajout du displayName pour le debugging
Modal.displayName = 'Modal';

export default Modal;
