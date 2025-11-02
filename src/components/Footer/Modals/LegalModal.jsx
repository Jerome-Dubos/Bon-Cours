import { useTranslation } from 'react-i18next';
import { MediumModal } from '../../UI/Modales';

const LegalModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const currentDate = new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <MediumModal isOpen={isOpen} onClose={onClose} title={t('legal.title')}>
      <div>
        <h3>{t('legal.company.title')}</h3>
        <p>
          <strong>{i18n.language === 'fr' ? 'Dénomination sociale' : 'Company Name'} :</strong> {t('legal.company.name')}
          <br />
          <strong>{i18n.language === 'fr' ? 'Forme juridique' : 'Legal Form'} :</strong> {t('legal.company.legal_form')}
          <br />
          <strong>{i18n.language === 'fr' ? 'Siège social' : 'Registered Office'} :</strong> {t('legal.company.address')}
          <br />
          <strong>SIREN :</strong> {t('legal.company.siren')}
          <br />
          <strong>{i18n.language === 'fr' ? 'SIRET du siège social' : 'SIRET of registered office'} :</strong>{' '}
          {t('legal.company.siret')}
          <br />
          <strong>{i18n.language === 'fr' ? 'TVA intracommunautaire' : 'VAT'} :</strong> {t('legal.company.vat')}
          <br />
          <strong>{i18n.language === 'fr' ? 'Activité principale' : 'Main Activity'} :</strong> {t('legal.company.activity')}
          <br />
          <strong>{i18n.language === 'fr' ? 'Date de création' : 'Creation Date'} :</strong> {t('legal.company.creation_date')}
          <br />
          <strong>{i18n.language === 'fr' ? 'Capital social' : 'Share Capital'} :</strong> {t('legal.company.capital')}
          <br />
          <strong>{i18n.language === 'fr' ? 'Clôture de l\'exercice comptable' : 'Fiscal Year End'} :</strong>{' '}
          {t('legal.company.fiscal_year_end')}
          <br />
          <strong>{i18n.language === 'fr' ? 'Durée de la personne morale' : 'Legal Entity Duration'} :</strong>{' '}
          {t('legal.company.duration')}
          <br />
          <strong>{i18n.language === 'fr' ? 'Nature de l\'entreprise' : 'Nature of Business'} :</strong> {t('legal.company.nature')}
        </p>

        <hr className='modal-separator' />

        <h3>{t('legal.publisher.title')}</h3>
        <p>
          <strong>{i18n.language === 'fr' ? 'Email' : 'Email'} :</strong>{' '}
          <a href={`mailto:${t('legal.publisher.email')}`}>{t('legal.publisher.email')}</a>
        </p>

        <hr className='modal-separator' />

        <h3>{t('legal.hosting.title')}</h3>
        <p>
          {t('legal.hosting.description')}
          <br />
          <strong>{t('legal.hosting.company')}</strong>
          <br />
          {t('legal.hosting.address')}
          <br />
          {t('legal.hosting.city')}
          <br />
          {i18n.language === 'fr' ? 'Site web' : 'Website'} :{' '}
          <a href={`https://${t('legal.hosting.website')}`} target='_blank' rel='noopener noreferrer'>
            {t('legal.hosting.website')}
          </a>
        </p>

        <hr className='modal-separator' />

        <h3>{t('legal.intellectual_property.title')}</h3>
        <p>{t('legal.intellectual_property.description')}</p>

        <hr className='modal-separator' />

        <h3>{t('legal.liability.title')}</h3>
        <p>{t('legal.liability.description')}</p>

        <hr className='modal-separator' />

        <h3>{t('legal.personal_data.title')}</h3>
        <p>{t('legal.personal_data.description')}</p>

        <hr className='modal-separator' />

        <div className='modal-contact'>
          <h4>{t('legal.contact.title')}</h4>
          <p>
            <strong>{i18n.language === 'fr' ? 'Email' : 'Email'} :</strong>{' '}
            <a href={`mailto:${t('legal.contact.email')}`}>{t('legal.contact.email')}</a>
            <br />
            <strong>{i18n.language === 'fr' ? 'Téléphone' : 'Phone'} :</strong>{' '}
            <a href={`tel:+33${t('legal.contact.phone').replace(/\s/g, '').substring(1)}`}>{t('legal.contact.phone')}</a>
            <br />
            <strong>{i18n.language === 'fr' ? 'Adresse' : 'Address'} :</strong> {t('legal.contact.address')}
          </p>
        </div>

        <div className='modal-date'>
          <em>{t('legal.last_update', { date: currentDate })}</em>
        </div>
      </div>
    </MediumModal>
  );
};

export default LegalModal;
