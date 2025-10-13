import React, { useState } from 'react';
import { ContactForm, LoginForm } from '../index';
import './FormsExamples.css';

/**
 * Exemples d'utilisation des formulaires ContactForm et LoginForm
 */
const FormsExamples = () => {
  const [activeTab, setActiveTab] = useState('contact');

  // Exemple de soumission du formulaire de contact
  const handleContactSubmit = async formData => {
    console.log('📧 Données du formulaire de contact:', formData);

    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // En production, vous feriez quelque chose comme :
    // const response = await contactService.sendMessage(formData);
    // return response;

    return { success: true };
  };

  // Exemple de soumission du formulaire de connexion
  const handleLoginSubmit = async ({ email, password, rememberMe }) => {
    console.log('🔐 Tentative de connexion:', { email, rememberMe });

    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simuler une vérification d'identifiants
    if (email === 'test@boncours.fr' && password === 'password123') {
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      return { success: true, user: { email, name: 'Utilisateur Test' } };
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
  };

  // Callback de succès pour le formulaire de contact
  const handleContactSuccess = data => {
    console.log('✅ Message envoyé avec succès!', data);
    // Vous pouvez rediriger l'utilisateur, afficher un message, etc.
  };

  // Callback d'erreur pour le formulaire de contact
  const handleContactError = error => {
    console.error("❌ Erreur lors de l'envoi du message:", error);
    // Gérer l'erreur (logging, analytics, etc.)
  };

  // Callback de succès pour le formulaire de connexion
  const handleLoginSuccess = data => {
    console.log('✅ Connexion réussie!', data);
    // Rediriger vers le dashboard, sauvegarder le token, etc.
    // navigate('/dashboard');
  };

  // Callback d'erreur pour le formulaire de connexion
  const handleLoginError = error => {
    console.error('❌ Erreur de connexion:', error);
  };

  // Callback pour mot de passe oublié
  const handleForgotPassword = () => {
    console.log('🔑 Redirection vers la récupération de mot de passe');
    // navigate('/forgot-password');
  };

  return (
    <div className='forms-examples'>
      <h1>Exemples de Formulaires</h1>

      <div className='tabs'>
        <button
          className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Formulaire de Contact
        </button>
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Formulaire de Connexion
        </button>
      </div>

      <div className='examples-content'>
        {activeTab === 'contact' && (
          <div className='example-section'>
            <h2>ContactForm - Exemple complet</h2>
            <p>
              Ce formulaire de contact inclut la validation en temps réel, la gestion des
              préférences de contact, et les notifications de succès/erreur.
            </p>

            <div className='example-demo'>
              <ContactForm
                onSubmit={handleContactSubmit}
                onSuccess={handleContactSuccess}
                onError={handleContactError}
                submitText='Envoyer ma demande'
                loadingText='Envoi en cours...'
                showJoursHoraires={true}
              />
            </div>

            <div className='example-code'>
              <h3>Code d'utilisation :</h3>
              <pre>{`
import { ContactForm } from '@/components/UI/Forms';

function ContactPage() {
  const handleSubmit = async (formData) => {
    const response = await contactService.send(formData);
    return response;
  };

  return (
    <ContactForm
      onSubmit={handleSubmit}
      onSuccess={(data) => console.log('Succès!', data)}
      onError={(error) => console.error('Erreur:', error)}
    />
  );
}
              `}</pre>
            </div>

            <div className='example-variants'>
              <h3>Variante Modal :</h3>
              <div className='modal-demo'>
                <ContactForm
                  variant='modal'
                  onSubmit={handleContactSubmit}
                  showJoursHoraires={false}
                  className='modal-form'
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'login' && (
          <div className='example-section'>
            <h2>LoginForm - Exemple complet</h2>
            <p>
              Ce formulaire de connexion sécurisé inclut la gestion du mot de passe
              (afficher/masquer), l'option "Se souvenir de moi", et la récupération de mot de passe.
            </p>

            <div className='example-demo login-demo'>
              <LoginForm
                onSubmit={handleLoginSubmit}
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                onForgotPassword={handleForgotPassword}
                showRememberMe={true}
                showForgotPassword={true}
              />
            </div>

            <div className='example-info'>
              <p>
                <strong>Pour tester :</strong>
              </p>
              <ul>
                <li>
                  Email : <code>test@boncours.fr</code>
                </li>
                <li>
                  Mot de passe : <code>password123</code>
                </li>
              </ul>
            </div>

            <div className='example-code'>
              <h3>Code d'utilisation :</h3>
              <pre>{`
import { LoginForm } from '@/components/UI/Forms';

function LoginPage() {
  const handleLogin = async ({ email, password, rememberMe }) => {
    const response = await authService.login(email, password);
    if (rememberMe) {
      localStorage.setItem('remember', 'true');
    }
    return response;
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onForgotPassword={() => navigate('/forgot-password')}
      onSuccess={() => navigate('/dashboard')}
    />
  );
}
              `}</pre>
            </div>
          </div>
        )}
      </div>

      <div className='features-section'>
        <h2>Fonctionnalités</h2>
        <div className='features-grid'>
          <div className='feature'>
            <h3>✅ Validation en temps réel</h3>
            <p>Validation des champs au blur avec messages d'erreur clairs</p>
          </div>
          <div className='feature'>
            <h3>🔔 Notifications</h3>
            <p>Notifications de succès et d'erreur automatiques</p>
          </div>
          <div className='feature'>
            <h3>🌍 Multilingue</h3>
            <p>Support complet de l'internationalisation avec i18n</p>
          </div>
          <div className='feature'>
            <h3>📱 Responsive</h3>
            <p>Design adaptatif pour tous les écrans</p>
          </div>
          <div className='feature'>
            <h3>♿ Accessible</h3>
            <p>Conforme aux standards d'accessibilité WCAG</p>
          </div>
          <div className='feature'>
            <h3>🎨 Personnalisable</h3>
            <p>Facile à personnaliser avec CSS variables</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormsExamples;
