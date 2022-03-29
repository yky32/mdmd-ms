import {MiddlewareConsumer, Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppConfigModule} from "./config/configuration.module";
import {NotesModule} from './modules/notes/notes.module';
import LogsMiddleware from "./common/middleware/logs.middleware";

@Module({
    imports: [
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
