import { Module } from '@nestjs/common';
import { IngriedientsService } from './ingriedients.service';
import { IngriedientsController } from './ingriedients.controller';

@Module({
  controllers: [IngriedientsController],
  providers: [IngriedientsService]
})
export class IngriedientsModule {}
