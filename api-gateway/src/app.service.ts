import {Inject, Injectable} from '@nestjs/common';
import {AppConfigService} from "./config/configuration.service";
import {ClientKafka} from "@nestjs/microservices";

@Injectable()
export class AppService {
    constructor(private appConfigService: AppConfigService, @Inject('APP_SERVICE') private readonly appClient: ClientKafka,) {
    }

    getHello(): string {
        return 'Hello World!' + this.appConfigService.name;
    }
}
