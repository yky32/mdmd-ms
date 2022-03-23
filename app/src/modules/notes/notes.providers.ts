import {Note} from "./note.entity";
import {NOTE_REPOSITORY} from "../../core/constants";

export const notessProviders = [
    {
        provide: NOTE_REPOSITORY,
        useValue: Note,
    },
];