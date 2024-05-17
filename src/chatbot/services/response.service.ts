import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import config from "src/environment/config";
import { ConfigType } from "@nestjs/config";
import { Repository } from "typeorm";
import { PrincipalService } from "src/common/funciones/principal-services";
import { CreateResponseDto, UpdateResponseDto } from "../dtos/response.dto";
import { ResponseEntity } from "../entities/response.entity";

@Injectable()
export class ResponseService extends PrincipalService<
  ResponseEntity,
  CreateResponseDto,
  UpdateResponseDto
> {
  constructor(
    @InjectRepository(ResponseEntity)
    private _responseRepository: Repository<ResponseEntity>,
    @Inject(config.KEY)
    private readonly _configService: ConfigType<typeof config>
  ) {
    super(_responseRepository, "ResponseEntity", new Logger(ResponseService.name));
  }
}
