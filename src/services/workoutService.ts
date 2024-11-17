import { prisma } from '../config/database';
import { Exercise } from '../types';

export async function saveWorkout(userId: string, day: string, exercises: Exercise[]) {
  return prisma.workout.create({
    data: {
      userId,
      day,
      exercises: {
        create: exercises.map(exercise => ({
          name: exercise.name,
          sets: exercise.sets,
          completed: exercise.completed
        }))
      }
    }
  });
}

export async function getWorkouts(userId: string) {
  const workouts = await prisma.workout.findMany({
    where: { userId },
    include: { exercises: true },
    orderBy: { date: 'desc' },
    take: 7
  });

  return workouts.reduce((acc, workout) => {
    acc[workout.day] = workout.exercises.map(exercise => ({
      name: exercise.name,
      sets: exercise.sets,
      completed: exercise.completed
    }));
    return acc;
  }, {} as Record<string, Exercise[]>);
}

export async function updateExerciseStatus(workoutId: string, exerciseId: string, completed: boolean) {
  return prisma.exercise.update({
    where: { id: exerciseId },
    data: { completed }
  });
}