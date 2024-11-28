import { Module } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { PropuestaController } from './propuesta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],
  providers: [PropuestaService],
  controllers: [PropuestaController]
})
export class PropuestaModule {}
