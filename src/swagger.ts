import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Swagger Demo Project',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: process.env.BASE_URL,
            description: ''
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
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated');
    // Optionally: Start the TypeScript compilation or another task if needed
  });