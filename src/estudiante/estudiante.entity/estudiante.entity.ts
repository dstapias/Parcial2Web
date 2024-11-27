/* eslint-disable prettier/prettier */
/* archivo: src/artist/artist.entity.ts */
import { ProyectoEntity } from "../../proyecto/proyecto.entity/proyecto.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   codigo: string;
   @Column()
   nombre: string;
   @Column()
   creditosAprobados: number;

   @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
   proyecto: ProyectoEntity;
}
