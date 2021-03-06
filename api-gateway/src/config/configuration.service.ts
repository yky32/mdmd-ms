import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface AppInfoConfig {
  name: string;
  host: string;
  port: number;
}

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {

  constructor(private configService: ConfigService) {
  }
  private app = this.configService.get<AppInfoConfig>('app');

  get port(): number {
    return this.app.port
  }

  get name(): string {
    return this.app.name
  }
}

