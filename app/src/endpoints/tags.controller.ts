import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TagsService } from '../modules/tags/tags.service';
import { CreateTagDto } from '../modules/tags/dto/create-tag.dto';
import { UpdateTagDto } from '../modules/tags/dto/update-tag.dto';
import {
  CREATE_TAG,
  FIND_ALL_TAGS,
  FIND_ONE_TAG,
  REMOVE_TAG,
  UPDATE_TAG
} from "../core/constants/index.message-pattern";

@Controller()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @MessagePattern(CREATE_TAG)
  create(@Payload() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @MessagePattern(FIND_ALL_TAGS)
  findAll() {
    return this.tagsService.findAll();
  }

  @MessagePattern(FIND_ONE_TAG)
  findOne(@Payload() id: number) {
    return this.tagsService.findOne(id);
  }

  @MessagePattern(UPDATE_TAG)
  update(@Payload() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(updateTagDto.id, updateTagDto);
  }

  @MessagePattern(REMOVE_TAG)
  remove(@Payload() id: number) {
    return this.tagsService.remove(id);
  }
}
