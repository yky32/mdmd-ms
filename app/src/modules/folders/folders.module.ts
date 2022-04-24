import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from '../../endpoints/folders.controller';

@Module({
  controllers: [FoldersController],
  providers: [FoldersService]
})
export class FoldersModule {}
