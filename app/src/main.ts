import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";


async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: ['yky32.asuscomm.com:9092'],
                },
                consumer: {
                    groupId: 'billing-consumer',
                }
            },
        },
    );
    await app.listen();
}

// Start server
bootstrap();
