import { Test, TestingModule } from '@nestjs/testing';
import { TagsV1Endpoint } from '../../src/endpoints/tags.v1.endpoint';
import { TagsService } from '../../src/modules/tags/tags.service';

describe('TagsController', () => {
  let controller: TagsV1Endpoint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsV1Endpoint],
      providers: [TagsService],
    }).compile();

    controller = module.get<TagsV1Endpoint>(TagsV1Endpoint);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
