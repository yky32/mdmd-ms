import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {NotesService} from '../modules/notes/notes.service';
import {UpdateNoteDto} from '../modules/notes/dto/update-note.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateNoteRequestDto} from "../modules/notes/dto/request/create-note.request.dto";
import {API_PREFIX, API_V1} from "../core/constants/index.app";

let domain = 'notes';
const prefix = API_PREFIX + API_V1 + domain;

@ApiTags(domain)
@Controller(prefix)
export class NotesV1Endpoint {
    constructor(
        private readonly notesService: NotesService,
    ) {
    }

    @ApiOperation({summary: "Create new note."})
    @ApiResponse({status: HttpStatus.CREATED})
    @Post()
    create(@Body() createNoteRequest: CreateNoteRequestDto) {
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
