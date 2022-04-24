import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {APP_CONSUMER_KAFKA} from "./core/constants/index.app";


async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            logger: ['log', 'error', 'warn', 'debug'],
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: ['yky32.asuscomm.com:9092'],
                },
                consumer: {
                    groupId: APP_CONSUMER_KAFKA,
                }
            },
        },
    );
    await app.listen();
}

// Start server
bootstrap();
