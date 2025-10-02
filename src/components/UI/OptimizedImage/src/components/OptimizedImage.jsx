import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import '../styles/OptimizedImage.css';

/**
 * Composant d'image optimisé avec lazy loading, gestion d'erreurs et performances améliorées
 * @version 2.0.0
 * @author Bon Cours Team
 */
const OptimizedImage = memo(
  ({
    src,
    alt = '',
    width,
    height,
    className = '',
    priority = false,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+',
    fallbackSrc,
    onLoad,
    onError,
    objectFit = 'cover',
    objectPosition = 'center',
    quality = 'auto',
    sizes,
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isIntersecting, setIsIntersecting] = useState(false);

    const imgRef = useRef(null);
    const observerRef = useRef(null);
    const retryCountRef = useRef(0);
    const maxRetries = 3;

    /**
     * Gestionnaire optimisé pour le chargement de l'image
     * @private
     */
    const handleLoad = useCallback(() => {
      setIsLoaded(true);
      setHasError(false);
      onLoad?.();
    }, [onLoad]);

    /**
     * Gestionnaire optimisé pour les erreurs de chargement
     * @private
     */
    const handleError = useCallback(() => {
      const currentRetryCount = retryCountRef.current;

      if (currentRetryCount < maxRetries && fallbackSrc) {
        // Tentative de rechargement avec l'image de fallback
        retryCountRef.current += 1;
        setImageSrc(fallbackSrc);
        return;
      }

      setHasError(true);
      setIsLoaded(true);
      onError?.();
    }, [fallbackSrc, onError]);

    /**
     * Gestionnaire optimisé pour l'intersection observer
     * @private
     */
    const handleIntersection = useCallback(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isIntersecting) {
            setIsIntersecting(true);
            setImageSrc(src);

            // Nettoyer l'observer après utilisation
            if (observerRef.current) {
              observerRef.current.unobserve(entry.target);
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        });
      },
      [src, isIntersecting]
    );

    /**
     * Configuration de l'Intersection Observer
     * @private
     */
    const setupIntersectionObserver = useCallback(() => {
      if (!imgRef.current || priority || isIntersecting) return;

      if ('IntersectionObserver' in window) {
        observerRef.current = new IntersectionObserver(handleIntersection, {
          rootMargin: '50px',
          threshold: 0.1,
        });

        observerRef.current.observe(imgRef.current);
      } else {
        // Fallback pour les navigateurs sans IntersectionObserver
        setImageSrc(src);
      }
    }, [handleIntersection, priority, isIntersecting, src]);

    /**
     * Nettoyage de l'observer
     * @private
     */
    const cleanupObserver = useCallback(() => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    }, []);

    // Effet pour le chargement prioritaire
    useEffect(() => {
      if (priority && src) {
        setImageSrc(src);
        setIsIntersecting(true);
      }
    }, [priority, src]);

    // Effet pour l'intersection observer
    useEffect(() => {
      if (!priority && src && !isIntersecting) {
        setupIntersectionObserver();
      }

      return cleanupObserver;
    }, [priority, src, isIntersecting, setupIntersectionObserver, cleanupObserver]);

    // Effet de nettoyage
    useEffect(() => {
      return cleanupObserver;
    }, [cleanupObserver]);

    // Styles optimisés
    const containerStyle = {
      width: width || '100%',
      height: height || 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      aspectRatio: width && height ? `${width}/${height}` : undefined,
    };

    const imageStyle = {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
      width: '100%',
      height: '100%',
      objectFit,
      objectPosition,
    };

    return (
      <div className={`optimized-image-container ${className}`} style={containerStyle} {...props}>
        {/* Placeholder de chargement */}
        {!isLoaded && !hasError && (
          <div className='image-placeholder'>
            <div className='loading-spinner'></div>
          </div>
        )}

        {/* État d'erreur */}
        {hasError && (
          <div className='image-error'>
            <FaGlobe style={{ fontSize: '2rem', opacity: 0.5, color: 'var(--text-light)' }} />
          </div>
        )}

        {/* Image principale */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          data-src={src}
          style={imageStyle}
          sizes={sizes}
          decoding='async'
          {...(priority && { fetchpriority: 'high' })}
        />
      </div>
    );
  }
);

// Ajout du displayName pour le debugging
OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
