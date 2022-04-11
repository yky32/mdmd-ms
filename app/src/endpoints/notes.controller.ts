import {Controller, Inject, OnModuleInit} from '@nestjs/common';
import {ClientKafka, EventPattern, MessagePattern, Payload} from '@nestjs/microservices';
import {NotesService} from '../modules/notes/notes.service';
import {CreateNoteDto} from '../modules/notes/dto/create-note.dto';
import {UpdateNoteDto} from '../modules/notes/dto/update-note.dto';

@Controller()
export class NotesController implements OnModuleInit {
    constructor(
        private readonly notesService: NotesService,
        @Inject("AUTH_SERVICE") private readonly authClient: ClientKafka,
    ) {
    }

    onModuleInit() {
        this.authClient.subscribeToResponseOf('get_user');
    }

    @EventPattern('note_created')
    handleOrderCreated(data: any) {
        this.notesService.handleNoteCreated(data.value);
    }

    @MessagePattern('createNote')
    create(data: any) {
        return this.notesService.create(data.value);
    }

    @MessagePattern('findAllNotes')
    findAll() {
        return this.notesService.findAll();
    }

    @MessagePattern('findOneNote')
    findOne(@Payload() id: number) {
        return this.notesService.findOne(id);
    }

    @MessagePattern('updateNote')
    update(@Payload() updateNoteDto: UpdateNoteDto) {
        return this.notesService.update(updateNoteDto.id, updateNoteDto);
    }

    @MessagePattern('removeNote')
    remove(@Payload() id: number) {
        return this.notesService.remove(id);
    }
}
