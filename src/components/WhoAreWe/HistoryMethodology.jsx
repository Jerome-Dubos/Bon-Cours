import React from 'react';
import { Link } from 'react-router-dom';
import './HistoryMethodology.css';

const HistoryMethodology = () => {
  return (
    <div className='history-methodology'>
      <div className='history-methodology__container'>
        <div className='history-methodology__content'>
          <div className='history-methodology__section active'>
            <div className='history-methodology__section-content'>
              <div className='history-methodology__section-text'>
                <h2 className='history-methodology__section-title'>Notre histoire</h2>
                <p className='history-methodology__section-subtitle'>Expérience et expertise</p>
                <div className='history-methodology__section-body'>
                  <p>
                    Notre expérience en tant qu'apprenant(e)s et nos parcours académiques ont révélé
                    un manque crucial de pragmatisme dans les formations. C'est pourquoi nous avons
                    fait le choix de combler ce manque en proposant des formations fondées sur « la
                    réalité du terrain ». Cette méthode prône un partage des savoirs inspiré de la
                    vie des locuteurs locaux et favorise le progrès en mettant l'apprenant au cœur
                    de son apprentissage.
                  </p>
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
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            </div>
          </div>
        </div>

        <div className='history-methodology__cta'>
          <div className='history-methodology__cta-content'>
            <h3 className='history-methodology__cta-title'>Prêt à nous rejoindre ?</h3>
            <p className='history-methodology__cta-text'>
              Contactez-nous pour découvrir comment nous pouvons vous aider à atteindre vos
              objectifs.
            </p>
            <Link
              to='/contact'
              className='history-methodology__cta-button'
              aria-label="Contactez-nous pour plus d'informations"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryMethodology;
