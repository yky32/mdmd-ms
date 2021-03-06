import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {APP_SERVICE_KAFKA} from "../../core/constants/api-gw.app";
import {ClientKafka} from "@nestjs/microservices";
import {CreateTagRequestDto} from "./dto/request/create-tag.request.dto";
import {getPromise} from "../../core/util";
import {CREATE_TAG, FIND_ALL_TAGS, FIND_ONE_TAG} from "../../core/constants/api-gw.message-pattern";

@Injectable()
export class TagsService implements OnModuleInit {

    constructor(
        @Inject(APP_SERVICE_KAFKA) private readonly appClient: ClientKafka,
    ) {}

    onModuleInit(): any {
        this.appClient.subscribeToResponseOf(CREATE_TAG);
    }

    async create({name}: CreateTagRequestDto) {
        let data$ = this.appClient.send(CREATE_TAG, new CreateTagDto(name))
        return await getPromise(data$)
    }

    async findAll() {
        let data$ = this.appClient.send(FIND_ALL_TAGS, {})
        return await getPromise(data$)
    }

    async findOne(id: number) {
        let data$ = this.appClient.send(FIND_ONE_TAG, id)
        return await getPromise(data$)
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    remove(id: number) {
        return `This action removes a #${id} tag`;
    }
}
