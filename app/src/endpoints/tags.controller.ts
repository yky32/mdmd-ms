import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {TagsService} from '../modules/tags/tags.service';
import {CreateTagDto} from '../modules/tags/dto/create-tag.dto';
import {UpdateTagDto} from '../modules/tags/dto/update-tag.dto';
import {CREATE_TAG, FIND_ALL_TAGS, FIND_ONE_TAG, REMOVE_TAG, UPDATE_TAG} from "../core/constants/app.message-pattern";

@Controller()
export class TagsController {
    constructor(private readonly tagsService: TagsService) {
    }

    @MessagePattern(CREATE_TAG)
    create(data: any) {
        console.log(`@MessagePattern('${CREATE_TAG}') ${data.value}`)
        return this.tagsService.create(data.value as CreateTagDto);
    }

    @MessagePattern(FIND_ALL_TAGS)
    findAll() {
        console.log(`@MessagePattern('${FIND_ALL_TAGS}')`)
        return this.tagsService.findAll();
    }

    @MessagePattern(FIND_ONE_TAG)
    findOne(data: any) {
        console.log(`@MessagePattern('${FIND_ONE_TAG}') ${data.value}`)
        return this.tagsService.findOne(data.value as number);
    }

    @MessagePattern(UPDATE_TAG)
    update(data: any) {
        return this.tagsService.update(data.value.id, data.value as UpdateTagDto);
    }

    @MessagePattern(REMOVE_TAG)
    remove(@Payload() id: number) {
        return this.tagsService.remove(id);
    }
}
