import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {Crypto} from '../middlewares/crypto';
import {ConfigType} from '@nestjs/config';
import config from '../../environment/config';
import {Reflector} from "@nestjs/core";
import {PUBLIC_KEY} from "../constantes/key-decoradores";

@Injectable()
export class ProtegerControllerGuard implements CanActivate {
    constructor(
        @Inject(config.KEY)
        private readonly _configService: ConfigType<typeof config>,
        private readonly _reflector: Reflector,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const esPublico = this._reflector.get<boolean>(
            PUBLIC_KEY,
            context.getHandler()
        )

        if (esPublico) {
            return true
        }

        const request = context.switchToHttp().getRequest();

        if (request.headers?.authorization) {
            const autorizacion = request.headers.authorization.split(' ');
            if (autorizacion[0] !== 'Bearer') {
                throw new HttpException('Token invalido', HttpStatus.FORBIDDEN);
            } else {
                const token = autorizacion[1];
                try {
                    const verificar = jwt.verify(token, Crypto.RsaDesencryptDb(this._configService.configuracion.secreto));
                    request.decoded = verificar;

                    request.id = request.decoded.sub;
                    request.rolUsuario = request.decoded.rol;
                    return true;
                } catch (error) {
                    const mensaje = 'Error token: ' + (error.message || error.name);
                    throw new HttpException(mensaje, HttpStatus.FORBIDDEN);
                }
            }
        } else {
            throw new HttpException('Token invalido', HttpStatus.FORBIDDEN);
        }
        return true;
    }
}
