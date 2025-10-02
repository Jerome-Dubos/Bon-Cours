import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Footer, Navbar, ScrollToTop } from './components';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Lazy loading des pages pour optimiser les performances
const Home = lazy(() => import('./pages/Home/Home'));
const Error = lazy(() => import('./pages/Error/Error'));
const Offers = lazy(() => import('./pages/Offers/Offers'));
const Method = lazy(() => import('./pages/Method/Method'));
const Registration = lazy(() => import('./pages/Registration/Registration'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// Composant de chargement optimisé
const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(234, 189, 131, 0.3)',
        borderTop: '4px solid var(--secondary-gold)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
    <p style={{ color: 'var(--text-light)', opacity: 0.8 }}>Chargement...</p>
  </div>
);

// Composant d'erreur pour les routes
const RouteErrorFallback = ({ error, resetErrorBoundary }) => (
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
    <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Erreur de chargement de la page</h1>
    <p style={{ marginBottom: '2rem', opacity: 0.9, maxWidth: '500px' }}>
      Impossible de charger cette page. Veuillez réessayer.
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
    >
      Réessayer
    </button>
  </div>
);

// Composant principal optimisé
const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <ErrorBoundary
          FallbackComponent={RouteErrorFallback}
          onError={(error, errorInfo) => {
            console.error('Erreur de route:', error, errorInfo);
          }}
          onReset={() => {
            // Optionnel: nettoyer l'état de l'application
            window.location.href = '/';
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/offres' element={<Offers />} />
              <Route path='/methode' element={<Method />} />
              <Route path='/inscription' element={<Registration />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
