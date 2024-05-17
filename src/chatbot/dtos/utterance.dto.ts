import { IsInt, IsJSON, IsNotEmpty, IsOptional, IsSemVer, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateUtteranceDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly utterance?: string;

  @IsOptional()
  @IsInt()
  readonly document?: number;
}

export class UpdateUtteranceDto extends PartialType(CreateUtteranceDto) {}
