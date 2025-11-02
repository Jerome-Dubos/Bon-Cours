import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Footer, Loader, Navbar, ScrollToTop } from './components';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Lazy loading des pages pour optimiser les performances
const Home = lazy(() => import('./pages/Home/Home'));
const Error = lazy(() => import('./pages/Error/Error'));
const Offers = lazy(() => import('./pages/Offers/Offers'));
const Method = lazy(() => import('./pages/Method/Method'));
const QuiSommesNous = lazy(() => import('./pages/QuiSommesNous/QuiSommesNous'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// Pages Méthode
const ApprocheActionnelle = lazy(
  () => import('./pages/Method/ApprocheActionnelle/ApprocheActionnelle')
);
const NiveauxParcours = lazy(() => import('./pages/Method/NiveauxParcours/NiveauxParcours'));
const OutilsRessources = lazy(() => import('./pages/Method/OutilsRessources/OutilsRessources'));

// Pages Offres avec onglets
const Langues = lazy(() => import('./pages/Offers/Langues/Langues'));
const SoutienScolaire = lazy(() => import('./pages/Offers/SoutienScolaire/SoutienScolaire'));
const AteliersLinguistiques = lazy(
  () => import('./pages/Offers/AteliersLinguistiques/AteliersLinguistiques')
);
const Examens = lazy(() => import('./pages/Offers/Examens/Examens'));
const AccompagnementsComplementaires = lazy(
  () => import('./pages/Offers/AccompagnementsComplementaires/AccompagnementsComplementaires')
);

// Pages Offres simples
const Horaires = lazy(() => import('./pages/Offers/Horaires/Horaires'));
const Test = lazy(() => import('./pages/Offers/Test/Test'));

// Composant principal optimisé
const App = () => {
  const { t } = useTranslation();

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
        <Suspense
          fallback={
            <Loader
              size='default'
              variant='rotating-squares'
              color='default'
              message={t('common.loading')}
            />
          }
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/offres' element={<Offers />} />
            <Route path='/methode' element={<Method />} />
            <Route path='/qui-sommes-nous' element={<QuiSommesNous />} />
            <Route path='/contact' element={<Contact />} />
            {/* Routes Méthode */}
            <Route path='/methode/approche-actionnelle' element={<ApprocheActionnelle />} />
            <Route path='/methode/niveaux-parcours' element={<NiveauxParcours />} />
            <Route path='/methode/outils-ressources' element={<OutilsRessources />} />
            {/* Routes Offres avec onglets */}
            <Route path='/offres/langues' element={<Langues />} />
            <Route path='/offres/soutien-scolaire' element={<SoutienScolaire />} />
            <Route path='/offres/ateliers' element={<AteliersLinguistiques />} />
            <Route path='/offres/examens' element={<Examens />} />
            <Route path='/offres/accompagnements' element={<AccompagnementsComplementaires />} />
            {/* Routes Offres simples */}
            <Route path='/offres/horaires' element={<Horaires />} />
            <Route path='/offres/test' element={<Test />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Suspense>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
