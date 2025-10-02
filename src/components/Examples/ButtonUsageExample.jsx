/**
 * Exemple d'utilisation des composants Button
 * Montre toutes les variantes, tailles et fonctionnalités disponibles
 */

import React, { useState } from 'react';
import { FaArrowRight, FaDownload, FaHeart, FaSpinner } from 'react-icons/fa';
import { Button } from '../UI/Buttons';

/**
 * Exemple complet d'utilisation des composants Button
 */
const ButtonUsageExample = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    console.log('Bouton cliqué !');
  };

  const handleAsyncClick = async () => {
    setLoading(true);
    // Simuler une action asynchrone
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Exemples d'utilisation des composants Button</h1>

      {/* Variantes */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Variantes</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant='primary' onClick={handleClick}>
            Primary
          </Button>
          <Button variant='secondary' onClick={handleClick}>
            Secondary
          </Button>
          <Button variant='outline' onClick={handleClick}>
            Outline
          </Button>
          <Button variant='text' onClick={handleClick}>
            Text
          </Button>
          <Button variant='success' onClick={handleClick}>
            Success
          </Button>
          <Button variant='danger' onClick={handleClick}>
            Danger
          </Button>
          <Button variant='warning' onClick={handleClick}>
            Warning
          </Button>
        </div>
      </section>

      {/* Tailles */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Tailles</h2>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
        >
          <Button size='small' variant='primary' onClick={handleClick}>
            Small
          </Button>
          <Button size='medium' variant='primary' onClick={handleClick}>
            Medium
          </Button>
          <Button size='large' variant='primary' onClick={handleClick}>
            Large
          </Button>
          <Button size='xlarge' variant='primary' onClick={handleClick}>
            XLarge
          </Button>
        </div>
      </section>

      {/* États */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>États</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant='primary' onClick={handleClick}>
            Normal
          </Button>
          <Button variant='primary' disabled onClick={handleClick}>
            Disabled
          </Button>
          <Button variant='primary' loading onClick={handleClick}>
            Loading
          </Button>
          <Button variant='primary' loading loadingText='Envoi en cours...' onClick={handleClick}>
            Loading avec texte
          </Button>
        </div>
      </section>

      {/* Avec icônes */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Avec icônes</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button variant='primary' icon={FaHeart} iconPosition='left' onClick={handleClick}>
            J'aime
          </Button>
          <Button variant='secondary' icon={FaDownload} iconPosition='right' onClick={handleClick}>
            Télécharger
          </Button>
          <Button variant='outline' icon={FaArrowRight} iconPosition='right' onClick={handleClick}>
            Continuer
          </Button>
          <Button variant='text' icon={FaSpinner} iconPosition='left' onClick={handleClick}>
            Recharger
          </Button>
        </div>
      </section>

      {/* Pleine largeur */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Pleine largeur</h2>
        <div style={{ marginBottom: '1rem' }}>
          <Button variant='primary' fullWidth onClick={handleClick}>
            Bouton pleine largeur
          </Button>
        </div>
      </section>

      {/* Types de boutons */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Types de boutons</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button type='button' variant='primary' onClick={handleClick}>
            Button
          </Button>
          <Button type='submit' variant='secondary' onClick={handleClick}>
            Submit
          </Button>
          <Button type='reset' variant='outline' onClick={handleClick}>
            Reset
          </Button>
        </div>
      </section>

      {/* Accessibilité */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Accessibilité</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button
            variant='primary'
            ariaLabel='Bouton avec label personnalisé'
            onClick={handleClick}
          >
            Bouton accessible
          </Button>
          <Button variant='secondary' ariaDescribedBy='button-description' onClick={handleClick}>
            Bouton décrit
          </Button>
        </div>
        <p id='button-description' style={{ fontSize: '0.9rem', color: '#666' }}>
          Ce texte décrit le bouton ci-dessus pour les lecteurs d'écran.
        </p>
      </section>

      {/* Exemple interactif */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Exemple interactif</h2>
        <div style={{ marginBottom: '1rem' }}>
          <Button
            variant='primary'
            loading={loading}
            onClick={handleAsyncClick}
            loadingText='Traitement en cours...'
          >
            {loading ? 'Traitement...' : 'Action asynchrone'}
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Button variant='outline' onClick={() => setDisabled(!disabled)}>
            {disabled ? 'Activer' : 'Désactiver'} les boutons
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant='primary' disabled={disabled} onClick={handleClick}>
            Bouton 1
          </Button>
          <Button variant='secondary' disabled={disabled} onClick={handleClick}>
            Bouton 2
          </Button>
          <Button variant='success' disabled={disabled} onClick={handleClick}>
            Bouton 3
          </Button>
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
          {`import { Button } from '../UI/Buttons';
import { FaHeart } from 'react-icons/fa';

// Bouton basique
<Button variant="primary" onClick={handleClick}>
  Mon bouton
</Button>

// Bouton avec icône
<Button 
  variant="primary" 
  icon={FaHeart} 
  iconPosition="left"
  onClick={handleClick}
>
  J'aime
</Button>

// Bouton en chargement
<Button 
  variant="primary" 
  loading={isLoading}
  loadingText="Chargement..."
  onClick={handleAsyncAction}
>
  Soumettre
</Button>

// Bouton accessible
<Button 
  variant="primary"
  ariaLabel="Action importante"
  onClick={handleClick}
>
  Action
</Button>`}
        </pre>
      </section>
    </div>
  );
};

export default ButtonUsageExample;
