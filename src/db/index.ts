import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Hardcoding the connection details to bypass .env entirely
const client = postgres({
  host: 'db.vcivshhvpeopnaibmthf.supabase.co',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: '@Matage123.',
  ssl: 'require',
  connect_timeout: 60, // Doubled to 60 seconds
  idle_timeout: 60,
});

export const db = drizzle(client, { schema });
