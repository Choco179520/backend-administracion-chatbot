import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {Inject} from "@nestjs/common";
import config from "../environment/config";
import {ConfigType} from "@nestjs/config";
import { Logger } from '@nestjs/common';
import {ConstantesGenerales} from "../common/constantes/constantes-generales";

@WebSocketGateway(ConstantesGenerales.PUERTO_SOCKETS, {
    cors: {
        origin: "*", // whitelist
    },
})
export class SocketsService
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        @Inject(config.KEY)
        private readonly _configService: ConfigType<typeof config>,
    ) {
    }

    afterInit(server: any) {
        Logger.verbose('Esto se ejecuta cuando inicia el servicio .....', 'WEB_SOCKETS')
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('Se conecto alguien al socket', client);
        Logger.verbose('Esto se ejecuta cuando alguien se conecta al socket.....', 'WEB_SOCKETS')
    }

    handleDisconnect(client: any) {
        console.log('Se desconecta cliente', client);
        Logger.verbose('Esto se ejecuta cuando alguien se desconecta al socket.....', 'WEB_SOCKETS')
    }

    @SubscribeMessage("event_join")
    handleJoinRoom(client: Socket, room: string) {
        console.log(`room_${room}`);
    }

    @SubscribeMessage("event_message")
    handleIncommingMessage(
        client: Socket,
        payload: { room: string; message: string }
    ) {
        const {room, message} = payload;
        console.log(payload);
        this.server.to(`room_${room}`).emit('new_message', message);
    }

    @SubscribeMessage("event_leave")
    handleRoomLeave(client: Socket, room: string) {
        console.log(`room_${room}`);
        client.leave(`room_${room}`);
    }

}
