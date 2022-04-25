import {Injectable} from '@nestjs/common';
import {NotesService} from "./notes.service";

@Injectable()
export class NotesProcessor {
    constructor(
        private readonly notesService: NotesService,
    ) {
    }

    async orderCreated(data: any) {
        await this.notesService.orderCreated(data);
    }
}
