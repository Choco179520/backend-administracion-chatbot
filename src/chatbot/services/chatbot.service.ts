import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { catchError, firstValueFrom, map, throwError } from "rxjs";
import { ErrorHandlerService } from "src/common/error-handler/error-handler.service";
import config from "src/environment/config";
import { DocumentService } from "./document.service";
import { CreateDocumentDto, UpdateDocumentDto } from "../dtos/document.dto";
import { CreateUtteranceDto, UpdateUtteranceDto } from "../dtos/utterance.dto";
import { CreateResponseDto, UpdateResponseDto } from "../dtos/response.dto";
import { ResponseService } from "./response.service";
import { UtteranceService } from "./utterance.service";
import { format } from "date-fns";

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

  /** Sincronizar la base de datos del chatbot con la local */
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
      
      // await this._utteranceService.deleteAll();
      // await this._responseService.deleteAll();
      // await this._documentService.deleteAll();

      for (let document of documents) {
        const documentJson: CreateDocumentDto = {
          title: document.title,
          estado: 1,
          idChatbot: document.id,
        };
        console.log(documentJson, 'json....');
        
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

  /** Funciones para manejar data local y posterior match hacia el chatbot  */
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

  async postDocumentLocal(payload: CreateDocumentDto) {
    try {
      payload.fechaCreacion = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      console.log(payload, "paylaod.....");
      const { expression } = payload;
      const { type, content, action, path, name, alt } = payload;

      const newDocument = await this._documentService.crearUno(payload);

      const jsonUtterance = {
        utterance: expression,
        document: newDocument.id,
      };
      await this._utteranceService.crearUno(jsonUtterance);

      const jsonResponse: CreateResponseDto = {
        response: JSON.stringify(
          this.removeEmptyFields({
            type,
            content,
            action,
            path,
            name,
            alt,
          })
        ),
        document: newDocument.id,
      };
      await this._responseService.crearUno(jsonResponse);

      newDocument.responses = 1;
      newDocument.utterances = 1;
      return newDocument;
    } catch (err) {
      console.error(
        "Error documentos - No se pudo crear un registr local de documentos",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.postDocumentLocal(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  async putDocumentLocal(id: number, payload: UpdateDocumentDto) {
    try {
      payload.fechaActualizacion = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      console.log(payload, 'data acutlializar.....');
      
      return this._documentService.actualizarPorId(id, payload);
    } catch (err) {
      console.error(
        "Error documentos - No se pudo actualizar un registro local de documentos",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.putDocumentLocal(), ocurrio un error");
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

  async postResponseLocal(payload: CreateResponseDto) {
    try {
      const jsonDocument = {estado: 0};
      await this._documentService.actualizarPorId(payload.document, jsonDocument);
      return await this._responseService.crearUno(payload);
    } catch (err) {
      console.error(
        "Error respuesta - No se pudo crear una respuesta local de documentos",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.postResponseLocal(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  async putResponseLocal(id: number, payload: UpdateResponseDto) {
    try {
      console.log(id,'-- putResponseLocal --', payload);
      const jsonDocument = {estado: 0};
      const act = await this._documentService.actualizarPorId(+payload.document, jsonDocument);
      console.log(act, 'update...', +payload.document);
      return this._responseService.actualizarPorId(id, payload);
    } catch (err) {
      console.error(
        "Error documentos - No se pudo actualizar una respuesta local",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.putResponseLocal(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  async getUtterancesLocalById(id: number) {
    try {
      console.log(id, 'number de ');
      
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

  async postUtteranceLocal(payload: CreateUtteranceDto) {
    try {
      const jsonDocument = {estado: 0};
      await this._documentService.actualizarPorId(payload.document, jsonDocument);
      return this._utteranceService.crearUno(payload);
    } catch (err) {
      console.error(
        "Error expresiones - No se pudo crear una expresion local de documentos",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.postUtteranceLocal(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  async putUtteranceLocal(id: number, payload: UpdateUtteranceDto) {
    try {
      const jsonDocument = {estado: 0};
      console.log(payload, 'paykiad.,,,', id);
      
      await this._documentService.actualizarPorId(payload.document, jsonDocument);
      return this._utteranceService.actualizarPorId(id, payload);
    } catch (err) {
      console.error(
        "Error documentos - No se pudo actualizar una expresion local",
        {
          error: err.response,
        }
      );
      Logger.error("_chatbotService.putUtteranceLocal(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  /** Servicios para manejar el chatbot */
  async getDocuments() {
    try {
      let documents;
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
          document.responses = responseD.responses.length;
          document.utterances = document.utterances.length;
        }
        return document;
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

  async getDocumentsById(id: number) {
    try {
      let documents;
      const pathGetDocuments = this.url + `/documents/${id}`;
      Logger.verbose(`Get utterences by id - ${id} ....`);

      documents = await firstValueFrom(
        this._httpService.get(pathGetDocuments).pipe(
          map((response) => {
            if (response.status == 200) {
              return response.data.utterances;
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
          document.responses = responseD.responses.length;
          document.utterances = document.utterances.length;
        }
        return document;
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

  async postDocument(data) {
    try {
      let documents;
      const pathPostDocuments = this.url + `/documents`;

      Logger.verbose(`Post documents....`);

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

  async updateDocuments(id: number, data: any) {
    try {
      let documents;
      const pathGetResponses = this.url + `/documents/${id}`;

      Logger.verbose(`updateDocuments....`);

      documents = await firstValueFrom(
        this._httpService.put(pathGetResponses, data).pipe(
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
      Logger.error("_chatbotService.updateDocuments(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  async updateResponses(id: number, data: any) {
    try {
      let responses;
      const pathGetResponses = this.url + `/response-sets/${id}`;

      Logger.verbose(`updateResponses....`);

      responses = await firstValueFrom(
        this._httpService.put(pathGetResponses, data).pipe(
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
      Logger.error("_chatbotService.updateResponses(), ocurrio un error");
      this.errorHandlerService.handleCustomError(err.response);
    }
  }

  removeEmptyFields(obj: any): any {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null && v !== "")
    );
  }
}
