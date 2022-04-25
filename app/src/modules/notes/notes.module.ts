import {Module} from '@nestjs/common';
import {NotesService} from './notes.service';
import {NotesController} from '../../endpoints/notes.controller';
import {notessProviders} from "./notes.providers";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {
    APP_CLIENT_ID_KAFKA,
    APP_SERVICE_KAFKA,
    AUTH_CLIENT_ID_KAFKA,
    AUTH_CONSUMER_KAFKA,
    AUTH_SERVICE_KAFKA, BROKER_ADDRESS_KAFKA
} from "../../core/constants/index.app";
import {TagsModule} from "../tags/tags.module";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: AUTH_SERVICE_KAFKA,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: AUTH_CLIENT_ID_KAFKA,
                        brokers: [BROKER_ADDRESS_KAFKA],
                    },
                    consumer: {
                        groupId: AUTH_CONSUMER_KAFKA,
                    },
                },
            },
        ]),
        ClientsModule.register([
            {
                name: APP_SERVICE_KAFKA,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: APP_CLIENT_ID_KAFKA,
                        brokers: [BROKER_ADDRESS_KAFKA],
                    },
                    consumer: {
                        groupId: AUTH_CONSUMER_KAFKA,
                    },
                },
            },
        ]),
        TagsModule
    ],
    controllers: [NotesController],
    providers: [NotesService, ...notessProviders]
})
export class NotesModule {
}
