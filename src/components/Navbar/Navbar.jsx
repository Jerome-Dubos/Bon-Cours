/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IoChevronDownOutline,
  IoCloseOutline,
  IoFlaskOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoMailOutline,
  IoMenuOutline,
  IoSchoolOutline,
} from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { config, isNavLinkHidden } from '../../config/environmentConfig';
import { useAuth } from '../../context/AuthContext';
import useScrollThreshold from '../../hooks/useScrollThreshold';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isScrolled = useScrollThreshold(10);
  const isScrolledHomePage = useScrollThreshold(20);
  const isHomePage = location.pathname === '/';

  // Sur la page d'accueil, on veut que la navbar soit transparente plus longtemps
  const shouldShowBackground = isHomePage ? isScrolledHomePage : isScrolled;

  // États optimisés - regroupés par fonctionnalité
  const [mobileState, setMobileState] = useState({
    isOpen: false,
    isClosing: false,
  });

  const [dropdownState, setDropdownState] = useState({
    isOpen: false,
    isClosing: false,
    isChevronRotated: false,
  });

  const [navigationState, setNavigationState] = useState({
    activeLinkIndex: -1,
    underlineStyle: {},
  });

  const [expandedSections, setExpandedSections] = useState({
    navigation: false,
    administration: false,
    account: false,
  });

  // État pour les sous-menus de navigation
  const [navDropdowns, setNavDropdowns] = useState({
    offres: false,
    methode: false,
  });

  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef(null);
  const navLinksRef = useRef(null);
  const linkRefs = useRef([]);

  // Structure des sous-menus pour Offres et Méthode
  // Organisation en colonnes pour le mega menu
  const offresSubmenu = useMemo(
    () => ({
      // Colonne gauche
      leftColumn: [
        { label: 'Horaires (planning)', path: '/offres/horaires' },
        { label: 'Passez votre test', path: '/offres/test' },
        {
          label: 'Langues',
          submenu: [
            { label: 'Enfants & ados', path: '/offres/langues/enfants-ados' },
            { label: 'Adultes et professionnels', path: '/offres/langues/adultes' },
            { label: 'Entreprises', path: '/offres/langues/entreprises' },
          ],
        },
        {
          label: 'Soutien scolaire',
          submenu: [
            { label: 'Primaire', path: '/offres/soutien-scolaire/primaire' },
            { label: 'Collège', path: '/offres/soutien-scolaire/college' },
            { label: 'Lycée', path: '/offres/soutien-scolaire/lycee' },
          ],
        },
      ],
      // Colonne droite
      rightColumn: [
        {
          label: 'Ateliers linguistiques',
          submenu: [
            { label: 'Langue orale', path: '/offres/ateliers/langue-orale' },
            { label: 'Langue écrite', path: '/offres/ateliers/langue-ecrite' },
            { label: 'Cuisine', path: '/offres/ateliers/cuisine' },
            { label: 'Sport', path: '/offres/ateliers/sport' },
            { label: 'Jeux', path: '/offres/ateliers/jeux' },
            { label: 'Cinéma', path: '/offres/ateliers/cinema' },
          ],
        },
        {
          label: 'Examens',
          submenu: [
            { label: 'Certifications', path: '/offres/examens/certifications' },
            { label: 'Naturalisation', path: '/offres/examens/naturalisation' },
          ],
        },
        {
          label: 'Accompagnements complémentaires',
          submenu: [
            { label: 'Administratif', path: '/offres/accompagnements/administratif' },
            { label: 'Scolarité', path: '/offres/accompagnements/scolarite' },
            { label: 'Traduction', path: '/offres/accompagnements/traduction' },
          ],
        },
      ],
    }),
    []
  );

  const methodeSubmenu = useMemo(
    () => [
      { label: 'Approche actionnelle', path: '/methode/approche' },
      { label: 'Niveaux & parcours', path: '/methode/niveaux' },
      { label: 'Outils & ressources', path: '/methode/outils' },
      { label: 'Tests de niveau', path: '/methode/tests' },
    ],
    []
  );

  // Liens de navigation publique - mémorisés (définis en premier)
  const navLinks = useMemo(
    () =>
      [
        { path: '/', label: t('nav.home'), icon: <IoHomeOutline size={18} /> },
        {
          path: '/offres',
          label: t('nav.offers', 'Offres'),
          icon: <IoSchoolOutline size={18} />,
          hasSubmenu: true,
          submenuKey: 'offres',
        },
        {
          path: '/methode',
          label: t('nav.method', 'Méthode'),
          icon: <IoFlaskOutline size={18} />,
          hasSubmenu: true,
          submenuKey: 'methode',
        },
        {
          path: '/inscription',
          label: t('nav.registration', 'Inscription'),
          icon: <IoInformationCircleOutline size={18} />,
        },
        {
          path: '/contact',
          label: t('nav.contact'),
          icon: <IoMailOutline size={18} />,
        },
      ].filter(link => !isNavLinkHidden(link.path)),
    [t]
  ); // Filtrer les liens masqués en production

  // Fermer tous les sous-menus de navigation - DOIT être défini tôt car utilisé dans useEffect
  const closeAllNavDropdowns = useCallback(() => {
    setNavDropdowns({
      offres: false,
      methode: false,
    });
  }, []);

  // Fonction utilitaire pour calculer le style optimisé de la barre - mémorisée
  const calculateOptimizedUnderlineStyle = useCallback((container, activeLink) => {
    if (!container || !activeLink) return { opacity: 0 };

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    const left = linkRect.left - containerRect.left;
    const width = linkRect.width;

    // Calculer une largeur optimisée (80% de la largeur du lien)
    const optimizedWidth = width * 0.8;
    const centerOffset = (width - optimizedWidth) / 2;

    return {
      transform: `translateX(${left + centerOffset}px)`,
      width: `${optimizedWidth}px`,
      opacity: 1,
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileState(prev => ({ ...prev, isClosing: true }));
    // Attendre la fin de l'animation avant de masquer le menu
    setTimeout(() => {
      setMobileState({ isOpen: false, isClosing: false });
      setDropdownState(prev => ({ ...prev, isOpen: false }));
    }, 400); // Durée de l'animation
  }, []);

  const handleNavLinkClick = useCallback(
    path => {
      if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Trouver l'index du lien cliqué
      const index = navLinks.findIndex(link => link.path === path);

      // Calculer la position immédiatement
      if (linkRefs.current[index]) {
        const activeLink = linkRefs.current[index];
        const container = navLinksRef.current;

        if (container && activeLink) {
          const optimizedStyle = calculateOptimizedUnderlineStyle(container, activeLink);
          setNavigationState(prev => ({ ...prev, underlineStyle: optimizedStyle }));
        }
      }

      setNavigationState(prev => ({ ...prev, activeLinkIndex: index }));

      // Fermer le menu mobile seulement si il est ouvert
      if (mobileState.isOpen) {
        closeMobileMenu();
      }
    },
    [location.pathname, mobileState.isOpen, closeMobileMenu, calculateOptimizedUnderlineStyle]
  );

  const toggleDashboardDropdown = useCallback(() => {
    if (dropdownState.isOpen) {
      setDropdownState(prev => ({
        ...prev,
        isChevronRotated: false,
        isClosing: true,
      }));
      setTimeout(() => {
        setDropdownState(prev => ({
          ...prev,
          isOpen: false,
          isClosing: false,
        }));
      }, 200);
    } else {
      setDropdownState(prev => ({
        ...prev,
        isOpen: true,
        isChevronRotated: true,
      }));
    }
  }, [dropdownState.isOpen]);

  // Fermer le dropdown quand on clique en dehors ou change de route
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownState(prev => ({ ...prev, isOpen: false }));
      }
    };

    if (dropdownState.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownState.isOpen]);

  // Fermer le dropdown lors du changement de route
  useEffect(() => {
    if (dropdownState.isOpen) {
      setDropdownState(prev => ({
        ...prev,
        isChevronRotated: false,
        isClosing: true,
      }));
      setTimeout(() => {
        setDropdownState(prev => ({
          ...prev,
          isOpen: false,
          isClosing: false,
        }));
      }, 200);
    }
    // Fermer aussi les sous-menus de navigation
    closeAllNavDropdowns();
  }, [location.pathname, dropdownState.isOpen, closeAllNavDropdowns]);

  // Mettre à jour l'index du lien actif basé sur la location
  useEffect(() => {
    let currentIndex = navLinks.findIndex(link => link.path === location.pathname);

    // Si on est sur la page de connexion et que l'utilisateur n'est pas connecté,
    // on ne montre pas la barre de soulignement dans la navigation principale
    if (location.pathname === '/login' && !user) {
      setNavigationState({ activeLinkIndex: -1, underlineStyle: { opacity: 0 } });
      return;
    }

    const newIndex = currentIndex !== -1 ? currentIndex : 0;
    setNavigationState(prev => ({ ...prev, activeLinkIndex: newIndex }));

    // Calculer la position de la barre de soulignement
    if (linkRefs.current[newIndex]) {
      const activeLink = linkRefs.current[newIndex];
      const container = navLinksRef.current;

      if (container && activeLink) {
        const optimizedStyle = calculateOptimizedUnderlineStyle(container, activeLink);
        setNavigationState(prev => ({ ...prev, underlineStyle: optimizedStyle }));
      }
    }
  }, [location.pathname, user, navLinks, calculateOptimizedUnderlineStyle]);

  // Recalculer la position quand la fenêtre change de taille
  useEffect(() => {
    const handleResize = () => {
      if (
        navigationState.activeLinkIndex >= 0 &&
        linkRefs.current[navigationState.activeLinkIndex]
      ) {
        const activeLink = linkRefs.current[navigationState.activeLinkIndex];
        const container = navLinksRef.current;

        if (container && activeLink) {
          const optimizedStyle = calculateOptimizedUnderlineStyle(container, activeLink);
          setNavigationState(prev => ({ ...prev, underlineStyle: optimizedStyle }));
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigationState.activeLinkIndex, calculateOptimizedUnderlineStyle]);

  const handleLogout = useCallback(() => {
    logout();
    closeMobileMenu();
  }, [logout, closeMobileMenu]);

  const handleMobileNavLinkClick = useCallback(
    path => {
      // Fermer le menu mobile immédiatement
      closeMobileMenu();
    },
    [closeMobileMenu]
  );

  const toggleSection = useCallback(sectionName => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }, []);

  // Gérer l'ouverture/fermeture des sous-menus de navigation au clic
  // Un seul menu peut être ouvert à la fois
  const handleNavDropdownToggle = useCallback(submenuKey => {
    setNavDropdowns(prev => {
      const isCurrentlyOpen = prev[submenuKey];

      // Si on clique sur un menu déjà ouvert, on le ferme
      if (isCurrentlyOpen) {
        return {
          offres: false,
          methode: false,
        };
      }

      // Sinon, on ferme tous les autres et on ouvre celui-ci
      return {
        offres: submenuKey === 'offres',
        methode: submenuKey === 'methode',
      };
    });
  }, []);

  // Fermer les sous-menus quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = event => {
      // Vérifier si le clic est en dehors de la navbar
      if (navLinksRef.current && !navLinksRef.current.contains(event.target)) {
        closeAllNavDropdowns();
      }
    };

    // Ajouter l'écouteur seulement si un menu est ouvert
    if (navDropdowns.offres || navDropdowns.methode) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navDropdowns.offres, navDropdowns.methode, closeAllNavDropdowns]);

  // Gérer le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileState.isOpen) {
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
    } else {
      // Réactiver le scroll du body
      document.body.style.overflow = 'unset';
    }

    return () => {
      // S'assurer que le scroll est réactivé
      document.body.style.overflow = 'unset';
    };
  }, [mobileState.isOpen]);

  // Mettre à jour l'état des sections quand l'utilisateur change
  useEffect(() => {
    if (user) {
      // Si connecté, ouvrir seulement la section administration
      setExpandedSections(prev => ({
        ...prev,
        navigation: false,
        administration: true,
        account: false,
      }));
    } else {
      // Si déconnecté, ouvrir toutes les sections
      setExpandedSections(prev => ({
        ...prev,
        navigation: true,
        administration: true,
        account: true,
      }));
    }
  }, [user]);

  // Configuration du menu dashboard selon le rôle - mémorisée
  const getDashboardMenuItems = useCallback(userRole => {
    const baseItems = [
      { path: '/dashboard/overview', label: "Vue d'ensemble" },
      { path: '/dashboard/schedule', label: 'Planning et horaires' },
      { path: '/dashboard/resources', label: 'Ressources pédagogiques' },
    ];

    // Seuls les étudiants et directeurs voient les exercices et évaluations
    if (userRole === 'student' || userRole === 'director') {
      baseItems.push({
        path: '/dashboard/exercises',
        label: 'Exercices et évaluations',
      });
    }

    // Seuls les étudiants voient le suivi des progrès
    if (userRole === 'student') {
      baseItems.splice(1, 0, {
        path: '/dashboard/progress',
        label: 'Suivi des progrès',
      });
    }

    // Seuls les directeurs voient la gestion des utilisateurs
    if (userRole === 'director') {
      baseItems.push({
        path: '/dashboard/users',
        label: 'Gestion des utilisateurs',
      });
    }

    return baseItems;
  }, []);

  const dashboardMenuItems = useMemo(
    () => getDashboardMenuItems(user?.role),
    [getDashboardMenuItems, user?.role]
  );

  return (
    <nav
      className={`navbar ${shouldShowBackground ? 'scrolled' : ''} ${
        !user ? 'has-navigation' : ''
      }`}
    >
      {/* Logo */}
      <Link to='/' className='navbar-logo' onClick={() => handleNavLinkClick('/')}>
        <img src='/beige-paysage.svg' alt='Bon Cours Logo' className='navbar-logo-img' />
      </Link>
      {/* Navigation principale */}
      {!user && (
        <div className='nav-links' ref={navLinksRef}>
          {navLinks.slice(0, 5).map((link, index) => {
            const hasSubmenu = link.hasSubmenu;
            const isSubmenuOpen = hasSubmenu && navDropdowns[link.submenuKey];
            const isMegaMenu = link.submenuKey === 'offres';

            return (
              <div key={link.path} className='nav-link-wrapper'>
                <Link
                  to={hasSubmenu ? '#' : link.path}
                  ref={el => (linkRefs.current[index] = el)}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''} ${
                    hasSubmenu ? 'has-submenu' : ''
                  } ${isSubmenuOpen ? 'submenu-open' : ''}`}
                  onClick={e => {
                    if (hasSubmenu) {
                      e.preventDefault();
                      handleNavDropdownToggle(link.submenuKey);
                    } else {
                      handleNavLinkClick(link.path, index);
                    }
                  }}
                >
                  <span className='nav-link-icon'>{link.icon}</span>
                  <span className='nav-link-text'>{link.label}</span>
                  {hasSubmenu && (
                    <IoChevronDownOutline
                      size={14}
                      className={`nav-submenu-arrow ${isSubmenuOpen ? 'open' : ''}`}
                    />
                  )}
                </Link>

                {/* Sous-menu déroulant - Mega menu pour Offres */}
                {hasSubmenu && isSubmenuOpen && isMegaMenu && (
                  <div className='nav-submenu nav-mega-menu'>
                    <div className='nav-mega-menu-column'>
                      {offresSubmenu.leftColumn.map((item, idx) => (
                        <div key={idx} className='nav-submenu-item-wrapper'>
                          {item.submenu ? (
                            <div className='nav-submenu-item-group'>
                              <div className='nav-submenu-group-title'>{item.label}</div>
                              <div className='nav-submenu-sublist'>
                                {item.submenu.map((subItem, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    to={subItem.path}
                                    className='nav-submenu-subitem'
                                    onClick={() => closeAllNavDropdowns()}
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              to={item.path}
                              className='nav-submenu-item'
                              onClick={() => closeAllNavDropdowns()}
                            >
                              {item.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className='nav-mega-menu-column'>
                      {offresSubmenu.rightColumn.map((item, idx) => (
                        <div key={idx} className='nav-submenu-item-wrapper'>
                          {item.submenu ? (
                            <div className='nav-submenu-item-group'>
                              <div className='nav-submenu-group-title'>{item.label}</div>
                              <div className='nav-submenu-sublist'>
                                {item.submenu.map((subItem, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    to={subItem.path}
                                    className='nav-submenu-subitem'
                                    onClick={() => closeAllNavDropdowns()}
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              to={item.path}
                              className='nav-submenu-item'
                              onClick={() => closeAllNavDropdowns()}
                            >
                              {item.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sous-menu standard pour Méthode */}
                {hasSubmenu && isSubmenuOpen && !isMegaMenu && (
                  <div className='nav-submenu'>
                    {methodeSubmenu.map((item, idx) => (
                      <div key={idx} className='nav-submenu-item-wrapper'>
                        {item.submenu ? (
                          <div className='nav-submenu-item-group'>
                            <div className='nav-submenu-group-title'>{item.label}</div>
                            <div className='nav-submenu-sublist'>
                              {item.submenu.map((subItem, subIdx) => (
                                <Link
                                  key={subIdx}
                                  to={subItem.path}
                                  className='nav-submenu-subitem'
                                  onClick={() => closeAllNavDropdowns()}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            to={item.path}
                            className='nav-submenu-item'
                            onClick={() => closeAllNavDropdowns()}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {/* Barre de soulignement glissante */}
          <div className='sliding-underline' style={navigationState.underlineStyle} />
        </div>
      )}
      {/* Section droite */}
      <div className='navbar-right'>
        {/* Menu utilisateur ou bouton de connexion */}
        {user ? (
          <>
            {/* Dropdown Dashboard + Utilisateur fusionné */}
            <div className='dropdown-container' ref={dropdownRef}>
              <button
                className={`dropdown-toggle ${
                  location.pathname.startsWith('/dashboard') ? 'active' : ''
                }`}
                onClick={toggleDashboardDropdown}
              >
                <div className='user-info'>
                  <span className='user-name'>{user.name}</span>
                  <span className='user-role'>Tableau de bord</span>
                </div>
                <IoChevronDownOutline
                  size={14}
                  className={`dropdown-arrow ${dropdownState.isChevronRotated ? 'rotated' : ''}`}
                />
              </button>

              {dropdownState.isOpen && (
                <div className={`dropdown-menu ${dropdownState.isClosing ? 'closing' : ''}`}>
                  <div className='dropdown-section'>
                    <h4 className='dropdown-section-title'>Administration</h4>
                    {dashboardMenuItems.map(item => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`dropdown-item ${
                          location.pathname === item.path ? 'active' : ''
                        }`}
                        onClick={() => handleNavLinkClick(item.path)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className='dropdown-separator'></div>

                  <div className='dropdown-section'>
                    <h4 className='dropdown-section-title'>Site public</h4>
                    {navLinks.map(item => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`dropdown-item public-item ${
                          location.pathname === item.path ? 'active' : ''
                        }`}
                        onClick={() => handleNavLinkClick(item.path)}
                      >
                        <span className='dropdown-item-icon'>{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className='dropdown-separator'></div>

                  <div className='dropdown-section'>
                    <button className='dropdown-item logout-item' onClick={handleLogout}>
                      <IoLogOutOutline size={16} />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Bouton de connexion - masqué en production
          config.showHiddenRoutes && (
            <Link
              to='/login'
              className={`login-link desktop-only ${
                location.pathname === '/login' ? 'active' : ''
              }`}
            >
              <IoLogInOutline size={18} />
              <span>{t('nav.login')}</span>
            </Link>
          )
        )}

        {/* Sélecteur de langue desktop */}
        <select
          className='language-select desktop-only'
          value={i18n.language}
          onChange={e => i18n.changeLanguage(e.target.value)}
        >
          <option value='fr'>🇫🇷</option>
          <option value='en'>🇬🇧</option>
        </select>
      </div>

      {/* Bouton menu mobile - séparé pour un meilleur contrôle */}
      <button
        className={`mobile-menu-button ${mobileState.isOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label='Menu'
      >
        {mobileState.isOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
      </button>
      {/* Menu mobile */}
      {mobileState.isOpen && (
        <div className={`mobile-menu ${mobileState.isClosing ? 'closing' : 'open'}`}>
          {/* Bouton de fermeture */}
          <button
            className='mobile-close-button'
            onClick={closeMobileMenu}
            aria-label='Fermer le menu'
          >
            <IoCloseOutline size={24} />
          </button>

          {/* Navigation publique */}
          <div className='mobile-section'>
            <button className='mobile-section-header' onClick={() => toggleSection('navigation')}>
              <h4 className='mobile-section-title'>Navigation</h4>
              <IoChevronDownOutline
                size={20}
                className={`mobile-section-arrow ${expandedSections.navigation ? 'expanded' : ''}`}
              />
            </button>
            <div
              className={`mobile-section-content ${expandedSections.navigation ? 'expanded' : ''}`}
            >
              {navLinks.map(link => {
                const hasSubmenu = link.hasSubmenu;
                const submenuKey = link.submenuKey;
                const isMegaMenu = submenuKey === 'offres';

                // Combiner les colonnes pour le mobile
                const submenuItems = isMegaMenu
                  ? [...offresSubmenu.leftColumn, ...offresSubmenu.rightColumn]
                  : methodeSubmenu;

                return (
                  <div key={link.path}>
                    {hasSubmenu ? (
                      <div className='mobile-nav-submenu-wrapper'>
                        <button
                          className='mobile-nav-link-with-submenu'
                          onClick={() =>
                            setExpandedSections(prev => ({
                              ...prev,
                              [submenuKey]: !prev[submenuKey],
                            }))
                          }
                        >
                          <div className='mobile-nav-link-content'>
                            <span className='mobile-link-icon'>{link.icon}</span>
                            <span>{link.label}</span>
                          </div>
                          <IoChevronDownOutline
                            size={18}
                            className={`mobile-submenu-arrow ${
                              expandedSections[submenuKey] ? 'expanded' : ''
                            }`}
                          />
                        </button>

                        {expandedSections[submenuKey] && (
                          <div className='mobile-submenu-content'>
                            {submenuItems.map((item, idx) => (
                              <div key={idx}>
                                {item.submenu ? (
                                  <div className='mobile-submenu-group'>
                                    <div className='mobile-submenu-group-title'>{item.label}</div>
                                    {item.submenu.map((subItem, subIdx) => (
                                      <Link
                                        key={subIdx}
                                        to={subItem.path}
                                        className='mobile-submenu-subitem'
                                        onClick={closeMobileMenu}
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                ) : (
                                  <Link
                                    to={item.path}
                                    className='mobile-submenu-item'
                                    onClick={closeMobileMenu}
                                  >
                                    {item.label}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`mobile-nav-link ${
                          location.pathname === link.path ? 'active' : ''
                        }`}
                        onClick={closeMobileMenu}
                      >
                        <span className='mobile-link-icon'>{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section utilisateur connecté */}
          {user ? (
            <>
              {/* Section Administration - masquée en production */}
              {config.showHiddenRoutes && (
                <div className='mobile-section'>
                  <button
                    className='mobile-section-header'
                    onClick={() => toggleSection('administration')}
                  >
                    <h4 className='mobile-section-title'>Administration</h4>
                    <IoChevronDownOutline
                      size={20}
                      className={`mobile-section-arrow ${
                        expandedSections.administration ? 'expanded' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`mobile-section-content ${
                      expandedSections.administration ? 'expanded' : ''
                    }`}
                  >
                    {dashboardMenuItems.map(item => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`mobile-dashboard-link ${
                          location.pathname === item.path ? 'active' : ''
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className='mobile-section'>
                <button className='mobile-section-header' onClick={() => toggleSection('account')}>
                  <h4 className='mobile-section-title'>Compte</h4>
                  <IoChevronDownOutline
                    size={20}
                    className={`mobile-section-arrow ${expandedSections.account ? 'expanded' : ''}`}
                  />
                </button>
                <div
                  className={`mobile-section-content ${expandedSections.account ? 'expanded' : ''}`}
                >
                  <div className='mobile-user-info'>
                    <span className='mobile-user-name'>{user.name}</span>
                  </div>
                  <button className='mobile-logout-btn' onClick={handleLogout}>
                    <IoLogOutOutline size={18} />
                    Se déconnecter
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Section de connexion - masquée en production
            config.showHiddenRoutes && (
              <div className='mobile-section'>
                <button className='mobile-section-header' onClick={() => toggleSection('account')}>
                  <h4 className='mobile-section-title'>Compte</h4>
                  <IoChevronDownOutline
                    size={20}
                    className={`mobile-section-arrow ${expandedSections.account ? 'expanded' : ''}`}
                  />
                </button>
                <div
                  className={`mobile-section-content ${expandedSections.account ? 'expanded' : ''}`}
                >
                  <Link to='/login' className='mobile-login-link' onClick={closeMobileMenu}>
                    <IoLogInOutline size={18} />
                    Se connecter
                  </Link>
                </div>
              </div>
            )
          )}

          {/* Sélecteur de langue mobile */}
          <div className='mobile-language-section'>
            <h4 className='mobile-section-title'>Langue</h4>
            <select
              className='mobile-language-select'
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
            >
              <option value='fr'>🇫🇷 Français</option>
              <option value='en'>🇬🇧 English</option>
            </select>
          </div>

          {/* Logo du menu mobile */}
          <div className='mobile-menu-logo'>
            <img src='/beige-portrait.svg' alt='Bon Cours Logo' className='mobile-menu-logo-img' />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
