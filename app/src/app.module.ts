import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppConfigModule} from "./config/configuration.module";
import {NotesModule} from './modules/notes/notes.module';
import {DatabaseModule} from "./core/database/database.module";
import {FoldersModule} from './modules/folders/folders.module';
import {TagsModule} from "./modules/tags/tags.module";
import {appProviders} from "./app.providers";

@Module({
    imports: [
        AppConfigModule,
        NotesModule,
        DatabaseModule,
        TagsModule,
        FoldersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ...appProviders
    ]
})
export class AppModule {
}
