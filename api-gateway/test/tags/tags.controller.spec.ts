import { Test, TestingModule } from '@nestjs/testing';
import { TagsEndpoint } from '../../src/endpoints/tags.endpoint';
import { TagsService } from '../../src/modules/tags/tags.service';

describe('TagsController', () => {
  let controller: TagsEndpoint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsEndpoint],
      providers: [TagsService],
    }).compile();

    controller = module.get<TagsEndpoint>(TagsEndpoint);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
