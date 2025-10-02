/**
 * Exemple d'utilisation des textes dans les composants
 * Montre comment utiliser les hooks de textes optimisés
 */

import React from 'react';
import { useTexts } from '../../hooks';

/**
 * Exemple de composant utilisant les textes
 */
const TextUsageExample = () => {
  const { getNavText, getFooterText, getCommonText, getHomeText } = useTexts();

  return (
    <div>
      <h1>Exemple d'utilisation des textes</h1>

      {/* Navigation */}
      <nav>
        <a href='/'>{getNavText('home')}</a>
        <a href='/offers'>{getNavText('offers')}</a>
        <a href='/contact'>{getNavText('contact')}</a>
      </nav>

      {/* Contenu principal */}
      <main>
        <h2>{getHomeText('hero_title')}</h2>
        <p>{getHomeText('hero_desc')}</p>
        <button>{getHomeText('cta_test')}</button>
      </main>

      {/* Footer */}
      <footer>
        <p>{getFooterText('tagline')}</p>
        <p>{getFooterText('description')}</p>
        <p>{getCommonText('loading')}</p>
      </footer>
    </div>
  );
};

export default TextUsageExample;
