module.exports = {
  apps: [
    {
      name: 'backend-chatbot-epn',
      script: 'dist/main.js',
      env: {
        //* Ambiente de QA
        "NODE_ENV": 'test',
        "PORT": '3005',
        //* SEGURIDAD
        "SEGURIDAD": true,
        // TODO: db rapidazo y parametrica
        "DATABASE_HOST": 'database-chatbot-epn.cxmuqgq08wc4.us-east-2.rds.amazonaws.com',
        "DATABASE_PORT": '3306',
        "DATABASE_NAME": 'BACKOFFICE_CHATBOT',
        "DATABASE_SYNCHRONIZE": false,
        // TODO: credenciales db
        "DATABASE_USER":
          'admin',
        "DATABASE_PASSWORD":
          'chatbotEpn2024',
      },
      env_production: {
        //* Ambiente de PROD
        "NODE_ENV": 'production',
        "PORT": '3005',
        //* SEGURIDAD
        "SEGURIDAD": true,
        // TODO: db rapidazo y parametrica
        "DATABASE_HOST": 'database-chatbot-epn.cxmuqgq08wc4.us-east-2.rds.amazonaws.com',
        "DATABASE_PORT": '3306',
        "DATABASE_NAME": 'BACKOFFICE_CHATBOT',
        "DATABASE_SYNCHRONIZE": false,
        // TODO: credenciales db
        "DATABASE_USER":
          'admin',
        "DATABASE_PASSWORD":
          'chatbotEpn2024',
      },
    },
  ],
};
