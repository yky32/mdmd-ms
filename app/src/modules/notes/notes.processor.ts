import {Injectable} from '@nestjs/common';

@Injectable()
export class NotesProcessor {
    constructor() {
    }

    orderCreated(data: any) {
        console.log(data)
    }
}
