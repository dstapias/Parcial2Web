/* eslint-disable prettier/prettier */
/* archivo: src/artist/artist.entity.ts */
import { ProfesorEntity } from "../../profesor/profesor.entity/profesor.entity";
import { ProyectoEntity } from "../../proyecto/proyecto.entity/proyecto.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropuestaEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   titulo: string;
   @Column()
   descripcion: string;
   @Column()
   palabraClave: number;

   @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas)
   profesor: ProfesorEntity;

   @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
   proyecto: ProyectoEntity;
}
