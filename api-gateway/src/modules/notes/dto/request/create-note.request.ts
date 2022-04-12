import {ApiProperty} from "@nestjs/swagger";
import {IsString} from 'class-validator';

export class CreateNoteRequest {
    @ApiProperty()
    @IsString()
    readonly title: string;
    @ApiProperty()
    @IsString()
    readonly description: string;
    @ApiProperty()
    @IsString()
    readonly cover: string;
}