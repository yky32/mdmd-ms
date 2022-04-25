import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateNoteDto} from './dto/create-note.dto';
import {UpdateNoteDto} from './dto/update-note.dto';
import {AUTH_SERVICE_KAFKA, NOTE_REPOSITORY} from "../../core/constants/index.app";
import {Note, NoteContext, NoteMetadata} from "./note.entity";
import {ClientKafka} from "@nestjs/microservices";
import {TagsService} from "../tags/tags.service";
import {APP_SERVICE_KAFKA} from "../../../../api-gateway/src/core/constants/index.app";
import {NOTE_CREATED} from "../../core/constants/index.event";

@Injectable()
export class NotesService {
    constructor(
        private readonly tagsService: TagsService,
        @Inject(NOTE_REPOSITORY) private readonly noteRepository: typeof Note,
        @Inject(AUTH_SERVICE_KAFKA) private readonly authClient: ClientKafka,
        @Inject(APP_SERVICE_KAFKA) private readonly appClient: ClientKafka,
    ) {
    }

    async create(createNoteDto: CreateNoteDto): Promise<Note> {
        let note = new Note();
        note.metadata = {
            title: createNoteDto.title,
            description: createNoteDto.description,
            cover: createNoteDto.cover
        } as NoteMetadata

        note.context = {
            data: createNoteDto.content
        } as NoteContext

        if (createNoteDto.tagIds) {
            this.appClient.emit(NOTE_CREATED,
                {
                    tagIds: createNoteDto.tagIds,
                    note: note
                })
        }
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

    handleNoteCreated(data: any) {
        console.log(data)
    }
}
