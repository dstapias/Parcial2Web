/* eslint-disable prettier/prettier */
/* archivo: src/artist/artist.entity.ts */
import { PropuestaEntity } from "../../propuesta/propuesta.entity/propuesta.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfesorEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   cedula: number;
   @Column()
   nombre: string;
   @Column()
   grupoInvestigacion: string;

   @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
   propuestas: PropuestaEntity[];
}
/* archivo: src/artist/artist.entity.ts */