import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AppConfigModule } from "./config/configuration.module";
import { NotesModule } from "./modules/notes/notes.module";
import { FoldersModule } from './modules/folders/folders.module';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    NotesModule,
    FoldersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
