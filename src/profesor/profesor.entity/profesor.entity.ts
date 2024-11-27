/* eslint-disable prettier/prettier */
/* archivo: src/artist/artist.entity.ts */
import { PropuestaEntity } from "../../propuesta/propuesta.entity/propuesta.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum GrupoInvestigacion {
    TICSW = 'TICSW',
    IMAGINE = 'IMAGINE',
    COMIT = 'COMIT',
}

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    cedula: number;
    @Column()
    nombre: string;
    @Column({
        type: 'enum',
        enum: GrupoInvestigacion,
        default: GrupoInvestigacion.TICSW,
    })
    grupoInvestigacion: GrupoInvestigacion;

    @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
    propuestas: PropuestaEntity[];
}
/* archivo: src/artist/artist.entity.ts */