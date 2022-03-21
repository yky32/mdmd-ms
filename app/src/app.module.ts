import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppConfigModule} from "./config/configuration.module";
import { NotesModule } from './modules/notes/notes.module';

@Module({
    imports: [
        AppConfigModule,
        NotesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
