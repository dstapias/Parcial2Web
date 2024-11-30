import { BonoService } from './bono.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BonoDto } from './bono.dto/bono.dto';
import { BonoEntity } from './bono.entity/bono.entity';
import { plainToInstance } from 'class-transformer';

@Controller('bono')
@UseInterceptors(BusinessErrorsInterceptor)
export class BonoController {
   constructor(private readonly bonoService: BonoService) { }

   @Post()
   async crearBono(@Body() bonoDto: BonoDto) {
      const bono: BonoEntity = plainToInstance(BonoEntity, bonoDto);
      return await this.bonoService.crearBono(bono);
   }

   @Delete(':bonoId')
   @HttpCode(204)
   async delete(@Param('bonoId') bonoId: string) {
      return await this.bonoService.deleteBonoId(bonoId);
   }

   @Get('bonos/usuario/:usuarioId')
   async findBonoByUsuarioId(@Param('usuarioId') usuarioId: string) {
      return await this.bonoService.findBonoByUsuarioId(usuarioId);
   }

   @Get('bonos/clase/:cod')
   async findBonoByCod(@Param('cod') cod: string) {
      return await this.bonoService.findBonoByCod(cod);
   }
}
