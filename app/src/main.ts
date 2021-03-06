import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {APP_CONSUMER_KAFKA, BROKER_ADDRESS_KAFKA} from "./core/constants/app.app";
import {HttpExceptionFilter} from "./core/filters/http-exeception.filter";


async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            logger: ['log', 'error', 'warn', 'debug'],
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: [BROKER_ADDRESS_KAFKA],
                },
                consumer: {
                    groupId: APP_CONSUMER_KAFKA,
                }
            },
        },
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen();
}

// Start server
bootstrap();
