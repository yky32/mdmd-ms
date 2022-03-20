import {Inject, Injectable} from '@nestjs/common';
import {AppConfigService} from "./config/configuration.service";
import {OrderCreatedEvent} from "./order-created.event";
import {ClientKafka} from "@nestjs/microservices";
import {CreateOrderRequest} from "./create-order-request.dto";

@Injectable()
export class AppService {
  constructor(
      private appConfigService: AppConfigService,
      @Inject('APP_SERVICE') private readonly appClient: ClientKafka,
  ) {
  }
  getHello(): string {
    return 'Hello World!' + this.appConfigService.name;
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    this.appClient.emit(
        'order_created',
        new OrderCreatedEvent('123', userId, price),
    );
  }
}
