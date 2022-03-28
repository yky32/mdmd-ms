import {Inject, Injectable} from '@nestjs/common';
import {CreateNoteDto} from './dto/create-note.dto';
import {UpdateNoteDto} from './dto/update-note.dto';
import {NOTE_REPOSITORY} from "../../core/constants";
import {Note} from "./note.entity";
import {NoteCreatedEvent} from "./dto/event/note-created.event";

@Injectable()
export class NotesService {

    constructor(@Inject(NOTE_REPOSITORY) private readonly noteRepository: typeof Note) {
    }

    create(createNoteDto: CreateNoteDto) {
        return this.noteRepository.create<Note>(createNoteDto);
    }

    findAll() {
        return `This action returns all notes`;
    }

    findOne(id: number) {
        return `This action returns a #${id} note`;
    }

    update(id: number, updateNoteDto: UpdateNoteDto) {
        return `This action updates a #${id} note`;
    }

    remove(id: number) {
        return `This action removes a #${id} note`;
    }

    handleNoteCreated(noteCreatedEvent: NoteCreatedEvent) {
        console.log(noteCreatedEvent)
    }
}
