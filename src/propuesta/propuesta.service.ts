import { Injectable } from '@nestjs/common';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ) { }

    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        if (!propuesta.titulo || propuesta.titulo.trim() === '') {
            throw new BusinessLogicException("El titulo esta vacío", BusinessError.BAD_REQUEST);
        }
        return await this.propuestaRepository.save(propuesta);
    }

    async findPropuestaById(id: string): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({ where: { id }, relations: ['profesor', 'proyecto'], });
        if (!propuesta)
            throw new BusinessLogicException("No se encontró la propuesta", BusinessError.NOT_FOUND);
        return propuesta;
    }
    async findAllPropuesta(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ['profesor', 'proyecto'] });
    }

    async deletePropuestaById(id: string){
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({ where: { id }, relations: ['profesor', 'proyecto'], });
        if (!propuesta)
            throw new BusinessLogicException("No se encontró la propuesta", BusinessError.NOT_FOUND);
        if (propuesta.proyecto) {
            throw new BusinessLogicException(
                "No se puede eliminar la propuesta porque tiene un proyecto asociado",
                BusinessError.PRECONDITION_FAILED,
            );
        }
        await this.propuestaRepository.remove(propuesta);
    }
}
