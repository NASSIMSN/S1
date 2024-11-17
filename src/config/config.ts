interface Config {
  databaseUrl: string;
  jwtSecret: string;
  adminEmail: string;
  adminPassword: string;
}

export const config: Config = {
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin'
};