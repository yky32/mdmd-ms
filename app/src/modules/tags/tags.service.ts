import {Inject, Injectable} from '@nestjs/common';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {TAG_REPOSITORY} from "../../core/constants/index.app";
import {Tag} from "./tag.entity";

@Injectable()
export class TagsService {

    constructor(
        @Inject(TAG_REPOSITORY) private readonly tagRepository: typeof Tag,
    ) {
    }

    async create(createTagDto: CreateTagDto) {
        let tag = new Tag()
        tag.name = createTagDto.name
        await tag.save()
        return tag.get();
    }

    findAll() {
        return `This action returns all tags`;
    }

    findOne(id: number) {
        return `This action returns a #${id} tag`;
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    remove(id: number) {
        return `This action removes a #${id} tag`;
    }
}
