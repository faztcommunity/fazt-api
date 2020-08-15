import { config } from 'dotenv';

config();

const ENV: NodeJS.ProcessEnv = process.env;

export const PORT = ENV.PORT || 3000;
export const JWT_SECRET = ENV.JWT_SECRET || 'secretword';
