import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProfesorModule } from './profesor/profesor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';
import { PropuestaEntity } from './propuesta/propuesta.entity/propuesta.entity';

@Module({
  imports: [ProyectoModule, EstudianteModule, PropuestaModule, ProfesorModule, 
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'parcial2',
    entities: [ProfesorEntity, ProyectoEntity, PropuestaEntity, EstudianteEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
