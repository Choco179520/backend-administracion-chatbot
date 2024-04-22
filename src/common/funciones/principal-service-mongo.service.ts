import {Injectable, Logger} from "@nestjs/common";
import * as mongoose from "mongoose";
import {ErrorManager} from "../error.manager";

@Injectable()
export class PrincipalMongoService<Model, CreateDto, UpdateDto> {
    constructor(
        private readonly _model: mongoose.Model<Model>,
        private nameEntity: string,
        protected readonly logger: Logger,
    ) {
        console.log(nameEntity, '----')
    }

    async buscarTodos(): Promise<Model[] | any> {
        try {
            const busqueda = await this._model.find();
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

    async crear(createDto: CreateDto): Promise<Model | any> {
        try {
            return await this._model.create(createDto);
        } catch (e) {
            console.error(e)
        }

    }


    async buscarUno(params: any): Promise<Model | any> {
        try {
            console.log(params, 'llll')
            // return await this._model.find({ identificacion: params.identificacion, _id: params._id }).exec();
            return await this._model.find({ params }).exec();
        } catch (e) {
            console.error(e)
        }
    }

    async actualizarPorId(id: string, envioOtp: UpdateDto): Promise<Model | any> {
        try {
            return await this._model.findByIdAndUpdate(id, envioOtp, {
                new: true,
                runValidators: true,
            });
        } catch (e) {

        }
    }
}
