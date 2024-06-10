import {Global, Module} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import config from '../environment/config';
import {Crypto} from '../common/middlewares/crypto';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ENTIDADES_APLICATIVO} from '../common/entidades-aplicativo';

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
                    type: 'mysql',
                    // url,
                    host,
                    port,
                    username: user,
                    password: pass,
                    database,
                    // logging: true,
                    // synchronize: true,
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
    ],
})
export class DatabaseModule {
}
