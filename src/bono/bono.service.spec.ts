/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoService } from './bono.service';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { Rol } from '../usuario/usuario.entity/usuario.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('BonoService', () => {
  let service: BonoService;
  let bonoRepository: Repository<BonoEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;
  let claseRepository: Repository<ClaseEntity>;
  let bono: BonoEntity;
  let usuario: UsuarioEntity;
  let clase: ClaseEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BonoService],
    }).compile();

    service = module.get<BonoService>(BonoService);
    bonoRepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    claseRepository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(async () => {
    await bonoRepository.clear();
    await usuarioRepository.clear();
    await claseRepository.clear();

    usuario = await usuarioRepository.save({
      id:'',
      cedula: 123456789,
      nombre: 'Juan Pérez',
      grupoInvestigacion: 'TICSW',
      numeroExtension: 12345678,
      rol: Rol.PROF,
      jefe: null,
      subordinados: [],
      clases: [],
      bonos: [],
    });

    clase = await claseRepository.save({
      nombre: 'Clase de Prueba',
      codigo: '1234567890',
      creditos: 3,
      usuario: null,
      bonos: [],
    });

    bono = await bonoRepository.save({
      monto: 500,
      calificacion: 5,
      palabraClave: 'excelencia',
      usuario: usuario,
      clase: clase,
    });
  });

  it('crearBono debe crear un bono válido', async () => {
    const nuevoBono: BonoEntity = {
      id: '',
      monto: 1000,
      calificacion: 4.5,
      palabraClave: 'increible',
      usuario: usuario,
      clase: clase,
    };

    const result = await service.crearBono(nuevoBono);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.monto).toEqual(nuevoBono.monto);
    expect(result.usuario.id).toEqual(usuario.id);
    expect(result.clase.id).toEqual(clase.id);
  });

  it('crearBono debe lanzar excepción para monto inválido', async () => {
    const nuevoBono: BonoEntity = {
      id: '',
      monto: -100,
      calificacion: 4.5,
      palabraClave: 'increible',
      usuario: usuario,
      clase: clase,
    };
    try { const result = await service.crearBono(nuevoBono); }
    catch (error) {
      expect(error.message).toBe("El monto debe existir y ser positivo");
    }
  });

  it('crearBono debe lanzar excepción si el usuario es DECANA', async () => {
    const usuarioDecana = await usuarioRepository.save({
      nombre: 'Ana Gómez',
      cedula: 987654321,
      grupoInvestigacion: 'TICSW',
      numeroExtension: 87654321,
      rol: Rol.DECANA,
    });

    const nuevoBono: BonoEntity = {
      id: '',
      monto: 1000,
      calificacion: 4.5,
      palabraClave: 'increible',
      usuario: usuarioDecana,
      clase: clase,
    };
    try { const result = await service.crearBono(nuevoBono); }
    catch (error) {
      expect(error.message).toBe("El usuario debe ser profesor");
    }
  });

  it('deleteBonoId debe eliminar un bono existente', async () => {
    await service.deleteBonoId(bono.id);

    const bonoEliminado = await bonoRepository.findOne({ where: { id: bono.id } });
    expect(bonoEliminado).toBeNull();
  });

  it('deleteBonoId debe lanzar excepción para un bono inexistente', async () => {
    const idInexistente = '123e4567-e89b-12d3-a456-426614174000';
    try { await service.deleteBonoId(idInexistente) }
    catch (error) {
      expect(error.message).toBe("No se encontró el bono");
    }
  });

  it('deleteBonoId debe lanzar excepción para bono con calificación menor o igual a 4', async () => {
    bono.calificacion = 3;
    await bonoRepository.save(bono);

    try { await service.deleteBonoId(bono.id) }
    catch (error) {
      expect(error.message).toBe("No se puede eliminar el bono porque la calificacion no es mayor a 4");
    }
  });

  it('findBonoByUsuarioId debe devolver los bonos de un usuario', async () => {
    const result = await service.findBonoByUsuarioId(usuario.id);

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].id).toEqual(bono.id);
  });

  it('findBonoByUsuarioId debe lanzar excepción para un usuario inexistente', async () => {
    const idInexistente = '123e4567-e89b-12d3-a456-426614174000';
    try { await service.findBonoByUsuarioId(idInexistente) }
    catch (error) {
      expect(error.message).toBe("No se encontró el usuario");
    }
  });

  it('findBonoByCod debe devolver los bonos de una clase', async () => {
    const result = await service.findBonoByCod(clase.codigo);

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].id).toEqual(bono.id);
  });

  it('findBonoByCod debe lanzar excepción para una clase inexistente', async () => {
    const codigoInexistente = 'ABCDEFGHIJ';
    try { await service.findBonoByCod(codigoInexistente) }
    catch (error) {
      expect(error.message).toBe("No se encontró la clase");
    }
  });
});
