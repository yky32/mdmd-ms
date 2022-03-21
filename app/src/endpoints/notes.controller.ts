import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotesService } from '../modules/notes/notes.service';
import { CreateNoteDto } from '../modules/notes/dto/create-note.dto';
import { UpdateNoteDto } from '../modules/notes/dto/update-note.dto';

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @MessagePattern('createNote')
  create(@Payload() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
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
