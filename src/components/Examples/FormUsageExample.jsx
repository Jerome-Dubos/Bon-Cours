/**
 * Exemple d'utilisation des composants Form
 * Montre les différents types de formulaires et leurs fonctionnalités
 */

import React, { useState } from 'react';
import { FaComments, FaEnvelope, FaPaperPlane, FaPhone, FaUser } from 'react-icons/fa';
import { Button } from '../UI/Buttons';
import ContactForm from '../UI/Forms/src/components/ContactForm/ContactForm.simple';
import { Modal } from '../UI/Modales';

/**
 * Exemple complet d'utilisation des composants Form
 */
const FormUsageExample = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
    newsletter: false,
    langue: 'français',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simuler une soumission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Données soumises:', formData);
      setShowModal(true);
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        message: '',
        newsletter: false,
        langue: 'français',
      });
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactFormSubmit = async data => {
    console.log('Données du formulaire de contact:', data);
    setShowModal(true);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Exemples d'utilisation des composants Form</h1>

      {/* Formulaire simple */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Formulaire simple avec validation</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#f9f9f9',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <FaUser style={{ color: '#666' }} />
                Nom *
              </label>
              <input
                type='text'
                value={formData.nom}
                onChange={e => handleInputChange('nom', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${errors.nom ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '4px',
                  fontSize: '1rem',
                }}
                placeholder='Votre nom'
              />
              {errors.nom && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.nom}
                </p>
              )}
            </div>

            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <FaUser style={{ color: '#666' }} />
                Prénom *
              </label>
              <input
                type='text'
                value={formData.prenom}
                onChange={e => handleInputChange('prenom', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${errors.prenom ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '4px',
                  fontSize: '1rem',
                }}
                placeholder='Votre prénom'
              />
              {errors.prenom && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.prenom}
                </p>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <FaEnvelope style={{ color: '#666' }} />
              Email *
            </label>
            <input
              type='email'
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '4px',
                fontSize: '1rem',
              }}
              placeholder='votre@email.com'
            />
            {errors.email && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <FaPhone style={{ color: '#666' }} />
              Téléphone
            </label>
            <input
              type='tel'
              value={formData.telephone}
              onChange={e => handleInputChange('telephone', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
              placeholder='06 12 34 56 78'
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <FaComments style={{ color: '#666' }} />
              Message *
            </label>
            <textarea
              value={formData.message}
              onChange={e => handleInputChange('message', e.target.value)}
              rows='4'
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${errors.message ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                resize: 'vertical',
              }}
              placeholder='Votre message...'
            />
            {errors.message && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {errors.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              Langue préférée
            </label>
            <select
              value={formData.langue}
              onChange={e => handleInputChange('langue', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            >
              <option value='français'>Français</option>
              <option value='anglais'>Anglais</option>
              <option value='espagnol'>Espagnol</option>
              <option value='allemand'>Allemand</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type='checkbox'
                checked={formData.newsletter}
                onChange={e => handleInputChange('newsletter', e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Je souhaite recevoir la newsletter
            </label>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                setFormData({
                  nom: '',
                  prenom: '',
                  email: '',
                  telephone: '',
                  message: '',
                  newsletter: false,
                  langue: 'français',
                });
                setErrors({});
              }}
            >
              Réinitialiser
            </Button>
            <Button
              type='submit'
              variant='primary'
              loading={isSubmitting}
              loadingText='Envoi en cours...'
              icon={FaPaperPlane}
              iconPosition='left'
            >
              {isSubmitting ? 'Envoi...' : 'Envoyer'}
            </Button>
          </div>
        </form>
      </section>

      {/* Composant ContactForm */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Composant ContactForm</h2>
        <div
          style={{
            background: '#f9f9f9',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
        >
          <ContactForm
            onSubmit={handleContactFormSubmit}
            variant='full'
            submitText='Envoyer le message'
            loadingText='Envoi en cours...'
          />
        </div>
      </section>

      {/* Formulaire en modal */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Formulaire dans une modal</h2>
        <Button variant='primary' onClick={() => setShowModal(true)}>
          Ouvrir formulaire en modal
        </Button>
      </section>

      {/* Modal de confirmation */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title='Formulaire soumis avec succès'
        size='small'
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaPaperPlane style={{ color: '#10b981', fontSize: '2rem' }} />
          <div>
            <p>
              <strong>Merci pour votre message !</strong>
            </p>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <Button variant='primary' onClick={() => setShowModal(false)}>
            Fermer
          </Button>
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
          {`import ContactForm from '../UI/Forms/src/components/ContactForm/ContactForm.simple';
import { Button } from '../UI/Buttons';

// Formulaire simple avec validation
const [formData, setFormData] = useState({
  nom: '',
  email: '',
  message: ''
});

const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  if (!formData.nom.trim()) {
    newErrors.nom = 'Le nom est requis';
  }
  if (!formData.email.trim()) {
    newErrors.email = 'L\\'email est requis';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  
  setIsSubmitting(true);
  try {
    await submitForm(formData);
    // Succès
  } catch (error) {
    // Erreur
  } finally {
    setIsSubmitting(false);
  }
};

// Utilisation du composant ContactForm
<ContactForm
  onSubmit={handleContactFormSubmit}
  variant="full"
  submitText="Envoyer"
  loadingText="Envoi..."
/>

// Formulaire avec bouton de soumission
<Button 
  type="submit" 
  variant="primary"
  loading={isSubmitting}
  loadingText="Envoi en cours..."
>
  Envoyer
</Button>`}
        </pre>
      </section>
    </div>
  );
};

export default FormUsageExample;
