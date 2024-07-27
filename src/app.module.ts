import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MODULOS_APLICATIVO } from './common/modulos-aplicativo';
import { CONFIG_MODULE } from './environment/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE),
    ...MODULOS_APLICATIVO,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './dist/public'),
      serveRoot: '/public',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
