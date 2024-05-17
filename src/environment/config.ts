import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import config from './config';
import { environments } from './environment';
import * as Joi from 'joi';
import * as process from 'process';

export default registerAs('config', () => {
  return {
    port: process.env.PORT,
    configuracion: {
      certificatePassword: process.env.CERTIFICATE_PASSWORD,
      secreto: process.env.SECRETO,
      hashSalt: process.env.HASH_SALT,
      passwordGenerico: process.env.PASSWORD_GENERICO,
      expiracion: process.env.EXPIRACION,
      seguridad: process.env.SEGURIDAD,
    },
    db: {
      port: Number(process.env.DATABASE_PORT),
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      schema: process.env.DATABASE_SCHEMA,
    },
    url_chatbot: process.env.URL_CHATBOT_DB
  };
});

export const CONFIG_MODULE: ConfigModuleOptions = {
  envFilePath: environments[process.env.NODE_ENV || '.env'],
  load: [config],
  isGlobal: true,
  validationOptions: Joi.object({
    /** Server */
    PORT: Joi.number().required(),
    PORT_SOCKETS: Joi.number().required(),
    CERTIFICATE_PASSWORD: Joi.string().required(),
    SECRETO: Joi.string().required(),
    HASH_SALT: Joi.number().required(),
    PASSWORD_GENERICO: Joi.string().required(),
    EXPIRACION: Joi.string().required(),

    /** Database SQL */
    DATABASE_PORT: Joi.number().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_SCHEMA: Joi.string().required(),

    /** URL conexion api de chatbot */
    URL_CHATBOT_DB: Joi.string().required(),
  }),
  expandVariables: true,
};
