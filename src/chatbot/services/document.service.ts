import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrincipalService } from "src/common/funciones/principal-services";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigType } from "@nestjs/config";
import config from "src/environment/config";
import { CreateDocumentDto, UpdateDocumentDto } from "../dtos/document.dto";
import { DocumentEntity } from "../entities/document.entity";

@Injectable()
export class DocumentService extends PrincipalService<
  DocumentEntity,
  CreateDocumentDto,
  UpdateDocumentDto
> {
  constructor(
    @InjectRepository(DocumentEntity)
    private _documentRepository: Repository<DocumentEntity>,
    @Inject(config.KEY)
    private readonly _configService: ConfigType<typeof config>
  ) {
    super(_documentRepository, "DocumentEntity", new Logger(DocumentService.name));
  }
}
