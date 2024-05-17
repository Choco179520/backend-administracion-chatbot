import { Module } from "@nestjs/common";
import { ChatbotController } from "./controllers/chatbot.controller";
import { ChatbotService } from "./services/chatbot.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ENTIDADES_CHATBOT } from "./common/entidades-chatbot";
import { DocumentService } from "./services/document.service";
import { ResponseService } from "./services/response.service";
import { UtteranceService } from "./services/utterance.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([...ENTIDADES_CHATBOT], "default"),
    HttpModule,
  ],
  providers: [
    ChatbotService,
    DocumentService,
    ResponseService,
    UtteranceService,
  ],
  controllers: [ChatbotController],
  exports: [],
})
export class ChatbotModule {}
