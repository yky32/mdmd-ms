import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppConfigModule} from "./config/configuration.module";
import {NotesModule} from './modules/notes/notes.module';
import {DatabaseModule} from "./core/database/database.module";
import { TagsModule } from './modules/tags/tags.module';
import { FoldersModule } from './modules/folders/folders.module';

@Module({
    imports: [
        AppConfigModule,
        NotesModule,
        DatabaseModule,
        TagsModule,
        FoldersModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
