import { Test, TestingModule } from '@nestjs/testing';
import { NotesMessagePattern } from '../../src/endpoints/notes.message-pattern';
import { NotesService } from '../../src/modules/notes/notes.service';

describe('NotesController', () => {
  let controller: NotesMessagePattern;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesMessagePattern],
      providers: [NotesService],
    }).compile();

    controller = module.get<NotesMessagePattern>(NotesMessagePattern);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
