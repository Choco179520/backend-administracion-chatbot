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
import { LoginDto } from "src/auth/dtos/login.dtos";
import { FilterDto } from "src/common/enums/filter.dto";
import { CreateUsuarioDto } from "src/usuario/dtos/usuario.dto";
import { UsuarioService } from "src/usuario/services/usuario.service";

@ApiTags("Usuario")
// @UseGuards(ProtegerControllerGuard, RolesGuard)
@Controller("usuario")
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService) {}

  @ApiOperation({ description: "Iniciar sesión de usuario" })
  @ApiResponse({
    status: 201,
    description: "Se ingresado exitosamente al aplicativo.",
  })
  @ApiResponse({
    status: 400,
    description: "BAD_REQUEST :: Usuario no registrado.",
  })
  @PublicAccess()
  @Post("inicio-sesion")
  async iniciarSesion(@Body() payload: LoginDto) {
    return await this._usuarioService.validarUsuario(
      payload.email,
      payload.password
    );
  }

  @ApiOperation({ description: "Registrar usuario en base de datos" })
  @ApiResponse({
    status: 201,
    description: "Se a creado exitosamente el registro.",
  })
  @ApiResponse({
    status: 400,
    description: "BAD_REQUEST :: No se encontraron registros.",
  })
  @Roles("ADMIN")
  @AdminAccess()
  @Post("create")
  async crearUsuario(@Body() payload: CreateUsuarioDto) {
    return await this._usuarioService.registrarUsuario(payload);
  }
}
