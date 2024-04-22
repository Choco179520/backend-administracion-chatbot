import {Module} from '@nestjs/common';
import {UsuarioController} from './controllers/usuario.controller';
import {UsuarioService} from './services/usuario.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ENTIDADES_USUARIO} from "./common/entidades-usuario";

@Module({
    imports: [
        TypeOrmModule.forFeature([...ENTIDADES_USUARIO], 'default'),
    ],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService],
})
export class UsuarioModule {
}
