import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { EstadoUsuarioEnum } from "../enums/usuario.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
  @IsOptional()
  @IsInt()
  readonly id: number;

  @ApiProperty({
    description: "Nombre usuario",
    example: "JONATHAN JAVIER PARRA SOCASI",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly nombre?: string;

  @ApiProperty({
    description: "Correo electronico institucional",
    example: "jonathan.parra01@epn.edu.ec",
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({
    description: "Rol de usuario",
    example: "ADMIN | PUBLIC",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly rol?: string;

  @ApiProperty({
    description: "Contraseña de usuario",
    example: "EPN292383",
    type: String,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: "Estado del usuario",
    example: "ACT | INAC | PEND_ACT",
    type: String,
  })
  @IsOptional()
  @IsString()
  estado?: EstadoUsuarioEnum;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiProperty({
    description: "Fecha de último inicio de sesión",
    example: "2024-07-20 10:23:00",
    type: String,
  })
  @IsOptional()
  @IsString()
  fechaUltimoAcceso?: string;

  @ApiProperty({
    description: "Fecha de última actualización de contraseña",
    example: "2024-07-20 10:23:00",
    type: String,
  })
  @IsOptional()
  @IsString()
  fechaActualizacionPassword?: string;

  @ApiProperty({
    description: "Contraseña restablecida",
    example: "1 | 0",
    type: String,
  })
  @IsOptional()
  @IsNumber()
  actualizadoPassword?: 1 | 0;
}
