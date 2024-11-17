import { prisma } from '../config/database';

export async function logCalories(userId: string, data: {
  calories: number;
  description: string;
  type: 'food' | 'exercise';
}) {
  return prisma.calorieLog.create({
    data: {
      userId,
      ...data
    }
  });
}

export async function getCalorieLogs(userId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.calorieLog.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay
      }
    },
    orderBy: { date: 'desc' }
  });
}

export async function logWeight(userId: string, weight: number) {
  return prisma.weightLog.create({
    data: {
      userId,
      weight
    }
  });
}

export async function getWeightLogs(userId: string) {
  return prisma.weightLog.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 30
  });
}