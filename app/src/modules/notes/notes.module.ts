import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from '../../endpoints/notes.controller';
import {notessProviders} from "./notes.providers";

@Module({
  controllers: [NotesController],
  providers: [NotesService, ...notessProviders]
})
export class NotesModule {}
