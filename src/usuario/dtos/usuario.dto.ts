import {IsAlphanumeric, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";
import { EstadoUsuarioEnum } from "../enums/usuario.enum";

export class CreateUsuarioDto {
    @IsOptional()
    @IsInt()
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly nombre?: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email?: string;

    @IsNotEmpty()
    @IsString()
    readonly rol?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    estado?: EstadoUsuarioEnum;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsOptional()
    @IsString()
    fechaUltimoAcceso?: string;

    @IsOptional()
    @IsString()
    fechaActualizacionPassword?: string;

    @IsOptional()
    @IsNumber()
    actualizadoPassword?: 1 | 0
}
