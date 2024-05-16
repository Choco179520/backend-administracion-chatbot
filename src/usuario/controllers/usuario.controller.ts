import { UsuarioService } from "../services/usuario.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
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
import { CreateUsuarioDto, UpdateUsuarioDto } from "../dtos/usuario.dto";
import { FilterDto } from "src/common/enums/filter.dto";

@ApiTags("Usuario")
// @UseGuards(ProtegerControllerGuard, RolesGuard)
@Controller("usuario")
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService) {}

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

  @ApiOperation({
    description: "Obtener los usuarios registrados en base de datos",
  })
  @ApiResponse({ status: 403, description: "No existe registros." })
  @Get("find-all")
  async obtenerUsuarios(@Query() criterioBusqueda) {
    if (Object.keys(criterioBusqueda).length !== 0) {
      criterioBusqueda = JSON.parse(criterioBusqueda?.criterioBusqueda);
      return await this._usuarioService.buscarPorParametros(
        criterioBusqueda,
        "many"
      );
    }
    return await this._usuarioService.buscarTodos();
  }

  @ApiOperation({
    description: "Obtener informacion de usuarios mediante params",
  })
  @Get("find-params")
  async findParams(@Query() criterioBusqueda: FilterDto) {
    if (Object.keys(criterioBusqueda).length !== 0) {
      return await this._usuarioService.buscarTodos(criterioBusqueda);
    }
  }

  @ApiOperation({
    description: "Actualizar informacion del usuario en base de datos",
  })
  @Roles("ADMIN")
  @Put("update/:id")
  async actualizarUsuario(
    @Param("id") id: number,
    @Body() payload: UpdateUsuarioDto
  ) {
    return await this._usuarioService.actualizarPorId(id, payload);
  }

  @ApiOperation({
    description: "Delete informacion del usuario en base de datos",
  })
  @Roles("ADMIN")
  @Delete("delete/:id")
  async eliminarUsuario(
    @Param("id") id: number,
  ) {
    console.log(id, 'id number....');
    return await this._usuarioService.deletePorId(id);
  }
}
