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

});

/*archivo src/museum/museum.service.spec.ts*/
