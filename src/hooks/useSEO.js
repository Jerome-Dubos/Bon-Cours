import React from 'react';
import { useLocation } from 'react-router-dom';
import { getSEOConfig, createReviewSchema, createFAQSchema, defaultFAQs } from '../config/seo';
import SEOComponent from '../components/SEO/SEO';

/**
 * Hook personnalisé pour gérer le SEO dynamiquement selon la route
 * @param {Object} overrides - Override les valeurs par défaut
 * @param {Array} testimonials - Témoignages pour générer Review Schema
 */
export const useSEO = (overrides = {}, testimonials = null) => {
  const location = useLocation();
  const config = getSEOConfig(location.pathname);

  // Fusionner avec les overrides
  const seoData = {
    ...config,
    ...overrides,
    structuredData: overrides.structuredData || config.structuredData,
  };

  // Ajouter Review Schema si des témoignages sont fournis
  if (testimonials && Array.isArray(testimonials)) {
    const reviewSchema = createReviewSchema(testimonials);
    if (reviewSchema && seoData.structuredData) {
      seoData.structuredData = [...seoData.structuredData, reviewSchema];
    }
  }

  // Ajouter FAQ Schema à la page d'accueil
  if (location.pathname === '/' && seoData.structuredData) {
    const faqSchema = createFAQSchema(defaultFAQs);
    if (faqSchema) {
      seoData.structuredData = [...seoData.structuredData, faqSchema];
    }
  }

  return seoData;
};

/**
 * Composant SEOWrapper pour faciliter l'utilisation
 */
export const SEOWrapper = ({ overrides = {}, testimonials = null }) => {
  const seoData = useSEO(overrides, testimonials);

  // Vérifier que structuredData est valide
  const validStructuredData = Array.isArray(seoData?.structuredData) 
    ? seoData.structuredData.filter(Boolean)
    : seoData?.structuredData ? [seoData.structuredData] : null;

  // Utiliser createElement au lieu de JSX pour éviter les problèmes de parsing
  return React.createElement(SEOComponent, {
    title: seoData?.title,
    description: seoData?.description,
    keywords: seoData?.keywords,
    canonical: seoData?.canonical,
    structuredData: validStructuredData,
    ...overrides,
  });
};

export default useSEO;

