import { ENTIDADES_CHATBOT } from "src/chatbot/common/entidades-chatbot";
import {ENTIDADES_USUARIO} from "../usuario/common/entidades-usuario";

export const ENTIDADES_APLICATIVO = [
    ...ENTIDADES_USUARIO,
    ...ENTIDADES_CHATBOT
];
