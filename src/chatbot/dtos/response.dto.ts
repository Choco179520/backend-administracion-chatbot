import { IsInt, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateResponseDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly response?: string;

  @IsOptional()
  @IsNumber()
  readonly estado? = 1 | 0;

  @IsOptional()
  @IsNumber()
  readonly eliminar? = 1 | 0;

  @IsOptional()
  @IsInt()
  readonly document?: number;
}

export class UpdateResponseDto extends PartialType(CreateResponseDto) {}
