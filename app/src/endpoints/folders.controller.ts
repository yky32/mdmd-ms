import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { FoldersService } from "../modules/folders/folders.service";
import { CreateFolderDto } from "../modules/folders/dto/create-folder.dto";
import { UpdateFolderDto } from "../modules/folders/dto/update-folder.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("folders")
@Controller("folders")
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {
  }

  @Post()
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.foldersService.create(createFolderDto);
  }

  @Get()
  findAll() {
    return this.foldersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.foldersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.update(+id, updateFolderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.foldersService.remove(+id);
  }
}
