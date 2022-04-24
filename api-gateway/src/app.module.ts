import {MiddlewareConsumer, Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppConfigModule} from "./config/configuration.module";
import {NotesModule} from './modules/notes/notes.module';
import { TagsModule } from './modules/tags/tags.module';
import LogsMiddleware from "./common/middleware/logs.middleware";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {APP_CLIENT_ID_KAFKA, APP_CONSUMER_KAFKA, APP_SERVICE_KAFKA} from "./core/constants/index.app";

@Module({
    imports: [
        AppConfigModule,
        NotesModule,
        TagsModule
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
