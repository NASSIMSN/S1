import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { config } from '../config/config';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' });
}

export async function verifyToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });
    return user ? decoded.userId : null;
  } catch {
    return null;
  }
}