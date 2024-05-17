import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends HttpException {
  constructor(data: any) {
    const response = {
      ...data
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}
