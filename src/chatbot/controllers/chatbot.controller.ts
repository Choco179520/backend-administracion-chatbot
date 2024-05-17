import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
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

@ApiTags("Chatbot")
// @UseGuards(ProtegerControllerGuard, RolesGuard)
@Controller("chatbot")
export class ChatbotController {
  constructor(private readonly _chatbotService: ChatbotService) {}

  @ApiOperation({
    description: "Sincronizar documentos desde la base de datos del chatbot",
  })
  @Roles("ADMIN")
  @AdminAccess()
  @Get("synchronize-documents")
  synchronizeDocuments() {
    // return this._chatbotService.synchronizeDocuments();
  }

  @ApiOperation({ description: "Obtener lista de documentos" })
  @Roles("ADMIN")
  @AdminAccess()
  @Get("documents")
  getDocuments() {
    return this._chatbotService.getDocumentsLocal();
  }

  @ApiOperation({ description: "Obtener respuestas por documento por id" })
  // @Roles("ADMIN")
  // @AdminAccess()
  @Get("responses/:id")
  getResponsesLocalById(@Param() params: any) {
    return this._chatbotService.getResponsesLocalById(params.id);
  }

  @ApiOperation({ description: "Obtener expresiones por documento por id" })
  // @Roles("ADMIN")
  // @AdminAccess()
  @Get("utterances/:id")
  getUtterancesLocalById(@Param() params: any) {
    return this._chatbotService.getUtterancesLocalById(params.id);
  }

  // @ApiOperation({ description: "Obtener expresiones por documento por id" })
  // // @Roles("ADMIN")
  // // @AdminAccess()
  // @Get("utterences/:id")
  // getUtterencesById(
  //     @Param() params: any
  // ) {
  //     return this._chatbotService.getUtterencesById(params.id);
  // }

  // @ApiOperation({ description: "Crear un documento" })
  // // @Roles("ADMIN")
  // // @AdminAccess()
  // @Post("documents")
  // postDocument() {
  //     return this._chatbotService.getDocuments();
  // }

  // @ApiOperation({ description: "Obtener lista de respuestas por documento" })
  // // @Roles("ADMIN")
  // // @AdminAccess()
  // @Post("responses")
  // getResponses(
  //     @Body() payload: any
  // ) {
  //     return this._chatbotService.getResponsesById(payload.id);
  // }

  // @ApiOperation({ description: "Obtener expresiones por documento por id" })
  // // @Roles("ADMIN")
  // // @AdminAccess()
  // @Get("responses/:id")
  // getResponsesById(
  //     @Param() params: any
  // ) {
  //     return this._chatbotService.getResponsesById(params.id);
  // }
}
