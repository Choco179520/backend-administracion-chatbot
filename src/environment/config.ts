import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import config from './config';
import { environments } from './environment';
import * as Joi from 'joi';
import * as process from 'process';

export default registerAs('config', () => {
  return {
    port: process.env.PORT,
    portSockets: process.env.PORT_SOCKETS,
    configuracion: {
      certificatePassword: process.env.CERTIFICATE_PASSWORD,
      secreto: process.env.SECRETO,
      hashSalt: process.env.HASH_SALT,
      passwordGenerico: process.env.PASSWORD_GENERICO,
      expiracion: process.env.EXPIRACION,
      seguridad: process.env.SEGURIDAD,
      horaInicio: process.env.HORA_INICIO,
      horaFin: process.env.HORA_FIN,
    },
    db: {
      port: Number(process.env.DATABASE_PORT),
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      schema: process.env.DATABASE_SCHEMA,
    },
    dbMongo: {
      host: process.env.DATABASE_HOST_MONGO,
      username: process.env.DATABASE_USER_MONGO,
      password: process.env.DATABASE_PASSWORD_MONGO,
      database: process.env.DATABASE_NAME_MONGO,
    },
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

    /** Database Mongo **/
    DATABASE_HOST_MONGO: Joi.string().required(),
    DATABASE_USER_MONGO: Joi.string().required(),
    DATABASE_PASSWORD_MONGO: Joi.string().required(),
    DATABASE_NAME_MONGO: Joi.string().required(),
  }),
  expandVariables: true,
};
