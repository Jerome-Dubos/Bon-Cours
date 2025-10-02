import { MediumModal } from '../../UI/Modales';

const TermsModal = ({ isOpen, onClose }) => {
  return (
    <MediumModal isOpen={isOpen} onClose={onClose} title="Conditions générales d'utilisation">
      <div>
        <h3>Article 1 - Objet</h3>
        <p>
          Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation du site web
          de Bon Cours et l'accès aux services d'apprentissage des langues proposés. En accédant au
          site, l'utilisateur accepte sans réserve les présentes CGU.
        </p>

        <hr className='modal-separator' />

        <h3>Article 2 - Définitions</h3>
        <ul>
          <li>
            <strong>Site :</strong> Le site web accessible à l'adresse www.boncours.fr
          </li>
          <li>
            <strong>Services :</strong> L'ensemble des cours de langues, tests et outils
            pédagogiques proposés
          </li>
          <li>
            <strong>Utilisateur :</strong> Toute personne accédant au site
          </li>
          <li>
            <strong>Apprenant :</strong> Utilisateur inscrit aux cours
          </li>
        </ul>

        <h3>Article 3 - Accès au site</h3>
        <p>
          L'accès au site est libre et gratuit pour les fonctionnalités de base (information, test
          de niveau). L'accès aux cours nécessite une inscription préalable et le paiement des frais
          correspondants. Bon Cours se réserve le droit de refuser l'accès au site en cas de
          non-respect des présentes CGU.
        </p>

        <hr className='modal-separator' />

        <h3>Article 4 - Inscription et compte utilisateur</h3>
        <h4>Conditions d'inscription</h4>
        <ul>
          <li>Être âgé d'au moins 16 ans ou disposer de l'autorisation parentale</li>
          <li>Fournir des informations exactes et à jour</li>
          <li>Accepter les présentes CGU et la politique de confidentialité</li>
        </ul>

        <h4>Responsabilités de l'utilisateur</h4>
        <p>L'utilisateur s'engage à :</p>
        <ul>
          <li>Maintenir la confidentialité de ses identifiants de connexion</li>
          <li>Informer immédiatement Bon Cours de tout usage non autorisé de son compte</li>
          <li>Utiliser les services de manière conforme à leur destination</li>
        </ul>

        <hr className='modal-separator' />

        <h3>Article 5 - Services proposés</h3>
        <h4>Cours de langues</h4>
        <p>
          Bon Cours propose des cours d'anglais, d'espagnol, d'allemand et de français langue
          étrangère, dispensés par des professeurs qualifiés. Les cours peuvent être individuels ou
          collectifs, en présentiel ou à distance.
        </p>

        <h4>Tests et certifications</h4>
        <p>
          Des tests de niveau sont proposés gratuitement. Les certifications officielles peuvent
          être organisées moyennant des frais supplémentaires.
        </p>

        <hr className='modal-separator' />

        <h3>Article 6 - Tarifs et paiement</h3>
        <p>
          Les tarifs sont indiqués en euros TTC et peuvent être modifiés à tout moment. Le paiement
          s'effectue en ligne par carte bancaire ou virement. En cas de cours collectifs, le
          paiement est exigible avant le début des cours.
        </p>

        <h3>Article 7 - Droit de rétractation</h3>
        <p>
          Conformément au Code de la consommation, l'apprenant dispose d'un délai de 14 jours pour
          exercer son droit de rétractation, sauf si les cours ont déjà commencé avec son accord
          exprès.
        </p>

        <hr className='modal-separator' />

        <h3>Article 8 - Annulation et remboursement</h3>
        <h4>Annulation par l'apprenant</h4>
        <ul>
          <li>
            <strong>Plus de 48h avant :</strong> Remboursement intégral ou report
          </li>
          <li>
            <strong>Moins de 48h avant :</strong> 50% du tarif reste dû
          </li>
          <li>
            <strong>Absence sans prévenir :</strong> Cours dû intégralement
          </li>
        </ul>

        <h4>Annulation par Bon Cours</h4>
        <p>
          En cas d'annulation par Bon Cours (maladie du professeur, nombre insuffisant d'inscrits),
          l'apprenant sera remboursé intégralement ou un cours de remplacement sera proposé.
        </p>

        <hr className='modal-separator' />

        <h3>Article 9 - Propriété intellectuelle</h3>
        <p>
          Tous les contenus du site (textes, images, vidéos, supports pédagogiques) sont protégés
          par le droit d'auteur. Toute reproduction ou diffusion non autorisée est interdite. Les
          supports de cours fournis aux apprenants sont destinés à un usage personnel uniquement.
        </p>

        <h3>Article 10 - Utilisation du site</h3>
        <p>Il est strictement interdit de :</p>
        <ul>
          <li>Utiliser le site à des fins illégales ou non autorisées</li>
          <li>Transmettre des virus ou codes malveillants</li>
          <li>Violer les droits de propriété intellectuelle</li>
          <li>Usurper l'identité d'une autre personne</li>
          <li>Diffuser du contenu offensant ou discriminatoire</li>
        </ul>

        <hr className='modal-separator' />

        <h3>Article 11 - Responsabilité</h3>
        <p>
          Bon Cours s'engage à fournir des services de qualité mais ne peut garantir l'atteinte
          d'objectifs spécifiques d'apprentissage, ceux-ci dépendant largement de l'investissement
          personnel de l'apprenant. Notre responsabilité est limitée au montant des sommes versées.
        </p>

        <hr className='modal-separator' />

        <h3>Article 12 - Protection des données</h3>
        <p>
          Le traitement des données personnelles est régi par notre politique de confidentialité,
          conforme au RGPD. Les données sont collectées pour la gestion des inscriptions et le suivi
          pédagogique.
        </p>

        <h3>Article 13 - Modification des CGU</h3>
        <p>
          Bon Cours se réserve le droit de modifier les présentes CGU à tout moment. Les
          modifications prennent effet dès leur publication sur le site. Il est conseillé de
          consulter régulièrement cette page.
        </p>

        <hr className='modal-separator' />

        <h3>Article 14 - Résiliation</h3>
        <p>
          Bon Cours peut résilier l'accès d'un utilisateur en cas de manquement aux présentes CGU,
          après mise en demeure restée sans effet pendant 8 jours.
        </p>

        <h3>Article 15 - Droit applicable et juridiction</h3>
        <p>
          Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux de
          Paris seront seuls compétents, après tentative de résolution amiable.
        </p>

        <hr className='modal-separator' />

        <div className='modal-contact'>
          <h4>Contact et réclamations</h4>
          <p>Pour toute question concernant ces conditions d'utilisation :</p>
          <p>
            <strong>Email :</strong> <a href='mailto:contact@boncours.fr'>contact@boncours.fr</a>
            <br />
            <strong>Téléphone :</strong> <a href='tel:+33123456789'>+33 1 23 45 67 89</a>
            <br />
            <strong>Courrier :</strong> Bon Cours, 123 Rue de l'Éducation, 75001 Paris
          </p>
          <p>
            <em>
              En cas de litige non résolu, vous pouvez faire appel à un médiateur de la
              consommation.
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

export default TermsModal;
