import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppConfigModule} from "./config/configuration.module";
import { NotesModule } from './modules/notes/notes.module';
import {DatabaseModule} from "./core/database/database.module";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'auth',
                        brokers: ['yky32.asuscomm.com:9092'],
                    },
                    consumer: {
                        groupId: 'auth-consumer',
                    },
                },
            },
        ]),
        AppConfigModule,
        NotesModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
