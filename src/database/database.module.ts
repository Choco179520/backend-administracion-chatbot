import {Global, Module} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import config from '../environment/config';
import {Crypto} from '../common/middlewares/crypto';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ENTIDADES_APLICATIVO} from '../common/entidades-aplicativo';
import {MongooseModule} from "@nestjs/mongoose";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'default',
            useFactory: (_configService: ConfigType<typeof config>) => {
                const env = process.env.NODE_ENV ?? 'dev';
                const {port, database, password, username, schema, host} =
                    _configService.db;

                /** Validar si es local o en desarrollo (only credentials DB) */
                let user = username;
                let pass = password;

                if (env != 'dev') {
                    user = Crypto.RsaDesencryptDb(username);
                    pass = Crypto.RsaDesencryptDb(password);
                }

                /** Config del typeorm */
                const typeorm_config: any = {
                    type: 'mssql',
                    host,
                    port,
                    username: user,
                    password: pass,
                    database,
                    schema,
                    // logging: true,
                    synchronize: true,
                    entities: ENTIDADES_APLICATIVO,
                    options: {
                        encrypt: true,
                        enableArithAbort: true,
                    },
                    extra: {
                        trustServerCertificate: true,
                    },
                    requestTimeout: 300000,
                };
                return typeorm_config;
            },
            inject: [config.KEY],
        }),
        MongooseModule.forRoot(
            'mongodb+srv://proyecto:Cz45StecpjEGt3uN@proyectos.k24kntm.mongodb.net/back-office',
        ),
    ],
})
export class DatabaseModule {
}
