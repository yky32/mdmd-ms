import {Module} from '@nestjs/common';
import {NotesService} from './notes.service';
import {NotesMessagePattern} from '../../endpoints/notes.message-pattern';
import {notesProviders} from "./notes.providers";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {
    APP_CLIENT_ID_KAFKA,
    APP_SERVICE_KAFKA,
    AUTH_CLIENT_ID_KAFKA,
    AUTH_CONSUMER_KAFKA,
    AUTH_SERVICE_KAFKA, BROKER_ADDRESS_KAFKA
} from "../../core/constants/app.app";
import {TagsModule} from "../tags/tags.module";
import {NotesUseCase} from "./notes.usecases";
import {NotesEventPattern} from "../../endpoints/notes.event-pattern";
import {NotesProcessor} from "./notes.processor";

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
    controllers: [
        NotesMessagePattern,
        NotesEventPattern,
    ],
    providers: [
        NotesService,
        NotesUseCase,
        NotesProcessor,
        ...notesProviders
    ],
    exports: [NotesService]
})
export class NotesModule {
}
