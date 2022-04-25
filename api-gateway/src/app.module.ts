import {MiddlewareConsumer, Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppConfigModule} from "./config/configuration.module";
import {NotesModule} from './modules/notes/notes.module';
import {TagsModule} from './modules/tags/tags.module';
import LogsMiddleware from "./core/middleware/logs.middleware";
import {FoldersModule} from './modules/folders/folders.module';

@Module({
    imports: [
        AppConfigModule,
        NotesModule,
        TagsModule,
        FoldersModule
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
