import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { NotesService } from "../modules/notes/notes.service";
import { CreateNoteDto } from "../modules/notes/dto/create-note.dto";
import { UpdateNoteDto } from "../modules/notes/dto/update-note.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("notes")
@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notesService.remove(+id);
  }
}
