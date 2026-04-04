module.exports = {
  apps: [{
    name: 'uccz-backend',
    script: './dist/server.js',
    env: {
      NODE_ENV: 'production',
      // Option A: manually list variables
      // DATABASE_URL: 'your_db_url',
      // ...
    },
    // Option B: load from .env file using 'dotenv' package
    // You need to install dotenv (npm install dotenv) and require it in your script.
    // Then PM2 will inherit the variables loaded by dotenv.
  }]
}