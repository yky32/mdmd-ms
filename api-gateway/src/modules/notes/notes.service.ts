import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {UpdateNoteDto} from './dto/update-note.dto';
import {ClientKafka} from "@nestjs/microservices";
import {CreateNoteRequest} from "./dto/request/create-note.request";
import {CreateNoteDto} from "./dto/create-note.dto";
import {firstValueFrom, Observable} from "rxjs";

async function awaitSubscribeResponse(data$: Observable<any>, afterEvent: string) {
    await firstValueFrom(data$, {defaultValue: null})
        .then(e => {
            console.log(`${afterEvent} : ${e}`)
        })
        .catch(e => {
            console.log(e)
        });
}

@Injectable()
export class NotesService implements OnModuleInit {

    constructor(
        @Inject('APP_SERVICE') private readonly appClient: ClientKafka,
    ) {
    }

    onModuleInit() {
        this.appClient.subscribeToResponseOf('create-note');
        this.appClient.subscribeToResponseOf('findOne-note');
        this.appClient.subscribeToResponseOf('findAll-notes');
    }

    async create({title, description, cover, content}: CreateNoteRequest) {
        let data$ = this.appClient.send('create-note', new CreateNoteDto(title, description, cover, content))
        return await awaitSubscribeResponse(data$, 'note.created')
    }

    async findAll() {
        let data$ = this.appClient.send('findAll-notes', null)
        return await awaitSubscribeResponse(data$, 'notes.all.fetched')
    }

    async findOne(id: number) {
        let data$ = this.appClient.send('findOne-note', id)
        return await awaitSubscribeResponse(data$, 'note.one.fetched')
    }

    update(id: number, updateNoteDto: UpdateNoteDto) {
        return `This action updates a #${id} note`;
    }

    remove(id: number) {
        return `This action removes a #${id} note`;
    }
}
