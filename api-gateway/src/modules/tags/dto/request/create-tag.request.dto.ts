import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateTagRequestDto {
    @ApiProperty()
    @IsString()
    readonly name: string;
}
