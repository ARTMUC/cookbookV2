import { Test, TestingModule } from '@nestjs/testing';
import { IngriedientsController } from './ingriedients.controller';
import { IngriedientsService } from './ingriedients.service';

describe('IngriedientsController', () => {
  let controller: IngriedientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngriedientsController],
      providers: [IngriedientsService],
    }).compile();

    controller = module.get<IngriedientsController>(IngriedientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
