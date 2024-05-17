import { Injectable, NotAcceptableException } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { CustomBadRequestException } from './custom-bad-request-exception';

interface ErrorMapping {
  code: number;
  exception: any;
}

@Injectable()
export class ErrorHandlerService {
  constructor() {}

  private readonly errorMappings: ErrorMapping[] = [
    {code:202, exception: BadRequestException},
    { code: 400, exception: BadRequestException },
    { code: 401, exception: UnauthorizedException },
    { code: 403, exception: ForbiddenException },
    { code: 404, exception: NotFoundException },
    { code: 409, exception: ConflictException },
    { code: 2627, exception: ConflictException },
    { code: 100085, exception: NotFoundException},
    {code:406,exception:NotAcceptableException}
  ];

  public handleCustomError(error: any) {
    const errorCode = error.status || error.statusCode;    
        
    const errorMapping = this.errorMappings.find(
      (mapping) => mapping.code === errorCode,
    );

    if (errorMapping) {
      throw new CustomBadRequestException(errorMapping);
    } else { 
      const encryptedData = 
        {
          statusCode: 500,
          message: 'Error desconocido, contacte con el administrador',
        }
      throw new InternalServerErrorException(encryptedData);
    }
  }
}
