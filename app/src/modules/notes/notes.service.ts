import {Inject, Injectable} from '@nestjs/common';
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

    create(createNoteDto: CreateNoteDto) {
        const note = new Note()
        note.metadata = { title:"123", description:"123", cover:"123"} as NoteMetadata
        note.context = { content: "123"} as NoteContext
        return note.save()
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
        let userId = noteCreatedEvent.userId;
        this.authClient
            .send('get_user', new GetUserRequest(userId))
            .subscribe((user) => {
                console.log(`Billing user with ${user.stripeUserId} a price of ${noteCreatedEvent.price}`)
            })
    }
}
