/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoService } from './bono.service';

describe('BonoService', () => {
 let service: BonoService;
 let repository: Repository<BonoEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [BonoService],
   }).compile();

   service = module.get<BonoService>(BonoService);
   repository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});

/*archivo src/museum/museum.service.spec.ts*/
