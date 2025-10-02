import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IoArrowBackOutline,
  IoHomeOutline,
  IoRefreshOutline,
  IoWarningOutline,
} from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import './Error.css';

const Error = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée avec délai
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Gestion des actions
  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Animations optimisées
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div className='error-page'>
      <motion.div
        className='error-container'
        variants={containerVariants}
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {/* Contenu principal */}
        <motion.div className='error-content' variants={itemVariants}>
          {/* Icône d'erreur */}
          <motion.div
            className='error-icon'
            variants={itemVariants}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <IoWarningOutline />
          </motion.div>

          {/* Code d'erreur */}
          <motion.h1 className='error-code' variants={itemVariants}>
            404
          </motion.h1>

          {/* Titre */}
          <motion.h2 className='error-title' variants={itemVariants}>
            {t('error.title', 'Page non trouvée')}
          </motion.h2>

          {/* Description */}
          <motion.p className='error-description' variants={itemVariants}>
            {t('error.description', "La page que vous recherchez n'existe pas ou a été déplacée.")}
          </motion.p>

          {/* Actions */}
          <motion.div className='error-actions' variants={itemVariants}>
            <motion.button
              className='error-button error-button-primary'
              onClick={handleGoHome}
              variants={buttonVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <IoHomeOutline />
              {t('error.backToHome', "Retour à l'accueil")}
            </motion.button>

            <motion.button
              className='error-button error-button-secondary'
              onClick={handleGoBack}
              variants={buttonVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <IoArrowBackOutline />
              {t('error.goBack', 'Retour')}
            </motion.button>

            <motion.button
              className='error-button error-button-tertiary'
              onClick={handleRefresh}
              variants={buttonVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <IoRefreshOutline />
              {t('error.refresh', 'Actualiser')}
            </motion.button>
          </motion.div>

          {/* Lien vers l'accueil */}
          <motion.div className='error-link' variants={itemVariants}>
            <Link to='/' className='home-link'>
              {t('error.orGoHome', "Ou retournez à l'accueil")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Éléments décoratifs */}
        <div className='error-decorations'>
          <div className='decoration decoration-1'></div>
          <div className='decoration decoration-2'></div>
          <div className='decoration decoration-3'></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;
