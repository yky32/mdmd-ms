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
                    clientId: 'app-client',
                    brokers: ['yky32.asuscomm.com:29092'],
                },
                consumer: {
                    groupId: 'billing-consumer',
                },
                subscribe: {
                    fromBeginning: false,
                },
            },
        },
    );
    await app.listen();
}

// Start server
bootstrap();
