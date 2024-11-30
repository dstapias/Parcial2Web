import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsUUID, ValidateIf } from 'class-validator';
import { Rol } from '../usuario.entity/usuario.entity';

export class UsuarioDto {
  @IsNotEmpty()
  @IsNumber()
  cedula: number;
  
  @IsNotEmpty()
  @IsString()
  nombre: string;
  
  @IsNotEmpty()
  @IsString()
  grupoInvestigacion: string;

  @IsNotEmpty()
  @IsNumber()
  numeroExtension: number;

  @IsEnum(Rol)
  rol: Rol;
 
  @IsOptional()
  @IsUUID()
  jefe: string;
}
