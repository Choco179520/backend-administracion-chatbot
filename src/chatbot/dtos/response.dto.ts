import { IsInt, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateResponseDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly response?: string;

  @IsOptional()
  @IsInt()
  readonly document?: number;
}

export class UpdateResponseDto extends PartialType(CreateResponseDto) {}
