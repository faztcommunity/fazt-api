import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import path from 'path';

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: 'Fazt Community API',
    version: '1.0.0',
    description: 'Servicios REST para la aplicación de Fazt Community'
  },
  host: 'localhost:4000',
  basePath: '/',
  openapi: '3.0.0'
};

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [path.resolve(__dirname, '../../docs/**/*.yml')]
});
