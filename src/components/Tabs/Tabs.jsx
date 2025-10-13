/**
 * Composant d'onglets réutilisable avec animations fluides
 *
 * @param {Array} tabs - Liste des onglets
 * @param {string} activeTab - Onglet actif
 * @param {Function} onTabChange - Fonction appelée lors du changement d'onglet
 * @param {boolean} isTransitioning - État de transition
 * @param {Object} content - Contenu des onglets
 */

import { AnimatePresence, motion } from 'framer-motion';
import './Tabs.css';

const Tabs = ({ tabs, activeTab, onTabChange, content }) => {
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  // Variantes d'animation pour les onglets
  const tabVariants = {
    inactive: {
      scale: 1,
      opacity: 0.7,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
    active: {
      scale: 1.02,
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
    hover: {
      scale: 1.01,
      opacity: 0.9,
      transition: { duration: 0.15, ease: 'easeInOut' },
    },
  };

  // Variantes d'animation pour le contenu
  const contentVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div className='tabs-container'>
      {/* En-tête des onglets */}
      <div className='tabs-header'>
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            variants={tabVariants}
            initial='inactive'
            animate={activeTab === tab.id ? 'active' : 'inactive'}
            whileHover={activeTab !== tab.id ? 'hover' : 'active'}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <span className='tab-label'>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                className='tab-indicator'
                layoutId='tab-indicator'
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Contenu des onglets avec animation */}
      <div className='tabs-content'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='tab-panel'
          >
            {content && (
              <>
                <motion.h2
                  className='tab-title'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {activeTabData?.title}
                </motion.h2>

                <motion.div
                  className='tab-description'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeTabData?.content}
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;
