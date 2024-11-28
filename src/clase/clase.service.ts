/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';

@Injectable()
export class ClaseService {
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>
    ) { }

    async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
        if (clase.codigo.length != 10) {
            throw new BusinessLogicException("Debe tener diez caracteres el codigo", BusinessError.BAD_REQUEST);
        }
        return await this.claseRepository.save(clase);
    }

    async findClaseById(id: string): Promise<ClaseEntity> {
        const clase: ClaseEntity = await this.claseRepository.findOne({ where: { id }, relations: ["bonos", "usuarios"] });
        if (!clase)
            throw new BusinessLogicException("No se encontró la clase", BusinessError.NOT_FOUND);
        return clase;
    }


    async findBonoByclaseId(cod: string): Promise<BonoEntity[]> {
        const clase: ClaseEntity = await this.claseRepository.findOne({where: {codigo: cod}, relations: ["bonos", "usuarios"]});
        if (!clase)
          throw new BusinessLogicException("No se encontró la clase", BusinessError.NOT_FOUND)
        
        return clase.bonos;
    }

    
}