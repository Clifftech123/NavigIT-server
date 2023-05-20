
// This file contains all the environment variables used in the application. All the variables are defined in the .env file in the root directory of the project. The variables are accessed using the process.env object.
export default {
    port: 'PORT',
    postgresConfig: {
      host: 'POSTGRES_HOST',
      port: 'POSTGRES_PORT',
      username: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
      database: 'POSTGRES_DB',
    },

    // Redis config for caching and storing refresh tokens
    accessTokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
    accessTokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
    refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
    refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',
  };
  
  