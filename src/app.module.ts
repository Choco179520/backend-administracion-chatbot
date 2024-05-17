import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MODULOS_APLICATIVO } from './common/modulos-aplicativo';
import { CONFIG_MODULE } from './environment/config';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE),
    ...MODULOS_APLICATIVO,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
