import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {APP_SERVICE_KAFKA} from "../../core/constants/index.app";
import {ClientKafka} from "@nestjs/microservices";
import {CREATE_TAG} from "../../../../app/dist/core/constants/index.message-pattern";
import {CreateTagRequestDto} from "./dto/request/create-tag.request.dto";
import {getPromise} from "../../common/util";

@Injectable()
export class TagsService implements OnModuleInit {

    constructor(
        @Inject(APP_SERVICE_KAFKA) private readonly appClient: ClientKafka,
    ) {
    }

    onModuleInit(): any {
        this.appClient.subscribeToResponseOf(CREATE_TAG);
    }

    async create({name}: CreateTagRequestDto) {
      let data$ = this.appClient.send(CREATE_TAG, new CreateTagDto(name))
      return await getPromise(data$)
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
