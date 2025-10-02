import React, { useState } from 'react';
import {
  ConfirmModal,
  CustomModal,
  DeleteModal,
  ErrorModal,
  FormModal,
  FullScreenModal,
  ImageModal,
  InfoModal,
  LargeModal,
  MediumModal,
  Modal,
  NotificationModal,
  SmallModal,
  SuccessModal,
  VideoModal,
  WarningModal,
} from '../src/index.js';
import './ModalsExample.css';

const ModalsExample = () => {
  // États pour contrôler l'ouverture des modales
  const [modals, setModals] = useState({
    basic: false,
    small: false,
    medium: false,
    large: false,
    fullscreen: false,
    confirm: false,
    delete: false,
    info: false,
    success: false,
    warning: false,
    error: false,
    form: false,
    image: false,
    video: false,
    custom: false,
    notification: false,
  });

  // Fonction pour ouvrir/fermer les modales
  const toggleModal = modalName => {
    setModals(prev => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  // Handlers pour les actions
  const handleConfirm = () => {
    console.log('Action confirmée !');
    toggleModal('confirm');
  };

  const handleDelete = () => {
    console.log('Élément supprimé !');
    toggleModal('delete');
  };

  const handleFormSubmit = () => {
    console.log('Formulaire soumis !');
    toggleModal('form');
  };

  return (
    <div className='modals-example'>
      <div className='example-header'>
        <h1>🎯 Bibliothèque de Modales React</h1>
        <p>Exemples d'utilisation des différents types de modales</p>
      </div>

      <div className='example-grid'>
        {/* Modales de base par taille */}
        <div className='example-section'>
          <h2>📏 Modales par Taille</h2>

          <div className='button-group'>
            <button className='btn btn-primary' onClick={() => toggleModal('basic')}>
              Modal de Base
            </button>

            <button className='btn btn-secondary' onClick={() => toggleModal('small')}>
              Petite Modal
            </button>

            <button className='btn btn-outline' onClick={() => toggleModal('medium')}>
              Modal Moyenne
            </button>

            <button className='btn btn-primary' onClick={() => toggleModal('large')}>
              Grande Modal
            </button>

            <button className='btn btn-secondary' onClick={() => toggleModal('fullscreen')}>
              Modal Plein Écran
            </button>
          </div>
        </div>

        {/* Modales spécialisées */}
        <div className='example-section'>
          <h2>🎨 Modales Spécialisées</h2>

          <div className='button-group'>
            <button className='btn btn-primary' onClick={() => toggleModal('confirm')}>
              Confirmation
            </button>

            <button className='btn btn-danger' onClick={() => toggleModal('delete')}>
              Suppression
            </button>

            <button className='btn btn-info' onClick={() => toggleModal('info')}>
              Information
            </button>

            <button className='btn btn-success' onClick={() => toggleModal('success')}>
              Succès
            </button>

            <button className='btn btn-warning' onClick={() => toggleModal('warning')}>
              Attention
            </button>

            <button className='btn btn-error' onClick={() => toggleModal('error')}>
              Erreur
            </button>

            <button className='btn btn-primary' onClick={() => toggleModal('notification')}>
              Avec Notifications
            </button>
          </div>
        </div>

        {/* Modales avec contenu */}
        <div className='example-section'>
          <h2>📝 Modales avec Contenu</h2>

          <div className='button-group'>
            <button className='btn btn-primary' onClick={() => toggleModal('form')}>
              Formulaire
            </button>

            <button className='btn btn-secondary' onClick={() => toggleModal('image')}>
              Image
            </button>

            <button className='btn btn-outline' onClick={() => toggleModal('video')}>
              Vidéo
            </button>

            <button className='btn btn-primary' onClick={() => toggleModal('custom')}>
              Personnalisée
            </button>
          </div>
        </div>
      </div>

      {/* ===== MODALES ===== */}

      {/* Modal de base */}
      <Modal
        isOpen={modals.basic}
        onClose={() => toggleModal('basic')}
        title='Modal de Base'
        size='medium'
      >
        <p>Ceci est une modal de base avec un contenu simple.</p>
        <p>Vous pouvez personnaliser le contenu selon vos besoins.</p>
      </Modal>

      {/* Petite modal */}
      <SmallModal isOpen={modals.small} onClose={() => toggleModal('small')} title='Petite Modal'>
        <p>Cette modal est parfaite pour les messages courts et les confirmations simples.</p>
      </SmallModal>

      {/* Modal moyenne */}
      <MediumModal
        isOpen={modals.medium}
        onClose={() => toggleModal('medium')}
        title='Modal Moyenne'
      >
        <p>Cette modal de taille moyenne est idéale pour la plupart des cas d'usage.</p>
        <p>Elle offre un bon équilibre entre espace et lisibilité.</p>
      </MediumModal>

      {/* Grande modal */}
      <LargeModal isOpen={modals.large} onClose={() => toggleModal('large')} title='Grande Modal'>
        <p>Cette grande modal est parfaite pour afficher beaucoup de contenu.</p>
        <p>Elle peut contenir des formulaires complexes, des tableaux ou des listes détaillées.</p>
        <div className='content-example'>
          <h3>Exemple de contenu</h3>
          <ul>
            <li>Liste d'éléments</li>
            <li>Informations détaillées</li>
            <li>Formulaires complexes</li>
            <li>Tableaux de données</li>
          </ul>
        </div>
      </LargeModal>

      {/* Modal plein écran */}
      <FullScreenModal
        isOpen={modals.fullscreen}
        onClose={() => toggleModal('fullscreen')}
        title='Modal Plein Écran'
      >
        <div className='fullscreen-content'>
          <h2>Contenu Plein Écran</h2>
          <p>Cette modal occupe presque tout l'écran, parfaite pour :</p>
          <ul>
            <li>Éditeurs de texte</li>
            <li>Visualiseurs d'images</li>
            <li>Présentations</li>
            <li>Applications complexes</li>
          </ul>
          <div className='demo-content'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
        </div>
      </FullScreenModal>

      {/* Modal de confirmation */}
      <ConfirmModal
        isOpen={modals.confirm}
        onClose={() => toggleModal('confirm')}
        onConfirm={handleConfirm}
        title="Confirmer l'action"
        message='Êtes-vous sûr de vouloir effectuer cette action ? Cette opération ne peut pas être annulée.'
        confirmText='Oui, continuer'
        cancelText='Annuler'
      />

      {/* Modal de suppression */}
      <DeleteModal
        isOpen={modals.delete}
        onClose={() => toggleModal('delete')}
        onDelete={handleDelete}
        title="Supprimer l'élément"
        message="Cette action supprimera définitivement l'élément sélectionné. Êtes-vous sûr de vouloir continuer ?"
        itemName='cet élément'
      />

      {/* Modal d'information */}
      <InfoModal
        isOpen={modals.info}
        onClose={() => toggleModal('info')}
        title='Information'
        message="Voici une information importante que vous devez connaître. Cette modal utilise une icône d'information pour attirer l'attention."
      />

      {/* Modal de succès */}
      <SuccessModal
        isOpen={modals.success}
        onClose={() => toggleModal('success')}
        title='Opération réussie'
        message='Votre action a été effectuée avec succès ! Vous pouvez maintenant continuer avec les étapes suivantes.'
      />

      {/* Modal d'avertissement */}
      <WarningModal
        isOpen={modals.warning}
        onClose={() => toggleModal('warning')}
        title='Attention'
        message='Cette action peut avoir des conséquences importantes. Veuillez vérifier vos informations avant de continuer.'
      />

      {/* Modal d'erreur */}
      <ErrorModal
        isOpen={modals.error}
        onClose={() => toggleModal('error')}
        title='Erreur'
        message="Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter le support."
      />

      {/* Modal de formulaire */}
      <FormModal
        isOpen={modals.form}
        onClose={() => toggleModal('form')}
        onSubmit={handleFormSubmit}
        title='Formulaire de Contact'
        submitText='Envoyer'
        cancelText='Annuler'
      >
        <form className='example-form'>
          <div className='form-group'>
            <label htmlFor='name'>Nom :</label>
            <input type='text' id='name' name='name' placeholder='Votre nom' />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email :</label>
            <input type='email' id='email' name='email' placeholder='votre@email.com' />
          </div>

          <div className='form-group'>
            <label htmlFor='message'>Message :</label>
            <textarea
              id='message'
              name='message'
              rows='4'
              placeholder='Votre message...'
            ></textarea>
          </div>
        </form>
      </FormModal>

      {/* Modal d'image */}
      <ImageModal
        isOpen={modals.image}
        onClose={() => toggleModal('image')}
        title='Image de Démonstration'
        src='https://picsum.photos/800/600'
        alt='Image de démonstration'
      />

      {/* Modal vidéo */}
      <VideoModal
        isOpen={modals.video}
        onClose={() => toggleModal('video')}
        title='Vidéo de Démonstration'
        src='https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
      />

      {/* Modal personnalisée */}
      <CustomModal
        isOpen={modals.custom}
        onClose={() => toggleModal('custom')}
        title='Modal Personnalisée'
        size='large'
        showFooter={true}
        footerContent={
          <div className='modal-actions'>
            <button className='btn btn-outline' onClick={() => toggleModal('custom')}>
              Fermer
            </button>
            <button className='btn btn-primary' onClick={() => console.log('Action personnalisée')}>
              Action Spéciale
            </button>
          </div>
        }
      >
        <div className='custom-content'>
          <h3>Contenu Personnalisé</h3>
          <p>Cette modal peut contenir n'importe quel type de contenu personnalisé.</p>
          <div className='custom-widget'>
            <h4>Widget Personnalisé</h4>
            <p>Vous pouvez ajouter des composants, des graphiques, des tableaux, etc.</p>
          </div>
        </div>
      </CustomModal>

      {/* Modal avec notifications */}
      <NotificationModal
        isOpen={modals.notification}
        onClose={() => toggleModal('notification')}
        title='Modal avec Notifications'
        size='medium'
        notifications={[
          {
            id: 1,
            message: "Ceci est une notification d'information",
            type: 'info',
          },
          {
            id: 2,
            message: 'Ceci est une notification de succès',
            type: 'success',
          },
          {
            id: 3,
            message: "Ceci est une notification d'avertissement",
            type: 'warning',
          },
        ]}
        onRemoveNotification={id => {
          console.log(`Notification ${id} supprimée`);
        }}
      >
        <div className='notification-content'>
          <h3>Exemple de Modal avec Notifications</h3>
          <p>
            Cette modal démontre l'intégration des notifications dans les modales. Les notifications
            peuvent être de différents types : info, success, warning, error.
          </p>
          <div className='notification-info'>
            <h4>Fonctionnalités :</h4>
            <ul>
              <li>✅ Notifications intégrées</li>
              <li>✅ Types multiples (info, success, warning, error)</li>
              <li>✅ Gestion automatique des états</li>
              <li>✅ Animations fluides</li>
            </ul>
          </div>
        </div>
      </NotificationModal>
    </div>
  );
};

export default ModalsExample;
