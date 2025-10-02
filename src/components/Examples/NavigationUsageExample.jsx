/**
 * Exemple d'utilisation des composants de Navigation
 * Montre comment utiliser la Navbar et les différents éléments de navigation
 */

import React, { useState } from 'react';
import {
  FaBars,
  FaChevronDown,
  FaCog,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

/**
 * Composant de navigation simple pour l'exemple
 */
const SimpleNavbar = ({ user, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Accueil', icon: <FaHome /> },
    { path: '/about', label: 'À propos', icon: <FaUser /> },
    { path: '/services', label: 'Services', icon: <FaCog /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav
      style={{
        background: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        position: 'relative',
      }}
    >
      {/* Logo */}
      <Link
        to='/'
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#333',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}
      >
        <img
          src='/beige-paysage.svg'
          alt='Logo'
          style={{ height: '40px', marginRight: '0.5rem' }}
        />
        Mon Site
      </Link>

      {/* Navigation desktop */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Liens de navigation */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                textDecoration: 'none',
                color: location.pathname === link.path ? '#007bff' : '#333',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                borderBottom:
                  location.pathname === link.path ? '2px solid #007bff' : '2px solid transparent',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Menu utilisateur */}
        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={toggleDropdown}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                padding: '0.5rem',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <FaUser />
              {user.name}
              <FaChevronDown
                style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  minWidth: '200px',
                  zIndex: 1000,
                }}
              >
                <div style={{ padding: '1rem' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{user.name}</p>
                  <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
                    {user.email}
                  </p>
                  <button
                    onClick={onLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.5rem',
                      background: 'none',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <FaSignOutAlt />
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            <FaSignInAlt />
            Se connecter
          </button>
        )}

        {/* Bouton menu mobile */}
        <button
          onClick={toggleMenu}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className='mobile-menu-btn'
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            background: 'white',
            border: '1px solid #ddd',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                textDecoration: 'none',
                color: location.pathname === link.path ? '#007bff' : '#333',
                borderBottom: '1px solid #eee',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {!user && (
            <div style={{ paddingTop: '1rem', borderTop: '1px solid #eee', marginTop: '1rem' }}>
              <button
                onClick={() => {
                  onLogin();
                  setIsMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.75rem',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <FaSignInAlt />
                Se connecter
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

/**
 * Composants de pages pour l'exemple
 */
const HomePage = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Page d'accueil</h1>
    <p>Bienvenue sur notre site !</p>
  </div>
);

const AboutPage = () => (
  <div style={{ padding: '2rem' }}>
    <h1>À propos</h1>
    <p>Informations sur notre entreprise...</p>
  </div>
);

const ServicesPage = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Services</h1>
    <p>Nos services disponibles...</p>
  </div>
);

const LoginPage = ({ onLogin }) => (
  <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
    <h1>Connexion</h1>
    <form
      onSubmit={e => {
        e.preventDefault();
        onLogin({
          name: 'Utilisateur Test',
          email: 'test@example.com',
        });
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
        <input
          type='email'
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
          defaultValue='test@example.com'
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Mot de passe</label>
        <input
          type='password'
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
      </div>
      <button
        type='submit'
        style={{
          width: '100%',
          padding: '0.75rem',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Se connecter
      </button>
    </form>
  </div>
);

/**
 * Composant principal de l'exemple
 */
const NavigationExample = () => {
  const [user, setUser] = useState(null);

  const handleLogin = userData => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div>
        <SimpleNavbar user={user} onLogin={handleLogin} onLogout={handleLogout} />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/login' element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

/**
 * Exemple complet d'utilisation de la navigation
 */
const NavigationUsageExample = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Exemples d'utilisation de la Navigation</h1>

      {/* Exemple interactif */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Exemple interactif</h2>
        <p>Voici un exemple complet de navigation avec authentification :</p>

        <div
          style={{
            border: '2px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '2rem',
          }}
        >
          <NavigationExample />
        </div>
      </section>

      {/* Types de navigation */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Types de navigation</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Navigation horizontale */}
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Navigation horizontale</h3>
            <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <a
                href='#'
                style={{
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  color: '#007bff',
                  borderBottom: '2px solid #007bff',
                }}
              >
                Accueil
              </a>
              <a
                href='#'
                style={{
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  color: '#333',
                }}
              >
                Services
              </a>
              <a
                href='#'
                style={{
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  color: '#333',
                }}
              >
                Contact
              </a>
            </nav>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Parfait pour les sites avec peu de pages principales
            </p>
          </div>

          {/* Navigation avec dropdown */}
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Navigation avec dropdown</h3>
            <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <a
                href='#'
                style={{
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  color: '#333',
                  position: 'relative',
                }}
              >
                Produits ▼
              </a>
              <a
                href='#'
                style={{
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  color: '#333',
                }}
              >
                Support
              </a>
            </nav>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Idéal pour organiser de nombreux éléments
            </p>
          </div>

          {/* Navigation mobile */}
          <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Navigation mobile</h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Menu</span>
              <button style={{ background: 'none', border: 'none', fontSize: '1.2rem' }}>☰</button>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Optimisée pour les écrans tactiles</p>
          </div>
        </div>
      </section>

      {/* Bonnes pratiques */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Bonnes pratiques</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3>✅ À faire</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Utiliser des labels clairs et concis</li>
              <li>Maintenir la cohérence visuelle</li>
              <li>Optimiser pour mobile</li>
              <li>Indiquer la page active</li>
              <li>Utiliser des icônes appropriées</li>
              <li>Gérer l'accessibilité (ARIA)</li>
            </ul>
          </div>

          <div>
            <h3>❌ À éviter</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Trop de liens dans le menu principal</li>
              <li>Labels ambigus ou trop longs</li>
              <li>Ignorer la navigation mobile</li>
              <li>Oublier l'indicateur de page active</li>
              <li>Utiliser des couleurs peu contrastées</li>
              <li>Négliger l'accessibilité clavier</li>
            </ul>
          </div>
        </div>
      </section>

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
          {`import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ user, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/services', label: 'Services' },
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src="/logo.svg" alt="Logo" />
      </Link>

      {/* Navigation desktop */}
      <div className="nav-links">
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={\`nav-link \${location.pathname === link.path ? 'active' : ''}\`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Menu utilisateur */}
      {user ? (
        <div className="user-menu">
          <span>{user.name}</span>
          <button onClick={onLogout}>Déconnexion</button>
        </div>
      ) : (
        <button onClick={onLogin}>Connexion</button>
      )}

      {/* Menu mobile */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      
      {isMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};`}
        </pre>
      </section>
    </div>
  );
};

export default NavigationUsageExample;
