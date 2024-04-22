import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject, UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Crypto } from '../middlewares/crypto';
import { ConfigType } from '@nestjs/config';
import config from '../../environment/config';
import {Reflector} from "@nestjs/core";
import {ADMIN_KEY, PUBLIC_KEY, ROLES_KEY} from "../constantes/key-decoradores";
import {ROLES} from "../constantes/constantes-generales";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(config.KEY)
    private readonly _configService: ConfigType<typeof config>,
    private readonly _reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const esPublico = this._reflector.get<boolean>(
        PUBLIC_KEY,
        context.getHandler()
    )

    if (esPublico) {
      return true
    }

    const roles = this._reflector.get<Array<keyof typeof ROLES>>(
        ROLES_KEY,
        context.getHandler
    )

    const admin = this._reflector.get<string>(
        ADMIN_KEY,
        context.getHandler()
    )

    const request = context.switchToHttp().getRequest();

    const {rolUsuario, id} = request;

    if (roles == undefined) {
      if (!admin) {
        return true
      } else if (admin && rolUsuario === admin[0]) {
        return true
      } else {
        throw new UnauthorizedException('No tienes permisos para realizar esta operación')
      }
    }

    if(rolUsuario === ROLES.ADMIN){
      return true
    }

    const estaLogueado = roles.some((rol) => rol === rolUsuario)

    if (!estaLogueado) {
      throw new UnauthorizedException('No tienes permisos para realizar esta operación')
    }
    return true;
  }
}
