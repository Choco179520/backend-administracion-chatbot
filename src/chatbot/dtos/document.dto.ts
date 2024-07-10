import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDocumentDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @ApiProperty({
    description: "title",
    example: "Proceso de Reingreso a Pregrado EPN",
    type: String,
    required: true
  })
  @IsNotEmpty()
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: "idChatbotDocuments",
    example: 1,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  readonly idChatbotDocuments?: number;

  @ApiProperty({
    description: "idChatbotResponse",
    example: 1,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  readonly idChatbotResponse?: number;

  @ApiProperty({
    description: "estado",
    example: 1,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsNumber()
  readonly estado? = 1 | 0;

  @ApiProperty({
    description: "eliminar",
    example: 1,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsNumber()
  readonly eliminar? = 1 | 0;

  @ApiProperty({
    description: "fechaCreacion",
    example: '2024-05-01 10:00:00',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  fechaCreacion?: string;

  @ApiProperty({
    description: "expression",
    example: "Proceso de Reingreso a Pregrado",
    type: String,
    required: true
  })
  @IsOptional()
  @IsString()
  readonly expression?: string;

  @ApiProperty({
    description: "type",
    example: "text",
    type: String,
    required: true
  })
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiProperty({
    description: "content",
    example: "Para solicitar el reingreso a una carrera de tercer nivel debes completar el formulario F_AA_201 disponible en el siguiente enlace:",
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  readonly content?: string;

  @ApiProperty({
    description: "action",
    example: "text",
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  readonly action?: string;

  @ApiProperty({
    description: "path",
    example: "https://atenea.epn.edu.ec/handle/25000/227",
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  readonly path?: string;

  @ApiProperty({
    description: "name",
    example: "Enlace al Formulario F_AA_201",
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    description: "alt",
    example: "",
    type: String,
    required: false
  })
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
