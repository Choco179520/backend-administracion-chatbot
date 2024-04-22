import { Module } from '@nestjs/common';
import { SocketsService } from './sockets.service';

@Module({
  imports: [],
  providers: [SocketsService],
})
export class SocketsModule {}
