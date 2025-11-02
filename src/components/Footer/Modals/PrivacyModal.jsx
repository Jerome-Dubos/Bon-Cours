import { useTranslation } from 'react-i18next';
import { MediumModal } from '../../UI/Modales';

const PrivacyModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const currentDate = new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <MediumModal isOpen={isOpen} onClose={onClose} title={t('privacy.title')}>
      <div>
        <h3>{t('privacy.introduction.title')}</h3>
        <p>{t('privacy.introduction.description')}</p>

        <hr className='modal-separator' />

        <h3>{t('privacy.controller.title')}</h3>
        <p>
          <strong>{t('privacy.controller.company')}</strong>
          <br />
          {t('privacy.controller.legal_form')}
          <br />
          {i18n.language === 'fr' ? 'SIREN' : 'SIREN'} : {t('privacy.controller.siren')}
          <br />
          {i18n.language === 'fr' ? 'SIRET du siège social' : 'SIRET of registered office'} : {t('privacy.controller.siret')}
          <br />
          {i18n.language === 'fr' ? 'Siège social' : 'Registered Office'} : {t('privacy.controller.address')}
          <br />
          {i18n.language === 'fr' ? 'Email' : 'Email'} : <a href={`mailto:${t('privacy.controller.email')}`}>{t('privacy.controller.email')}</a>
        </p>

        <h3>{t('privacy.data_collected.title')}</h3>
        <p>{t('privacy.data_collected.description')}</p>
        <h4>{t('privacy.data_collected.subtitle')}</h4>
        <ul>
          <li>{t('privacy.data_collected.list.name')}</li>
          <li>{t('privacy.data_collected.list.email')}</li>
          <li>{t('privacy.data_collected.list.phone')}</li>
          <li>{t('privacy.data_collected.list.message')}</li>
          <li>{t('privacy.data_collected.list.preference')}</li>
          <li>{t('privacy.data_collected.list.schedule')}</li>
        </ul>

        <hr className='modal-separator' />

        <h3>{t('privacy.purposes.title')}</h3>
        <p>{t('privacy.purposes.description')}</p>
        <ul>
          <li>
            <strong>{t('privacy.purposes.contact.title')} :</strong> {t('privacy.purposes.contact.description')}
          </li>
          <li>
            <strong>{t('privacy.purposes.communication.title')} :</strong> {t('privacy.purposes.communication.description')}
          </li>
        </ul>

        <h3>{t('privacy.legal_basis.title')}</h3>
        <p>{t('privacy.legal_basis.description')}</p>
        <ul>
          <li>
            <strong>{t('privacy.legal_basis.consent.title')} :</strong> {t('privacy.legal_basis.consent.description')}
          </li>
          <li>
            <strong>{t('privacy.legal_basis.legitimate_interest.title')} :</strong>{' '}
            {t('privacy.legal_basis.legitimate_interest.description')}
          </li>
        </ul>

        <hr className='modal-separator' />

        <h3>{t('privacy.retention.title')}</h3>
        <ul>
          <li>
            <strong>{t('privacy.retention.contact_data.title')} :</strong> {t('privacy.retention.contact_data.description')}
          </li>
          <li>
            <strong>{t('privacy.retention.cookies.title')} :</strong> {t('privacy.retention.cookies.description')}
          </li>
        </ul>

        <h3>{t('privacy.rights.title')}</h3>
        <p>{t('privacy.rights.description')}</p>
        <ul>
          <li>
            <strong>{t('privacy.rights.access.title')} :</strong> {t('privacy.rights.access.description')}
          </li>
          <li>
            <strong>{t('privacy.rights.rectification.title')} :</strong> {t('privacy.rights.rectification.description')}
          </li>
          <li>
            <strong>{t('privacy.rights.erasure.title')} :</strong> {t('privacy.rights.erasure.description')}
          </li>
          <li>
            <strong>{t('privacy.rights.limitation.title')} :</strong> {t('privacy.rights.limitation.description')}
          </li>
          <li>
            <strong>{t('privacy.rights.portability.title')} :</strong> {t('privacy.rights.portability.description')}
          </li>
          <li>
            <strong>{t('privacy.rights.opposition.title')} :</strong> {t('privacy.rights.opposition.description')}
          </li>
        </ul>

        <hr className='modal-separator' />

        <h3>{t('privacy.cookies.title')}</h3>
        <p>{t('privacy.cookies.description')}</p>

        <hr className='modal-separator' />

        <h3>{t('privacy.security.title')}</h3>
        <p>{t('privacy.security.description')}</p>

        <h3>{t('privacy.transfers.title')}</h3>
        <p>{t('privacy.transfers.description')}</p>

        <hr className='modal-separator' />

        <div className='modal-contact'>
          <h4>{t('privacy.contact.title')}</h4>
          <p>{t('privacy.contact.description')}</p>
          <p>
            <strong>{i18n.language === 'fr' ? 'Email' : 'Email'} :</strong>{' '}
            <a href={`mailto:${t('privacy.contact.email')}`}>{t('privacy.contact.email')}</a>
            <br />
            <strong>{i18n.language === 'fr' ? 'Courrier' : 'Mail'} :</strong> {t('privacy.contact.mail')}
            <br />
            <strong>{i18n.language === 'fr' ? 'Téléphone' : 'Phone'} :</strong>{' '}
            <a href={`tel:+33${t('privacy.contact.phone').replace(/\s/g, '').substring(1)}`}>{t('privacy.contact.phone')}</a>
          </p>
          <p>
            <em>
              {t('privacy.contact.cnil.text')}{' '}
              <a href={`https://${t('privacy.contact.cnil.website')}`} target='_blank' rel='noopener noreferrer'>
                {t('privacy.contact.cnil.website')}
              </a>
            </em>
          </p>
        </div>

        <div className='modal-date'>
          <em>{t('privacy.last_update', { date: currentDate })}</em>
        </div>
      </div>
    </MediumModal>
  );
};

export default PrivacyModal;
