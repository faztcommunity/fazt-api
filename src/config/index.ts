import { config } from 'dotenv';

config();

const ENV: NodeJS.ProcessEnv = process.env;

export const PORT = ENV.PORT || 4000;
export const JWT_SECRET = ENV.JWT_SECRET || 'secretword';

export const ADMIN_EMAIL = ENV.ADMIN_EMAIL || 'admin@faztcommunity.dev';
export const ADMIN_USERNAME = ENV.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = ENV.ADMIN_PASSWORD || 'admin';
