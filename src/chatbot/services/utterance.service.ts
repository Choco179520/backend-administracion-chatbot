import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { PrincipalService } from "src/common/funciones/principal-services";
import { Repository } from "typeorm";
import { CreateUtteranceDto, UpdateUtteranceDto } from "../dtos/utterance.dto";
import { UtteranceEntity } from "../entities/utterance.entity";
import { ResponseService } from "./response.service";
import config from "src/environment/config";

@Injectable()
export class UtteranceService extends PrincipalService<
  UtteranceEntity,
  CreateUtteranceDto,
  UpdateUtteranceDto
> {
  constructor(
    @InjectRepository(UtteranceEntity)
    private _utteranceRepository: Repository<UtteranceEntity>,
    @Inject(config.KEY)
    private readonly _configService: ConfigType<typeof config>
  ) {
    super(_utteranceRepository, "UtteranceEntity", new Logger(ResponseService.name));
  }
}
