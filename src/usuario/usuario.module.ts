import {Module} from '@nestjs/common';
import {UsuarioController} from './controllers/usuario.controller';
import {UsuarioService} from './services/usuario.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ENTIDADES_USUARIO} from "./common/entidades-usuario";
import { AuthController } from 'src/auth/controllers/auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([...ENTIDADES_USUARIO], 'default'),
    ],
    providers: [UsuarioService],
    controllers: [UsuarioController, AuthController],
    exports: [UsuarioService],
})
export class UsuarioModule {
}
