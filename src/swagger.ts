import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'SGI-CFA',
        description: 'SGI-CFA project for logistic app',
        tags: ["All"]
    },
    servers: [
        {
            url: "http://localhost:8000",
            description: 'Localhost server'
        },
        {
            url: "http://localhost:3000",
            description: 'Staging server'
        },
    ],
    
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        },
        schemas: {
            loginSchema: {
                $email: 'johno@sample.com',
                $password: "password",
            },
            registerSchema: {
                $email: 'johno@sample.com',
                $password: "password",
                $fullname: "John doe",
                $phone: "08012345678"
            },
            forgotPasswordSchema: {
                $email: 'johno@sample.com',
            },
            verifyTokenSchema: {
                $otp: '123456',
            },
            resetPasswordSchema: {
                $otp: 'johno@sample.com',
                $password: 'Password'
            },
        },
    },
    tags: [
      {
        name: 'Users',
        description: 'Users endpoints for truck owners',
      },
      {
        name: 'Admin',
        description: 'Admin endpoints for all administrative users',
      },
      {
        name: 'Driver',
        description: 'Drivers endpoints',
      },
      {
        name: 'Auth',
        description: 'Authentication encpoints for all users',
      },
    ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated');
    // Optionally: Start the TypeScript compilation or another task if needed
  });