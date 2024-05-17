import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles, AdminAccess } from 'src/common/decorators/decoradores-aplicativo.decorators';
import { ChatbotService } from '../services/chatbot.service';
import { ConfigType } from '@nestjs/config';
import config from '../../environment/config';

@ApiTags("Chatbot")
// @UseGuards(ProtegerControllerGuard, RolesGuard)
@Controller('chatbot')
export class ChatbotController {

    constructor(
        private readonly _chatbotService: ChatbotService
    ) {}

    @ApiOperation({ description: "Obtener lista de documentos" })
    // @Roles("ADMIN")
    // @AdminAccess()
    @Get("documents")
    getDocuments() {
        return this._chatbotService.getDocuments();
    }

    @ApiOperation({ description: "Crear un documento" })
    // @Roles("ADMIN")
    // @AdminAccess()
    @Post("documents")
    postDocument() {
        return this._chatbotService.getDocuments();
    }

    @ApiOperation({ description: "Obtener lista de respuestas por documento" })
    // @Roles("ADMIN")
    // @AdminAccess()
    @Post("responses")
    getResponses(
        @Body() payload: any
    ) {
        return this._chatbotService.getResponsesById(payload.id);
    }
}
