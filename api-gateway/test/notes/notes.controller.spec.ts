import { Test, TestingModule } from '@nestjs/testing';
import { NotesV1Endpoint } from '../../src/endpoints/notes.v1.endpoint';
import { NotesService } from '../../src/modules/notes/notes.service';

describe('NotesMessagePattern', () => {
  let controller: NotesV1Endpoint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesV1Endpoint],
      providers: [NotesService],
    }).compile();

    controller = module.get<NotesV1Endpoint>(NotesV1Endpoint);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
