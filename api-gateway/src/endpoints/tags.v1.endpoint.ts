import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TagsService} from '../modules/tags/tags.service';
import {UpdateTagDto} from '../modules/tags/dto/update-tag.dto';
import {ApiTags} from "@nestjs/swagger";
import {API_PREFIX, API_V1} from "../core/constants/api-gw.app";
import {CreateTagRequestDto} from "../modules/tags/dto/request/create-tag.request.dto";

let domain = 'tags';
const prefix = API_PREFIX + API_V1 + domain;

@ApiTags(domain)
@Controller(prefix)
export class TagsV1Endpoint {
    constructor(private readonly tagsService: TagsService) {
    }

    @Post()
    create(@Body() createTagDto: CreateTagRequestDto) {
        return this.tagsService.create(createTagDto);
    }

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagsService.update(+id, updateTagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tagsService.remove(+id);
    }
}
