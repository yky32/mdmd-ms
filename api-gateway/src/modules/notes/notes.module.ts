import {Module} from '@nestjs/common';
import {NotesService} from './notes.service';
import {NotesController} from '../../endpoints/notes.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'BILLING_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'billing',
                        brokers: ['yky32.asuscomm.com:9092'],
                    },
                    consumer: {
                        groupId: 'billing-consumer',
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
