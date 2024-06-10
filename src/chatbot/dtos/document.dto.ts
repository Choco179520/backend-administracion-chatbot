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

  @IsOptional()
  @IsInt()
  readonly idChatbot?: number;

  @IsOptional()
  @IsNumber()
  readonly estado? = 1 | 0;

  @IsOptional()
  @IsNumber()
  readonly eliminar? = 1 | 0;

  @IsOptional()
  @IsString()
  fechaCreacion?: string;

  @IsOptional()
  @IsString()
  readonly expression?: string;

  @IsOptional()
  @IsString()
  readonly type?: string;

  @IsOptional()
  @IsString()
  readonly content?: string;

  @IsOptional()
  @IsString()
  readonly action?: string;

  @IsOptional()
  @IsString()
  readonly path?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly alt?: string;
}

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @IsOptional()
  @IsString()
  fechaActualizacion?: string;

  @IsOptional()
  @IsString()
  fechaSolicitudEliminacion?: string;
}
