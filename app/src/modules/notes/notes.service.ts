import {HttpException, HttpStatus, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateNoteDto} from './dto/create-note.dto';
import {UpdateNoteDto} from './dto/update-note.dto';
import {NOTE_REPOSITORY} from "../../core/constants";
import {Note, NoteContext, NoteMetadata} from "./note.entity";
import {NoteCreatedEvent} from "./dto/event/note-created.event";
import {ClientKafka} from "@nestjs/microservices";
import {GetUserRequest} from "./dto/get-user-request.dto";

@Injectable()
export class NotesService {

    constructor(
        @Inject(NOTE_REPOSITORY) private readonly noteRepository: typeof Note,
        @Inject("AUTH_SERVICE") private readonly authClient: ClientKafka,
    ) {
    }

    async create(createNoteDto: CreateNoteDto) {
        let note = new Note();

        note.metadata = {
            title: createNoteDto.title,
            description: createNoteDto.description,
            cover: createNoteDto.cover
        } as NoteMetadata

        note.context = {
            data: createNoteDto.content
        } as NoteContext

        return await note.save();
    }

    findAll() {
        return `This action returns all notes`;
    }

    async findOne(id: number) {
        console.log(`This action returns a #${id} note`)
        let note = await this.noteRepository.findOne<Note>({where: {id}});

        if (!note) { // if the post doesn't exit in the db, throw a 404 error
            throw new NotFoundException("the NOTE doesn't exit")
        }

        return note.get()
    }

    update(id: number, updateNoteDto: UpdateNoteDto) {
        return `This action updates a #${id} note`;
    }

    remove(id: number) {
        return `This action removes a #${id} note`;
    }

    handleNoteCreated(noteCreatedEvent: NoteCreatedEvent) {
        console.log(noteCreatedEvent)
        let userId = noteCreatedEvent.userId;
        this.authClient
            .send('get_user', new GetUserRequest(userId))
            .subscribe((user) => {
                console.log(`Billing user with ${user.stripeUserId} a price of ${noteCreatedEvent.price}`)
            })
    }
}
