import { IsInt, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsSemVer, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateUtteranceDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly utterance?: string;

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

export class UpdateUtteranceDto extends PartialType(CreateUtteranceDto) {}
