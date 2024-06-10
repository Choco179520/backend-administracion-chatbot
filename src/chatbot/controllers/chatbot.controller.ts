import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Roles,
  AdminAccess,
} from "src/common/decorators/decoradores-aplicativo.decorators";
import { ChatbotService } from "../services/chatbot.service";
import { ConfigType } from "@nestjs/config";
import config from "../../environment/config";
import { ProtegerControllerGuard } from "src/common/guards/proteger-controller.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateDocumentDto, UpdateDocumentDto } from "../dtos/document.dto";
import { CreateResponseDto, UpdateResponseDto } from "../dtos/response.dto";
import { CreateUtteranceDto, UpdateUtteranceDto } from "../dtos/utterance.dto";

@ApiTags("Chatbot")
// @UseGuards(ProtegerControllerGuard, RolesGuard)
@Roles("ADMIN")
@AdminAccess()
@Controller("chatbot")
export class ChatbotController {
  constructor(private readonly _chatbotService: ChatbotService) {}

  @ApiOperation({
    description: "Sincronizar documentos desde la base de datos del chatbot",
  })
  @Get("synchronize-documents")
  synchronizeDocuments() {
    // return this._chatbotService.synchronizeDocuments();
  }

  @ApiOperation({ description: "Obtener lista de documento local" })
  @Get("documents")
  getDocuments() {
    return this._chatbotService.getDocumentsLocal();
  }

  @ApiOperation({ description: "Crear un nuevo documento local" })
  @Post("documents")
  postDocuments(@Body() payload: CreateDocumentDto) {
    console.log(payload, "data paylaod documents");
    return this._chatbotService.postDocumentLocal(payload);
  }

  @ApiOperation({ description: "Actualizar un documento local" })
  @Put("documents/:id")
  putDocuments(@Param() params: any, @Body() payload: UpdateDocumentDto) {
    console.log(payload, "data paylaod acualizar documents");
    return this._chatbotService.putDocumentLocal(params.id, payload);
  }

  @ApiOperation({ description: "Obtener expresiones por documento por id" })
  @Get("utterances/:id")
  getUtterancesLocalById(@Param() params: any) {
    console.log("data paylaod buscar utterances"), params;
    return this._chatbotService.getUtterancesLocalById(params.id);
  }

  @ApiOperation({ description: "Crear expresiones por documento por id" })
  @Post("utterances/:id")
  postUtterancesLocalById(
    @Param() params: any,
    @Body() payload: CreateUtteranceDto
  ) {
    console.log(payload, "data paylaod crear utterances"), params;
    return this._chatbotService.postUtteranceLocal(payload);
  }

  @ApiOperation({ description: "Actualizar expresiones por documento por id" })
  @Put("utterances/:id")
  putUtterancesLocalById(
    @Param() params: any,
    @Body() payload: UpdateUtteranceDto
  ) {
    console.log(payload, "data paylaod actualizar utterances"), params;
    return this._chatbotService.putUtteranceLocal(params.id, payload);
  }

  @ApiOperation({ description: "Obtener respuestas por documento por id" })
  @Get("responses/:id")
  getResponsesLocalById(@Param() params: any) {
    return this._chatbotService.getResponsesLocalById(params.id);
  }

  @ApiOperation({ description: "Crear una nueva respuesta local" })
  @Post("responses")
  postResponsesLocal(@Body() payload: CreateResponseDto) {
    console.log(payload, "data paylaod responses");
    return this._chatbotService.postResponseLocal(payload);
  }

  @ApiOperation({ description: "Actualizar una respuesta local por id" })
  @Put("responses/:id")
  putResponsesLocalById(
    @Param() params: any,
    @Body() payload: UpdateResponseDto
  ) {
    console.log(payload, "data paylaod acualizar responses", params);
    return this._chatbotService.putResponseLocal(+params.id, payload);
  }

  /** ENVIAR PARAMETROS A CHATBOT */
  @ApiOperation({
    description: "Obtener lista de respuestas por documento local",
  })
  @Post("update-chatbot")
  postChatbot(@Body() payload: any) {
    // return this._chatbotService.getResponsesById(payload.id);
  }
}
