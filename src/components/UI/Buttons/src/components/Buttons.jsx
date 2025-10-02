import PropTypes from 'prop-types';
import React, { forwardRef, memo, useCallback } from 'react';
import '../styles/Buttons.css';

/**
 * Composant Button optimisé avec performances améliorées et accessibilité
 * @version 2.0.0
 * @author Bon Cours Team
 */
const Button = memo(
  forwardRef(
    (
      {
        children,
        variant = 'primary',
        size = 'medium',
        onClick,
        disabled = false,
        fullWidth = false,
        type = 'button',
        className = '',
        style = {},
        loading = false,
        loadingText = 'Chargement...',
        icon,
        iconPosition = 'left',
        ariaLabel,
        ariaDescribedBy,
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave,
        ...props
      },
      ref
    ) => {
      /**
       * Gestionnaire de clic optimisé avec prévention des clics multiples
       * @private
       */
      const handleClick = useCallback(
        e => {
          if (disabled || loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }

          if (onClick) {
            onClick(e);
          }
        },
        [disabled, loading, onClick]
      );

      /**
       * Gestionnaire de focus optimisé
       * @private
       */
      const handleFocus = useCallback(
        e => {
          onFocus?.(e);
        },
        [onFocus]
      );

      /**
       * Gestionnaire de blur optimisé
       * @private
       */
      const handleBlur = useCallback(
        e => {
          onBlur?.(e);
        },
        [onBlur]
      );

      /**
       * Gestionnaire de survol optimisé
       * @private
       */
      const handleMouseEnter = useCallback(
        e => {
          onMouseEnter?.(e);
        },
        [onMouseEnter]
      );

      /**
       * Gestionnaire de sortie de survol optimisé
       * @private
       */
      const handleMouseLeave = useCallback(
        e => {
          onMouseLeave?.(e);
        },
        [onMouseLeave]
      );

      // Construction optimisée des classes CSS
      const buttonClass = [
        'button',
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? 'button--full' : '',
        disabled ? 'button--disabled' : '',
        loading ? 'button--loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ');

      // Styles optimisés
      const buttonStyle = {
        ...style,
        ...(loading && { cursor: 'not-allowed' }),
      };

      // Rendu de l'icône
      const renderIcon = () => {
        if (!icon) return null;

        const IconComponent = icon;
        return (
          <span className={`button-icon button-icon--${iconPosition}`}>
            <IconComponent />
          </span>
        );
      };

      // Rendu du contenu de chargement
      const renderLoadingContent = () => {
        if (!loading) return children;

        return (
          <>
            <span className='button-loading-spinner' />
            {loadingText}
          </>
        );
      };

      return (
        <button
          ref={ref}
          type={type}
          className={buttonClass}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={disabled || loading}
          style={buttonStyle}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-disabled={disabled || loading}
          {...props}
        >
          {iconPosition === 'left' && renderIcon()}
          {renderLoadingContent()}
          {iconPosition === 'right' && renderIcon()}
        </button>
      );
    }
  )
);

// Ajout du displayName pour le debugging
Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'text',
    'tab',
    'success',
    'danger',
    'warning',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default Button;
