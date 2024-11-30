import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class BonoDto {
  @IsNotEmpty()
  @IsNumber()
  monto: number;
  
  @IsNotEmpty()
  @IsNumber()
  calificacion: number;

  @IsNotEmpty()
  @IsString()
  palabraClave: string;


}
