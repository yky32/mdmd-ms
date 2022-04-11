import {Inject, Injectable} from '@nestjs/common';
import {UpdateNoteDto} from './dto/update-note.dto';
import {ClientKafka} from "@nestjs/microservices";
import {CreateNoteRequest} from "./dto/request/create-note.request";
import {CreateNoteDto} from "./dto/create-note.dto";

@Injectable()
export class NotesService {

    constructor(
        @Inject('APP_SERVICE') private readonly appClient: ClientKafka,
    ) {
    }

    create({title, description, cover}: CreateNoteRequest) {
        this.appClient
            .send('createNote', new CreateNoteDto(title, description, cover))
            .subscribe((note) => {
                console.log(`create_note ${note.id}`)
            })
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
