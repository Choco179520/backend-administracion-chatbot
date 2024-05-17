import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MODULOS_APLICATIVO } from './common/modulos-aplicativo';
import { CONFIG_MODULE } from './environment/config';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE),
    ...MODULOS_APLICATIVO,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
