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
    console.log(payload, 'data paylaod');
    
    return this._chatbotService.postDocumentLocal(payload);
  }

  @ApiOperation({ description: "Actualizar un documento local" })
  @Put("documents/:id")
  putDocuments(@Param() params: any, @Body() payload: UpdateDocumentDto) {
    return this._chatbotService.putDocumentLocal(params.id, payload);
  }

  
  
  
  @ApiOperation({ description: "Obtener respuestas por documento por id" })
  @Get("responses/:id")
  getResponsesLocalById(@Param() params: any) {
    return this._chatbotService.getResponsesLocalById(params.id);
  }

  @ApiOperation({ description: "Obtener expresiones por documento por id" })
  @Get("utterances/:id")
  getUtterancesLocalById(@Param() params: any) {
    return this._chatbotService.getUtterancesLocalById(params.id);
  }

  @ApiOperation({
    description: "Obtener lista de respuestas por documento local",
  })
  @Post("responses")
  getResponses(@Body() payload: any) {
    // return this._chatbotService.getResponsesById(payload.id);
  }

  @ApiOperation({
    description: "Obtener lista de expresiones por documento local",
  })
  @Get("responses/:id")
  getResponsesById(@Param() params: any) {
    // return this._chatbotService.getResponsesById(params.id);
  }
}
