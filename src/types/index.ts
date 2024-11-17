export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  goals: {
    type: 'muscle' | 'athletic' | 'endurance' | 'strength';
    focusAreas: string[];
    frequency: number;
    location: 'home' | 'gym';
    weightGoal: 'gain' | 'loss' | 'maintain';
  };
}

export interface Exercise {
  name: string;
  sets: string;
  completed: boolean;
}

export type Workouts = Record<string, Exercise[]>;