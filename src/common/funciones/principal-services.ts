import {
    Injectable,
    Logger,
} from '@nestjs/common';
import {Repository} from 'typeorm';
import {ErrorManager} from '../error.manager';
import {EstadoEnum} from "../enums/estado.enum";
import {FilterDto} from "../enums/filter.dto";

@Injectable()
export class PrincipalService<Entity, CreateDto, UpdateDto> {
    constructor(
        private _repository: Repository<Entity>,
        private nameEntity: string,
        protected readonly logger: Logger,
    ) {
    }

    /** Obtener todos los resultados */
    async buscarTodos(criterioBusqueda?: FilterDto): Promise<Entity[] | any> {
        try {
            const query = await this._repository.createQueryBuilder(this.nameEntity);
            if (criterioBusqueda) {
                if ('relations' in criterioBusqueda) {
                    const {relations} = criterioBusqueda;
                    for (const relation of relations) {
                        query.innerJoinAndSelect(
                            `${this.nameEntity}.${relation}`,
                            relation,
                        );
                    }
                }
                if ('estado' in criterioBusqueda) {
                    const {estado} = criterioBusqueda;
                    if (+estado === EstadoEnum.Inactivo || +estado === EstadoEnum.Activo) {
                        query.where(`${this.nameEntity}.estado = :estado`, {
                            estado: estado,
                        });
                    }
                }
                if ('busqueda' in criterioBusqueda) {
                    let busqueda: any = criterioBusqueda;
                    busqueda = JSON.parse(busqueda.busqueda)
                    for (let opcion of busqueda) {
                        query.orWhere(`${opcion.key} like '%${opcion.value}%'`);
                    }
                }
            }
            query.orderBy(`${this.nameEntity}.id`, 'ASC');
            const busqueda = await query.getMany();
            if (busqueda.length == 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontraron registros',
                });
            }
            return busqueda;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /** Buscar registro por id */
    async buscarPorId(id: number | string): Promise<Entity | any> {
        try {
            const query = await this._repository.createQueryBuilder(this.nameEntity);
            query.where({id});
            const findRecord = await query.getOne();
            if (!findRecord) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No existen registros',
                });
            }
            return findRecord;
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message);
        }
    }

    /** Buscar registro por parametros */
    async buscarPorParametros(
        parametro: object,
        opcion: 'one' | 'many',
    ): Promise<Entity | any> {
        try {
            switch (opcion) {
                case 'one':
                    return await this._repository.findOne(parametro);
                    break;
                case 'many':
                    return await this._repository.find(parametro);
                    break;
            }
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message);
        }
    }

    /** Crear un registro en base */
    async crearUno(payload: CreateDto | any): Promise<Entity | any> {
        try {
            const respuesta = await this._repository.save(payload);
            if (!respuesta) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo crear el registro',
                });
            }
            return respuesta;
        } catch (err) {
            if (err?.code === 'ER_DUP_ENTRY') {
                return await this._repository.save({...payload, id: undefined});
            }
            throw ErrorManager.createSignatureError(err.message);
        }
    }

    /** Crear varios registros en base */
    async crearVarios(payload: CreateDto[] | any): Promise<Entity[] | any> {
        try {
            return await this._repository.save(payload);
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message);
        }
    }

    /** Actualuzar informacion por Id */
    async actualizarPorId(id: number, payload: UpdateDto | any) {
        try {
            const actualizacion = await this._repository.update(id, payload);
            if (actualizacion.affected == 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `No se actualizo el registro con id ${id}`,
                });
            }
            return payload;
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message);
        }
    }

    /** Actualizar informacion por campo y data enviada */
    async actualizarPorCampo(parametro: object, data: object) {
        try {
            const actualizacion = await this._repository.update(parametro, data);
            if (actualizacion.affected == 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `No se actualizo el registro por parametros ${parametro}`,
                });
            }
            return data;
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message);
        }
    }
}
