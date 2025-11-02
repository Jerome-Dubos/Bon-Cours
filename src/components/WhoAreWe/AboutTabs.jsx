import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutTabs.css';
import HistoryMethodology from './HistoryMethodology';
import TeamSection from './TeamSection';

const AboutTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('history');

  // Fonction pour obtenir le paramètre tab de l'URL
  const getTabFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    return tab === 'team' ? 'team' : 'history';
  };

  // Initialiser l'onglet actif basé sur l'URL au chargement
  useEffect(() => {
    const tabFromURL = getTabFromURL();
    setActiveTab(tabFromURL);
  }, []);

  // Écouter les changements d'URL
  useEffect(() => {
    const handleURLChange = () => {
      const tabFromURL = getTabFromURL();
      setActiveTab(tabFromURL);
    };

    window.addEventListener('popstate', handleURLChange);
    return () => window.removeEventListener('popstate', handleURLChange);
  }, []);

  const tabs = [
    { id: 'history', label: t('qui_sommes_nous.history') },
    { id: 'team', label: t('qui_sommes_nous.team') },
  ];

  const handleTabClick = tabId => {
    setActiveTab(tabId);
    // Mettre à jour l'URL sans recharger la page
    const newURL = tabId === 'history' ? '/qui-sommes-nous' : `/qui-sommes-nous?tab=${tabId}`;
    window.history.pushState({}, '', newURL);
  };

  return (
    <div className='about-tabs'>
      <div className='about-tabs__header'>
        <div className='about-tabs__nav'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`about-tabs__nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              aria-selected={activeTab === tab.id}
              role='tab'
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className='about-tabs__content'>
        {activeTab === 'history' && <HistoryMethodology />}
        {activeTab === 'team' && <TeamSection />}
      </div>
    </div>
  );
};

export default AboutTabs;
