import * as crypto from 'crypto-js';
import {
    AES_REQUEST, AES_RESPONSE,
    CONFIG_AES_REQUEST,
    CONFIG_AES_RESPONSE,
} from '../keys/aes';


/** Desencriptar informacion recibida desde el frontend */
export function descifrarInformacionRequest(valor: any): any {
    const existeValor = valor && valor != null;
    if (existeValor) {
        const decrypted = crypto.AES.decrypt(
            valor,
            AES_REQUEST,
            CONFIG_AES_REQUEST,
        );
        return decrypted.toString(crypto.enc.Utf8);
    }
}

/** Desencriptar informacion a enviar desde el backend */
export function cifrarInformacionResponse(valor: string): any {
    const existeValor = valor && valor != null;
    if (existeValor) {
        const encrypted = crypto.AES.encrypt(
            crypto.enc.Utf8.parse(valor),
            AES_RESPONSE,
            CONFIG_AES_RESPONSE,
        );
        return encrypted.toString();
    }
}




