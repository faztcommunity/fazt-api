// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

const ENV: NodeJS.ProcessEnv = process.env;

export const PORT = ENV.PORT || 3000;
export const MONGODB_URI = ENV.MONGODB_URI || 'mongodb://localhost/faztdb';
export const JWT_SECRET = ENV.JWT_SECRET || 'somesecret';
export const TOKEN_EXPIRY_TIME = ENV.TOKEN_EXPIRY_TIME || '1h';
