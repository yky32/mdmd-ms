import {Inject, Injectable} from '@nestjs/common';
import {NotesService} from "./notes.service";
import {NOTE_TAG_ASSIGNED} from "../../core/constants/app.event";
import {APP_SERVICE_KAFKA} from "../../core/constants/app.app";
import {ClientKafka} from "@nestjs/microservices";
import {CreateNoteDto} from "./dto/create-note.dto";
import {Note} from "./note.entity";

@Injectable()
export class NotesUseCase {
    constructor(
        private readonly notesService: NotesService,
        @Inject(APP_SERVICE_KAFKA) private readonly appClient: ClientKafka,
    ) {
    }

    async create(value: CreateNoteDto) {
        let note = await this.notesService.create(value);
        if (value.tagIds && note) {
            this.appClient.emit(NOTE_TAG_ASSIGNED, {
                tagIds: value.tagIds,
                note: note as Note
            })
        }
        return note
    }
}
