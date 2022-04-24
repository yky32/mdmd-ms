import { Test, TestingModule } from '@nestjs/testing';
import { NotesEndpoint } from '../../src/endpoints/notes.endpoint';
import { NotesService } from '../../src/modules/notes/notes.service';

describe('NotesController', () => {
  let controller: NotesEndpoint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesEndpoint],
      providers: [NotesService],
    }).compile();

    controller = module.get<NotesEndpoint>(NotesEndpoint);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
