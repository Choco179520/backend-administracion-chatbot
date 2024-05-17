import {DatabaseModule} from '../database/database.module';
import {UsuarioModule} from "../usuario/usuario.module";
import {MODULOS_AUTH} from "../auth/modulos-auth";
import { ChatbotModule } from 'src/chatbot/chatbot.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';

export const MODULOS_APLICATIVO = [
    DatabaseModule,
    ...MODULOS_AUTH,
    UsuarioModule,
    ChatbotModule,
    ErrorHandlerModule
];
