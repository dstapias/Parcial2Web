import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class PropuestaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  palabraClave: number;
}
