import React from 'react';
import ContactInfo from '../../components/Contact/ContactInfo';
import { ContactForm } from '../../components/UI/Forms';
import './Contact.css';

const Contact = () => {
  return (
    <div className='contact'>
      <ContactInfo />
      <ContactForm />
    </div>
  );
};

export default Contact;
