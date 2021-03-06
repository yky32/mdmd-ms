import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsString} from 'class-validator';

export class CreateNoteRequestDto {
    @ApiProperty()
    @IsString()
    readonly title: string;
    @ApiProperty()
    @IsString()
    readonly description: string;
    @ApiProperty()
    @IsString()
    readonly cover: string;
    @ApiProperty()
    @IsString()
    readonly content: string;
    @ApiProperty()
    @IsArray()
    readonly tagIds: string[];
}
