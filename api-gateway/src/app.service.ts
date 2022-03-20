import { Injectable } from '@nestjs/common';
import {AppConfigService} from "./config/configuration.service";

@Injectable()
export class AppService {
  constructor(
      private appConfigService: AppConfigService
  ) {
  }
  getHello(): string {
    return 'Hello World!' + this.appConfigService.name;
  }
}
