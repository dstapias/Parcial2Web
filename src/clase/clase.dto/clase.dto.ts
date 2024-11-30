import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsUUID, ValidateIf } from 'class-validator';

export class ClaseDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    codigo: string;

    @IsNotEmpty()
    @IsNumber()
    creditos: number;
}
