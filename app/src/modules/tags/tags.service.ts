import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {TAG_REPOSITORY} from "../../core/constants/app.app";
import {Tag} from "./tag.entity";

@Injectable()
export class TagsService {

    constructor(
        @Inject(TAG_REPOSITORY) private readonly tagRepository: typeof Tag,
    ) {
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        let tag = new Tag()
        tag.name = createTagDto.name
        await tag.save()
        return tag.get();
    }

    async findAll(): Promise<Tag[]> {
        return await this.tagRepository.findAll()
    }

    async findOne(id: number): Promise<Tag> {
        let tag = await this.tagRepository.findOne<Tag>({where: {id}})
        if (!tag) {
            throw new NotFoundException("the Tag doesn't exit")
        }
        return tag.get()
    }

    async update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    remove(id: number) {
        return `This action removes a #${id} tag`;
    }
}
