/**
 * Traducteurs pour les données de planning
 */

/**
 * Traducteur français par défaut
 */
export const frenchTranslator = (() => {
  const translations = {
    // Langues
    'languages.spanish': 'Espagnol',
    'languages.english': 'Anglais',
    'languages.german': 'Allemand',
    'languages.french': 'Français',
    'languages.italian': 'Italien',
    'languages.portuguese': 'Portugais',
    'languages.dutch': 'Néerlandais',
    'languages.turkish': 'Turc',
    'languages.arabic': 'Arabe',
    'languages.chinese': 'Chinois',
    'languages.japanese': 'Japonais',
    'languages.russian': 'Russe',
    'languages.polish': 'Polonais',
    'languages.czech': 'Tchèque',
    'languages.hungarian': 'Hongrois',
    'languages.romanian': 'Roumain',
    'languages.bulgarian': 'Bulgare',
    'languages.croatian': 'Croate',
    'languages.serbian': 'Serbe',
    'languages.slovak': 'Slovaque',
    'languages.slovenian': 'Slovène',
    'languages.estonian': 'Estonien',
    'languages.latvian': 'Letton',
    'languages.lithuanian': 'Lituanien',
    'languages.finnish': 'Finnois',
    'languages.swedish': 'Suédois',
    'languages.norwegian': 'Norvégien',
    'languages.danish': 'Danois',
    'languages.icelandic': 'Islandais',
    'languages.greek': 'Grec',
    'languages.hebrew': 'Hébreu',
    'languages.hindi': 'Hindi',
    'languages.korean': 'Coréen',
    'languages.thai': 'Thaï',
    'languages.vietnamese': 'Vietnamien',
    'languages.indonesian': 'Indonésien',
    'languages.malay': 'Malais',
    'languages.filipino': 'Filipino',
    'languages.swahili': 'Swahili',
    'languages.amharic': 'Amharique',
    'languages.yoruba': 'Yoruba',
    'languages.zulu': 'Zoulou',
    'languages.afrikaans': 'Afrikaans',
    'languages.urdu': 'Ourdou',
    'languages.bengali': 'Bengali',
    'languages.tamil': 'Tamoul',
    'languages.telugu': 'Télougou',
    'languages.marathi': 'Marathi',
    'languages.gujarati': 'Gujarati',
    'languages.punjabi': 'Pendjabi',
    'languages.kannada': 'Kannada',
    'languages.malayalam': 'Malayalam',
    'languages.odia': 'Odia',
    'languages.assamese': 'Assamais',
    'languages.kashmiri': 'Cachemiri',
    'languages.nepali': 'Népalais',
    'languages.sinhala': 'Cingalais',
    'languages.burmese': 'Birman',
    'languages.khmer': 'Khmer',
    'languages.lao': 'Lao',
    'languages.mongolian': 'Mongol',
    'languages.tibetan': 'Tibétain',
    'languages.uzbek': 'Ouzbek',
    'languages.kazakh': 'Kazakh',
    'languages.kyrgyz': 'Kirghiz',
    'languages.tajik': 'Tadjik',
    'languages.turkmen': 'Turkmène',
    'languages.afghan': 'Afghan',
    'languages.persian': 'Persan',
    'languages.dari': 'Dari',
    'languages.pashto': 'Pachto',
    'languages.balochi': 'Baloutchi',
    'languages.sindhi': 'Sindhi',
    'languages.saraiki': 'Saraiki',
    'languages.brahui': 'Brahui',
    'languages.hazara': 'Hazara',
    'languages.aimaq': 'Aimaq',
    'languages.nuristani': 'Nuristani',
    'languages.pashayi': 'Pashayi',
    'languages.waigali': 'Waigali',
    'languages.ashkun': 'Ashkun',
    'languages.kamkata': 'Kamkata',
    'languages.vasi': 'Vasi',
    'languages.tregami': 'Tregami',
    'languages.kalasha': 'Kalasha',
    'languages.khowar': 'Khowar',
    'languages.shina': 'Shina',
    'languages.balti': 'Balti',
    'languages.burushaski': 'Burushaski',
    'languages.wakhi': 'Wakhi',
    'languages.yidgha': 'Yidgha',
    'languages.munji': 'Munji',
    'languages.ishkashimi': 'Ishkashimi',
    'languages.sanglechi': 'Sanglechi',
    'languages.zebaki': 'Zebaki',
    'languages.sarikoli': 'Sarikoli',
    'languages.yagnobi': 'Yagnobi',

    // Niveaux
    'languages.levels.adult': 'Adulte',
    'languages.levels.child': 'Enfant',
    'LEVELS.ADULT': 'Adulte',
    'LEVELS.CHILD': 'Enfant',
    'levels.adult': 'Adulte',
    'levels.child': 'Enfant',

    // Types
    'types.presentiel': 'Présentiel',
    'types.visio': 'Visioconférence',
    'TYPES.PRESENTIEL': 'Présentiel',
    'TYPES.VISIO': 'Visioconférence',
  };

  return key => translations[key] || key;
})();

/**
 * Traducteur anglais
 */
export const englishTranslator = (() => {
  const translations = {
    // Langues
    'languages.spanish': 'Spanish',
    'languages.english': 'English',
    'languages.german': 'German',
    'languages.french': 'French',
    'languages.italian': 'Italian',
    'languages.portuguese': 'Portuguese',
    'languages.dutch': 'Dutch',
    'languages.turkish': 'Turkish',
    'languages.arabic': 'Arabic',
    'languages.chinese': 'Chinese',
    'languages.japanese': 'Japanese',
    'languages.russian': 'Russian',
    'languages.polish': 'Polish',
    'languages.czech': 'Czech',
    'languages.hungarian': 'Hungarian',
    'languages.romanian': 'Romanian',
    'languages.bulgarian': 'Bulgarian',
    'languages.croatian': 'Croatian',
    'languages.serbian': 'Serbian',
    'languages.slovak': 'Slovak',
    'languages.slovenian': 'Slovenian',
    'languages.estonian': 'Estonian',
    'languages.latvian': 'Latvian',
    'languages.lithuanian': 'Lithuanian',
    'languages.finnish': 'Finnish',
    'languages.swedish': 'Swedish',
    'languages.norwegian': 'Norwegian',
    'languages.danish': 'Danish',
    'languages.icelandic': 'Icelandic',
    'languages.greek': 'Greek',
    'languages.hebrew': 'Hebrew',
    'languages.hindi': 'Hindi',
    'languages.korean': 'Korean',
    'languages.thai': 'Thai',
    'languages.vietnamese': 'Vietnamese',
    'languages.indonesian': 'Indonesian',
    'languages.malay': 'Malay',
    'languages.filipino': 'Filipino',
    'languages.swahili': 'Swahili',
    'languages.amharic': 'Amharic',
    'languages.yoruba': 'Yoruba',
    'languages.zulu': 'Zulu',
    'languages.afrikaans': 'Afrikaans',
    'languages.urdu': 'Urdu',
    'languages.bengali': 'Bengali',
    'languages.tamil': 'Tamil',
    'languages.telugu': 'Telugu',
    'languages.marathi': 'Marathi',
    'languages.gujarati': 'Gujarati',
    'languages.punjabi': 'Punjabi',
    'languages.kannada': 'Kannada',
    'languages.malayalam': 'Malayalam',
    'languages.odia': 'Odia',
    'languages.assamese': 'Assamese',
    'languages.kashmiri': 'Kashmiri',
    'languages.nepali': 'Nepali',
    'languages.sinhala': 'Sinhala',
    'languages.burmese': 'Burmese',
    'languages.khmer': 'Khmer',
    'languages.lao': 'Lao',
    'languages.mongolian': 'Mongolian',
    'languages.tibetan': 'Tibetan',
    'languages.uzbek': 'Uzbek',
    'languages.kazakh': 'Kazakh',
    'languages.kyrgyz': 'Kyrgyz',
    'languages.tajik': 'Tajik',
    'languages.turkmen': 'Turkmen',
    'languages.afghan': 'Afghan',
    'languages.persian': 'Persian',
    'languages.dari': 'Dari',
    'languages.pashto': 'Pashto',
    'languages.balochi': 'Balochi',
    'languages.sindhi': 'Sindhi',
    'languages.saraiki': 'Saraiki',
    'languages.brahui': 'Brahui',
    'languages.hazara': 'Hazara',
    'languages.aimaq': 'Aimaq',
    'languages.nuristani': 'Nuristani',
    'languages.pashayi': 'Pashayi',
    'languages.waigali': 'Waigali',
    'languages.ashkun': 'Ashkun',
    'languages.kamkata': 'Kamkata',
    'languages.vasi': 'Vasi',
    'languages.tregami': 'Tregami',
    'languages.kalasha': 'Kalasha',
    'languages.khowar': 'Khowar',
    'languages.shina': 'Shina',
    'languages.balti': 'Balti',
    'languages.burushaski': 'Burushaski',
    'languages.wakhi': 'Wakhi',
    'languages.yidgha': 'Yidgha',
    'languages.munji': 'Munji',
    'languages.ishkashimi': 'Ishkashimi',
    'languages.sanglechi': 'Sanglechi',
    'languages.zebaki': 'Zebaki',
    'languages.sarikoli': 'Sarikoli',
    'languages.yagnobi': 'Yagnobi',

    // Niveaux
    'languages.levels.adult': 'Adult',
    'languages.levels.child': 'Child',
    'LEVELS.ADULT': 'Adult',
    'LEVELS.CHILD': 'Child',
    'levels.adult': 'Adult',
    'levels.child': 'Child',

    // Types
    'types.presentiel': 'In-person',
    'types.visio': 'Video conference',
    'TYPES.PRESENTIEL': 'In-person',
    'TYPES.VISIO': 'Video conference',
  };

  return key => translations[key] || key;
})();

/**
 * Crée un traducteur personnalisé
 * @param {Object} translations - Dictionnaire de traductions
 * @returns {Function} Fonction de traduction
 */
export const createCustomTranslator = (translations = {}) => {
  return key => translations[key] || key;
};

/**
 * Combine plusieurs traducteurs
 * @param {...Function} translators - Traducteurs à combiner
 * @returns {Function} Traducteur combiné
 */
export const combineTranslators = (...translators) => {
  return key => {
    for (const translator of translators) {
      const result = translator(key);
      if (result !== key) {
        return result;
      }
    }
    return key;
  };
};
