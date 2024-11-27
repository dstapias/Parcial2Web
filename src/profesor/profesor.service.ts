/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { GrupoInvestigacion } from './profesor.entity/profesor.entity';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ) { }

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        const gruposPermitidos = [GrupoInvestigacion.TICSW, GrupoInvestigacion.IMAGINE, GrupoInvestigacion.COMIT];
        if (!gruposPermitidos.includes(profesor.grupoInvestigacion)) {
            throw new BusinessLogicException("El grupo de investigacion no existe", BusinessError.BAD_REQUEST);
        }
        return await this.profesorRepository.save(profesor);
    }

    async findProfesorById(id: string): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { id }, relations: ["propuestas"] });
        if (!profesor)
            throw new BusinessLogicException("No se encontró el profesor", BusinessError.NOT_FOUND);
        return profesor;
    }

    async deleteProfesorId(id: string) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { id }, relations: ['propuestas'], });
        if (!profesor)
            throw new BusinessLogicException("No se encontró el profesor", BusinessError.NOT_FOUND);

        // Verificar si tiene propuestas asociadas
        if (profesor.propuestas && profesor.propuestas.length > 0) {
            throw new BusinessLogicException(
                "No se puede eliminar el profesor porque tiene propuestas asociadas",
                BusinessError.PRECONDITION_FAILED,
            );
        }

        await this.profesorRepository.remove(profesor);
    }

    async deleteProfesorCedula(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { cedula }, relations: ['propuestas'], });
        if (!profesor)
            throw new BusinessLogicException("No se encontró el profesor", BusinessError.NOT_FOUND);

        // Verificar si tiene propuestas asociadas
        if (profesor.propuestas && profesor.propuestas.length > 0) {
            throw new BusinessLogicException(
                "No se puede eliminar el profesor porque tiene propuestas asociadas",
                BusinessError.PRECONDITION_FAILED,
            );
        }

        await this.profesorRepository.remove(profesor);
    }




}