import { MediumModal } from '../../UI/Modales';

const LegalModal = ({ isOpen, onClose }) => {
  return (
    <MediumModal isOpen={isOpen} onClose={onClose} title='Mentions légales'>
      <div>
        <h3>Identification de l'entreprise</h3>
        <p>
          <strong>Dénomination sociale :</strong> Bon Cours SARL
          <br />
          <strong>Siège social :</strong> 123 Rue de l'Éducation, 75001 Paris, France
          <br />
          <strong>RCS :</strong> Paris B 123 456 789
          <br />
          <strong>SIRET :</strong> 123 456 789 00012
          <br />
          <strong>Capital social :</strong> 50 000 €<br />
          <strong>TVA intracommunautaire :</strong> FR12345678901
        </p>

        <hr className='modal-separator' />

        <h3>Directeur de la publication</h3>
        <p>
          <strong>Nom :</strong> Marie DUBOIS
          <br />
          <strong>Qualité :</strong> Directrice générale
          <br />
          <strong>Email :</strong> <a href='mailto:direction@boncours.fr'>direction@boncours.fr </a>
        </p>

        <hr className='modal-separator' />

        <h3>Hébergement du site</h3>
        <p>
          Ce site est hébergé par :<br />
          <strong>OVH SAS</strong>
          <br />
          2 rue Kellermann
          <br />
          59100 Roubaix, France
          <br />
          Téléphone : 1007
          <br />
          Site web :{' '}
          <a href='https://www.ovh.com' target='_blank' rel='noopener noreferrer'>
            www.ovh.com
          </a>
        </p>

        <hr className='modal-separator' />

        <h3>Propriété intellectuelle</h3>
        <p>
          L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) est
          protégé par le droit d'auteur et appartient à Bon Cours ou à ses partenaires. Toute
          reproduction, même partielle, est strictement interdite sans autorisation préalable
          écrite.
        </p>

        <hr className='modal-separator' />

        <h3>Responsabilité</h3>
        <p>
          Bon Cours s'efforce de fournir des informations exactes et à jour sur ce site. Cependant,
          nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité des informations
          mises à disposition. En conséquence, nous déclinons toute responsabilité pour toute
          imprécision, inexactitude ou omission portant sur des informations disponibles sur ce
          site.
        </p>

        <hr className='modal-separator' />

        <h3>Données personnelles</h3>
        <p>
          Les informations personnelles collectées sur ce site font l'objet d'un traitement
          informatique destiné à la gestion des inscriptions et de la relation client. Conformément
          au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de
          portabilité des données vous concernant.
        </p>

        <hr className='modal-separator' />

        <div className='modal-contact'>
          <h4>Contact pour questions juridiques</h4>
          <p>
            <strong>Email :</strong> <a href='mailto:legal@boncours.fr'>legal@boncours.fr</a>
            <br />
            <strong>Téléphone :</strong> <a href='tel:+33123456789'>+33 1 23 45 67 89</a>
            <br />
            <strong>Adresse :</strong> 123 Rue de l'Éducation, 75001 Paris
          </p>
        </div>

        <div className='modal-date'>
          <em>Dernière mise à jour : 15 janvier 2025</em>
        </div>
      </div>
    </MediumModal>
  );
};

export default LegalModal;
