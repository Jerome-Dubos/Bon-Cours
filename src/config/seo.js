/**
 * Configuration SEO centralisée pour toutes les pages
 * Optimisé pour le référencement et les rich snippets
 */

const baseUrl = 'https://boncours.fr';
const defaultImage = 'https://boncours.fr/assets/images/logo/InstitutBonCours_Logo_horizontal_clair.svg';
const siteName = 'Institut Bon Cours';
const defaultKeywords = 'école de langues Strasbourg, cours de langues Strasbourg, soutien scolaire Strasbourg, Institut Bon Cours';

// Organisation Schema de base
const baseOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LanguageSchool'],
  name: siteName,
  alternateName: 'Bon Cours',
  url: baseUrl,
  logo: defaultImage,
  image: defaultImage,
  description:
    "Institut Bon Cours est une école de langues et centre d'accompagnement scolaire situé au cœur de Strasbourg. Nous proposons des cours de langues en petits groupes de 6 personnes, un soutien scolaire personnalisé en groupes de 4 élèves, la préparation aux examens et des ateliers linguistiques.",
        address: {
          '@type': 'PostalAddress',
          streetAddress: '36 quai Mullenheim',
          addressLocality: 'Strasbourg',
          addressRegion: 'Alsace',
          postalCode: '67000',
          addressCountry: 'FR',
        },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '48.5734',
    longitude: '7.7521',
  },
  telephone: '+33388520382',
  email: 'contact@boncours.fr',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+33388520382',
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: ['French', 'English'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+33679145577',
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: ['French', 'English'],
    },
  ],
  areaServed: {
    '@type': 'City',
    name: 'Strasbourg',
  },
  sameAs: [
    'https://www.facebook.com/boncours',
    'https://www.twitter.com/boncours',
    'https://www.linkedin.com/company/boncours',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
};

// LocalBusiness Schema de base
const baseLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteName,
  image: defaultImage,
  '@id': baseUrl,
  url: baseUrl,
        telephone: '+33388520382',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '36 quai Mullenheim',
          addressLocality: 'Strasbourg',
          postalCode: '67000',
          addressRegion: 'Alsace',
          addressCountry: 'FR',
        },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.5734,
    longitude: 7.7521,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
};

// ItemList Schema pour les services (meilleur pour SEO) - Défini avant utilisation
const createItemListSchema = (items) => {
  if (!items || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services éducatifs Institut Bon Cours',
    description: 'Liste complète des services proposés par Institut Bon Cours',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: item.name,
        description: item.description,
        provider: baseOrganizationSchema,
        areaServed: 'Strasbourg',
        serviceType: item.serviceType || 'Educational Service',
      },
    })),
  };
};

// Services pour ItemList
const servicesList = [
  {
    name: 'Cours de langues en petits groupes',
    description:
      'Apprentissage des langues en groupes de 6 personnes maximum. Disponible pour : Anglais, Allemand, Espagnol, Italien, Persan, Portugais, Turc, Russe, Chinois, Japonais.',
    serviceType: 'Language Course',
  },
  {
    name: 'Soutien scolaire',
    description:
      'Accompagnement scolaire personnalisé en groupes de 4 élèves. Primaire, Collège, Lycée. Diagnostic offert.',
    serviceType: 'Educational Support',
  },
  {
    name: 'Préparation aux examens',
    description: 'Préparation personnalisée pour tous types d\'examens linguistiques et scolaires.',
    serviceType: 'Exam Preparation',
  },
  {
    name: 'Ateliers linguistiques',
    description: 'Ateliers pratiques pour renforcer vos compétences linguistiques.',
    serviceType: 'Language Workshop',
  },
  {
    name: 'Accompagnements complémentaires',
    description: 'Services d\'accompagnement additionnels pour votre progression.',
    serviceType: 'Complementary Support',
  },
];

// Configuration SEO par page
export const seoConfig = {
  home: {
    title: 'Institut Bon Cours - École de langues et accompagnement scolaire à Strasbourg',
    description:
      'Institut Bon Cours à Strasbourg : école de langues et accompagnement scolaire. Cours de langues en petits groupes (6 personnes), soutien scolaire personnalisé, préparation aux examens et ateliers linguistiques. Professeurs qualifiés, horaires flexibles, méthode adaptée.',
    keywords: `${defaultKeywords}, cours anglais Strasbourg, cours allemand Strasbourg, cours espagnol Strasbourg, cours italien Strasbourg, cours persan, cours portugais, cours turc, cours russe, cours chinois, cours japonais, accompagnement scolaire personnalisé, groupes réduits, méthode actionnelle`,
    canonical: `${baseUrl}/`,
    structuredData: [
      baseOrganizationSchema,
      baseLocalBusinessSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseUrl}/`,
          },
        ],
      },
    ],
  },
  offers: {
    title: 'Nos Offres - Cours de langues et accompagnement scolaire',
    description:
      'Découvrez toutes nos offres : cours de langues en petits groupes, soutien scolaire personnalisé, préparation aux examens, ateliers linguistiques et accompagnements complémentaires. Choisissez la formule adaptée à vos besoins.',
    keywords: `${defaultKeywords}, offres cours langues, tarifs école langues Strasbourg, prix cours langues, formules apprentissage`,
    canonical: `${baseUrl}/offres`,
    structuredData: [
      baseOrganizationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Services éducatifs Institut Bon Cours',
        provider: baseOrganizationSchema,
        areaServed: 'Strasbourg',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services éducatifs Institut Bon Cours',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Course',
                name: 'Cours de langues en petits groupes',
                description:
                  'Apprentissage des langues en groupes de 6 personnes maximum. Anglais, Allemand, Espagnol, Italien, Persan, Portugais, Turc, Russe, Chinois, Japonais.',
                educationalLevel: 'Tous niveaux',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Course',
                name: 'Soutien scolaire',
                description: 'Accompagnement scolaire personnalisé en groupes de 4 élèves. Primaire, Collège, Lycée.',
                educationalLevel: 'Primaire, Collège, Lycée',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Course',
                name: 'Préparation aux examens',
                description: 'Préparation personnalisée pour tous types d\'examens linguistiques et scolaires.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Course',
                name: 'Ateliers linguistiques',
                description: 'Ateliers pratiques pour renforcer vos compétences linguistiques.',
              },
            },
          ],
        },
      },
      createItemListSchema(servicesList),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Nos Offres',
            item: `${baseUrl}/offres`,
          },
        ],
      },
    ].filter(Boolean), // Remove null values
  },
  languages: {
    title: 'Cours de Langues - Apprentissage en petits groupes à Strasbourg',
    description:
      'Cours de langues en petits groupes de 6 personnes maximum. Apprenez l\'anglais, l\'allemand, l\'espagnol, l\'italien, le persan, le portugais, le turc, le russe, le chinois ou le japonais avec des professeurs qualifiés. Tous niveaux.',
    keywords: `${defaultKeywords}, cours anglais, cours allemand, cours espagnol, cours italien, cours persan, cours portugais, cours turc, cours russe, cours chinois, cours japonais, apprentissage langues Strasbourg`,
    canonical: `${baseUrl}/offres/langues`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Cours de langues en petits groupes',
        description:
          'Apprentissage des langues en groupes de 6 personnes maximum. Disponible pour : Anglais, Allemand, Espagnol, Italien, Persan, Portugais, Turc, Russe, Chinois, Japonais.',
        provider: baseOrganizationSchema,
        educationalLevel: 'Tous niveaux',
        courseMode: 'In-person',
        inLanguage: ['fr', 'en', 'de', 'es', 'it', 'fa', 'pt', 'tr', 'ru', 'zh', 'ja'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Nos Offres',
            item: `${baseUrl}/offres`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Cours de Langues',
            item: `${baseUrl}/offres/langues`,
          },
        ],
      },
    ],
  },
  schoolSupport: {
    title: 'Soutien Scolaire - Accompagnement personnalisé à Strasbourg',
    description:
      'Soutien scolaire personnalisé en groupes de 4 élèves maximum. Accompagnement pour primaire, collège et lycée. Diagnostic offert, équipe experte et pédagogique. Suivi régulier pour optimiser la progression.',
    keywords: `${defaultKeywords}, soutien scolaire Strasbourg, cours particuliers Strasbourg, aide aux devoirs Strasbourg, accompagnement scolaire primaire, collège, lycée`,
    canonical: `${baseUrl}/offres/soutien-scolaire`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Soutien scolaire',
        description:
          'Accompagnement scolaire personnalisé en groupes de 4 élèves. Primaire, Collège, Lycée. Diagnostic offert, équipe experte et pédagogique.',
        provider: baseOrganizationSchema,
        educationalLevel: 'Primaire, Collège, Lycée',
        courseMode: 'In-person',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Nos Offres',
            item: `${baseUrl}/offres`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Soutien Scolaire',
            item: `${baseUrl}/offres/soutien-scolaire`,
          },
        ],
      },
    ],
  },
  method: {
    title: 'Notre Méthode - Approche pédagogique adaptée',
    description:
      'Découvrez notre méthode pédagogique : approche actionnelle, niveaux de parcours adaptés, outils et ressources innovants. Diagnostic initial, cours personnalisés et bilans réguliers pour une progression optimale.',
    keywords: `${defaultKeywords}, méthode pédagogique, approche actionnelle, apprentissage langues méthode, pédagogie innovante, enseignement personnalisé`,
    canonical: `${baseUrl}/methode`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Notre Méthode',
            item: `${baseUrl}/methode`,
          },
        ],
      },
    ],
  },
  contact: {
    title: 'Contact - Institut Bon Cours Strasbourg',
    description:
      'Contactez Institut Bon Cours à Strasbourg. Posez vos questions sur nos cours de langues, notre soutien scolaire ou nos autres services. Nous sommes à votre écoute pour répondre à vos besoins.',
    keywords: `${defaultKeywords}, contact école langues Strasbourg, téléphone Institut Bon Cours, adresse école langues`,
    canonical: `${baseUrl}/contact`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact - Institut Bon Cours',
        url: `${baseUrl}/contact`,
        mainEntity: baseOrganizationSchema,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact',
            item: `${baseUrl}/contact`,
          },
        ],
      },
    ],
  },
  about: {
    title: 'Qui Sommes-Nous - Institut Bon Cours',
    description:
      'Découvrez l\'histoire, les valeurs et l\'équipe d\'Institut Bon Cours. École de langues et centre d\'accompagnement scolaire basé à Strasbourg depuis plusieurs années. Expertise, passion et pédagogie au service de votre réussite.',
    keywords: `${defaultKeywords}, histoire Institut Bon Cours, équipe école langues Strasbourg, valeurs pédagogiques, présentation école`,
    canonical: `${baseUrl}/qui-sommes-nous`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Qui Sommes-Nous - Institut Bon Cours',
        url: `${baseUrl}/qui-sommes-nous`,
        mainEntity: baseOrganizationSchema,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Qui Sommes-Nous',
            item: `${baseUrl}/qui-sommes-nous`,
          },
        ],
      },
    ],
  },
};

// Fonction helper pour obtenir la config SEO selon la route
export const getSEOConfig = (pathname) => {
  const path = pathname.toLowerCase();
  
  if (path === '/') return seoConfig.home;
  if (path === '/offres') return seoConfig.offers;
  if (path === '/offres/langues') return seoConfig.languages;
  if (path === '/offres/soutien-scolaire') return seoConfig.schoolSupport;
  if (path.startsWith('/methode')) return seoConfig.method;
  if (path === '/contact') return seoConfig.contact;
  if (path === '/qui-sommes-nous') return seoConfig.about;
  
  // Fallback
  return seoConfig.home;
};

// Schema pour les Reviews (témoignages)
export const createReviewSchema = (testimonials) => {
  if (!testimonials || testimonials.length === 0) return null;

  const reviews = testimonials
    .filter((t) => t.rating && t.text)
    .map((testimonial) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name || 'Anonyme',
      },
      reviewBody: testimonial.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished: testimonial.date || new Date().toISOString().split('T')[0],
    }));

  if (reviews.length === 0) return null;

  const averageRating =
    reviews.reduce((sum, r) => sum + r.reviewRating.ratingValue, 0) / reviews.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews,
  };
};

// FAQ Schema pour les questions fréquentes
export const createFAQSchema = (faqs) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// FAQ par défaut
export const defaultFAQs = [
  {
    question: 'Quels types de cours proposez-vous ?',
    answer:
      "Nous proposons des cours de langues en petits groupes (6 personnes max), du soutien scolaire en groupes de 4 élèves, la préparation aux examens et des ateliers linguistiques. Nous enseignons l'anglais, l'allemand, l'espagnol, l'italien, le persan, le portugais, le turc, le russe, le chinois et le japonais.",
  },
  {
    question: 'Où se trouve l\'Institut Bon Cours ?',
    answer:
      "L'Institut Bon Cours est situé au cœur de Strasbourg, en Alsace. Nous accueillons nos élèves dans un cadre convivial et propice à l'apprentissage.",
  },
  {
    question: 'Quelle est votre méthode pédagogique ?',
    answer:
      'Nous utilisons une approche actionnelle avec un diagnostic initial, des cours personnalisés adaptés à vos besoins et des bilans réguliers pour suivre votre progression. Nos groupes réduits permettent un suivi individuel optimal.',
  },
  {
    question: 'Proposez-vous des cours pour tous les niveaux ?',
    answer:
      'Oui, nos cours de langues sont accessibles à tous les niveaux, du débutant au niveau avancé. Pour le soutien scolaire, nous accompagnons les élèves de primaire, collège et lycée.',
  },
  {
    question: 'Quels sont vos horaires ?',
    answer:
      "Nos horaires sont flexibles. Vous pouvez décider de l'horaire de votre cours ou de votre atelier. Nous sommes ouverts du lundi au samedi de 9h à 19h.",
  },
  {
    question: 'Comment puis-je m\'inscrire ?',
    answer:
      "Vous pouvez nous contacter par téléphone, email ou via notre formulaire de contact sur le site. Nous vous proposerons un diagnostic initial gratuit pour déterminer vos besoins et adapter nos cours à votre niveau.",
  },
];

// Export pour utilisation externe si besoin
export { createItemListSchema, servicesList };

// Note: FAQ Schema sera ajouté dynamiquement dans le hook useSEO ou dans les composants

// ImageObject Schema helper
export const createImageObjectSchema = (url, caption, width = 1200, height = 630) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url,
    caption: caption || '',
    width,
    height,
    encodingFormat: url.endsWith('.webp') ? 'image/webp' : url.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg',
  };
};

export default seoConfig;

