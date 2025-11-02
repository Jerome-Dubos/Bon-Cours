import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContactInfo } from '../../components/Contact';
import { ContactForm } from '../../components/UI/Forms';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const handleSubmit = async formData => {
    console.log('Données du formulaire:', formData);

    // TODO: Intégrer avec votre service de contact
    // const response = await contactService.sendMessage(formData);
    // return response;

    // Simulation pour le moment
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true };
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
