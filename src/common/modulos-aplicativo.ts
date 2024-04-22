import {DatabaseModule} from '../database/database.module';
import {SocketsModule} from "../sockets/sockets.module";
import {UsuarioModule} from "../usuario/usuario.module";
import {MODULOS_AUTH} from "../auth/modulos-auth";


export const MODULOS_APLICATIVO = [
    DatabaseModule,
    ...MODULOS_AUTH,
    // SocketsModule,
    UsuarioModule,
    // HttpModule,
];
