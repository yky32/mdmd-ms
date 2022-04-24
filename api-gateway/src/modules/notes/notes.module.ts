import {Module} from '@nestjs/common';
import {NotesService} from './notes.service';
import {NotesController} from '../../endpoints/notes.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {APP_CLIENT_ID_KAFKA, APP_CONSUMER_KAFKA, APP_SERVICE_KAFKA} from "../../core/constants/index.app";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: APP_SERVICE_KAFKA,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: APP_CLIENT_ID_KAFKA,
                        brokers: ['yky32.asuscomm.com:9092'],
                    },
                    consumer: {
                        groupId: APP_CONSUMER_KAFKA,
                    },
                },
            },
        ]),
    ],
    controllers: [NotesController],
    providers: [NotesService]
})
export class NotesModule {
}
