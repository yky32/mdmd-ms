import {Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post} from '@nestjs/common';
import {NotesService} from '../modules/notes/notes.service';
import {UpdateNoteDto} from '../modules/notes/dto/update-note.dto';
import {ApiTags} from "@nestjs/swagger";
import {CreateNoteRequest} from "../modules/notes/dto/request/create-note.request";
import {ClientKafka} from "@nestjs/microservices";

@ApiTags("notes")
@Controller('notes')
export class NotesController{
    constructor(
        private readonly notesService: NotesService,
        @Inject('APP_SERVICE') private readonly appClient: ClientKafka,
    ) {
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
    async findOne(@Param('id') id: number) {
        return this.notesService.findOne(id)
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
