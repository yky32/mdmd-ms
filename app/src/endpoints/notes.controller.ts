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
    ) {}

    onModuleInit() {
        this.authClient.subscribeToResponseOf('get_user');
    }

    @EventPattern('note.created')
    handleOrderCreated(data: any) {
        this.notesService.handleNoteCreated(data.value);
    }

    @MessagePattern('create-note')
    create(data: any) {
        console.log(`@MessagePattern('create-note') ${data.value}`)
        return this.notesService.create(data.value as CreateNoteDto);
    }

    @MessagePattern('findAll-notes')
    findAll() {
        console.log(`@MessagePattern('findAll-notes')`)
        return this.notesService.findAll();
    }

    @MessagePattern('findOne-note')
    findOne(data: any) {
        console.log(`@MessagePattern('findOne-note') ${data.value}`)
        return this.notesService.findOne(data.value as number);
    }

    @MessagePattern('update-note')
    update(@Payload() updateNoteDto: UpdateNoteDto) {
        return this.notesService.update(updateNoteDto.id, updateNoteDto);
    }

    @MessagePattern('remove-note')
    remove(@Payload() id: number) {
        return this.notesService.remove(id)
    }
}
