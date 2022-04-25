import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {UpdateNoteDto} from './dto/update-note.dto';
import {ClientKafka} from "@nestjs/microservices";
import {CreateNoteRequestDto} from "./dto/request/create-note.request.dto";
import {CreateNoteDto} from "./dto/create-note.dto";
import {firstValueFrom, Observable} from "rxjs";
import {CREATE_NOTE, FIND_ALL_NOTES, FIND_ONE_NOTE} from "../../core/constants/api-gw.message-pattern";
import {APP_SERVICE_KAFKA} from "../../core/constants/api-gw.app";
import {getPromise} from "../../core/util";



@Injectable()
export class NotesService implements OnModuleInit {

    constructor(
        @Inject(APP_SERVICE_KAFKA) private readonly appClient: ClientKafka,
    ) {
    }

    onModuleInit() {
        this.appClient.subscribeToResponseOf(CREATE_NOTE);
        this.appClient.subscribeToResponseOf(FIND_ONE_NOTE);
        this.appClient.subscribeToResponseOf(FIND_ALL_NOTES);
    }

    async create({title, description, cover, content, tagIds}: CreateNoteRequestDto) {
        let data$ = this.appClient.send(CREATE_NOTE, new CreateNoteDto(title, description, cover, content, tagIds))
        return await getPromise(data$)
    }

    async findAll() {
        let data$ = this.appClient.send(FIND_ALL_NOTES, {})
        return await getPromise(data$)
    }

    async findOne(id: number) {
        let data$ = this.appClient.send(FIND_ONE_NOTE, id)
        return await getPromise(data$)
    }

    update(id: number, updateNoteDto: UpdateNoteDto) {
        return `This action updates a #${id} note`;
    }

    remove(id: number) {
        return `This action removes a #${id} note`;
    }
}
