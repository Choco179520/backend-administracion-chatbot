import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "Correo electronico personal para registrar",
    example: "coordinador.aplicacionesmoviles@imaksmart.com",
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "JONATHANP1795",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: "Email del usuario",
    example: "*******",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly email?: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "JONATHANP1795",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: "Nueva contraseña del usuario",
    example: "JON795",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
