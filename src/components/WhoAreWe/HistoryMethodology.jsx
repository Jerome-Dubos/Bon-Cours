import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './HistoryMethodology.css';

const HistoryMethodology = () => {
  const { t } = useTranslation();
  return (
    <div className='history-methodology'>
      <div className='history-methodology__container'>
        <div className='history-methodology__content'>
          <div className='history-methodology__section active'>
            <div className='history-methodology__section-content'>
              <div className='history-methodology__section-text'>
                <h2 className='history-methodology__section-title'>{t('qui_sommes_nous.history_title')}</h2>
                <p className='history-methodology__section-subtitle'>{t('qui_sommes_nous.history_subtitle')}</p>
                <div className='history-methodology__section-body'>
                  <p>{t('qui_sommes_nous.history_text')}</p>
                </div>
              </div>

              <div className='history-methodology__section-image'>
                <video
                  src='/assets/videos/1793334-hd_1920_1080_30fps.mp4'
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={e => {
                    e.target.style.opacity = '1';
                  }}
                  onCanPlay={e => {
                    e.target.play().catch(() => {
                      // Ignore les erreurs d'autoplay si le navigateur les bloque
                    });
                  }}
                >
                  {t('qui_sommes_nous.video_not_supported')}
                </video>
              </div>
            </div>
          </div>
        </div>

        <div className='history-methodology__cta'>
          <div className='history-methodology__cta-content'>
            <h3 className='history-methodology__cta-title'>{t('qui_sommes_nous.cta_title')}</h3>
            <p className='history-methodology__cta-text'>{t('qui_sommes_nous.cta_text')}</p>
            <Link
              to='/contact'
              className='history-methodology__cta-button'
              aria-label="Contactez-nous pour plus d'informations"
            >
              {t('qui_sommes_nous.cta_button')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryMethodology;
