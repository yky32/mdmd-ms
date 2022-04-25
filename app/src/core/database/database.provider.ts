import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, QA, PRODUCTION } from '../constants/app.app';
import { databaseConfig } from './database.config';
import { Note } from '../../modules/notes/note.entity';
import {Tag} from "../../modules/tags/tag.entity";
import {NoteTag} from "../../modules/composite/note-tag.entity";
import {Folder} from "../../modules/folders/folder.entity";

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case QA:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }
            const sequelize = new Sequelize(config);
            sequelize.addModels([
                Note,
                Tag,
                Folder,
                NoteTag,
            ]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
