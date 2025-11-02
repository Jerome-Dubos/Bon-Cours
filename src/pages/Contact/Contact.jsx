import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactInfo } from '../../components/Contact';
import { ContactForm } from '../../components/UI/Forms';
import { contactService, initializeEmailJS } from '../../services';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();

  // Initialiser EmailJS au chargement du composant
  useEffect(() => {
    initializeEmailJS();
  }, []);

  const handleSubmit = async formData => {
    try {
      // Utiliser le service de contact avec EmailJS
      const response = await contactService.sendContactMessage(formData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSuccess = data => {
    // Message envoyé avec succès
  };

  const handleError = error => {
    // Erreur gérée par le formulaire
  };

  return (
    <div className='contact'>
      <div className='contact-form-section'>
        <h2 className='contact-form-title'>{t('contact.title')}</h2>
        <ContactForm onSubmit={handleSubmit} onSuccess={handleSuccess} onError={handleError} />
      </div>
      <ContactInfo />
    </div>
  );
};

export default Contact;
