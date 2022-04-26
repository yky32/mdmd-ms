import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {NOTE_TAG_ASSIGNED} from "../core/constants/app.event";
import {NotesProcessor} from "../modules/notes/notes.processor";

@Controller()
export class NotesEventPattern {
    constructor(
        private readonly notesProcessor: NotesProcessor,
    ) {
    }

    @EventPattern(NOTE_TAG_ASSIGNED)
    async handleNoteTagAssigned(data: any) {
        await this.notesProcessor.noteTagAssigned(data.value)
    }
}
