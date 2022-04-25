import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {NotesService} from '../modules/notes/notes.service';
import {CreateNoteDto} from '../modules/notes/dto/create-note.dto';
import {UpdateNoteDto} from '../modules/notes/dto/update-note.dto';
import {
    CREATE_NOTE,
    FIND_ALL_NOTES,
    FIND_ONE_NOTE,
    REMOVE_NOTE,
    UPDATE_NOTE
} from "../core/constants/app.message-pattern";
import {NotesUseCase} from "../modules/notes/notes.usecases";

@Controller()
export class NotesMessagePattern {
    constructor(
        private readonly notesService: NotesService,
        private readonly notesUseCase: NotesUseCase,
    ) {
    }


    @MessagePattern(CREATE_NOTE)
    create(data: any) {
        console.log(`@MessagePattern('${CREATE_NOTE}') ${data.value}`)
        return this.notesUseCase.create(data.value as CreateNoteDto);
    }

    @MessagePattern(FIND_ALL_NOTES)
    findAll() {
        console.log(`@MessagePattern('${FIND_ALL_NOTES}')`)
        return this.notesService.findAll();
    }

    @MessagePattern(FIND_ONE_NOTE)
    findOne(data: any) {
        console.log(`@MessagePattern('${FIND_ONE_NOTE}') ${data.value}`)
        return this.notesService.findOne(data.value as number);
    }

    @MessagePattern(UPDATE_NOTE)
    update(data: any) {
        return this.notesService.update(data.value.id as number, data.value as UpdateNoteDto);
    }

    @MessagePattern(REMOVE_NOTE)
    remove(@Payload() id: number) {
        return this.notesService.remove(id)
    }
}
