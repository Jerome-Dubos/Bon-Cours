import { MediumModal } from '../../UI/Modales';

const PrivacyModal = ({ isOpen, onClose }) => {
  return (
    <MediumModal isOpen={isOpen} onClose={onClose} title='Politique de confidentialité'>
      <div>
        <h3>Introduction</h3>
        <p>
          Bon Cours accorde une grande importance à la protection de vos données personnelles. Cette
          politique de confidentialité explique quelles informations nous collectons, pourquoi nous
          les collectons et comment nous les utilisons.
        </p>

        <hr className='modal-separator' />

        <h3>Responsable du traitement</h3>
        <p>
          <strong>Bon Cours SARL</strong>
          <br />
          123 Rue de l'Éducation, 75001 Paris
          <br />
          Email : <a href='mailto:dpo@boncours.fr'>dpo@boncours.fr</a>
        </p>

        <h3>Données collectées</h3>
        <h4>Données d'identification</h4>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone</li>
          <li>Date de naissance</li>
          <li>Niveau de langue actuel</li>
        </ul>

        <h4>Données de navigation</h4>
        <ul>
          <li>Adresse IP</li>
          <li>Type de navigateur</li>
          <li>Pages visitées</li>
          <li>Temps passé sur le site</li>
          <li>Cookies techniques</li>
        </ul>

        <hr className='modal-separator' />

        <h3>Finalités du traitement</h3>
        <p>Nous utilisons vos données personnelles pour :</p>
        <ul>
          <li>
            <strong>Gestion des inscriptions :</strong> Traitement de votre demande d'inscription
            aux cours
          </li>
          <li>
            <strong>Suivi pédagogique :</strong> Adaptation des cours à votre niveau et progrès
          </li>
          <li>
            <strong>Communication :</strong> Envoi d'informations relatives à vos cours et notre
            actualité
          </li>
          <li>
            <strong>Amélioration de nos services :</strong> Analyse statistique pour optimiser notre
            offre
          </li>
          <li>
            <strong>Obligations légales :</strong> Respect des obligations comptables et fiscales
          </li>
        </ul>

        <h3>Base légale</h3>
        <p>Le traitement de vos données repose sur :</p>
        <ul>
          <li>
            <strong>Exécution du contrat :</strong> Pour la fourniture de nos services
            d'enseignement
          </li>
          <li>
            <strong>Intérêt légitime :</strong> Pour l'amélioration de nos services et la
            communication
          </li>
          <li>
            <strong>Obligation légale :</strong> Pour le respect des obligations comptables
          </li>
          <li>
            <strong>Consentement :</strong> Pour l'envoi de newsletters (avec possibilité de
            retrait)
          </li>
        </ul>

        <hr className='modal-separator' />

        <h3>Durée de conservation</h3>
        <ul>
          <li>
            <strong>Données de contact :</strong> 3 ans après la fin de la relation commerciale
          </li>
          <li>
            <strong>Données pédagogiques :</strong> 5 ans pour le suivi des certifications
          </li>
          <li>
            <strong>Données comptables :</strong> 10 ans conformément aux obligations légales
          </li>
          <li>
            <strong>Cookies :</strong> 13 mois maximum
          </li>
        </ul>

        <h3>Vos droits</h3>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>
            <strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles
          </li>
          <li>
            <strong>Droit de rectification :</strong> Corriger des données inexactes
          </li>
          <li>
            <strong>Droit à l'effacement :</strong> Demander la suppression de vos données
          </li>
          <li>
            <strong>Droit à la limitation :</strong> Limiter le traitement dans certains cas
          </li>
          <li>
            <strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré
          </li>
          <li>
            <strong>Droit d'opposition :</strong> Vous opposer au traitement à des fins de marketing
            direct
          </li>
        </ul>

        <hr className='modal-separator' />

        <h3>Cookies</h3>
        <p>
          Notre site utilise des cookies techniques nécessaires au fonctionnement du site et des
          cookies analytiques pour améliorer votre expérience. Vous pouvez configurer votre
          navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités.
        </p>

        <hr className='modal-separator' />

        <h3>Sécurité</h3>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
          protéger vos données contre tout accès non autorisé, modification, divulgation ou
          destruction. Nos serveurs sont sécurisés et nous utilisons le chiffrement SSL pour les
          transmissions de données sensibles.
        </p>

        <h3>Transferts de données</h3>
        <p>
          Vos données sont hébergées en France et ne font l'objet d'aucun transfert vers des pays
          tiers, sauf pour l'utilisation d'outils pédagogiques certifiés conformes au RGPD.
        </p>

        <hr className='modal-separator' />

        <div className='modal-contact'>
          <h4>Exercer vos droits</h4>
          <p>
            Pour toute question concernant vos données personnelles ou pour exercer vos droits :
          </p>
          <p>
            <strong>Email :</strong> <a href='mailto:dpo@boncours.fr'>dpo@boncours.fr</a>
            <br />
            <strong>Courrier :</strong> Bon Cours - DPO, 123 Rue de l'Éducation, 75001 Paris
            <br />
            <strong>Délégué à la protection des données :</strong>{' '}
            <a href='mailto:dpo@boncours.fr'>dpo@boncours.fr</a>
          </p>
          <p>
            <em>
              En cas de désaccord, vous pouvez saisir la CNIL :{' '}
              <a href='https://www.cnil.fr' target='_blank' rel='noopener noreferrer'>
                www.cnil.fr
              </a>
            </em>
          </p>
        </div>

        <div className='modal-date'>
          <em>Dernière mise à jour : 15 janvier 2025</em>
        </div>
      </div>
    </MediumModal>
  );
};

export default PrivacyModal;
