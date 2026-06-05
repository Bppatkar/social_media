import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Media API',
      version: '1.0.0',
      description: 'Backend API documentation for Social Media App',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },

    security: [{ cookieAuth: [] }],
  },
  apis: ['./src/routes/**/*.ts'],
});

// console.log(Object.keys(swaggerSpec.paths));
