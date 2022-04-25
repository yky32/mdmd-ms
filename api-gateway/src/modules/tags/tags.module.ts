import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsV1Endpoint } from '../../endpoints/tags.v1.endpoint';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {
  APP_CLIENT_ID_KAFKA,
  APP_CONSUMER_KAFKA,
  APP_SERVICE_KAFKA,
  BROKER_ADDRESS_KAFKA
} from "../../core/constants/index.app";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: APP_SERVICE_KAFKA,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: APP_CLIENT_ID_KAFKA,
            brokers: [BROKER_ADDRESS_KAFKA],
          },
          consumer: {
            groupId: APP_CONSUMER_KAFKA,
          },
        },
      },
    ]),
  ],
  controllers: [TagsV1Endpoint],
  providers: [TagsService]
})
export class TagsModule {}
