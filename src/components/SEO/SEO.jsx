import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant SEO dynamique pour gérer les meta tags et structured data
 * Optimisé pour le référencement et les réseaux sociaux
 */
const SEO = ({
  title,
  description,
  keywords,
  image = 'https://boncours.fr/assets/images/logo/InstitutBonCours_Logo_horizontal_clair.svg',
  type = 'website',
  structuredData,
  noindex = false,
  canonical,
  ogType = 'website',
  twitterCard = 'summary_large_image',
}) => {
  const location = useLocation();
  const baseUrl = 'https://boncours.fr';
  const currentUrl = `${baseUrl}${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;
  const fullTitle = title
    ? `${title} | Institut Bon Cours`
    : 'Institut Bon Cours - École de langues et accompagnement scolaire à Strasbourg';
  const defaultDescription =
    'Institut Bon Cours à Strasbourg : école de langues et accompagnement scolaire. Cours de langues en petits groupes (6 personnes), soutien scolaire personnalisé, préparation aux examens et ateliers linguistiques.';
  const fullDescription = description || defaultDescription;

  useEffect(() => {
    // Mise à jour du titre
    document.title = fullTitle;

    // Fonction helper pour mettre à jour ou créer les meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Fonction helper pour mettre à jour les link tags
    const updateLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Meta tags de base
    updateMetaTag('description', fullDescription);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('googlebot', noindex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('bingbot', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical
    updateLinkTag('canonical', canonicalUrl);

    // Open Graph
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:site_name', 'Institut Bon Cours', true);
    updateMetaTag('og:locale', 'fr_FR', true);
    if (image) {
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
      updateMetaTag('og:image:alt', `${fullTitle} - Institut Bon Cours`, true);
    }

    // Twitter Card
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', image);
    if (image) {
      updateMetaTag('twitter:image:alt', `${fullTitle} - Institut Bon Cours`);
    }
    updateMetaTag('twitter:site', '@boncours');
    updateMetaTag('twitter:creator', '@boncours');

    // Structured Data
    if (structuredData) {
      // Supprimer tous les anciens structured data
      const existingScripts = document.querySelectorAll('script[data-seo-structured]');
      existingScripts.forEach((script) => script.remove());

      // Si c'est un tableau, créer un script pour chaque élément
      // Sinon, créer un seul script
      const schemas = Array.isArray(structuredData) ? structuredData : [structuredData];
      
      schemas.forEach((schema) => {
        if (schema) {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.setAttribute('data-seo-structured', 'true');
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);
        }
      });
    }
  }, [fullTitle, fullDescription, keywords, image, type, currentUrl, canonicalUrl, noindex, ogType, twitterCard, structuredData]);

  return null; // Ce composant ne rend rien visuellement
};

export default SEO;

