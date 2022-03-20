import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "../../endpoints/users.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {
}
