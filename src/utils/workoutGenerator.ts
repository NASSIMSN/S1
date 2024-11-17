import { User, Exercise } from '../types';

const exercises = {
  muscle: {
    chest: [
      { name: 'Développé couché', sets: '4x8-10' },
      { name: 'Écarté avec haltères', sets: '3x12' },
      { name: 'Dips', sets: '3x10' }
    ],
    back: [
      { name: 'Tractions', sets: '4x8-10' },
      { name: 'Rowing barre', sets: '3x12' },
      { name: 'Tirage poitrine', sets: '3x10' }
    ],
    legs: [
      { name: 'Squat', sets: '4x8-10' },
      { name: 'Presse à cuisses', sets: '3x12' },
      { name: 'Extension jambes', sets: '3x15' }
    ],
    shoulders: [
      { name: 'Développé militaire', sets: '4x8-10' },
      { name: 'Élévations latérales', sets: '3x12' },
      { name: 'Face pull', sets: '3x15' }
    ],
    arms: [
      { name: 'Curl biceps', sets: '3x12' },
      { name: 'Extension triceps', sets: '3x12' },
      { name: 'Curl marteau', sets: '3x12' }
    ],
    core: [
      { name: 'Crunch', sets: '3x15' },
      { name: 'Planche', sets: '3x45s' },
      { name: 'Russian twist', sets: '3x20' }
    ]
  },
  athletic: {
    chest: [
      { name: 'Pompes explosives', sets: '4x8' },
      { name: 'Développé couché dynamique', sets: '3x6' }
    ],
    back: [
      { name: 'Tractions explosives', sets: '4x6' },
      { name: 'Rowing unilateral', sets: '3x8' }
    ],
    legs: [
      { name: 'Squat sauté', sets: '4x8' },
      { name: 'Fentes sautées', sets: '3x10/jambe' }
    ],
    shoulders: [
      { name: 'Push press', sets: '4x6' },
      { name: 'Arraché', sets: '3x5' }
    ],
    arms: [
      { name: 'Curl dynamique', sets: '3x8' },
      { name: 'Extensions explosives', sets: '3x8' }
    ],
    core: [
      { name: 'Mountain climber', sets: '3x30s' },
      { name: 'Hollow hold', sets: '3x30s' }
    ]
  }
};

const homeExercises = {
  muscle: {
    chest: [
      { name: 'Pompes', sets: '4x12-15' },
      { name: 'Pompes diamant', sets: '3x12' }
    ],
    back: [
      { name: 'Superman', sets: '3x15' },
      { name: 'Rowing élastique', sets: '4x12' }
    ],
    legs: [
      { name: 'Squats', sets: '4x15-20' },
      { name: 'Fentes', sets: '3x12/jambe' }
    ],
    shoulders: [
      { name: 'Pompes pike', sets: '3x12' },
      { name: 'Élévations élastique', sets: '3x15' }
    ],
    arms: [
      { name: 'Dips sur chaise', sets: '3x12' },
      { name: 'Curl élastique', sets: '3x15' }
    ],
    core: [
      { name: 'Crunch', sets: '3x20' },
      { name: 'Planche', sets: '3x45s' }
    ]
  },
  athletic: {
    chest: [
      { name: 'Pompes explosives', sets: '4x8' },
      { name: 'Pompes decline', sets: '3x12' }
    ],
    back: [
      { name: 'Superman dynamique', sets: '3x12' },
      { name: 'Good morning', sets: '3x15' }
    ],
    legs: [
      { name: 'Squat sauté', sets: '4x10' },
      { name: 'Fentes sautées', sets: '3x8/jambe' }
    ],
    shoulders: [
      { name: 'Handstand push-up', sets: '3x5' },
      { name: 'Pike push-up', sets: '3x10' }
    ],
    arms: [
      { name: 'Dips explosifs', sets: '3x8' },
      { name: 'Push-up close', sets: '3x12' }
    ],
    core: [
      { name: 'Mountain climber', sets: '3x30s' },
      { name: 'Burpees', sets: '3x10' }
    ]
  }
};

export function generateWorkoutPlan(goals: User['goals']): Record<string, Exercise[]> {
  const exercisePool = goals.location === 'home' ? homeExercises : exercises;
  const typeExercises = exercisePool[goals.type];
  
  const workoutDays = {
    'Lundi': [] as Exercise[],
    'Mardi': [] as Exercise[],
    'Mercredi': [] as Exercise[],
    'Jeudi': [] as Exercise[],
    'Vendredi': [] as Exercise[],
    'Samedi': [] as Exercise[],
    'Dimanche': [] as Exercise[]
  };

  const daysOfWeek = Object.keys(workoutDays);
  const workoutDaysCount = goals.frequency;
  const restDays = 7 - workoutDaysCount;

  // Répartir les jours de repos
  const restDayIndices = Array.from({ length: restDays }, (_, i) => 
    Math.floor(i * (7 / restDays))
  );

  goals.focusAreas.forEach((area, index) => {
    const exercises = typeExercises[area];
    if (!exercises) return;

    const dayIndex = index % workoutDaysCount;
    const workoutDay = daysOfWeek[dayIndex];
    
    if (!restDayIndices.includes(dayIndex)) {
      workoutDays[workoutDay].push(
        ...exercises.map(ex => ({ ...ex, completed: false }))
      );
    }
  });

  return workoutDays;
}