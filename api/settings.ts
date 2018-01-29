export const env = (process.env.NODE_ENV || 'development').trim();

export const isDevelopment = env === 'development';
