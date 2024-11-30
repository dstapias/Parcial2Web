/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClaseEntity } from './clase.entity/clase.entity';
import { ClaseService } from './clase.service';

describe('ClaseService', () => {
  let service: ClaseService;
  let repository: Repository<ClaseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClaseService],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    repository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearClase debe crear una clase válida', async () => {
    const nuevaClase: ClaseEntity = {
      id: '',
      nombre: 'Clase Nueva',
      codigo: 'ABCDEFGHIJ',
      creditos: 4,
      usuario: null,
      bonos: [],
    };

    const result = await service.crearClase(nuevaClase);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.codigo).toEqual(nuevaClase.codigo);
  });

  it('crearClase debe lanzar excepción para código con longitud inválida', async () => {
    const claseInvalida: ClaseEntity = {
      id: '',
      nombre: 'Clase Inválida',
      codigo: '12345', // Código demasiado corto
      creditos: 4,
      usuario: null,
      bonos: [],
    };
    try { await service.crearClase(claseInvalida); }
    catch (error) {
      expect(error.message).toBe("Debe tener diez caracteres el codigo");
    }
  });

  it('findClaseById debe devolver una clase existente', async () => {
    const nuevaClase: ClaseEntity = {
      id: '',
      nombre: 'Clase Nueva',
      codigo: 'ABCDEFGHIJ',
      creditos: 4,
      usuario: null,
      bonos: [],
    };
    await service.crearClase(nuevaClase);
    const result = await service.findClaseById(nuevaClase.id);
    expect(result).toBeDefined();
    expect(result.id).toEqual(nuevaClase.id);
    expect(result.nombre).toEqual(nuevaClase.nombre);
  });

  it('findClaseById debe lanzar excepción para una clase inexistente', async () => {
    const idInexistente = '123e4567-e89b-12d3-a456-426614174000';
    try { await service.findClaseById(idInexistente); }
    catch (error) {
      expect(error.message).toBe("No se encontró la clase");
    }
  });
});

/*archivo src/museum/museum.service.spec.ts*/
