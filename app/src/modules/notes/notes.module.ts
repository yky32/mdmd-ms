import {Module} from '@nestjs/common';
import {NotesService} from './notes.service';
import {NotesController} from '../../endpoints/notes.controller';
import {notessProviders} from "./notes.providers";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AUTH_CLIENT_ID_KAFKA, AUTH_CONSUMER_KAFKA, AUTH_SERVICE_KAFKA} from "../../core/constants/index.app";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: AUTH_SERVICE_KAFKA,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: AUTH_CLIENT_ID_KAFKA,
                        brokers: ['yky32.asuscomm.com:9092'],
                    },
                    consumer: {
                        groupId: AUTH_CONSUMER_KAFKA,
                    },
                },
            },
        ]),
    ],
    controllers: [NotesController],
    providers: [NotesService, ...notessProviders]
})
export class NotesModule {
}
