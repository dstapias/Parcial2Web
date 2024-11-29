import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BonoEntity, UsuarioEntity, ClaseEntity]), // Importar las entidades relacionadas
  ],
  providers: [BonoService],
  controllers: [BonoController]
})
export class BonoModule {}
