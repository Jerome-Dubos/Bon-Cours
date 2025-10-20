import React, { useCallback, useState } from 'react';
import {
  IoDesktopOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import ScheduleSection from './ScheduleSection';
import { frenchTranslator } from './utils/translators';

const ScheduleSectionExample = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Données d'exemple
  const exampleCoursesData = {
    adult: {
      presentiel: {
        '2024-01-15': [
          {
            id: '1',
            language: 'Anglais',
            languageKey: 'languages.english',
            level: 'Adulte',
            levelKey: 'levels.adult',
            type: 'Présentiel',
            typeKey: 'types.presentiel',
            startTime: '09:00',
            endTime: '10:30',
            duration: '1h30',
            enrolledStudents: 3,
            maxStudents: 6,
          },
          {
            id: '2',
            language: 'Espagnol',
            languageKey: 'languages.spanish',
            level: 'Adulte',
            levelKey: 'levels.adult',
            type: 'Présentiel',
            typeKey: 'types.presentiel',
            startTime: '14:00',
            endTime: '15:30',
            duration: '1h30',
            enrolledStudents: 4,
            maxStudents: 6,
          },
        ],
        '2024-01-16': [
          {
            id: '3',
            language: 'Allemand',
            languageKey: 'languages.german',
            level: 'Adulte',
            levelKey: 'levels.adult',
            type: 'Présentiel',
            typeKey: 'types.presentiel',
            startTime: '10:00',
            endTime: '11:30',
            duration: '1h30',
            enrolledStudents: 2,
            maxStudents: 6,
          },
        ],
      },
      visio: {
        '2024-01-15': [
          {
            id: '4',
            language: 'Français',
            languageKey: 'languages.french',
            level: 'Adulte',
            levelKey: 'levels.adult',
            type: 'Visioconférence',
            typeKey: 'types.visio',
            startTime: '19:00',
            endTime: '20:30',
            duration: '1h30',
            enrolledStudents: 5,
            maxStudents: 8,
          },
        ],
      },
    },
    child: {
      presentiel: {
        '2024-01-15': [
          {
            id: '5',
            language: 'Anglais',
            languageKey: 'languages.english',
            level: 'Enfant',
            levelKey: 'levels.child',
            type: 'Présentiel',
            typeKey: 'types.presentiel',
            startTime: '16:00',
            endTime: '17:00',
            duration: '1h',
            enrolledStudents: 3,
            maxStudents: 4,
          },
        ],
      },
      visio: {
        '2024-01-16': [
          {
            id: '6',
            language: 'Espagnol',
            languageKey: 'languages.spanish',
            level: 'Enfant',
            levelKey: 'levels.child',
            type: 'Visioconférence',
            typeKey: 'types.visio',
            startTime: '17:00',
            endTime: '18:00',
            duration: '1h',
            enrolledStudents: 2,
            maxStudents: 4,
          },
        ],
      },
    },
  };

  // Gestionnaire de soumission d'intérêt
  const handleInterestSubmit = useCallback(async (data, course) => {
    console.log('Données du formulaire:', data);
    console.log('Cours sélectionné:', course);

    // Simulation d'une requête API
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation d'attente

      // Simulation d'une réponse réussie
      return {
        success: true,
        message: "Votre demande d'inscription a été envoyée avec succès !",
      };
    } catch (error) {
      return {
        success: false,
        message: "Une erreur est survenue lors de l'envoi de votre demande.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Gestionnaire de clic sur un cours
  const handleCourseClick = useCallback(course => {
    console.log('Cours cliqué:', course);
  }, []);

  // Configuration des onglets de niveau
  const levelTabs = [
    {
      id: 'adult',
      label: 'Cours adulte',
      icon: <IoPeopleOutline />,
      description: 'Pour les adultes',
    },
    {
      id: 'child',
      label: 'Cours enfant',
      icon: <IoSchoolOutline />,
      description: 'Pour les enfants',
    },
  ];

  // Configuration des onglets de type
  const typeTabs = [
    {
      id: 'presentiel',
      label: 'Présentiel',
      icon: <IoHomeOutline />,
      description: 'En salle de classe',
    },
    {
      id: 'visio',
      label: 'Visioconférence',
      icon: <IoDesktopOutline />,
      description: 'En ligne depuis chez vous',
    },
  ];

  // Message d'état vide personnalisé
  const emptyMessage = {
    title: 'Nouvelle session en préparation',
    text: 'Nous préparons actuellement notre nouvelle session de cours qui débutera en octobre. Notre équipe pédagogique met en place un programme enrichi avec de nouveaux créneaux horaires pour mieux répondre à vos besoins.',
    features: [
      { icon: <IoPersonOutline />, text: 'Cours adultes et enfants' },
      { icon: <IoDesktopOutline />, text: 'Présentiel et visioconférence' },
      { icon: <IoTimeOutline />, text: 'Horaires flexibles' },
    ],
  };

  return (
    <div
      style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #072e41 0%, #0f4c75 100%)',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#eabd83', textAlign: 'center', marginBottom: '2rem' }}>
        Exemple d'utilisation du ScheduleSection
      </h1>

      <ScheduleSection
        title='Planning des cours - Exemple'
        description='Découvrez nos cours disponibles en présentiel et en visioconférence'
        coursesData={exampleCoursesData}
        loading={loading}
        error={error}
        onInterestSubmit={handleInterestSubmit}
        onCourseClick={handleCourseClick}
        coursesPerPage={2}
        showEmptyMessage={true}
        emptyMessage={emptyMessage}
        startDate='2024-01-15'
        weekDays={7}
        levelTabs={levelTabs}
        typeTabs={typeTabs}
        translator={frenchTranslator}
        className='example-schedule'
      />
    </div>
  );
};

export default ScheduleSectionExample;
