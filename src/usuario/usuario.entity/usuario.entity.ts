/* eslint-disable prettier/prettier */
/* archivo: src/artist/artist.entity.ts */
import { BonoEntity } from "src/bono/bono.entity/bono.entity";
import { ClaseEntity } from "src/clase/clase.entity/clase.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Rol {
    PROF = 'PROF',
    DECANA = 'DECANA'
}

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    cedula: number;
    @Column()
    nombre: string;
    @Column()
    grupoInvestigacion: string;
    @Column()
    numeroExtension: number;
    @Column({
        type: 'enum',
        enum: Rol,
        default: Rol.PROF,
    })

    @ManyToOne(() => UsuarioEntity, jefe => jefe.subordinados)
    jefe: UsuarioEntity;
    
    @OneToMany(() => UsuarioEntity, subordinado => subordinado.jefe)
    subordinados: UsuarioEntity[];
    
    @OneToMany(() => ClaseEntity, clase => clase.usuario)
    clases: ClaseEntity[];
    
    @OneToMany(() => BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];
    

}