import {Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post} from '@nestjs/common';
import {NotesService} from '../modules/notes/notes.service';
import {UpdateNoteDto} from '../modules/notes/dto/update-note.dto';
import {ApiTags} from "@nestjs/swagger";
import {CreateNoteRequest} from "../modules/notes/dto/request/create-note.request";
import {ClientKafka} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

@ApiTags("notes")
@Controller('notes')
export class NotesController implements OnModuleInit{
    constructor(
        private readonly notesService: NotesService,
        @Inject('APP_SERVICE') private readonly appClient: ClientKafka,
    ) {
    }

    onModuleInit() {
        this.appClient.subscribeToResponseOf('createNote');
        this.appClient.subscribeToResponseOf('findOneNote');
    }

    @Post()
    create(@Body() createNoteRequest: CreateNoteRequest) {
        return this.notesService.create(createNoteRequest);
    }

    @Get()
    findAll() {
        return this.notesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        let data$ = this.appClient.send('findOneNote', id)
        return await firstValueFrom(data$, {defaultValue: null})
            .catch( e => {
                console.log(e)}
            )
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
        return this.notesService.update(+id, updateNoteDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.notesService.remove(+id);
    }
}
