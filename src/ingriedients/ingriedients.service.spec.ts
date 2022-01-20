import { Test, TestingModule } from '@nestjs/testing';
import { IngriedientsService } from './ingriedients.service';

describe('IngriedientsService', () => {
  let service: IngriedientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngriedientsService],
    }).compile();

    service = module.get<IngriedientsService>(IngriedientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
