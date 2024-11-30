import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Controller('usuario')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
   constructor(private readonly usuarioService: UsuarioService) { }

   @Post()
   async crearUsuario(@Body() usuarioDto: UsuarioDto) {
      const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
      return await this.usuarioService.crearUsuario(usuario);
   }

   @Delete(':usuarioId')
   @HttpCode(204)
   async deleteUsuarioId(@Param('usuarioId') usuarioId: string) {
      return await this.usuarioService.deleteUsuarioId(usuarioId);
   }

   @Get(':usuarioId')
   async findUsuarioById(@Param('usuarioId') usuarioId: string) {
      return await this.usuarioService.findUsuarioById(usuarioId);
   }
}
