import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersV1Endpoints } from '../../endpoints/folders.v1.endpoints';

@Module({
  controllers: [FoldersV1Endpoints],
  providers: [FoldersService]
})
export class FoldersModule {}
