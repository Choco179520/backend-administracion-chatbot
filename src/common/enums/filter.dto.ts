import {
  IsIn,
  IsOptional,
} from 'class-validator';
import { EstadoEnum } from './estado.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty({
    description: 'Estado para busqueda',
  })
  @IsOptional()
  @IsIn([EstadoEnum.Inactivo, EstadoEnum.Activo])
  readonly estado?: EstadoEnum.Inactivo | EstadoEnum.Activo;

  @ApiProperty({
    description: 'Relaciones para busqueda',
    type: [String],
  })
  @IsOptional()
  readonly relations?: string[];

  @ApiProperty({
    description: 'Parms enviados para busqueda',
    type: [],
  })
  @IsOptional()
  readonly busqueda?: [];
}
