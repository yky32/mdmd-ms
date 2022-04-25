import { Test, TestingModule } from '@nestjs/testing';
import { FoldersV1Endpoints } from '../../src/endpoints/folders.v1.endpoints';
import { FoldersService } from '../../src/modules/folders/folders.service';

describe('FoldersController', () => {
  let controller: FoldersV1Endpoints;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoldersV1Endpoints],
      providers: [FoldersService],
    }).compile();

    controller = module.get<FoldersV1Endpoints>(FoldersV1Endpoints);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
