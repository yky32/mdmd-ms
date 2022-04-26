import {Injectable} from '@nestjs/common';
import {NotesService} from "./notes.service";

@Injectable()
export class NotesProcessor {
    constructor(
        private readonly notesService: NotesService,
    ) {
    }

    async noteTagAssigned(data: any) {
        await this.notesService.noteTagAssigned(data);
    }
}
