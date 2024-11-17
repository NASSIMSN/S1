import { prisma } from '../config/database';
import { hashPassword, verifyPassword, generateToken } from '../lib/auth';
import { User, Goals } from '../types';

export async function createUser(userData: {
  email: string;
  password: string;
  firstName: string;
  goals: Goals;
}): Promise<{ user: User; token: string }> {
  const hashedPassword = await hashPassword(userData.password);
  
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      goals: {
        create: {
          type: userData.goals.type,
          focusAreas: JSON.stringify(userData.goals.focusAreas),
          frequency: userData.goals.frequency,
          location: userData.goals.location,
          weightGoal: userData.goals.weightGoal,
          dailyCalories: userData.goals.dailyCalories || 2000
        }
      }
    },
    include: {
      goals: true
    }
  });

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      goals: {
        type: user.goals!.type as 'muscle' | 'athletic',
        focusAreas: JSON.parse(user.goals!.focusAreas),
        frequency: user.goals!.frequency,
        location: user.goals!.location as 'home' | 'gym',
        weightGoal: user.goals!.weightGoal as 'gain' | 'loss' | 'maintain',
        dailyCalories: user.goals!.dailyCalories
      }
    },
    token
  };
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { goals: true }
  });

  if (!user || !await verifyPassword(password, user.password)) {
    return null;
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      goals: {
        type: user.goals!.type as 'muscle' | 'athletic',
        focusAreas: JSON.parse(user.goals!.focusAreas),
        frequency: user.goals!.frequency,
        location: user.goals!.location as 'home' | 'gym',
        weightGoal: user.goals!.weightGoal as 'gain' | 'loss' | 'maintain',
        dailyCalories: user.goals!.dailyCalories
      }
    },
    token
  };
}

export async function updateUserGoals(userId: string, goals: Goals): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      goals: {
        update: {
          type: goals.type,
          focusAreas: JSON.stringify(goals.focusAreas),
          frequency: goals.frequency,
          location: goals.location,
          weightGoal: goals.weightGoal,
          dailyCalories: goals.dailyCalories
        }
      }
    },
    include: { goals: true }
  });

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    goals: {
      type: updatedUser.goals!.type as 'muscle' | 'athletic',
      focusAreas: JSON.parse(updatedUser.goals!.focusAreas),
      frequency: updatedUser.goals!.frequency,
      location: updatedUser.goals!.location as 'home' | 'gym',
      weightGoal: updatedUser.goals!.weightGoal as 'gain' | 'loss' | 'maintain',
      dailyCalories: updatedUser.goals!.dailyCalories
    }
  };
}