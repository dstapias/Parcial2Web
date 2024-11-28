/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) { }

    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const gruposPermitidos = ['TICSW', 'IMAGINE', 'COMIT'];
        if (usuario.rol == 'PROF' && !gruposPermitidos.includes(usuario.grupoInvestigacion)) {
            throw new BusinessLogicException("El grupo de investigacion no existe", BusinessError.BAD_REQUEST);
        }
        if (usuario.rol == 'DECANA' && usuario.numeroExtension > 9999999 &&  usuario.numeroExtension< 100000000 ) {
            throw new BusinessLogicException("La extension debe tener 8 caracteres", BusinessError.BAD_REQUEST);
        }
        return await this.usuarioRepository.save(usuario);
    }

    async findUsuarioById(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id }, relations: ["subordinados", "jefe", "clases", "bonos"] });
        if (!usuario)
            throw new BusinessLogicException("No se encontró el usuario", BusinessError.NOT_FOUND);
        return usuario;
    }

    async deleteUsuarioId(id: string) {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id }, relations: ["subordinados", "jefe", "clases", "bonos"] });
        if (!usuario)
            throw new BusinessLogicException("No se encontró el profesor", BusinessError.NOT_FOUND);

        // Verificar si tiene propuestas asociadas
        if (usuario.bonos && usuario.bonos.length > 0) {
            throw new BusinessLogicException(
                "No se puede eliminar el usuario porque tiene bonos",
                BusinessError.PRECONDITION_FAILED,
            );
        }

        if (usuario.rol == 'DECANA') {
            throw new BusinessLogicException("No se puede eliminar porque es DECANA", BusinessError.BAD_REQUEST);
        }
        await this.usuarioRepository.remove(usuario);
    }

    async findBonoByUsuarioId(usuarioId: string): Promise<BonoEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["subordinados", "jefe", "clases", "bonos"]});
        if (!usuario)
          throw new BusinessLogicException("No se encontró el usuario", BusinessError.NOT_FOUND)
        return usuario.bonos;
    }

}