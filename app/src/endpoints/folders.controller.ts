import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {FoldersService} from '../modules/folders/folders.service';
import {CreateFolderDto} from '../modules/folders/dto/create-folder.dto';
import {UpdateFolderDto} from '../modules/folders/dto/update-folder.dto';
import {
    CREATE_FOLDER,
    FIND_ALL_FOLDERS,
    FIND_ONE_FOLDER,
    REMOVE_FOLDER,
    UPDATE_FOLDER
} from "../core/constants/app.message-pattern";

@Controller()
export class FoldersController {
    constructor(private readonly foldersService: FoldersService) {
    }

    @MessagePattern(CREATE_FOLDER)
    create(@Payload() createFolderDto: CreateFolderDto) {
        return this.foldersService.create(createFolderDto);
    }

    @MessagePattern(FIND_ALL_FOLDERS)
    findAll() {
        return this.foldersService.findAll();
    }

    @MessagePattern(FIND_ONE_FOLDER)
    findOne(@Payload() id: number) {
        return this.foldersService.findOne(id);
    }

    @MessagePattern(UPDATE_FOLDER)
    update(@Payload() updateFolderDto: UpdateFolderDto) {
        return this.foldersService.update(updateFolderDto.id, updateFolderDto);
    }

    @MessagePattern(REMOVE_FOLDER)
    remove(@Payload() id: number) {
        return this.foldersService.remove(id);
    }
}
