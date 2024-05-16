import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrincipalService } from "../../common/funciones/principal-services";
import { UsuarioEntity } from "../entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsuarioDto, UpdateUsuarioDto } from "../dtos/usuario.dto";
import * as moment from "moment";
import * as bcrypt from "bcrypt";
import { ConfigType } from "@nestjs/config";
import config from "../../environment/config";
import { Crypto } from "../../common/middlewares/crypto";
import { ErrorManager } from "../../common/error.manager";
import * as jwt from "jsonwebtoken";
import { PayloadToken } from "../../common/interfaces/interfaces";

@Injectable()
export class UsuarioService extends PrincipalService<
  UsuarioEntity,
  CreateUsuarioDto,
  UpdateUsuarioDto
> {
  constructor(
    @InjectRepository(UsuarioEntity)
    private _usuarioRepository: Repository<UsuarioEntity>,
    @Inject(config.KEY)
    private readonly _configService: ConfigType<typeof config>
  ) {
    super(_usuarioRepository, "usuario", new Logger(UsuarioService.name));
  }

  async registrarUsuario(payload: CreateUsuarioDto) {
    try {
      const fecha = moment().format("YYYY-MM-DD HH:mm:ss");
      payload.fechaRegistro = fecha;
      return await this.crearUno(payload);
    } catch (error) {
      Logger.error(
        "Registrar usuario en base de datos",
        "",
        "ERROR SERVICIO - REGISTRAR USUARIO"
      );
      Logger.error("_usuarioRepository.registrarUsuario(), ocurrio un error");
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async validarUsuario(email: string, password: string) {
    try {
      const usuarioConsulta = await this.buscarPorParametros(
        { where: { email, estado: 1 } },
        "one"
      );

      if (!usuarioConsulta) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "Usuario no se encontra registrado o deshabilitado",
        });
      }

      const comparar = await bcrypt.compare(password, usuarioConsulta.password);

      if (!comparar) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "La contraseña ingresada es incorrecta",
        });
      }

      if (!usuarioConsulta.actualizoPassword) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "La contraseña no ha sido restablecida",
        });
      }

      const payload: PayloadToken = {
        rol: usuarioConsulta.rol,
        sub: usuarioConsulta.id,
      };

      const fechaUltimo = {
        fechaUltimoAcceso: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      await this._usuarioRepository.update(usuarioConsulta.id, fechaUltimo);

      return {
        accessToken: jwt.sign(
          payload,
          Crypto.RsaDesencryptDb(this._configService.configuracion.secreto),
          {
            expiresIn: this._configService.configuracion.expiracion,
          }
        ),
        usuarioConsulta,
      };
    } catch (error) {
      Logger.error(
        "Iniciar sesion usuario",
        "",
        "ERROR SERVICIO - INICIAR SESION"
      );
      Logger.error("_usuarioRepository.iniciarSesion(), ocurrio un error");
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
