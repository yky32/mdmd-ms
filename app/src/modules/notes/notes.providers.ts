import {Note} from "./note.entity";
import {NOTE_REPOSITORY, NOTE_TAG_REPOSITORY} from "../../core/constants/app.app";
import {NoteTag} from "../composite/note-tag.entity";

export const notesProviders = [
    {
        provide: NOTE_REPOSITORY,
        useValue: Note,
    },
    {
        provide: NOTE_TAG_REPOSITORY,
        useValue: NoteTag,
    },
];
