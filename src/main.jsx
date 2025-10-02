import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.jsx';
import './i18n/hybrid-config';
import './index.css';

// Composant d'erreur pour ErrorBoundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #072e41 0%, #3f4d5f 50%, #4a5a6d 100%)',
        color: '#ffffff',
      }}
    >
      <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Oups ! Une erreur est survenue</h1>
      <p style={{ marginBottom: '2rem', opacity: 0.9, maxWidth: '500px' }}>
        Nous nous excusons pour ce désagrément. L'équipe technique a été notifiée.
      </p>
      <button
        onClick={resetErrorBoundary}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#eabd83',
          color: '#1a1a1a',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={e => (e.target.style.backgroundColor = '#f4d4a8')}
        onMouseOut={e => (e.target.style.backgroundColor = '#eabd83')}
      >
        Réessayer
      </button>
    </div>
  );
}

// Fonction de gestion des erreurs
function logErrorToService(error, errorInfo) {
  // Ici vous pouvez ajouter l'envoi des erreurs à un service comme Sentry
  console.error('Erreur capturée:', error, errorInfo);
}

// Initialisation de l'application avec gestion d'erreurs robuste
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Element #root non trouvé dans le DOM');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logErrorToService}
      onReset={() => {
        // Optionnel: nettoyer l'état de l'application si nécessaire
        window.location.reload();
      }}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
