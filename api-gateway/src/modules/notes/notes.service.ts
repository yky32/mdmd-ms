import {Inject, Injectable} from '@nestjs/common';
import {NoteCreatedEvent} from './dto/event/note-created.event';
import {UpdateNoteDto} from './dto/update-note.dto';
import {ClientKafka} from "@nestjs/microservices";
import {CreateNoteRequest} from "./dto/request/create-note.request";

@Injectable()
export class NotesService {

    constructor(
        @Inject('APP_SERVICE') private readonly appClient: ClientKafka,
    ) {
    }

    create({userId, price}: CreateNoteRequest) {
        this.appClient.emit('note_created', new NoteCreatedEvent('123', userId, price))
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
}
