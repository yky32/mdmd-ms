import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {NotesService} from '../modules/notes/notes.service';
import {UpdateNoteDto} from '../modules/notes/dto/update-note.dto';
import {ApiTags} from "@nestjs/swagger";
import {CreateNoteRequest} from "../modules/notes/dto/request/create-note.request";
import {API_PREFIX, API_V1} from "../core/constants/index.app";

const prefix = API_PREFIX + API_V1 + 'notes';

@ApiTags(prefix)
@Controller(prefix)
export class NotesV1Endpoint {
    constructor(
        private readonly notesService: NotesService,
    ) {}

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
