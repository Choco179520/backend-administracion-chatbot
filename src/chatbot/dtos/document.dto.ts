import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateDocumentDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly title?: string;

  @IsNotEmpty()
  @IsInt()
  readonly idChatbot?: number;

  @IsOptional()
  @IsNumber()
  readonly estado? = 1 | 0;
}

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
