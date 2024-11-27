import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ) { }

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.codigo.length > 10) {
            throw new BusinessLogicException("El código no puede tener más de 10 caracteres", BusinessError.BAD_REQUEST);
        }
        return await this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: string): Promise<EstudianteEntity> {
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({ where: { id }, relations: ['proyecto'], });
        if (!estudiante)
            throw new BusinessLogicException("No se encontró estudiante", BusinessError.NOT_FOUND);
        return estudiante;
    }
}
