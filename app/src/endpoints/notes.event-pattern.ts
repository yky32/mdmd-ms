import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {NOTE_CREATED} from "../core/constants/app.event";
import {NotesProcessor} from "../modules/notes/notes.processor";

@Controller()
export class NotesEventPattern {
    constructor(
        private readonly notesProcessor: NotesProcessor,
    ) {
    }

    @EventPattern(NOTE_CREATED)
    async handleOrderCreated(data: any) {
        await this.notesProcessor.orderCreated(data.value)
    }
}
