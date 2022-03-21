import {MiddlewareConsumer, Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppConfigModule} from "./config/configuration.module";
import {ClientsModule, Transport} from "@nestjs/microservices";
import { NotesModule } from './modules/notes/notes.module';
import LogsMiddleware from "./common/middleware/logs.middleware";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'APP_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'app',
                        brokers: ['localhost:9092'],
                    },
                    consumer: {
                        groupId: 'app-consumer',
                    },
                },
            },
        ]),
        AppConfigModule,
        NotesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})

export class AppModule {
    // https://docs.nestjs.com/middleware
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LogsMiddleware)
            .forRoutes('*');
    }
}