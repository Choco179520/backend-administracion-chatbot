import {IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";

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
    readonly telefono?: string;

    @IsOptional()
    @IsString()
    fechaUltimoAcceso?: string;

    @IsOptional()
    @IsString()
    fechaRegistro?: string;

    @IsNotEmpty()
    @IsString()
    readonly rol?: string;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsOptional()
    @IsNumber()
    readonly estado? = 1 | 0;
}
