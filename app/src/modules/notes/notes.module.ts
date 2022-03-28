import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from '../../endpoints/notes.controller';
import {notessProviders} from "./notes.providers";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['yky32.asuscomm.com:29092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService, ...notessProviders]
})
export class NotesModule {}
