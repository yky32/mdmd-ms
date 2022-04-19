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

    create({title, description, cover, content}: CreateNoteRequest) {
        this.appClient
            .send('createNote', new CreateNoteDto(title, description, cover, content))
            .subscribe((note) => {
                console.log(`note_created: ${note.id}`)
            })
    }

    findAll() {
        return `This action returns all notes`;
    }

    async findOne(id: number) {
        return this.appClient
            .send('findOneNote', id)
            .subscribe((n) => {

            })
    }

    update(id: number, updateNoteDto: UpdateNoteDto) {
        return `This action updates a #${id} note`;
    }

    remove(id: number) {
        return `This action removes a #${id} note`;
    }
}
