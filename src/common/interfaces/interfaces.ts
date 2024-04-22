export interface PayloadToken {
     sub: string;
     rol: string
}

export interface AuthTokenResult {
     sub: string;
     rol: string;
     iat: string;
     exp: string
}

export interface UsuarioToken {
     sub: string;
     rol: string;
     isExpired: boolean
}
