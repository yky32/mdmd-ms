import { PartialType } from '@nestjs/swagger';
import { NoteCreatedEvent } from './event/note-created.event';

export class UpdateNoteDto extends PartialType(NoteCreatedEvent) {}
