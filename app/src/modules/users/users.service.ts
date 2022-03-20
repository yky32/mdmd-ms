import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ConfigService } from "@nestjs/config";
import { AppConfigService } from "../../config/configuration.service";

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private appConfigService: AppConfigService
  ) {
  }

  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll() {

    return `This action returns all users` + this.appConfigService.port
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
