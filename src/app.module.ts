import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProfesorModule } from './profesor/profesor.module';

@Module({
  imports: [ProyectoModule, EstudianteModule, PropuestaModule, ProfesorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
