/**
 * Exemple d'utilisation des composants Modal
 * Montre toutes les variantes, tailles et fonctionnalités disponibles
 */

import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfo } from 'react-icons/fa';
import { Button } from '../UI/Buttons';
import { Modal } from '../UI/Modales';

/**
 * Exemple complet d'utilisation des composants Modal
 */
const ModalUsageExample = () => {
  const [modals, setModals] = useState({
    basic: false,
    small: false,
    large: false,
    fullscreen: false,
    noClose: false,
    customFooter: false,
    confirmation: false,
    info: false,
    warning: false,
    success: false,
  });

  const openModal = modalName => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = modalName => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const handleConfirmation = () => {
    alert('Action confirmée !');
    closeModal('confirmation');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Exemples d'utilisation des composants Modal</h1>

      {/* Modales de base */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Modales de base</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant='primary' onClick={() => openModal('basic')}>
            Modal basique
          </Button>
          <Button variant='secondary' onClick={() => openModal('small')}>
            Modal petite
          </Button>
          <Button variant='outline' onClick={() => openModal('large')}>
            Modal grande
          </Button>
          <Button variant='text' onClick={() => openModal('fullscreen')}>
            Modal plein écran
          </Button>
        </div>
      </section>

      {/* Modales sans bouton de fermeture */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Modales sans bouton de fermeture</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant='primary' onClick={() => openModal('noClose')}>
            Sans bouton fermer
          </Button>
        </div>
      </section>

      {/* Modales avec footer personnalisé */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Modales avec footer</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant='primary' onClick={() => openModal('customFooter')}>
            Avec footer personnalisé
          </Button>
        </div>
      </section>

      {/* Modales de confirmation */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Modales de confirmation</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant='primary' onClick={() => openModal('confirmation')}>
            Confirmation
          </Button>
        </div>
      </section>

      {/* Modales d'alerte */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Modales d'alerte</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant='primary' onClick={() => openModal('info')}>
            Information
          </Button>
          <Button variant='warning' onClick={() => openModal('warning')}>
            Avertissement
          </Button>
          <Button variant='success' onClick={() => openModal('success')}>
            Succès
          </Button>
        </div>
      </section>

      {/* Modales */}

      {/* Modal basique */}
      <Modal isOpen={modals.basic} onClose={() => closeModal('basic')} title='Modal basique'>
        <p>Ceci est une modale basique avec un titre et du contenu.</p>
        <p>Vous pouvez cliquer sur l'overlay ou appuyer sur Échap pour la fermer.</p>
      </Modal>

      {/* Modal petite */}
      <Modal
        isOpen={modals.small}
        onClose={() => closeModal('small')}
        title='Modal petite'
        size='small'
      >
        <p>Cette modale a une taille petite, parfaite pour les confirmations rapides.</p>
      </Modal>

      {/* Modal grande */}
      <Modal
        isOpen={modals.large}
        onClose={() => closeModal('large')}
        title='Modal grande'
        size='large'
      >
        <p>Cette modale a une taille grande, idéale pour afficher beaucoup de contenu.</p>
        <div
          style={{ height: '400px', background: '#f0f0f0', padding: '1rem', borderRadius: '4px' }}
        >
          <p>Zone de contenu étendue...</p>
          <p>Vous pouvez faire défiler ce contenu si nécessaire.</p>
        </div>
      </Modal>

      {/* Modal plein écran */}
      <Modal
        isOpen={modals.fullscreen}
        onClose={() => closeModal('fullscreen')}
        title='Modal plein écran'
        size='fullscreen'
      >
        <p>Cette modale occupe tout l'écran.</p>
        <div
          style={{ height: '60vh', background: '#f0f0f0', padding: '1rem', borderRadius: '4px' }}
        >
          <h3>Contenu en plein écran</h3>
          <p>Parfait pour les formulaires complexes ou les présentations détaillées.</p>
        </div>
      </Modal>

      {/* Modal sans bouton de fermeture */}
      <Modal
        isOpen={modals.noClose}
        onClose={() => closeModal('noClose')}
        title='Modal sans bouton fermer'
        showCloseButton={false}
        closeOnOverlayClick={false}
        closeOnEscape={false}
      >
        <p>Cette modale ne peut être fermée que par programmation.</p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant='primary' onClick={() => closeModal('noClose')}>
            Fermer la modale
          </Button>
        </div>
      </Modal>

      {/* Modal avec footer personnalisé */}
      <Modal
        isOpen={modals.customFooter}
        onClose={() => closeModal('customFooter')}
        title='Modal avec footer'
        showFooter={true}
        footerContent={
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant='outline' onClick={() => closeModal('customFooter')}>
              Annuler
            </Button>
            <Button variant='primary' onClick={() => closeModal('customFooter')}>
              Confirmer
            </Button>
          </div>
        }
      >
        <p>Cette modale a un footer personnalisé avec des boutons d'action.</p>
        <p>Le footer est parfait pour les actions de confirmation ou d'annulation.</p>
      </Modal>

      {/* Modal de confirmation */}
      <Modal
        isOpen={modals.confirmation}
        onClose={() => closeModal('confirmation')}
        title="Confirmer l'action"
        size='small'
        showFooter={true}
        footerContent={
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant='outline' onClick={() => closeModal('confirmation')}>
              Annuler
            </Button>
            <Button variant='danger' onClick={handleConfirmation}>
              Confirmer
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaExclamationTriangle style={{ color: '#f59e0b', fontSize: '2rem' }} />
          <div>
            <p>
              <strong>Êtes-vous sûr de vouloir effectuer cette action ?</strong>
            </p>
            <p>Cette action ne peut pas être annulée.</p>
          </div>
        </div>
      </Modal>

      {/* Modal d'information */}
      <Modal
        isOpen={modals.info}
        onClose={() => closeModal('info')}
        title='Information'
        size='small'
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaInfo style={{ color: '#3b82f6', fontSize: '2rem' }} />
          <div>
            <p>
              <strong>Information importante</strong>
            </p>
            <p>Voici une information que vous devez connaître.</p>
          </div>
        </div>
      </Modal>

      {/* Modal d'avertissement */}
      <Modal
        isOpen={modals.warning}
        onClose={() => closeModal('warning')}
        title='Avertissement'
        size='small'
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaExclamationTriangle style={{ color: '#f59e0b', fontSize: '2rem' }} />
          <div>
            <p>
              <strong>Attention !</strong>
            </p>
            <p>Cette action peut avoir des conséquences importantes.</p>
          </div>
        </div>
      </Modal>

      {/* Modal de succès */}
      <Modal
        isOpen={modals.success}
        onClose={() => closeModal('success')}
        title='Succès'
        size='small'
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaCheckCircle style={{ color: '#10b981', fontSize: '2rem' }} />
          <div>
            <p>
              <strong>Action réussie !</strong>
            </p>
            <p>Votre demande a été traitée avec succès.</p>
          </div>
        </div>
      </Modal>

      {/* Code d'exemple */}
      <section>
        <h2>Code d'exemple</h2>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.9rem',
          }}
        >
          {`import { Modal } from '../UI/Modales';
import { Button } from '../UI/Buttons';

// Modal basique
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Mon titre"
>
  <p>Contenu de la modale</p>
</Modal>

// Modal avec footer personnalisé
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmation"
  showFooter={true}
  footerContent={
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Annuler
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirmer
      </Button>
    </div>
  }
>
  <p>Êtes-vous sûr ?</p>
</Modal>

// Modal sans bouton de fermeture
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal bloquante"
  showCloseButton={false}
  closeOnOverlayClick={false}
  closeOnEscape={false}
>
  <p>Cette modale ne peut être fermée que par programmation</p>
  <Button onClick={() => setIsOpen(false)}>Fermer</Button>
</Modal>`}
        </pre>
      </section>
    </div>
  );
};

export default ModalUsageExample;
