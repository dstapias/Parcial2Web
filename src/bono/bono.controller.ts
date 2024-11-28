import { BonoService } from './bono.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';

@Controller('bono')
@UseInterceptors(BusinessErrorsInterceptor)
export class BonoController {
    constructor(private readonly bonoService: BonoService) {}

    @Post()
    async findAll() {
    return await this.bonoService.crearBono;
    }

    @Get()
    async find() {
    return await this.bonoService.findBonoByUsuarioId;
    }

    @Get('bonos/:usuarioId')
    async findBonoByUsuarioId(@Param('usuarioId') usuarioId: string){
       return await this.bonoService.findBonoByUsuarioId(usuarioId);
    }
    
    @Get('bonos/:cod')
    async findBonoByCod(@Param('cod') cod: string){
       return await this.bonoService.findBonoByCod(cod);
    }
}
