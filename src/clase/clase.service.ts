/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';

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
        const clase: ClaseEntity = await this.claseRepository.findOne({ where: { id }, relations: ["bonos", "usuario"] });
        if (!clase)
            throw new BusinessLogicException("No se encontró la clase", BusinessError.NOT_FOUND);
        return clase;
    }

    
}