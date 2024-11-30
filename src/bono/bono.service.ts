/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';

@Injectable()
export class BonoService {
    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>
    ) { }

    async crearBono(bono: BonoEntity): Promise<BonoEntity> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: bono.usuario.id },
        });
        if (!bono.monto && bono.monto < 1) {
            throw new BusinessLogicException("El monto debe existir y ser positivo", BusinessError.BAD_REQUEST);
        }
        if ( usuario.rol == 'DECANA') {
            throw new BusinessLogicException("El usuario debe ser profesor", BusinessError.BAD_REQUEST);
        }
        return await this.bonoRepository.save(bono);
    }

    async deleteBonoId(id: string) {
        const bono: BonoEntity = await this.bonoRepository.findOne({ where: { id }, relations: ["usuario", "clase"] });
        if (!bono)
            throw new BusinessLogicException("No se encontró el bono", BusinessError.NOT_FOUND);

        // Verificar si tiene propuestas asociadas
        if (bono.calificacion <= 4) {
            throw new BusinessLogicException(
                "No se puede eliminar el bono porque la calificacion no es mayor a 4",
                BusinessError.PRECONDITION_FAILED,
            );
        }
        await this.bonoRepository.remove(bono);
    }

    async findBonoByUsuarioId(usuarioId: string): Promise<BonoEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["subordinados", "jefe", "clases", "bonos"]});
        if (!usuario)
          throw new BusinessLogicException("No se encontró el usuario", BusinessError.NOT_FOUND)
        return usuario.bonos;
    }

    async findBonoByCod(cod: string): Promise<BonoEntity[]> {
        const clase: ClaseEntity = await this.claseRepository.findOne({where: {codigo: cod}, relations: ["bonos", "usuario"]});
        if (!clase)
          throw new BusinessLogicException("No se encontró la clase", BusinessError.NOT_FOUND)
        
        return clase.bonos;
    }

    
}