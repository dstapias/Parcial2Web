import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ClaseService } from './clase.service';
import { ClaseDto } from './clase.dto/clase.dto';
import { ClaseEntity } from './clase.entity/clase.entity';

@Controller('clase')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClaseController {
   constructor(private readonly claseService: ClaseService) { }

   @Post()
   async crearClase(@Body() claseDto: ClaseDto) {
      const clase: ClaseEntity = plainToInstance(ClaseEntity, claseDto);
      return await this.claseService.crearClase(clase);
   }

   @Get(':claseId')
   async findClaseById(@Param('claseId') claseId: string) {
      return await this.claseService.findClaseById(claseId);
   }
}
