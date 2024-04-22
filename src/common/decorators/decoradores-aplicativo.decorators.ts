import {SetMetadata} from "@nestjs/common";
import {ADMIN_KEY, PUBLIC_KEY, ROLES_KEY} from "../constantes/key-decoradores";
import {ROLES} from "../constantes/constantes-generales";

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);

export const Roles = (...roles: Array<keyof typeof ROLES>) => SetMetadata(ROLES_KEY, roles);

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
