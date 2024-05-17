import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { catchError, firstValueFrom, map, throwError } from "rxjs";
import { ErrorHandlerService } from "src/common/error-handler/error-handler.service";
import config from "src/environment/config";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "../dtos/document.dto";
import { CreateUtteranceDto } from "../dtos/utterance.dto";
import { CreateResponseDto } from "../dtos/response.dto";
import { ResponseService } from "./response.service";
import { UtteranceService } from "./utterance.service";

@Injectable()
export class ChatbotService {
  url = `${this._configService.url_chatbot}`;

  constructor(
    @Inject(config.KEY)
    private readonly _configService: ConfigType<typeof config>,
    private readonly _httpService: HttpService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly _documentService: DocumentService,
    private readonly _responseService: ResponseService,
    private readonly _utteranceService: UtteranceService
  ) {}

  async synchronizeDocuments() {
    try {
      let documents;
      let utteranceArray = [];
      let responseArray = [];

      const pathGetDocuments = this.url + `/documents`;
      Logger.verbose(`Get documents....`);

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
          document.utterances = document.utterances;
        }
        return document;
      });

      await this._utteranceService.deleteAll();
      await this._responseService.deleteAll();
      await this._documentService.deleteAll();

      for (let document of documents) {
        const documentJson: CreateDocumentDto = {
          title: document.title,
          estado: 1,
          idChatbot: document.id,
        };
        const respDocument = await this._documentService.crearUno(documentJson);
        console.log(respDocument, "create document....");

        for (let utterance of document.utterances) {
          const utteranceJson: CreateUtteranceDto = {
            utterance: utterance,
            document: respDocument.id,
          };
          utteranceArray.push(utteranceJson);
        }
        await this._utteranceService.crearVarios(utteranceArray);

        for (let response of document.responses) {
          const responseJson: CreateResponseDto = {
            response: JSON.stringify(response),
            document: respDocument.id,
          };
          responseArray.push(responseJson);
        }
        await this._responseService.crearUno(responseArray);
      }
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

  async getDocumentsLocal() {
    try {
      const documents = await this._documentService.buscarTodos({
        relations: [{ name: "responses" }, { name: "utterances" }],
      });
      documents.map((docu) => {
        docu.responses = docu.responses.length;
        docu.utterances = docu.utterances.length;
        return docu;
      });
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

  async getResponsesLocalById(id: number) {
    try {
      const responses = await this._responseService.buscarTodos({
        relations: [{ name: "document", hijos: [{ key: "id", value: id }] }],
      });
      responses.map((resp) => {
        resp.response = JSON.parse(resp.response);
        return resp;
      });
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

  async getUtterancesLocalById(id: number) {
    try {
      const utterances = await this._utteranceService.buscarTodos({
        relations: [{ name: "document", hijos: [{ key: "id", value: id }] }],
      });
      return utterances;
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

  // async getDocuments() {
  //   try {
  //     let documents;
  //     const pathGetDocuments = this.url + `/documents`;
  //     Logger.verbose(`Get documents....`);

  //     documents = await firstValueFrom(
  //       this._httpService.get(pathGetDocuments).pipe(
  //         map((response) => {
  //           if (response.status == 200) {
  //             return response.data;
  //           }
  //         }),
  //         catchError((err1) => {
  //           throw this.errorHandlerService.handleCustomError(err1.response);
  //         })
  //       )
  //     );

  //     const responsesAll = await this.getResponses();
  //     documents.map((document) => {
  //       const responseD = responsesAll.find(
  //         (resp) => resp.id == document.response_set_id
  //       );
  //       if (responseD) {
  //         document.responses = responseD.responses.length;
  //         document.utterances = document.utterances.length;
  //       }
  //       return document;
  //     });

  //     return documents;
  //   } catch (err) {
  //     console.error(
  //       "Error obtener documentos - No se pudo obtener la lista de documentos",
  //       {
  //         error: err.response,
  //       }
  //     );
  //     Logger.error("_chatbotService.getDocuments(), ocurrio un error");
  //     this.errorHandlerService.handleCustomError(err.response);
  //   }
  // }

  // async getUtterencesById(id: number) {
  //   try {
  //     let documents;
  //     const pathGetDocuments = this.url + `/documents/${id}`;
  //     Logger.verbose(`Get utterences by id - ${id} ....`);

  //     documents = await firstValueFrom(
  //       this._httpService.get(pathGetDocuments).pipe(
  //         map((response) => {
  //           if (response.status == 200) {
  //             return response.data.utterances;
  //           }
  //         }),
  //         catchError((err1) => {
  //           throw this.errorHandlerService.handleCustomError(err1.response);
  //         })
  //       )
  //     );

  //     const responsesAll = await this.getResponses();
  //     documents.map((document) => {
  //       const responseD = responsesAll.find(
  //         (resp) => resp.id == document.response_set_id
  //       );
  //       if (responseD) {
  //         document.responses = responseD.responses.length;
  //         document.utterances = document.utterances.length;
  //       }
  //       return document;
  //     });

  //     return documents;
  //   } catch (err) {
  //     console.error(
  //       "Error obtener documentos - No se pudo obtener la lista de documentos",
  //       {
  //         error: err.response,
  //       }
  //     );
  //     Logger.error("_chatbotService.getDocuments(), ocurrio un error");
  //     this.errorHandlerService.handleCustomError(err.response);
  //   }
  // }

  // async postDocument(data) {
  //   try {
  //     let documents;
  //     const pathPostDocuments = this.url + `/documents`;

  //     Logger.verbose(`Post documents....`);

  //     documents = await firstValueFrom(
  //       this._httpService.post(pathPostDocuments).pipe(
  //         map((response) => {
  //           if (response.status == 200) {
  //             return response.data;
  //           }
  //         }),
  //         catchError((err1) => {
  //           throw this.errorHandlerService.handleCustomError(err1.response);
  //         })
  //       )
  //     );
  //     return documents;
  //   } catch (err) {
  //     console.error(
  //       "Error obtener documentos - No se pudo obtener la lista de documentos",
  //       {
  //         error: err.response,
  //       }
  //     );
  //     Logger.error("_chatbotService.getDocuments(), ocurrio un error");
  //     this.errorHandlerService.handleCustomError(err.response);
  //   }
  // }

  async getResponses() {
    try {
      let responses;
      const pathGetResponses = this.url + `/response-sets`;

      Logger.verbose(`Get responses....`);

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

  // async getResponsesById(id: number) {
  //   try {
  //     let responses;
  //     const pathGetResponses = this.url + `/response-sets/${id}`;
  //     Logger.verbose(`Get responses by id - ${id} ....`);

  //     responses = await firstValueFrom(
  //       this._httpService.get(pathGetResponses).pipe(
  //         map((response) => {
  //           if (response.status == 200) {
  //             return response.data.responses;
  //           }
  //         }),
  //         catchError((err1) => {
  //           throw this.errorHandlerService.handleCustomError(err1.response);
  //         })
  //       )
  //     );
  //     return responses;
  //   } catch (err) {
  //     console.error(
  //       "Error obtener documentos - No se pudo obtener la lista de documentos",
  //       {
  //         error: err.response,
  //       }
  //     );
  //     Logger.error("_chatbotService.getDocuments(), ocurrio un error");
  //     this.errorHandlerService.handleCustomError(err.response);
  //   }
  // }
}
