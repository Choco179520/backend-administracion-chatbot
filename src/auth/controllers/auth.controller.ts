import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ProtegerControllerGuard } from "../../common/guards/proteger-controller.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import {
  AdminAccess,
  PublicAccess,
  Roles,
} from "src/common/decorators/decoradores-aplicativo.decorators";
import { LoginDto, ResetPasswordDto } from "src/auth/dtos/login.dtos";
import { FilterDto } from "src/common/enums/filter.dto";
import { CreateUsuarioDto } from "src/usuario/dtos/usuario.dto";
import { UsuarioService } from "src/usuario/services/usuario.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly _usuarioService: UsuarioService) {}

  @ApiOperation({ description: "Iniciar sesión de usuario" })
  @ApiResponse({
    status: 201,
    description: "Se ingresado exitosamente al aplicativo.",
  })
  @PublicAccess()
  @Post("inicio-sesion")
  async iniciarSesion(@Body() payload: LoginDto) {
    return await this._usuarioService.validarUsuario(
      payload.email,
      payload.password
    );
  }

  @ApiOperation({ description: "Iniciar sesión de usuario" })
  @PublicAccess()
  @Post("cambiar-contrasenia")
  async cambiarContrasenia(@Body() payload: ResetPasswordDto) {
    return await this._usuarioService.cambiarContrasenia(
      payload
    );
  }
}
