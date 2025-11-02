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
    console.log('Données du formulaire:', formData);

    try {
      // Utiliser le service de contact avec EmailJS
      const response = await contactService.sendContactMessage(formData);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      throw error;
    }
  };

  const handleSuccess = data => {
    console.log('Message envoyé avec succès!', data);
  };

  const handleError = error => {
    console.error("Erreur lors de l'envoi:", error);
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
