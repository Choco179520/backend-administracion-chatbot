import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { catchError, firstValueFrom, map, throwError } from "rxjs";
import { ErrorHandlerService } from "src/common/error-handler/error-handler.service";
import config from "src/environment/config";

@Injectable()
export class ChatbotService {
  url = `${this._configService.url_chatbot}`;

  constructor(
    @Inject(config.KEY)
    private readonly _configService: ConfigType<typeof config>,
    private readonly _httpService: HttpService,
    private readonly errorHandlerService: ErrorHandlerService
  ) {}

  async getDocuments() {
    try {
      let documents;
      const pathGetDocuments = this.url + `/documents`;

      console.log(pathGetDocuments, "path...");

      documents = await firstValueFrom(
        this._httpService.get(pathGetDocuments).pipe(
          map((response) => {
            if (response.status == 200) {
              return response.data;
            }
          }),
          catchError((err1) => {
            throw this.errorHandlerService.handleCustomError(err1.response);
          })
        )
      );

      const responsesAll = await this.getResponses();
      documents.map((document) => {
        const responseD = responsesAll.find(
          (resp) => resp.id == document.response_set_id
        );
        if (responseD) {
          document.responses = responseD.responses;
        }
        return document;
      });
      console.log(responsesAll, "repsonses....");

      return documents;
    } catch (err) {
      console.error(
        "Error obtener documentos - No se pudo obtener la lista de documentos",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.getDocuments(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  async postDocument(data) {
    try {
      let documents;
      const pathPostDocuments = this.url + `/documents`;

      console.log(pathPostDocuments, "path...");

      documents = await firstValueFrom(
        this._httpService.post(pathPostDocuments).pipe(
          map((response) => {
            if (response.status == 200) {
              return response.data;
            }
          }),
          catchError((err1) => {
            throw this.errorHandlerService.handleCustomError(err1.response);
          })
        )
      );
      return documents;
    } catch (err) {
      console.error(
        "Error obtener documentos - No se pudo obtener la lista de documentos",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.getDocuments(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  async getResponses() {
    try {
      let responses;
      const pathGetResponses = this.url + `/response-sets`;
      console.log(pathGetResponses, "path...");

      responses = await firstValueFrom(
        this._httpService.get(pathGetResponses).pipe(
          map((response) => {
            if (response.status == 200) {
              return response.data;
            }
          }),
          catchError((err1) => {
            throw this.errorHandlerService.handleCustomError(err1.response);
          })
        )
      );
      return responses;
    } catch (err) {
      console.error(
        "Error obtener documentos - No se pudo obtener la lista de documentos",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.getDocuments(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  async getResponsesById(id: number) {
    try {
      let responses;
      const pathGetResponses = this.url + `/response-sets/${id}`;
      console.log(pathGetResponses, "path...");

      responses = await firstValueFrom(
        this._httpService.get(pathGetResponses).pipe(
          map((response) => {
            if (response.status == 200) {
              return response.data;
            }
          }),
          catchError((err1) => {
            throw this.errorHandlerService.handleCustomError(err1.response);
          })
        )
      );
      return responses;
    } catch (err) {
      console.error(
        "Error obtener documentos - No se pudo obtener la lista de documentos",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.getDocuments(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }
}
