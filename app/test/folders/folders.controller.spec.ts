import { Test, TestingModule } from '@nestjs/testing';
import { FoldersController } from '../../src/endpoints/folders.controller';
import { FoldersService } from '../../src/modules/folders/folders.service';

describe('FoldersController', () => {
  let controller: FoldersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoldersController],
      providers: [FoldersService],
    }).compile();

    controller = module.get<FoldersController>(FoldersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
