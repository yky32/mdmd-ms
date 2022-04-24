import {TAG_REPOSITORY} from "../../core/constants/index.app";
import {Tag} from "./tag.entity";

export const tagsProviders = [
    {
        provide: TAG_REPOSITORY,
        useValue: Tag,
    },
];
