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
          'VSSqcq/tIFgbKdVUxacyC3VJyGqq521yxZsGOUvYDUjR7kwWoHS3wz0ASyR+QD99Z/rlNXgv8S6CGTKvl6nccEKTH4G9i5WDyYdO5YAQd4m7+P+JNIBL4vyb1ioXq1yYyS3P3tYimy7Yzb+bkeggV8fd0j2ffIDldo4r+v7mPnwLJU7hmW3nO381Hif8PFCT1Q95H502lxBZbmFNUeDKQQ8gdFgallmwqZb1QIh/U6aI/sPGWdNjC+tUEp91t1zVxFZiw3YiEAAvrKWFKZjqh6pUnTvdo7JyQoAbqaxQiwXTLqsqvU4KW7AeQiWpo/QiUEMIgpiGx+EaHMIciB8qzY2oEz1N0z4ser7SHtFXbbRK8KOkSY1W6eCdzTP9yL2GZgEj+LCXitFr5WZta2OB6mdGum6v+bpwM3fLEHp6pLNEh/w+uZU48KhHm8iL4JsfG/Nf5dJezk2z2ofW4qTf4iq3LyUdIMJHcGzq3f1lt9aGF1St/jfldn60kOzc5p/S0O0guKMCRoZ1rd+uxi0nnnvF9DARZmzi+kjwVkEocqamDt6hl29LRB9ARpI/7VYUGLDZEO7bzQ9tSmYyp0CUtgYLKrOg9LHF0orj8iCF3S6DZw9hbpYKXltbMNzyzHgDOcOr9M0typBJJ67ahtFfFZ12K+Bk3q1w+H4a8U2Cxf4=',
        "DATABASE_PASSWORD":
          'Urmw7bYH9trTnynwTZ8ubIawNhzFUk/bOEI3Ft4t07LSYMhUTZDHwo/P6tRcHHEQcalxUmBxzYhdFQE2+tncOIUJRYCn+9buyfnEiLcywnlJtIfE+i3VJkLcFb60WkMg5g4zYFqXS3wAQfh+GgYeSLYQzZHCNSxw+xqqt1qLw1E8ESGZpHsFwPufcZP5VYqRNV7i4E76pXZlSUkgXD9+wAn23kv+dfHFP/zhmTcSWx8gDGRdPCsUuXeia/cAM4YBvK4CqejZbEdqhC2HMP47zocAZhl4CBuOmO0yiHSELhoWihsyfLNqu/LclVDZK3jdukf4ZHgs130N+tzisyGZI7luza46s74GhQw+gzQ/2B4F3fvQhC2TaknSLef7sg/HCUTGDxeOj8EYZEfrEimMkzb0Biq4EAyRHGScTG/rltONPflppYcrEhxzQbMGSFgBotRYsBlsdAOib3m2evU4wHNHkZdc8pZau1OYzxt74SdM0OxCswSQBNR9RzV4kPTRkr9cqwcdwM7jX4NSosyk77AL/X50YdRqA0yCpGeRc3kIAGu07GjHQjoiN45a4f5W/yg2r9nLlm1ols37x8o1Diti9/JAkmRM/hKW5DFHf/zWwc6x+qIiobx/++3/aRjmNWSB3cJzbvMxTtezpzfhPbCbpAI6Mc0t40AAXohOpZ4=',
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
          'VSSqcq/tIFgbKdVUxacyC3VJyGqq521yxZsGOUvYDUjR7kwWoHS3wz0ASyR+QD99Z/rlNXgv8S6CGTKvl6nccEKTH4G9i5WDyYdO5YAQd4m7+P+JNIBL4vyb1ioXq1yYyS3P3tYimy7Yzb+bkeggV8fd0j2ffIDldo4r+v7mPnwLJU7hmW3nO381Hif8PFCT1Q95H502lxBZbmFNUeDKQQ8gdFgallmwqZb1QIh/U6aI/sPGWdNjC+tUEp91t1zVxFZiw3YiEAAvrKWFKZjqh6pUnTvdo7JyQoAbqaxQiwXTLqsqvU4KW7AeQiWpo/QiUEMIgpiGx+EaHMIciB8qzY2oEz1N0z4ser7SHtFXbbRK8KOkSY1W6eCdzTP9yL2GZgEj+LCXitFr5WZta2OB6mdGum6v+bpwM3fLEHp6pLNEh/w+uZU48KhHm8iL4JsfG/Nf5dJezk2z2ofW4qTf4iq3LyUdIMJHcGzq3f1lt9aGF1St/jfldn60kOzc5p/S0O0guKMCRoZ1rd+uxi0nnnvF9DARZmzi+kjwVkEocqamDt6hl29LRB9ARpI/7VYUGLDZEO7bzQ9tSmYyp0CUtgYLKrOg9LHF0orj8iCF3S6DZw9hbpYKXltbMNzyzHgDOcOr9M0typBJJ67ahtFfFZ12K+Bk3q1w+H4a8U2Cxf4=',
        "DATABASE_PASSWORD":
          'Urmw7bYH9trTnynwTZ8ubIawNhzFUk/bOEI3Ft4t07LSYMhUTZDHwo/P6tRcHHEQcalxUmBxzYhdFQE2+tncOIUJRYCn+9buyfnEiLcywnlJtIfE+i3VJkLcFb60WkMg5g4zYFqXS3wAQfh+GgYeSLYQzZHCNSxw+xqqt1qLw1E8ESGZpHsFwPufcZP5VYqRNV7i4E76pXZlSUkgXD9+wAn23kv+dfHFP/zhmTcSWx8gDGRdPCsUuXeia/cAM4YBvK4CqejZbEdqhC2HMP47zocAZhl4CBuOmO0yiHSELhoWihsyfLNqu/LclVDZK3jdukf4ZHgs130N+tzisyGZI7luza46s74GhQw+gzQ/2B4F3fvQhC2TaknSLef7sg/HCUTGDxeOj8EYZEfrEimMkzb0Biq4EAyRHGScTG/rltONPflppYcrEhxzQbMGSFgBotRYsBlsdAOib3m2evU4wHNHkZdc8pZau1OYzxt74SdM0OxCswSQBNR9RzV4kPTRkr9cqwcdwM7jX4NSosyk77AL/X50YdRqA0yCpGeRc3kIAGu07GjHQjoiN45a4f5W/yg2r9nLlm1ols37x8o1Diti9/JAkmRM/hKW5DFHf/zWwc6x+qIiobx/++3/aRjmNWSB3cJzbvMxTtezpzfhPbCbpAI6Mc0t40AAXohOpZ4=',
      },
    },
  ],
};
