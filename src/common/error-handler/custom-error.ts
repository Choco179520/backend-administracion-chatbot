import {
  BadRequestException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { CustomBadRequestException } from './custom-bad-request-exception';

// Definir una estructura para mapear códigos de error a clases de excepción
interface ErrorMapping {
  code: number;
  exception: any;
}

const errorMappings: ErrorMapping[] = [
  { code: 400, exception: BadRequestException },
  { code: 401, exception: UnauthorizedException },
  { code: 403, exception: ForbiddenException},
  { code: 404, exception: NotFoundException},
  { code: 409, exception: ConflictException},
  { code: 500, exception: InternalServerErrorException }
];

export const customError = (error: any) => {
  const logger: Logger = new Logger('CustomError');

  const errorMapping = errorMappings.find(
    (mapping) => mapping.code === error.errorCodigo,
  );  

  if (errorMapping) {
    logger.error(`🔥🔥  Bang Fallo con éxito Error ${error.errorCodigo} 🔥🔥 🔫🔫`);
    delete error.errorCodigo;
    throw new CustomBadRequestException(error);
  } else {
    throw new InternalServerErrorException(error);
  }
};

export class MyCustomException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
