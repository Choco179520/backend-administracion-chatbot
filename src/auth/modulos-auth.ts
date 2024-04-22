import {JwtModule} from '@nestjs/jwt';
import config from "../environment/config";
import {ConfigModule, ConfigType} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";

export const MODULOS_AUTH = [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (_configService: ConfigType<typeof config>) => {
            return {
                secret: _configService.configuracion.secreto,
                signOptions: {
                    expiresIn: _configService.configuracion.expiracion
                },
            };
        },
        inject: [config.KEY],
    }),
];
