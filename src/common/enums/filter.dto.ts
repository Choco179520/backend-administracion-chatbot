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
    type: [],
  })
  @IsOptional()
  readonly relations?: any[];

  @ApiProperty({
    description: 'Parms enviados para busqueda',
    type: [],
  })
  @IsOptional()
  readonly busqueda?: any[];
}
