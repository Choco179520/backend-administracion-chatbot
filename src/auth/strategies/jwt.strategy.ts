import {Inject, Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from "../../environment/config";
import {ConfigType} from "@nestjs/config";
import {Crypto} from "../../common/middlewares/crypto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
      @Inject(config.KEY)
      private readonly _configService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Crypto.RsaDesencryptDb(_configService.configuracion.secreto),
    });
  }

  validate(payload) {
    return payload;
  }
}
