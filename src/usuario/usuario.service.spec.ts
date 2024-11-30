/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioService } from './usuario.service';
import { Rol } from './usuario.entity/usuario.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearUsuario debe crear un usuario válido', async () => {
    const nuevoUsuario: UsuarioEntity = {
      id: '',
      nombre: 'María Gómez',
      cedula: 987654321,
      grupoInvestigacion: 'IMAGINE',
      numeroExtension: 87654321,
      rol: Rol.PROF,
      subordinados: [],
      jefe: null,
      clases: [],
      bonos: [],
    };

    const result = await service.crearUsuario(nuevoUsuario);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.nombre).toEqual(nuevoUsuario.nombre);
  });

  it('crearUsuario debe lanzar excepción para grupo de investigación inválido', async () => {
    const usuarioInvalido: UsuarioEntity = {
      id: '',
      nombre: 'María Gómez',
      cedula: 987654321,
      grupoInvestigacion: 'INVALIDO',
      numeroExtension: 87654321,
      rol: Rol.PROF,
      subordinados: [],
      jefe: null,
      clases: [],
      bonos: [],
    };
    try { const result = await service.crearUsuario(usuarioInvalido); }
    catch (error) {
      expect(error.message).toBe("El grupo de investigacion no existe");
    }
  });

  it('crearUsuario debe lanzar excepción para DECANA con extensión inválida', async () => {
    const usuarioInvalido: UsuarioEntity = {
      id: '',
      nombre: 'Decana Pérez',
      cedula: 654321987,
      grupoInvestigacion: 'IMAGINE',
      numeroExtension: 12345, // Extensión inválida
      rol: Rol.DECANA,
      subordinados: [],
      jefe: null,
      clases: [],
      bonos: [],
    };

    try { const result = await service.crearUsuario(usuarioInvalido); }
    catch (error) {
      expect(error.message).toBe("La extension debe tener 8 caracteres");
    }
  });


  it('findUsuarioById debe lanzar excepción para un usuario inexistente', async () => {
    const idInexistente = '123e4567-e89b-12d3-a456-426614174000';
    try { await service.findUsuarioById(idInexistente); }
    catch (error) {
      expect(error.message).toBe("No se encontró el usuario");
    }
  });

  it('findUsuarioById debe devolver un usuario existente', async () => {
    const nuevoUsuario: UsuarioEntity = {
      id: '',
      nombre: 'María Gómez',
      cedula: 987654321,
      grupoInvestigacion: 'IMAGINE',
      numeroExtension: 87654321,
      rol: Rol.PROF,
      subordinados: [],
      jefe: null,
      clases: [],
      bonos: [],
    };

    await service.crearUsuario(nuevoUsuario);
    const result = await service.findUsuarioById(nuevoUsuario.id);
    expect(result).toBeDefined();
    expect(result.id).toEqual(nuevoUsuario.id);
    expect(result.nombre).toEqual(nuevoUsuario.nombre);
  });

  it('Eliminar usuario debe lanzar excepción al ser DECANA', async () => {
    const nuevoUsuario: UsuarioEntity = {
      id: '',
      nombre: 'María Gómez',
      cedula: 987654321,
      grupoInvestigacion: 'IMAGINE',
      numeroExtension: 87654321,
      rol: Rol.DECANA,
      subordinados: [],
      jefe: null,
      clases: [],
      bonos: [],
    };

    await service.crearUsuario(nuevoUsuario);
    try { await service.deleteUsuarioId(nuevoUsuario.id); }
    catch (error) {
      expect(error.message).toBe("No se puede eliminar porque es DECANA");
    }
  });

  it('Eliminar usuario debe eliminar al ser PROF sin bonos', async () => {
    const nuevoUsuario: UsuarioEntity = {
      id: '',
      nombre: 'María Gómez',
      cedula: 987654321,
      grupoInvestigacion: 'IMAGINE',
      numeroExtension: 87654321,
      rol: Rol.PROF,
      subordinados: [],
      jefe: null,
      clases: [],
      bonos: [],
    };

    await service.crearUsuario(nuevoUsuario);
    await service.deleteUsuarioId(nuevoUsuario.id);
    try { await service.findUsuarioById(nuevoUsuario.id); }
    catch (error) {
      expect(error.message).toBe("No se encontró el usuario");
    }
  });

  it('Eliminar usuario debe mostrar excepción al ser PROF con bonos', async () => {
    let nuevoUsuario: UsuarioEntity = {
      id: '',
      nombre: 'María Gómez',
      cedula: 987654321,
      grupoInvestigacion: 'IMAGINE',
      numeroExtension: 87654321,
      rol: Rol.PROF,
      subordinados: [],
      jefe: null,
      clases: [],
      bonos: [],
    };
    nuevoUsuario.bonos = [
      {
        id: '1',
        monto: 500,
        calificacion: 5,
        palabraClave: 'excelencia',
        usuario: nuevoUsuario,
        clase: null,
      } as any,
    ];

    await service.crearUsuario(nuevoUsuario);
    try { await service.deleteUsuarioId(nuevoUsuario.id); }
    catch (error) {
      expect(error.message).toBe("No se puede eliminar el usuario porque tiene bonos");
    }
  });
});

/*archivo src/museum/museum.service.spec.ts*/