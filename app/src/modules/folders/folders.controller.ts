import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller()
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @MessagePattern('createFolder')
  create(@Payload() createFolderDto: CreateFolderDto) {
    return this.foldersService.create(createFolderDto);
  }

  @MessagePattern('findAllFolders')
  findAll() {
    return this.foldersService.findAll();
  }

  @MessagePattern('findOneFolder')
  findOne(@Payload() id: number) {
    return this.foldersService.findOne(id);
  }

  @MessagePattern('updateFolder')
  update(@Payload() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.update(updateFolderDto.id, updateFolderDto);
  }

  @MessagePattern('removeFolder')
  remove(@Payload() id: number) {
    return this.foldersService.remove(id);
  }
}
