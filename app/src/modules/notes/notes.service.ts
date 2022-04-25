import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateNoteDto} from './dto/create-note.dto';
import {UpdateNoteDto} from './dto/update-note.dto';
import {AUTH_SERVICE_KAFKA, NOTE_REPOSITORY} from "../../core/constants/app.app";
import {Note, NoteContext, NoteMetadata} from "./note.entity";
import {ClientKafka} from "@nestjs/microservices";

@Injectable()
export class NotesService {
    constructor(
        @Inject(NOTE_REPOSITORY) private readonly noteRepository: typeof Note,
        @Inject(AUTH_SERVICE_KAFKA) private readonly authClient: ClientKafka,
    ) {
    }

    async create(value: CreateNoteDto): Promise<Note> {
        let note = new Note();
        note.metadata = {
            title: value.title,
            description: value.description,
            cover: value.cover
        } as NoteMetadata

        note.context = {
            data: value.content
        } as NoteContext

        await note.save()
        return note.get()
    }

    async findAll(): Promise<Note[]> {
        return await this.noteRepository.findAll()
    }

    async findOne(id: number): Promise<Note> {
        console.log(`This action returns a #${id} note`)
        let note = await this.noteRepository.findOne<Note>({where: {id}})
        if (!note) { // if the post doesn't exit in the db, throw a 404 error
            throw new NotFoundException("the NOTE doesn't exit")
        }
        return note.get()
    }

    async update(id: number, updateNoteDto: UpdateNoteDto) {
        // console.log(`This action updates a #${id} note`)
        // let note = await this.noteRepository.update({...updateNoteDto}, {where: {id}});
        // return note
    }

    remove(id: number) {
        return `This action removes a #${id} note`;
    }
}
